/**
 * ============================================================
 * ДОМЕННАЯ МОДЕЛЬ И ЭФЕМЕРИДНЫЙ ДВИЖОК (Domain & Astronomy Layer)
 * ============================================================
 */
import { PLANET_ORDER } from './astro-database.js';

const DEG2RAD = Math.PI / 180;
const RAD2DEG = 180 / Math.PI;

function norm360(deg) {
    return ((deg % 360) + 360) % 360;
}

/**
 * Автономный астрономический вычислитель эфемерид (Meeus / JPL J2000.0)
 */
export class EphemerisEngine {
    static SIGN_IDS = [
        'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
        'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
    ];

    // Орбитальные элементы планет на эпоху J2000.0 (T — юлианские столетия)
    static ORBITAL_ELEMENTS = {
        mercury: { a: 0.387098, e0: 0.205635, e1: 0.000020, i0: 7.0049,  L0: 252.2509, L1: 149472.6746, p0: 77.4561,  p1: 0.1594, O0: 48.3309,  O1: -0.1254 },
        venus:   { a: 0.723330, e0: 0.006773, e1: -0.000048, i0: 3.3947, L0: 181.9798, L1: 58517.8157,  p0: 131.5637, p1: 0.0048, O0: 76.6799,  O1: -0.2780 },
        mars:    { a: 1.523679, e0: 0.093405, e1: 0.000090, i0: 1.8497,  L0: 355.4330, L1: 19140.2993,  p0: 336.0602, p1: 0.4439, O0: 49.5581,  O1: -0.2950 },
        jupiter: { a: 5.202603, e0: 0.048498, e1: 0.000163, i0: 1.3033,  L0: 34.3515,  L1: 3034.9057,   p0: 14.3312,  p1: 0.2155, O0: 100.4644, O1: 0.1767 },
        saturn:  { a: 9.554909, e0: 0.055546, e1: -0.000346, i0: 2.4889, L0: 50.0774,  L1: 1222.1138,   p0: 93.0572,  p1: 0.5665, O0: 113.6655, O1: -0.2567 },
        uranus:  { a: 19.21845, e0: 0.046381, e1: -0.000027, i0: 0.7732, L0: 314.0550, L1: 428.4677,    p0: 173.0053, p1: 0.0893, O0: 74.0060,  O1: 0.0424 },
        neptune: { a: 30.11039, e0: 0.009456, e1: 0.000006, i0: 1.7700,  L0: 304.3487, L1: 218.4862,    p0: 48.1203,  p1: 0.0291, O0: 131.7841, O1: -0.0061 },
        pluto:   { a: 39.48211, e0: 0.248827, e1: 0.000060, i0: 17.1400, L0: 238.9290, L1: 145.2078,    p0: 224.0689, p1: -0.040, O0: 110.3039, O1: -0.011 },
        chiron:  { a: 13.69500, e0: 0.381500, e1: 0.000000, i0: 6.9300,  L0: 216.5000, L1: 710.2000,    p0: 188.9500, p1: 0.0000, O0: 209.3900, O1: 0.0000 }
    };

    static toJulianDay(year, month, day, utcHours = 12) {
        let Y = year;
        let M = month;
        if (M <= 2) {
            Y -= 1;
            M += 12;
        }
        const A = Math.floor(Y / 100);
        const B = 2 - A + Math.floor(A / 4);
        return (
            Math.floor(365.25 * (Y + 4716)) +
            Math.floor(30.6001 * (M + 1)) +
            day +
            utcHours / 24 +
            B -
            1524.5
        );
    }

