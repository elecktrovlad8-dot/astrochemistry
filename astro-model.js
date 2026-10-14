/**
 * ============================================================
 * ДОМЕННАЯ МОДЕЛЬ АСТРОЛОГИЧЕСКОЙ АЛХИМИИ (Domain Layer — PRO)
 * ============================================================
 */
import { PLANET_ORDER } from './astro-database.js';

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

    createCompleteFormula(planetId, signId, houseId) {
        const p = this.elementsRepo.get(planetId);
        const s = this.elementsRepo.get(signId);
        const h = this.elementsRepo.get(houseId);
        if (!p || !s || !h) return null;
        return {
            text: `${p.name} ${s.name} ${h.name}`,
            planetId,
            signId,
            houseId,
            isComplete: true
        };
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

    /**
     * Вычисляет прогноз Соляра (Активация раздела 17 `solar_...` из astro-database.js)
     */
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

    /**
     * Вычисляет индекс резонанса и совместимости в Синастрии (0..100%)
     */
    calculateSynastryScore(inv1 = [], inv2 = [], descriptionsRepo = null) {
        if (inv1.length === 0 || inv2.length === 0) {
            return { score: 0, label: 'Недостаточно данных', summary: 'Наполните обе карты для расчёта индекса.' };
        }

        let rawScore = 62; // Базовый потенциал притяжения
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