    static solveKepler(M_deg, e) {
        const M = norm360(M_deg) * DEG2RAD;
        let E = M + e * Math.sin(M) * (1 + e * Math.cos(M));
        for (let k = 0; k < 5; k++) {
            const dE = (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
            E -= dE;
            if (Math.abs(dE) < 1e-7) break;
        }
        return E;
    }

    static computeSun(d, T) {
        const L0 = norm360(280.46646 + 0.98564736 * d);
        const M = norm360(357.52911 + 0.98560028 * d);
        const Mrad = M * DEG2RAD;
        const e = 0.016708634 - 0.000042037 * T;

        const C =
            (1.914602 - 0.004817 * T) * Math.sin(Mrad) +
            0.019993 * Math.sin(2 * Mrad) +
            0.000289 * Math.sin(3 * Mrad);

        const lon = norm360(L0 + C);
        const v = (M + C) * DEG2RAD;
        const R = (1.000001018 * (1 - e * e)) / (1 + e * Math.cos(v));
        return { lon, R };
    }

    static computeMoon(d) {
        const L = norm360(218.3164477 + 13.17639648 * d);
        const D = norm360(297.8501921 + 12.19074912 * d) * DEG2RAD;
        const M = norm360(357.5291092 + 0.98560028 * d) * DEG2RAD;
        const Mp = norm360(134.9633964 + 13.06499295 * d) * DEG2RAD;
        const F = norm360(93.2720950 + 13.22935024 * d) * DEG2RAD;

        const dLon =
            6.2888 * Math.sin(Mp) +
            1.2740 * Math.sin(2 * D - Mp) +
            0.6583 * Math.sin(2 * D) +
            0.2136 * Math.sin(2 * Mp) -
            0.1851 * Math.sin(M) -
            0.1143 * Math.sin(2 * F) +
            0.0588 * Math.sin(2 * D - 2 * Mp) +
            0.0572 * Math.sin(2 * D - M - Mp) +
            0.0533 * Math.sin(2 * D + Mp);

        return norm360(L + dLon);
    }

    static computePlanetGeocentricLon(planetKey, T, sunPos) {
        const el = EphemerisEngine.ORBITAL_ELEMENTS[planetKey];
        if (!el) return 0;

        const a = el.a;
        const e = el.e0 + el.e1 * T;
        const i = el.i0 * DEG2RAD;
        const L = norm360(el.L0 + el.L1 * T);
        const p = norm360(el.p0 + el.p1 * T);
        const O = norm360(el.O0 + el.O1 * T);

        const M = norm360(L - p);
        const E = EphemerisEngine.solveKepler(M, e);

        const xv = a * (Math.cos(E) - e);
        const yv = a * Math.sqrt(1 - e * e) * Math.sin(E);
        const v = Math.atan2(yv, xv) * RAD2DEG;
        const r = Math.hypot(xv, yv);

        const u = (v + p - O) * DEG2RAD;
        const Orad = O * DEG2RAD;

        const xh = r * (Math.cos(Orad) * Math.cos(u) - Math.sin(Orad) * Math.sin(u) * Math.cos(i));
        const yh = r * (Math.sin(Orad) * Math.cos(u) + Math.cos(Orad) * Math.sin(u) * Math.cos(i));

        // Долготные возмущения для Юпитера и Сатурна (великое неравенство)
        let perturbDeg = 0;
        if (planetKey === 'jupiter' || planetKey === 'saturn') {
            const Mj = norm360(20.020 + 3034.69 * T) * DEG2RAD;
            const Ms = norm360(317.020 + 1221.55 * T) * DEG2RAD;
            const angle = 2 * Mj - 5 * Ms - 67.6 * DEG2RAD;
            if (planetKey === 'jupiter') {
                perturbDeg = -0.332 * Math.sin(angle) - 0.056 * Math.sin(2 * Mj - 2 * Ms + 21 * DEG2RAD);
            } else {
                perturbDeg = 0.812 * Math.sin(angle) - 0.229 * Math.cos(2 * Mj - 4 * Ms - 2 * DEG2RAD);
            }
        }

        // Перевод из гелиоцентрических в геоцентрические координаты через вектор Солнца
        const sunRad = sunPos.lon * DEG2RAD;
        const xs = sunPos.R * Math.cos(sunRad);
        const ys = sunPos.R * Math.sin(sunRad);

        const xg = xh + xs;
        const yg = yh + ys;

        return norm360(Math.atan2(yg, xg) * RAD2DEG + perturbDeg);
    }

    static computeAscendant(d, latDeg, lonDeg) {
        const gmst = norm360(280.46061837 + 360.98564736629 * d);
        const lst = norm360(gmst + lonDeg) * DEG2RAD;
        const eps = 23.439291 * DEG2RAD;
        const lat = latDeg * DEG2RAD;

        const y = Math.cos(lst);
        const x = -Math.sin(lst) * Math.cos(eps) - Math.tan(lat) * Math.sin(eps);
        return norm360(Math.atan2(y, x) * RAD2DEG);
    }

    static longitudeToSignAndDegree(lon) {
        const normalized = norm360(lon);
        const signIndex = Math.floor(normalized / 30);
        const degreeInSign = Math.floor(normalized % 30);
        return {
            longitude: normalized,
            signId: EphemerisEngine.SIGN_IDS[signIndex],
            signIndex,
            degree: degreeInSign
        };
    }

    /**
     * Полный расчёт всех 15 точек карты по дате, времени и координатам
     */
    static calculateAllPositions({
        dateStr,
        timeStr = '12:00',
        tzOffset = 3,
        lat = 55.7558,
        lon = 37.6173,
        timeUnknown = false
    }) {
        const [year, month, day] = dateStr.split('-').map(Number);
        const [hours, minutes] = (timeUnknown ? '12:00' : timeStr).split(':').map(Number);
        const localHours = (hours || 0) + (minutes || 0) / 60;
        const utcHours = localHours - Number(tzOffset || 0);

        const jd = EphemerisEngine.toJulianDay(year, month, day, utcHours);
        const d = jd - 2451545.0;
        const T = d / 36525.0;

        const sunPos = EphemerisEngine.computeSun(d, T);
        const moonLon = EphemerisEngine.computeMoon(d);

        // Лунные узлы и Черная Луна (Лилит)
        const nodeNLon = norm360(125.04452 - 0.05295376 * d);
        const nodeSLon = norm360(nodeNLon + 180);
        const lilithLon = norm360(83.3532465 + 0.11140408 * d + 180);

        const rawLongitudes = {
            sun: sunPos.lon,
            moon: moonLon,
            mercury: EphemerisEngine.computePlanetGeocentricLon('mercury', T, sunPos),
            venus: EphemerisEngine.computePlanetGeocentricLon('venus', T, sunPos),
            mars: EphemerisEngine.computePlanetGeocentricLon('mars', T, sunPos),
            jupiter: EphemerisEngine.computePlanetGeocentricLon('jupiter', T, sunPos),
            saturn: EphemerisEngine.computePlanetGeocentricLon('saturn', T, sunPos),
            uranus: EphemerisEngine.computePlanetGeocentricLon('uranus', T, sunPos),
            neptune: EphemerisEngine.computePlanetGeocentricLon('neptune', T, sunPos),
            pluto: EphemerisEngine.computePlanetGeocentricLon('pluto', T, sunPos),
            node_n: nodeNLon,
            node_s: nodeSLon,
            lilith: lilithLon,
            chiron: EphemerisEngine.computePlanetGeocentricLon('chiron', T, sunPos)
        };

        // Если время известно — истинный Асцендент, иначе — равнодомная сетка от Солнца
        const ascLon = timeUnknown
            ? sunPos.lon
            : EphemerisEngine.computeAscendant(d, lat, lon);

        if (!timeUnknown) {
            rawLongitudes.asc = ascLon;
        }

        const results = {};
        for (const [planetId, planetLon] of Object.entries(rawLongitudes)) {
            const meta = EphemerisEngine.longitudeToSignAndDegree(planetLon);
            let houseNum;
            if (planetId === 'asc') {
                houseNum = 1;
            } else {
                // Равнодомная система от градуса Асцендента (или Солнца при космограмме)
                houseNum = Math.floor(norm360(planetLon - ascLon) / 30) + 1;
            }
            results[planetId] = {
                planetId,
                signId: meta.signId,
                houseId: `h${houseNum}`,
                degree: meta.degree,
                longitude: meta.longitude
            };
        }

        return results;
    }
}

export class AstroModel {
    constructor(elementsRepo, descriptionsRepo = null) {
        this.elementsRepo = elementsRepo;
        this.descriptionsRepo = descriptionsRepo;
    }

    sortFormulas(list) {
        return list.sort((a, b) => {
            const ia = PLANET_ORDER.indexOf(a.planetId);
            const ib = PLANET_ORDER.indexOf(b.planetId);
            return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
        });
    }

    createFormulaFromElement(item) {
        return {
            text: item.name,
            planetId: item.type === 'planet' ? item.id : null,
            signId: item.type === 'sign' ? item.id : null,
            houseId: item.type === 'house' ? item.id : null,
            isComplete: false
        };
    }

    createCompleteFormula(planetId, signId, houseId, degree = null) {
        const p = this.elementsRepo.get(planetId);
        const s = this.elementsRepo.get(signId);
        const h = this.elementsRepo.get(houseId);
        if (!p || !s || !h) return null;
        const degSuffix = typeof degree === 'number' ? ` ${degree}°` : '';
        return {
            text: `${p.name} ${s.name}${degSuffix} ${h.name}`,
            planetId,
            signId,
            houseId,
            isComplete: true
        };
    }

    /**
     * Генерирует готовый массив формул для человека по дате и времени рождения
     */
    calculateNatalChartFromBirthData(birthConfig) {
        const positions = EphemerisEngine.calculateAllPositions(birthConfig);
        const scope = birthConfig.scope || 'full'; // 'full' | 'classic'
        const classicSet = new Set([
            'sun', 'moon', 'mercury', 'venus', 'mars',
            'jupiter', 'saturn', 'uranus', 'neptune', 'pluto', 'asc'
        ]);

        const formulas = [];
        for (const key of PLANET_ORDER) {
            if (!positions[key]) continue;
            if (scope === 'classic' && !classicSet.has(key)) continue;
            const pos = positions[key];
            const f = this.createCompleteFormula(pos.planetId, pos.signId, pos.houseId, pos.degree);
            if (f) formulas.push(f);
        }
        return this.sortFormulas(formulas);
    }

    mergeTwoFormulas(f1, f2) {
        if (f1.planetId && f2.planetId) return null;
        if (f1.signId && f2.signId) return null;
        if (f1.houseId && f2.houseId) return null;

        const planetId = f1.planetId || f2.planetId || null;
        const signId = f1.signId || f2.signId || null;
        const houseId = f1.houseId || f2.houseId || null;

        let text = '';
        if (planetId) text += this.elementsRepo.get(planetId).name + ' ';
        if (signId) text += this.elementsRepo.get(signId).name + ' ';
        if (houseId) text += this.elementsRepo.get(houseId).name;

        return {
            text: text.trim(),
            planetId,
            signId,
            houseId,
            isComplete: Boolean(planetId && signId && houseId)
        };
    }

    hasOverlapByPlanet(listA, listB) {
        const planetsA = listA.map((f) => f.planetId).filter(Boolean);
        const planetsB = listB.map((f) => f.planetId).filter(Boolean);
        return planetsA.some((p) => planetsB.includes(p));
    }

    allComplete(list) {
        return list.length > 0 && list.every((f) => f.isComplete);
    }

    addFormulasToInventory(inventory, formulasToAdd) {
        if (!this.allComplete(formulasToAdd)) return false;
        if (this.hasOverlapByPlanet(inventory, formulasToAdd)) return false;
        inventory.push(...formulasToAdd);
        this.sortFormulas(inventory);
        return true;
    }

    splitFormulaToAtoms(formula) {
        const atoms = [];
        if (formula.planetId) atoms.push(this.createFormulaFromElement(this.elementsRepo.get(formula.planetId)));
        if (formula.signId) atoms.push(this.createFormulaFromElement(this.elementsRepo.get(formula.signId)));
        if (formula.houseId) atoms.push(this.createFormulaFromElement(this.elementsRepo.get(formula.houseId)));
        return atoms;
    }

    calculateElementalBalance(inventory) {
        const counts = { fire: 0, earth: 0, air: 0, water: 0 };
        let total = 0;

        const weights = {
            sun: 3, moon: 3, asc: 3,
            mercury: 2, venus: 2, mars: 2,
            jupiter: 1.5, saturn: 1.5,
            uranus: 1, neptune: 1, pluto: 1,
            node_n: 1, node_s: 1, lilith: 1, chiron: 1
        };

        for (const f of inventory) {
            if (!f.signId) continue;
            const sign = this.elementsRepo.get(f.signId);
            if (!sign || !sign.element) continue;
            const w = weights[f.planetId] || 1;
            counts[sign.element] += w;
            total += w;
        }

        if (total === 0) {
            return { fire: 0, earth: 0, air: 0, water: 0, dominant: null };
        }

        const result = {
            fire: Math.round((counts.fire / total) * 100),
            earth: Math.round((counts.earth / total) * 100),
            air: Math.round((counts.air / total) * 100),
            water: Math.round((counts.water / total) * 100)
        };

        const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
        result.dominant = sorted[0][1] > 0 ? sorted[0][0] : null;
        return result;
    }

    getSignDistance(signId1, signId2) {
        const s1 = this.elementsRepo.get(signId1);
        const s2 = this.elementsRepo.get(signId2);
        if (!s1 || !s2 || typeof s1.index !== 'number' || typeof s2.index !== 'number') return null;
        const diff = Math.abs(s1.index - s2.index);
        return diff > 6 ? 12 - diff : diff;
    }

    getAspectMeta(distance) {
        const map = {
            0: { code: 'conj',  name: 'Соединение (0°)',  symbol: '☌', harmony: 'neutral',  color: '#facc15', score: 8 },
            2: { code: 'sext',  name: 'Секстиль (60°)',   symbol: '✶', harmony: 'harmonic', color: '#38bdf8', score: 10 },
            3: { code: 'sq',    name: 'Квадратура (90°)', symbol: '□', harmony: 'tense',    color: '#f97316', score: -6 },
            4: { code: 'tr',    name: 'Трин (120°)',      symbol: '△', harmony: 'harmonic', color: '#10b981', score: 14 },
            5: { code: 'quinc', name: 'Квиконс (150°)',   symbol: '⚻', harmony: 'karmic',   color: '#eab308', score: 4 },
            6: { code: 'opp',   name: 'Оппозиция (180°)', symbol: '☍', harmony: 'tense',    color: '#ef4444', score: -4 }
        };
        return map[distance] || null;
    }

    calculateNatalAspects(inventory, descriptionsRepo) {
        const aspects = [];
        for (let i = 0; i < inventory.length; i++) {
            for (let j = i + 1; j < inventory.length; j++) {
                const f1 = inventory[i];
                const f2 = inventory[j];
                if (!f1.planetId || !f2.planetId || !f1.signId || !f2.signId) continue;

                const dist = this.getSignDistance(f1.signId, f2.signId);
                const aspect = this.getAspectMeta(dist);
                if (!aspect) continue;

                const p1 = this.elementsRepo.get(f1.planetId);
                const p2 = this.elementsRepo.get(f2.planetId);
                const s1 = this.elementsRepo.get(f1.signId);
                const s2 = this.elementsRepo.get(f2.signId);

                const candidates = [
                    `aspect_${f1.planetId}_${f2.planetId}_${aspect.code}`,
                    `aspect_${f2.planetId}_${f1.planetId}_${aspect.code}`,
                    `aspect_${f1.planetId}_${aspect.code}_${f2.planetId}`,
                    `aspect_${f2.planetId}_${aspect.code}_${f1.planetId}`
                ];

                let dbText = null;
                let matchedKey = candidates[0];
                if (descriptionsRepo) {
                    for (const key of candidates) {
                        const found = descriptionsRepo.find(key);
                        if (found) {
                            dbText = found;
                            matchedKey = key;
                            break;
                        }
                    }
                }

                if (!dbText) {
                    dbText = this.#generateDynamicNatalAspectText(p1, p2, s1, s2, aspect);
                }

                aspects.push({
                    title: `${aspect.symbol} ${aspect.name}: ${p1.label} (${s1.name}) — ${p2.label} (${s2.name})`,
                    text: dbText,
                    harmony: aspect.harmony,
                    color: aspect.color,
                    code: aspect.code,
                    f1,
                    f2,
                    key: matchedKey
                });
            }
        }
        return aspects;
    }

    #generateDynamicNatalAspectText(p1, p2, s1, s2, aspect) {
        const templates = {
            conj: `Слияние энергий: ${p1.label} и ${p2.label} в знаке ${s1.label} действуют как единый сплав. Проявление одной планеты мгновенно включает вторую, создавая мощный фокус личности.`,
            sext: `Гармоничный шанс: ${p1.label} (${s1.label}) и ${p2.label} (${s2.label}) продуктивно дополняют друг друга. Талант, который легко раскрывается через осознанные действия и общение.`,
            sq: `Внутренний двигатель и вызов: конфликт между принципами «${p1.label} в ${s1.label}» и «${p2.label} в ${s2.label}». Даёт колоссальную энергию для преодоления кризисов и закаляет характер.`,
            tr: `Врождённый дар и поток: ${p1.label} (${s1.label}) и ${p2.label} (${s2.label}) находятся в одной стихии, обеспечивая естественную удачу, лёгкость самовыражения и внутреннюю защиту.`,
            quinc: `Скрытое напряжение и возврат (Квиконс 150°): ${p1.label} (${s1.label}) и ${p2.label} (${s2.label}) находятся в «слепой зоне» друг друга. Постоянная потребность ювелирно балансировать две совершенно разные сферы жизни и перестраивать сценарии.`,
            opp: `Ось полярности: противостояние «${p1.label} (${s1.label})» и «${p2.label} (${s2.label})». Задача — не подавлять один полюс ради другого, а найти точку равновесия и синтеза.`
        };
        return templates[aspect.code] || '';
    }

    calculateSolarForecast(inventory, descriptionsRepo) {
        const items = [];
        for (const f of inventory) {
            if (!f.planetId || !f.houseId) continue;
            const p = this.elementsRepo.get(f.planetId);
            const h = this.elementsRepo.get(f.houseId);
            const s = f.signId ? this.elementsRepo.get(f.signId) : null;

            const solarKey = `solar_${f.planetId}_${f.houseId}`;
            let text = descriptionsRepo ? descriptionsRepo.find(solarKey) : null;
            const isExactDbMatch = Boolean(text);

            if (!text) {
                text = `Солярная активация (${p.label} в ${h.label}): В течение года энергия планеты «${p.label}»${s ? ` через качества знака ${s.label}` : ''} выводит на первый план сферу ${h.sphere}. Это время активных перемен, принятия ключевых решений и закладки нового цикла именно в этом секторе карты.`;
            }

            items.push({
                title: `🌟 ${p.label} в ${h.label} Соляра`,
                text,
                isExactDbMatch,
                key: solarKey
            });
        }
        return items;
    }

    calculateSynastryScore(inv1 = [], inv2 = [], descriptionsRepo = null) {
        if (inv1.length === 0 || inv2.length === 0) {
            return { score: 0, label: 'Недостаточно данных', summary: 'Наполните обе карты для расчёта индекса.' };
        }

        let rawScore = 62;
        let harmonicCount = 0;
        let tenseCount = 0;
        let karmicCount = 0;

        for (const f1 of inv1) {
            for (const f2 of inv2) {
                if (f1.signId && f2.signId) {
                    const dist = this.getSignDistance(f1.signId, f2.signId);
                    const asp = this.getAspectMeta(dist);
                    if (asp) {
                        rawScore += asp.score * 0.65;
                        if (asp.harmony === 'harmonic') harmonicCount++;
                        if (asp.harmony === 'tense') tenseCount++;
                        if (asp.harmony === 'karmic') karmicCount++;
                    }
                }
                if (descriptionsRepo && f1.planetId && f2.planetId) {
                    if (
                        descriptionsRepo.find(`syn_${f1.planetId}_${f2.planetId}`) ||
                        descriptionsRepo.find(`syn_${f2.planetId}_${f1.planetId}`)
                    ) {
                        rawScore += 3;
                    }
                }
                if (['h1', 'h4', 'h5', 'h7', 'h8'].includes(f2.houseId) && ['sun', 'moon', 'venus', 'mars', 'jupiter'].includes(f1.planetId)) {
                    rawScore += 2.5;
                }
                if (['h1', 'h4', 'h5', 'h7', 'h8'].includes(f1.houseId) && ['sun', 'moon', 'venus', 'mars', 'jupiter'].includes(f2.planetId)) {
                    rawScore += 2.5;
                }
            }
        }

        const score = Math.max(25, Math.min(99, Math.round(rawScore)));
        let label = 'Сбалансированный союз';
        if (score >= 85) label = '🔥 Высоковольтный кармический резонанс';
        else if (score >= 72) label = '✨ Глубокая синергия и притяжение';
        else if (score < 52) label = '⚡ Союз трансформации и роста через вызовы';

        const summary = `Гармоничных узлов: ${harmonicCount} • Точек роста и страсти: ${tenseCount} • Кармических связок: ${karmicCount}`;
        return { score, label, summary };
    }
}
