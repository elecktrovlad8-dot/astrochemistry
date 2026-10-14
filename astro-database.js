/* =============================================================================
 *  ASTRO ALCHEMY — DATA & INTELLIGENCE LAYER  (v3.0)
 *  Чистые данные + генеративный движок интерпретаций.
 *  Гарантия: НЕ существует пустых комбинаций — любой ключ имеет текст.
 * ========================================================================== */
'use strict';
const F = Object.freeze;
const cap = s => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

/* ---------------------------------------------------------------- СТИХИИ */
export const ELEMENTS = F({
  fire:  { id:'fire',  label:'Огонь', icon:'🔥', color:'#ff7849',
    gift:'спонтанный импульс, веру в себя и способность зажигать других',
    risk:'выгорание, нетерпеливость и лобовые столкновения',
    need:'движение и признание' },
  earth: { id:'earth', label:'Земля', icon:'🌿', color:'#5ddba0',
    gift:'выносливость, практичность и умение доводить до результата',
    risk:'инертность, упрямство и зацикленность на контроле',
    need:'стабильность и осязаемый результат' },
  air:   { id:'air',   label:'Воздух', icon:'🌬️', color:'#7dd3fc',
    gift:'подвижный интеллект, лёгкость связей и широту взгляда',
    risk:'расфокус, холодность и жизнь «в голове»',
    need:'обмен идеями и свободу' },
  water: { id:'water', label:'Вода', icon:'💧', color:'#a78bfa',
    gift:'эмпатию, интуицию и глубину переживания',
    risk:'растворение в чужом, обидчивость и уход в иллюзии',
    need:'близость и эмоциональную безопасность' }
});

export const MODALITIES = F({
  cardinal:{ id:'cardinal', label:'Кардинальный', gift:'импульс старта и умение задавать вектор', risk:'потерю интереса к финалу' },
  fixed:   { id:'fixed',    label:'Фиксированный', gift:'мощь удержания и верность выбранному', risk:'ригидность и страх перемен' },
  mutable: { id:'mutable',  label:'Мутабельный',   gift:'гибкость, адаптивность и многозадачность', risk:'распыление и непостоянство' }
});

export const POLARITIES = F({
  yang:{ id:'yang', label:'Ян · проявленная', note:'энергия идёт наружу: инициатива, экспансия, действие' },
  yin: { id:'yin',  label:'Инь · воспринимающая', note:'энергия идёт внутрь: накопление, чувствование, вынашивание' }
});

/* ---------------------------------------------------------------- ЗНАКИ */
export const SIGNS = F([
 {id:'aries',glyph:'♈',label:'Овен',prep:'в Овне',element:'fire',modality:'cardinal',polarity:'yang',ruler:'mars',dates:'21.03 – 19.04',
  style:'через прямой импульс, скорость и бесстрашный старт',gift:'смелость и способность начинать с нуля',risk:'нетерпение и лобовые конфликты',key:'Я есть'},
 {id:'taurus',glyph:'♉',label:'Телец',prep:'в Тельце',element:'earth',modality:'fixed',polarity:'yin',ruler:'venus',dates:'20.04 – 20.05',
  style:'через неспешное накопление, телесность и верность выбранному',gift:'устойчивость и умение создавать ценность',risk:'упрямство и страх перемен',key:'Я имею'},
 {id:'gemini',glyph:'♊',label:'Близнецы',prep:'в Близнецах',element:'air',modality:'mutable',polarity:'yang',ruler:'mercury',dates:'21.05 – 20.06',
  style:'через любопытство, речь и постоянное переключение',gift:'скорость ума и лёгкость контактов',risk:'поверхностность и рассеянность',key:'Я думаю'},
 {id:'cancer',glyph:'♋',label:'Рак',prep:'в Раке',element:'water',modality:'cardinal',polarity:'yin',ruler:'moon',dates:'21.06 – 22.07',
  style:'через чувство, заботу и защиту своего круга',gift:'эмпатию и память рода',risk:'обидчивость и эмоциональные манипуляции',key:'Я чувствую'},
 {id:'leo',glyph:'♌',label:'Лев',prep:'во Льве',element:'fire',modality:'fixed',polarity:'yang',ruler:'sun',dates:'23.07 – 22.08',
  style:'через яркое самопредъявление, творчество и щедрость',gift:'харизму и творческую волю',risk:'тщеславие и зависимость от аплодисментов',key:'Я творю'},
 {id:'virgo',glyph:'♍',label:'Дева',prep:'в Деве',element:'earth',modality:'mutable',polarity:'yin',ruler:'mercury',dates:'23.08 – 22.09',
  style:'через анализ, отбор деталей и полезное действие',gift:'мастерство и чистоту исполнения',risk:'перфекционизм и обесценивание себя',key:'Я служу'},
 {id:'libra',glyph:'♎',label:'Весы',prep:'в Весах',element:'air',modality:'cardinal',polarity:'yang',ruler:'venus',dates:'23.09 – 22.10',
  style:'через диалог, эстетику и поиск равновесия',gift:'дипломатию и вкус',risk:'нерешительность и зависимость от чужого мнения',key:'Я уравновешиваю'},
 {id:'scorpio',glyph:'♏',label:'Скорпион',prep:'в Скорпионе',element:'water',modality:'fixed',polarity:'yin',ruler:'pluto',dates:'23.10 – 21.11',
  style:'через предельную вовлечённость, риск и трансформацию',gift:'выносливость в кризисе и магнетизм',risk:'ревность, контроль и мстительность',key:'Я желаю'},
 {id:'sagittarius',glyph:'♐',label:'Стрелец',prep:'в Стрельце',element:'fire',modality:'mutable',polarity:'yang',ruler:'jupiter',dates:'22.11 – 21.12',
  style:'через расширение горизонтов, смысл и веру',gift:'оптимизм и масштаб',risk:'догматизм и бестактность',key:'Я вижу цель'},
 {id:'capricorn',glyph:'♑',label:'Козерог',prep:'в Козероге',element:'earth',modality:'cardinal',polarity:'yin',ruler:'saturn',dates:'22.12 – 19.01',
  style:'через дисциплину, стратегию и долгую дистанцию',gift:'ответственность и структуру',risk:'холодность и самоэксплуатацию',key:'Я достигаю'},
 {id:'aquarius',glyph:'♒',label:'Водолей',prep:'в Водолее',element:'air',modality:'fixed',polarity:'yang',ruler:'uranus',dates:'20.01 – 18.02',
  style:'через нестандартность, идею будущего и свободу',gift:'оригинальность и системное мышление',risk:'отстранённость и бунт ради бунта',key:'Я знаю'},
 {id:'pisces',glyph:'♓',label:'Рыбы',prep:'в Рыбах',element:'water',modality:'mutable',polarity:'yin',ruler:'neptune',dates:'19.02 – 20.03',
  style:'через растворение границ, сострадание и образ',gift:'интуицию и творческий поток',risk:'иллюзии, жертвенность и бегство от реальности',key:'Я верю'}
]);

/* -------------------------------------------------------------- ПЛАНЕТЫ */
export const PLANETS = F([
 {id:'sun',glyph:'☉',label:'Солнце',kind:'light',w:3,
  core:'ядро личности и воля к самопроявлению',verb:'творческая воля',need:'сиять и быть узнанным',
  gift:'жизненную силу и осевую уверенность',shadow:'гордыню и зависимость от одобрения'},
 {id:'moon',glyph:'☽',label:'Луна',kind:'light',w:3,
  core:'эмоциональная природа и потребность в безопасности',verb:'инстинктивная реакция',need:'чувствовать себя дома',
  gift:'эмпатию и внутреннее питание',shadow:'капризность и бегство в зону комфорта'},
 {id:'mercury',glyph:'☿',label:'Меркурий',kind:'personal',w:2,
  core:'способ мыслить, говорить и обмениваться',verb:'ум и коммуникация',need:'понимать и быть понятым',
  gift:'ясность речи и обучаемость',shadow:'суетливость и словесные игры'},
 {id:'venus',glyph:'♀',label:'Венера',kind:'personal',w:2,
  core:'способность любить, ценить и притягивать',verb:'притяжение и вкус',need:'наслаждаться и быть желанным',
  gift:'обаяние и чувство меры',shadow:'зависимость от удовольствия и лень в чувствах'},
 {id:'mars',glyph:'♂',label:'Марс',kind:'personal',w:2,
  core:'воля к действию, напор и защита границ',verb:'действие',need:'побеждать и брать своё',
  gift:'смелость и работоспособность',shadow:'агрессию и импульсивные срывы'},
 {id:'jupiter',glyph:'♃',label:'Юпитер',kind:'social',w:1.5,
  core:'вера, смысл и способность расширяться',verb:'рост',need:'выходить за пределы известного',
  gift:'удачу, щедрость и авторитет',shadow:'преувеличение и самонадеянность'},
 {id:'saturn',glyph:'♄',label:'Сатурн',kind:'social',w:1.5,
  core:'структура, зрелость и принятие ограничений',verb:'дисциплина',need:'построить надёжное',
  gift:'стержень и долгую выдержку',shadow:'страх, мрачность и самозапрет'},
 {id:'uranus',glyph:'♅',label:'Уран',kind:'trans',w:1,
  core:'импульс свободы и внезапного прозрения',verb:'прорыв',need:'быть ничем не связанным',
  gift:'гениальные озарения и независимость',shadow:'хаотичность и разрушение ради встряски'},
 {id:'neptune',glyph:'♆',label:'Нептун',kind:'trans',w:1,
  core:'сострадание, вдохновение и растворение границ',verb:'мечта',need:'слиться с большим, чем ты',
  gift:'тонкое чутьё и художественный дар',shadow:'самообман и уход от реальности'},
 {id:'pluto',glyph:'♇',label:'Плутон',kind:'trans',w:1,
  core:'сила трансформации и работа с глубинной властью',verb:'перерождение',need:'дойти до дна и вернуться',
  gift:'невероятную живучесть и влияние',shadow:'тотальный контроль и одержимость'},
 {id:'node_n',glyph:'☊',label:'Сев. Узел',kind:'karma',w:1,
  core:'вектор развития и непривычная зона роста',verb:'кармическая задача',need:'шагнуть в неизвестное',
  gift:'ощущение «я на своём пути»',shadow:'страх нового и откат в старое'},
 {id:'node_s',glyph:'☋',label:'Юж. Узел',kind:'karma',w:0.5,
  core:'наработанный багаж и привычная опора',verb:'прошлый опыт',need:'опираться на известное',
  gift:'готовые таланты «из коробки»',shadow:'застревание в зоне комфорта'},
 {id:'lilith',glyph:'⚸',label:'Лилит',kind:'karma',w:1,
  core:'теневая сторона, соблазн и вытесненное',verb:'искушение',need:'признать свою тьму',
  gift:'сырую честность и силу тени',shadow:'саморазрушение и манипуляции'},
 {id:'chiron',glyph:'⚷',label:'Хирон',kind:'karma',w:1,
  core:'рана, которая становится даром',verb:'исцеление',need:'принять уязвимость',
  gift:'способность лечить других своим опытом',shadow:'бесконечное ковыряние в боли'},
 {id:'asc',glyph:'🌅',label:'Асцендент',kind:'angle',w:3,
  core:'маска, тело и способ входить в мир',verb:'первое впечатление',need:'быть увиденным так, как хочешь',
  gift:'считываемый образ и точку входа',shadow:'подмену себя ролью'}
]);

/* ----------------------------------------------------------------- ДОМА */
export const HOUSES = F([
 {id:'h1',num:1,glyph:'Ⅰ',label:'1 дом',sign:'aries',sphere:'личности, тела и первого впечатления',arena:'то, как вы входите в любую комнату',focus:'самопредъявление'},
 {id:'h2',num:2,glyph:'Ⅱ',label:'2 дом',sign:'taurus',sphere:'денег, ресурсов и самоценности',arena:'то, что вы считаете своим',focus:'ресурс'},
 {id:'h3',num:3,glyph:'Ⅲ',label:'3 дом',sign:'gemini',sphere:'речи, обучения и ближнего круга',arena:'ежедневный обмен информацией',focus:'связь'},
 {id:'h4',num:4,glyph:'Ⅳ',label:'4 дом',sign:'cancer',sphere:'дома, рода и внутреннего фундамента',arena:'то, куда вы возвращаетесь',focus:'корни'},
 {id:'h5',num:5,glyph:'Ⅴ',label:'5 дом',sign:'leo',sphere:'творчества, романтики и детей',arena:'сцена, игра и удовольствие',focus:'самовыражение'},
 {id:'h6',num:6,glyph:'Ⅵ',label:'6 дом',sign:'virgo',sphere:'рутины, труда и здоровья',arena:'ваш обычный вторник',focus:'режим'},
 {id:'h7',num:7,glyph:'Ⅶ',label:'7 дом',sign:'libra',sphere:'партнёрства, брака и открытых оппонентов',arena:'диалог глаза в глаза',focus:'другой'},
 {id:'h8',num:8,glyph:'Ⅷ',label:'8 дом',sign:'scorpio',sphere:'кризисов, чужих ресурсов и глубин',arena:'то, что меняет вас навсегда',focus:'трансформация'},
 {id:'h9',num:9,glyph:'Ⅸ',label:'9 дом',sign:'sagittarius',sphere:'мировоззрения, дальних дорог и учения',arena:'горизонт и смысл',focus:'вера'},
 {id:'h10',num:10,glyph:'Ⅹ',label:'10 дом',sign:'capricorn',sphere:'карьеры, статуса и общественной вершины',arena:'то, за что вас знают',focus:'достижение'},
 {id:'h11',num:11,glyph:'Ⅺ',label:'11 дом',sign:'aquarius',sphere:'друзей, сообществ и планов на будущее',arena:'ваше племя',focus:'коллектив'},
 {id:'h12',num:12,glyph:'Ⅻ',label:'12 дом',sign:'pisces',sphere:'подсознания, уединения и тайного',arena:'закулисье психики',focus:'растворение'}
]);

export const PLANET_ORDER = F(PLANETS.map(p=>p.id));

const DICT = new Map();
[...SIGNS,...PLANETS,...HOUSES].forEach(e=>DICT.set(e.id,e));
export const getEl = id => DICT.get(id);
export const isSign = id => SIGNS.some(s=>s.id===id);
export const isPlanet = id => PLANETS.some(p=>p.id===id);
export const isHouse = id => HOUSES.some(h=>h.id===id);

/* --------------------------------------------------------- ДОСТОИНСТВА */
const RULER = { sun:['leo'],moon:['cancer'],mercury:['gemini','virgo'],venus:['taurus','libra'],
  mars:['aries','scorpio'],jupiter:['sagittarius','pisces'],saturn:['capricorn','aquarius'],
  uranus:['aquarius'],neptune:['pisces'],pluto:['scorpio'] };
const EXALT = { sun:'aries',moon:'taurus',mercury:'virgo',venus:'pisces',mars:'capricorn',
  jupiter:'cancer',saturn:'libra',uranus:'scorpio',neptune:'leo',pluto:'aquarius' };
const OPP = { aries:'libra',taurus:'scorpio',gemini:'sagittarius',cancer:'capricorn',leo:'aquarius',
  virgo:'pisces',libra:'aries',scorpio:'taurus',sagittarius:'gemini',capricorn:'cancer',
  aquarius:'leo',pisces:'virgo' };

export function dignity(pid, sid){
  const r = RULER[pid]||[];
  if (r.includes(sid)) return {code:'domicile',label:'Обитель',score:2,
    note:'Планета дома: энергия течёт естественно, без перевода и потерь — это ваша врождённая валюта.'};
  if (EXALT[pid]===sid) return {code:'exalt',label:'Экзальтация',score:1.5,
    note:'Планета в гостях у друга: качество проявлено ярко и даже с избытком, важно не переигрывать.'};
  if (r.some(s=>OPP[s]===sid)) return {code:'detriment',label:'Изгнание',score:-1.5,
    note:'Планета работает «через переводчика»: результат достижим, но требует осознанных усилий и обходных стратегий.'};
  if (EXALT[pid] && OPP[EXALT[pid]]===sid) return {code:'fall',label:'Падение',score:-1,
    note:'Зона уязвимости: здесь легко обесценить себя. Именно этот участок карты даёт самый глубокий рост.'};
  return null;
}

/* ============================================================================
 *  ГЕНЕРАТОР ИНТЕРПРЕТАЦИЙ — покрывает ВСЕ комбинации
 * ========================================================================= */
function practice(P,S,H){
  const base = {
    fire:'дайте этой энергии физический выход раньше, чем она превратится в раздражение',
    earth:'переведите намерение в конкретный план с датами — иначе энергия застрянет в теле',
    air:'проговорите или запишите: воздуху нужно оформление в слова, чтобы стать силой',
    water:'выделите время на тишину и чувствование — иначе решение примет за вас эмоция'
  }[S ? S.element : 'air'];
  const where = H ? ` Точка приложения — ${H.sphere}.` : '';
  return `${cap(base)}.${where} Ключевой вопрос дня: «Где сегодня ${P.need}?»`;
}

export function planetInSign(pid,sid){
  const P=getEl(pid), S=getEl(sid), E=ELEMENTS[S.element], M=MODALITIES[S.modality], PL=POLARITIES[S.polarity];
  const d=dignity(pid,sid);
  return [
    `${P.label} ${S.prep}. ${cap(P.core)} проявляется ${S.style}.`,
    `Стихия ${E.label} ${E.icon} добавляет ${E.gift}. ${M.label} крест даёт ${M.gift}. Полярность: ${PL.label} — ${PL.note}.`,
    d ? `⚖️ Достоинство: ${d.label}. ${d.note}` : `⚖️ Нейтральное достоинство: энергия работает ровно, без искажений и без бонусов — всё решает ваша осознанность.`,
    `💪 Сила: ${S.gift} поставлены на службу задаче «${P.need}». Здесь вы даёте миру ${P.gift}.`,
    `🌑 Тень: ${S.risk} усиливает ${P.shadow}. Если давить — получите ${E.risk}.`,
    `🧭 Практика: ${practice(P,S,null)}`
  ].join('\n\n');
}

export function planetInHouse(pid,hid){
  const P=getEl(pid), H=getEl(hid), NS=getEl(H.sign), E=ELEMENTS[NS.element];
  return [
    `${P.label} в ${H.num} доме. ${cap(P.verb)} разворачивается в сфере ${H.sphere}.`,
    `Именно здесь для вас особенно заряжено ${H.arena}. Фокус дома — ${H.focus}; натуральный управитель — ${NS.label} ${NS.glyph}, поэтому тема окрашена стихией ${E.label} ${E.icon}.`,
    `💪 Ресурс: ${cap(P.gift)} вы получаете и отдаёте именно через эту область жизни. Если хотите усилить ${P.need} — заходите через ${H.focus}.`,
    `🌑 Риск: ${cap(P.shadow)} тоже проявится здесь первым делом. Перекос в этом доме = перекос всей карты.`,
    `🧭 Практика: раз в неделю делайте один осознанный шаг в области «${H.focus}» — это самый короткий путь к интеграции ${P.label}.`
  ].join('\n\n');
}

export function signInHouse(sid,hid){
  const S=getEl(sid), H=getEl(hid), E=ELEMENTS[S.element], M=MODALITIES[S.modality];
  return [
    `${S.label} ${S.glyph} на территории ${H.num} дома. Сфера ${H.sphere} проживается ${S.style}.`,
    `Стихия ${E.label} ${E.icon} означает, что здесь вам нужна ${E.need}. ${M.label} крест задаёт ритм: ${M.gift}.`,
    `💪 Сильная сторона: ${S.gift} — ваш естественный инструмент в теме «${H.focus}».`,
    `🌑 Зона роста: ${S.risk}. Если в области ${H.focus} буксует — ищите причину именно здесь.`,
    `🔑 Формула дома: «${S.key} — через ${H.focus}».`
  ].join('\n\n');
}

export function tripleText(pid,sid,hid){
  const P=getEl(pid),S=getEl(sid),H=getEl(hid),E=ELEMENTS[S.element],M=MODALITIES[S.modality];
  const d=dignity(pid,sid);
  const dig = d ? `${d.label.toLowerCase()} (${d.code==='domicile'||d.code==='exalt'?'усиление':'вызов'})` : 'нейтральное положение';
  return [
    `✨ ${P.label} ${S.prep} в ${H.num} доме — законченная формула.`,
    `Что: ${P.core}. Как: ${S.style}. Где: ${H.sphere}.`,
    `Синтез: вы реализуете ${P.verb} в стиле знака ${S.label} на территории «${H.focus}». Достоинство планеты — ${dig}. Стихийный тон — ${E.label} ${E.icon}, ритм — ${M.label.toLowerCase()}.`,
    `💎 Максимум связки: ${S.gift} + ${P.gift} = вы становитесь тем, кто закрывает тему ${H.focus} для себя и для других.`,
    `⚠️ Минимум связки: ${S.risk} накладывается на ${P.shadow} — и тогда ${H.arena} превращается в источник хронического напряжения.`,
    `🧭 Практика: ${practice(P,S,H)}`
  ].join('\n\n');
}

/* ------------------------------------------------- СИНАСТРИЯ (генерация) */
const KIND_RANK = { light:5, personal:4, social:3, trans:2, karma:2, angle:5 };
const HOT = new Set(['venus|mars','mars|venus','venus|pluto','pluto|venus','moon|pluto','sun|moon','moon|sun']);

export function synergyPlanets(a,b){
  const A=getEl(a),B=getEl(b);
  let score = 50 + (KIND_RANK[A.kind]+KIND_RANK[B.kind])*3;
  if (a===b) score += 10;
  if (HOT.has(a+'|'+b)) score += 20;
  if (['saturn','pluto','lilith'].includes(a) || ['saturn','pluto','lilith'].includes(b)) score -= 12;
  if (['jupiter','venus'].includes(a) || ['jupiter','venus'].includes(b)) score += 8;
  score = Math.max(12, Math.min(98, Math.round(score)));
  const tone = score>=75?'Гармония':score>=55?'Рабочий баланс':score>=40?'Напряжение':'Испытание';
  return {score,tone};
}

export function synastryPP(a,b,n1='Партнёр 1',n2='Партнёр 2'){
  const A=getEl(a),B=getEl(b),{score,tone}=synergyPlanets(a,b);
  return [
    `${A.label} ${A.glyph} (${n1}) ↔ ${B.label} ${B.glyph} (${n2}) · ${tone} · ${score}/100`,
    `${n1} приносит в контакт ${A.gift} и требует пространства, где ${A.need}. ${n2} отвечает ${B.gift} и ищет, где ${B.need}.`,
    `Что происходит: ${A.verb} одного встречается с ${B.verb} другого. Пока оба признают потребности друг друга — связка даёт мощный совместный ресурс.`,
    `🌑 Точка срыва: ${A.shadow} у ${n1} провоцирует ${B.shadow} у ${n2}. Это и есть их типовая ссора.`,
    `🧭 Рецепт: договоритесь заранее, кто в этой теме ведёт. Сценарий «${A.label} задаёт импульс — ${B.label} придаёт форму» работает лучше всего.`
  ].join('\n\n');
}

export function synastryPH(a,hid,n1='Партнёр 1',n2='Партнёр 2'){
  const A=getEl(a),H=getEl(hid);
  return [
    `${A.label} ${A.glyph} (${n1}) в ${H.num} доме (${n2}).`,
    `${n1} активирует у ${n2} сферу ${H.sphere}. Для ${n2} эта встреча буквально подсвечивает ${H.arena}.`,
    `💎 Дар: через ${n1} партнёр получает ${A.gift} именно в теме «${H.focus}» — там, где раньше было глухо.`,
    `🌑 Риск: если ${n1} действует из ${A.shadow}, тема ${H.focus} становится полем контроля и обид.`,
    `🧭 Совет для ${n2}: не отдавайте этот дом целиком. Пусть ${n1} будет катализатором, а не хозяином.`
  ].join('\n\n');
}

export function synastryPS(a,sid,n1='Партнёр 1',n2='Партнёр 2'){
  const A=getEl(a),S=getEl(sid),E=ELEMENTS[S.element];
  return [
    `${A.label} ${A.glyph} (${n1}) резонирует со знаком ${S.label} ${S.glyph} (${n2}).`,
    `${n1} проявляет ${A.verb}, а ${n2} принимает это ${S.style}. Стихия ${E.label} ${E.icon} задаёт общий эмоциональный климат контакта.`,
    `💎 Дар: связка даёт ${S.gift} + ${A.gift}.`,
    `🌑 Тень: ${S.risk} встречается с ${A.shadow}.`
  ].join('\n\n');
}

/* --------------------------------------------- АСПЕКТЫ (полное покрытие) */
export const ASPECTS = F([
  {id:'conj',label:'Соединение',glyph:'☌',deg:0,nature:'слияние',tone:'neutral'},
  {id:'sextile',label:'Секстиль',glyph:'⚹',deg:60,nature:'возможность',tone:'good'},
  {id:'square',label:'Квадратура',glyph:'□',deg:90,nature:'конфликт роста',tone:'hard'},
  {id:'trine',label:'Тригон',glyph:'△',deg:120,nature:'дар',tone:'good'},
  {id:'opposition',label:'Оппозиция',glyph:'☍',deg:180,nature:'полярность',tone:'hard'}
]);

export function aspectText(p1,p2,aid){
  const A=getEl(p1),B=getEl(p2),AS=ASPECTS.find(a=>a.id===aid)||ASPECTS[0];
  const dyn = {
    conj:`Две функции сливаются в одну: ${A.verb} невозможно отделить от ${B.verb}. Максимальная концентрация и полная субъективность.`,
    sextile:`Связь мягкая и деятельная: ${A.verb} открывает дверь для ${B.verb}, но дверь надо толкнуть — само не сработает.`,
    square:`Внутренний конфликт: ${A.verb} требует одного, ${B.verb} — прямо противоположного. Именно это трение создаёт характер.`,
    trine:`Готовый дар: ${A.verb} и ${B.verb} поддерживают друг друга без усилий. Опасность одна — не пользоваться, потому что «легко».`,
    opposition:`Маятник: ${A.verb} и ${B.verb} тянут в разные стороны, часто через внешних людей. Задача — не выбрать, а синхронизировать.`
  }[AS.id];
  return [
    `${AS.glyph} ${AS.label} ${A.label}–${B.label} (${AS.deg}°, ${AS.nature}).`,
    dyn,
    `💎 Дар аспекта: ${A.gift} + ${B.gift}.`,
    `🌑 Цена аспекта: ${A.shadow} усиливает ${B.shadow}.`,
    `🧭 Интеграция: дайте каждой функции своё время в сутках. Смешение — источник срыва, чередование — источник силы.`
  ].join('\n\n');
}

/* -------------------------------------------- СОВМЕСТИМОСТЬ ЗНАК × ЗНАК */
const EL_REL = {
  'fire|fire':[82,'Резонанс','Общий градус горения. Быстро зажигаетесь друг от друга — и так же быстро выжигаете кислород.'],
  'fire|air':[90,'Питание','Воздух раздувает огонь. Идея + импульс = самая продуктивная пара стихий.'],
  'fire|earth':[52,'Плавка','Огонь хочет сейчас, земля хочет надёжно. Либо выплавите шедевр, либо обожжётесь друг о друга.'],
  'fire|water':[46,'Пар','Сильная химия и сильный риск: вода гасит, огонь выпаривает. Всё решает бережность.'],
  'earth|earth':[80,'Фундамент','Одинаковый темп и ценности. Скучно не будет только если есть общая большая цель.'],
  'earth|water':[88,'Плодородие','Вода даёт чувство, земля даёт форму. Классика долгих и тёплых союзов.'],
  'earth|air':[50,'Разность частот','Земле нужен результат, воздуху — процесс. Помогает чёткое разделение зон ответственности.'],
  'air|air':[78,'Диалог','Бесконечный интересный разговор. Не хватает заземления — договоритесь о быте заранее.'],
  'air|water':[56,'Туман','Логика встречается с чувством. Нужен общий язык: слова для воды, паузы для воздуха.'],
  'water|water':[84,'Океан','Понимание без слов, общая глубина. Риск — утонуть вдвоём в одном настроении.']
};
function elRel(a,b){ return EL_REL[`${a}|${b}`] || EL_REL[`${b}|${a}`]; }

export function signPairText(s1,s2){
  const A=getEl(s1),B=getEl(s2);
  const [base,title,desc]=elRel(A.element,B.element);
  let score=base;
  if (A.modality===B.modality) score += A.modality==='fixed'?-6:4;
  else score += 5;
  if (A.polarity===B.polarity) score += 2; else score += 4;
  if (s1===s2) score -= 4;
  score = Math.max(20,Math.min(99,Math.round(score)));
  const modNote = A.modality===B.modality
    ? `Оба ${MODALITIES[A.modality].label.toLowerCase()} — один ритм, но и одинаковая слепая зона: ${MODALITIES[A.modality].risk}.`
    : `Разные кресты (${MODALITIES[A.modality].label} и ${MODALITIES[B.modality].label}) — вы компенсируете друг другу ритм: один начинает, другой удерживает или адаптирует.`;
  return {
    score, title,
    text:[
      `${A.glyph} ${A.label} × ${B.glyph} ${B.label} — ${title}. Индекс совместимости: ${score}/100.`,
      `${desc}`,
      modNote,
      `💎 Что даёт союз: ${A.gift} встречается с ${B.gift}.`,
      `🌑 Что рушит союз: ${A.risk} против ${B.risk}.`,
      `🧭 Формула пары: «${A.key}» + «${B.key}». Работает, когда оба произносят обе фразы вслух.`
    ].join('\n\n')
  };
}

/* ============================================================================
 *  АНАЛИТИКА КАРТ (стихии, кресты, полярности, полусферы)
 * ========================================================================= */
const W = Object.fromEntries(PLANETS.map(p=>[p.id,p.w]));

export function chartStats(placements=[]){
  const el={fire:0,earth:0,air:0,water:0};
  const mod={cardinal:0,fixed:0,mutable:0};
  const pol={yang:0,yin:0};
  const quad={q1:0,q2:0,q3:0,q4:0};
  const hemi={north:0,south:0,east:0,west:0};
  let total=0;
  placements.forEach(p=>{
    const w = W[p.planetId] ?? 1;
    const S = p.signId && getEl(p.signId);
    if (S){ el[S.element]+=w; mod[S.modality]+=w; pol[S.polarity]+=w; total+=w; }
    const H = p.houseId && getEl(p.houseId);
    if (H){
      const n=H.num;
      if(n<=3)quad.q1+=w; else if(n<=6)quad.q2+=w; else if(n<=9)quad.q3+=w; else quad.q4+=w;
      if(n<=6)hemi.north+=w; else hemi.south+=w;
      if(n<=3||n>=10)hemi.east+=w; else hemi.west+=w;
    }
  });
  const pct=o=>{const s=Object.values(o).reduce((a,b)=>a+b,0)||1;
    return Object.fromEntries(Object.entries(o).map(([k,v])=>[k,Math.round(v/s*100)]));};
  const eP=pct(el), mP=pct(mod), pP=pct(pol);
  const dominant = Object.entries(eP).sort((a,b)=>b[1]-a[1])[0];
  const missing = Object.entries(eP).filter(([,v])=>v<=8).map(([k])=>k);
  return {
    count: placements.length, weight: Math.round(total*10)/10,
    elements:eP, modalities:mP, polarity:pP, quadrants:pct(quad), hemispheres:pct(hemi),
    dominantElement: dominant?dominant[0]:null, dominantPct: dominant?dominant[1]:0, missingElements: missing,
    raw:{el,mod,pol}
  };
}

export function combineStats(charts=[]){
  return chartStats(charts.flat());
}

export function statsNarrative(st){
  if(!st.count) return 'Карта пуста — добавьте хотя бы одну связку «Планета + Знак + Дом», чтобы включить аналитику.';
  const d=ELEMENTS[st.dominantElement];
  const out=[];
  out.push(`Доминирующая стихия — ${d.label} ${d.icon} (${st.dominantPct}%). Она даёт ${d.gift}, но требует следить за тем, чтобы не включилось ${d.risk}.`);
  if(st.missingElements.length){
    const names=st.missingElements.map(k=>`${ELEMENTS[k].label} ${ELEMENTS[k].icon}`).join(', ');
    out.push(`Дефицит: ${names}. Эти качества придётся добирать осознанно — часто через партнёров и близких, у которых этой стихии в избытке.`);
  } else out.push('Стихии распределены относительно ровно — редкая и очень устойчивая конфигурация.');
  const m=Object.entries(st.modalities).sort((a,b)=>b[1]-a[1])[0];
  out.push(`Ведущий крест — ${MODALITIES[m[0]].label} (${m[1]}%): ${MODALITIES[m[0]].gift}.`);
  out.push(st.polarity.yang>=st.polarity.yin
    ? `Перевес Ян (${st.polarity.yang}%): проще действовать, чем ждать. Восстановление требует отдельной дисциплины.`
    : `Перевес Инь (${st.polarity.yin}%): сила в накоплении и чувствовании. Старт даётся труднее, зато глубина максимальная.`);
  if(st.hemispheres.north||st.hemispheres.south){
    out.push(st.hemispheres.north>=st.hemispheres.south
      ? `Акцент на нижней полусфере (${st.hemispheres.north}%): жизнь строится изнутри — семья, личное, фундамент.`
      : `Акцент на верхней полусфере (${st.hemispheres.south}%): жизнь строится через социум — карьера, публичность, партнёрство.`);
  }
  return out.join('\n\n');
}

export function synergyCharts(A=[],B=[]){
  const sa=chartStats(A), sb=chartStats(B);
  const notes=[]; let score=50;
  if(sa.dominantElement && sb.dominantElement){
    const rel=elRel(sa.dominantElement,sb.dominantElement);
    score = rel[0];
    notes.push({icon:'🜂',title:`Стихийный контакт: ${rel[1]}`,text:rel[2]});
  }
  // общие знаки
  const sameSign=[];
  A.forEach(a=>B.forEach(b=>{ if(a.signId&&a.signId===b.signId) sameSign.push(`${getEl(a.planetId).label}/${getEl(b.planetId).label} ${getEl(a.signId).prep}`); }));
  if(sameSign.length){ score+=Math.min(15,sameSign.length*3);
    notes.push({icon:'🔗',title:'Общие знаки',text:`Совпадения: ${[...new Set(sameSign)].join('; ')}. Это зоны, где вы понимаете друг друга без объяснений.`}); }
  // одинаковые дома
  const sameHouse=[];
  A.forEach(a=>B.forEach(b=>{ if(a.houseId&&a.houseId===b.houseId) sameHouse.push(getEl(a.houseId).label); }));
  if(sameHouse.length){ score+=Math.min(10,[...new Set(sameHouse)].length*2);
    notes.push({icon:'🏠',title:'Общие сферы жизни',text:`Пересечения в домах: ${[...new Set(sameHouse)].join(', ')}. Здесь вы будете либо командой, либо конкурентами.`}); }
  // компенсация дефицитов
  const comp = sa.missingElements.filter(e=>sb.elements[e]>=25);
  if(comp.length){ score+=8;
    notes.push({icon:'⚖️',title:'Взаимная компенсация',text:`Партнёр 2 закрывает дефицит стихий: ${comp.map(c=>ELEMENTS[c].label).join(', ')}. Это классический «магнит недостающего».`}); }
  const comp2 = sb.missingElements.filter(e=>sa.elements[e]>=25);
  if(comp2.length){ score+=8;
    notes.push({icon:'⚖️',title:'Обратная компенсация',text:`Партнёр 1 закрывает дефицит стихий: ${comp2.map(c=>ELEMENTS[c].label).join(', ')}.`}); }
  score=Math.max(15,Math.min(99,Math.round(score)));
  return {score, notes, statsA:sa, statsB:sb};
}

/* ============================================================================
 *  ТАРО — 78 карт (22 старших + генерация 56 младших)
 * ========================================================================= */
export const MAJORS = F([
 {n:0,name:'Шут',up:'Чистый старт, прыжок в неизвестность, доверие пути.',rev:'Безрассудство, побег от ответственности, наивность.',key:'начало'},
 {n:1,name:'Маг',up:'Воля, ресурс под рукой, способность проявить задуманное.',rev:'Манипуляция, распыление силы, самообман.',key:'воля'},
 {n:2,name:'Верховная Жрица',up:'Интуиция, тайна, знание, которое ещё нельзя озвучить.',rev:'Игнор внутреннего голоса, скрытность, отстранённость.',key:'тайна'},
 {n:3,name:'Императрица',up:'Плодородие, забота, изобилие, телесное удовольствие.',rev:'Гиперопека, застой, зависимость от комфорта.',key:'изобилие'},
 {n:4,name:'Император',up:'Структура, власть, порядок, защита границ.',rev:'Тирания, ригидность, борьба с авторитетами.',key:'порядок'},
 {n:5,name:'Иерофант',up:'Традиция, учитель, система, посвящение.',rev:'Догма, бунт против правил, формализм.',key:'традиция'},
 {n:6,name:'Влюблённые',up:'Выбор сердцем, союз, ценностное решение.',rev:'Сомнение, дисбаланс, выбор из страха.',key:'выбор'},
 {n:7,name:'Колесница',up:'Движение, победа через волю, контроль над стихиями.',rev:'Буксование, разнонаправленность сил.',key:'движение'},
 {n:8,name:'Сила',up:'Мягкая власть, укрощение инстинкта, внутренняя стойкость.',rev:'Срыв, слабость, подавленная агрессия.',key:'стойкость'},
 {n:9,name:'Отшельник',up:'Уединение, поиск смысла, внутренний свет.',rev:'Изоляция, страх людей, затянувшаяся пауза.',key:'поиск'},
 {n:10,name:'Колесо Фортуны',up:'Поворот судьбы, шанс, смена цикла.',rev:'Сопротивление переменам, полоса невезения.',key:'цикл'},
 {n:11,name:'Справедливость',up:'Баланс, причина и следствие, честный расчёт.',rev:'Предвзятость, уход от ответственности.',key:'баланс'},
 {n:12,name:'Повешенный',up:'Пауза, смена угла зрения, осознанная жертва.',rev:'Бессмысленное самопожертвование, застревание.',key:'пауза'},
 {n:13,name:'Смерть',up:'Финал ради начала, необратимая трансформация.',rev:'Цепляние за отжившее, затянутый конец.',key:'финал'},
 {n:14,name:'Умеренность',up:'Алхимия, дозировка, исцеление через баланс.',rev:'Крайности, спешка, несовместимые смеси.',key:'мера'},
 {n:15,name:'Дьявол',up:'Страсть, привязка, материя, честный взгляд на тень.',rev:'Разрыв цепей, освобождение от зависимости.',key:'привязка'},
 {n:16,name:'Башня',up:'Обрушение ложной конструкции, освобождающий взрыв.',rev:'Отложенный кризис, внутренний слом без выхода.',key:'слом'},
 {n:17,name:'Звезда',up:'Надежда, вдохновение, исцеление, ясный ориентир.',rev:'Утрата веры, разочарование, тусклость.',key:'надежда'},
 {n:18,name:'Луна',up:'Иллюзии, сны, подсознание, путь наощупь.',rev:'Прояснение тумана, выход страха на свет.',key:'туман'},
 {n:19,name:'Солнце',up:'Радость, успех, ясность, признание.',rev:'Отложенная радость, показной успех.',key:'свет'},
 {n:20,name:'Суд',up:'Пробуждение, переоценка, зов предназначения.',rev:'Самоосуждение, глухота к зову.',key:'пробуждение'},
 {n:21,name:'Мир',up:'Завершение цикла, целостность, признанный результат.',rev:'Недоделанное дело, финал без точки.',key:'целостность'}
]);

const SUITS = F({
  wands:{label:'Жезлы',gen:'Жезлов',el:'fire',theme:'воля, творчество, действие и рост'},
  cups:{label:'Кубки',gen:'Кубков',el:'water',theme:'чувства, отношения, интуиция'},
  swords:{label:'Мечи',gen:'Мечей',el:'air',theme:'мысли, слова, конфликты и истина'},
  pentacles:{label:'Пентакли',gen:'Пентаклей',el:'earth',theme:'деньги, тело, ремесло и материя'}
});
const RANKS = F([
  {n:1,label:'Туз',up:'чистое семя новой энергии, предложение от судьбы',rev:'упущенный шанс, энергия без применения'},
  {n:2,label:'Двойка',up:'выбор и баланс двух вариантов',rev:'нерешительность, перекос'},
  {n:3,label:'Тройка',up:'первый видимый результат и рост',rev:'задержка, преждевременные выводы'},
  {n:4,label:'Четвёрка',up:'стабилизация, укрепление достигнутого',rev:'застой, скупость, консервация'},
  {n:5,label:'Пятёрка',up:'кризис, испытание и потеря части',rev:'выход из кризиса, примирение'},
  {n:6,label:'Шестёрка',up:'гармонизация, помощь, движение дальше',rev:'откат, зависимость от помощи'},
  {n:7,label:'Семёрка',up:'проверка на прочность и выбор стратегии',rev:'иллюзии, сдача позиций'},
  {n:8,label:'Восьмёрка',up:'мастерство, ускорение и концентрация усилий',rev:'суета, перегруз, топтание'},
  {n:9,label:'Девятка',up:'почти финал: плоды, но и цена усилий',rev:'усталость, страх перед финалом'},
  {n:10,label:'Десятка',up:'полное завершение цикла со всеми последствиями',rev:'перегруз, затянутый финал'},
  {n:11,label:'Паж',up:'ученик: новость, любопытство, первый опыт',rev:'незрелость, пустые разговоры'},
  {n:12,label:'Рыцарь',up:'воин: стремительное действие в этой сфере',rev:'спешка или, наоборот, ступор'},
  {n:13,label:'Королева',up:'зрелое женское владение темой изнутри',rev:'эмоциональный перекос, контроль'},
  {n:14,label:'Король',up:'зрелое мужское владение темой снаружи',rev:'авторитарность, отрыв от реальности'}
]);

export const TAROT = (()=>{
  const deck=[];
  MAJORS.forEach(m=>deck.push({
    id:'maj_'+m.n, arcana:'major', name:`${m.n}. ${m.name}`, short:m.name, num:m.n,
    up:m.up, rev:m.rev, key:m.key, element:null,
    glyph:['🃏','🪄','🌙','👑','🏛️','📜','💞','🏇','🦁','🕯️','🎡','⚖️','🙃','💀','🏺','😈','🗼','⭐','🌗','☀️','📯','🌍'][m.n]
  }));
  Object.entries(SUITS).forEach(([sid,S])=>{
    RANKS.forEach(R=>deck.push({
      id:`${sid}_${R.n}`, arcana:'minor', suit:sid, num:R.n,
      name:`${R.label} ${S.gen}`, short:`${R.label} ${S.gen}`,
      element:S.el, key:S.theme,
      glyph:{wands:'🔥',cups:'💧',swords:'🌬️',pentacles:'🪙'}[sid],
      up:`${cap(R.up)} в сфере «${S.theme}». Стихия ${ELEMENTS[S.el].label} ${ELEMENTS[S.el].icon} говорит: здесь важна ${ELEMENTS[S.el].need}.`,
      rev:`${cap(R.rev)} — тема «${S.theme}» заблокирована или переигрывается.`
    }));
  });
  return F(deck);
})();

export const SPREADS = F([
  {id:'day',name:'Карта дня',icon:'🌅',count:1,positions:['Энергия дня']},
  {id:'ppf',name:'Прошлое · Настоящее · Будущее',icon:'⏳',count:3,positions:['Прошлое','Настоящее','Будущее']},
  {id:'yesno',name:'Да / Нет',icon:'🎯',count:1,positions:['Ответ']},
  {id:'love',name:'Расклад на отношения',icon:'💞',count:5,positions:['Вы','Партнёр','Что вас связывает','Препятствие','Перспектива']},
  {id:'horseshoe',name:'Подкова',icon:'🧲',count:7,positions:['Прошлое','Настоящее','Скрытое','Препятствие','Окружение','Совет','Итог']},
  {id:'celtic',name:'Кельтский крест',icon:'✝️',count:10,positions:['Суть','Вызов','Основа','Прошлое','Цель','Ближайшее будущее','Вы сами','Окружение','Надежды и страхи','Итог']},
  {id:'choice',name:'Выбор из двух',icon:'🔀',count:5,positions:['Ситуация','Вариант А','Итог А','Вариант Б','Итог Б']},
  {id:'money',name:'Финансовый поток',icon:'💰',count:4,positions:['Текущий ресурс','Что блокирует','Где источник','Шаг к росту']}
]);

/* seeded PRNG */
export function mulberry32(a){ return function(){ a|=0;a=a+0x6D2B79F5|0;
  let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return ((t^t>>>14)>>>0)/4294967296; }; }
export const seedFrom = str => { let h=2166136261; for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619);} return h>>>0; };

export function drawSpread(spreadId, seedStr){
  const sp = SPREADS.find(s=>s.id===spreadId) || SPREADS[0];
  const rnd = mulberry32(seedFrom(seedStr));
  const pool=[...TAROT]; const out=[];
  for(let i=0;i<sp.count;i++){
    const idx = Math.floor(rnd()*pool.length);
    const card = pool.splice(idx,1)[0];
    out.push({ position: sp.positions[i], card, reversed: rnd()<0.32 });
  }
  return {spread:sp, cards:out};
}

/* ============================================================================
 *  АСТРОНОМИЯ (упрощённая, но корректная для бытовых прогнозов)
 * ========================================================================= */
const RAD=Math.PI/180;
const daysSinceJ2000 = d => (d.getTime()/86400000) + 10957.5;

export function sunLongitude(date){
  const n=daysSinceJ2000(date);
  const L=(280.46+0.9856474*n)%360;
  const g=(357.528+0.9856003*n)%360;
  return ((L+1.915*Math.sin(g*RAD)+0.02*Math.sin(2*g*RAD))%360+360)%360;
}
export function moonLongitude(date){
  const n=daysSinceJ2000(date);
  const L=218.316+13.176396*n, M=134.963+13.064993*n, D=297.85+12.190749*n;
  return (((L+6.289*Math.sin(M*RAD)+1.274*Math.sin((2*D-M)*RAD)+0.658*Math.sin(2*D*RAD))%360)+360)%360;
}
export const signByLongitude = lon => SIGNS[Math.floor((((lon%360)+360)%360)/30)];
export function sunSignByDate(date){ return signByLongitude(sunLongitude(date)); }

export function moonPhase(date){
  const syn=29.530588853;
  const days=(date.getTime()-Date.UTC(2000,0,6,18,14))/86400000;
  const age=((days%syn)+syn)%syn;
  const idx=Math.floor(age/syn*8+0.5)%8;
  const names=[['Новолуние','🌑','Точка старта. Загадывайте и закладывайте, не требуйте результата.'],
   ['Растущий серп','🌒','Первый импульс. Делайте маленький конкретный шаг.'],
   ['Первая четверть','🌓','Сопротивление среды. Продавливайте решение.'],
   ['Растущая Луна','🌔','Набор массы. Максимум активности и контактов.'],
   ['Полнолуние','🌕','Пик и обнажение правды. Не начинайте нового — завершайте.'],
   ['Убывающая Луна','🌖','Сбор урожая и благодарность. Делитесь результатом.'],
   ['Последняя четверть','🌗','Ревизия и отсечение лишнего.'],
   ['Старая Луна','🌘','Отдых, очищение, подготовка к новому циклу.']];
  const lunarDay = Math.floor(age)+1;
  return {age:Math.round(age*10)/10, lunarDay, name:names[idx][0], icon:names[idx][1], advice:names[idx][2],
          sign:signByLongitude(moonLongitude(date))};
}

const MERCURY_RX = [
  ['2024-04-01','2024-04-25'],['2024-08-05','2024-08-28'],['2024-11-26','2024-12-15'],
  ['2025-03-15','2025-04-07'],['2025-07-18','2025-08-11'],['2025-11-09','2025-11-29'],
  ['2026-02-26','2026-03-20'],['2026-06-29','2026-07-23'],['2026-10-24','2026-11-13'],
  ['2027-02-09','2027-03-03'],['2027-06-10','2027-07-04'],['2027-10-07','2027-10-28']
];
export function mercuryRetro(date){
  const t=date.getTime();
  return MERCURY_RX.some(([a,b])=>t>=Date.parse(a)&&t<=Date.parse(b+'T23:59:59'));
}

export function transitsOf(date){
  const sun=signByLongitude(sunLongitude(date));
  const mp=moonPhase(date);
  return {
    date, sunSign:sun, moonSign:mp.sign, moon:mp, mercuryRx:mercuryRetro(date),
    text:[
      `☉ Солнце ${sun.prep} — общий фон периода: ${sun.style}.`,
      `☽ Луна ${mp.sign.prep}, ${mp.icon} ${mp.name} (${mp.lunarDay} лунный день). ${mp.advice}`,
      `Эмоциональный запрос дня: ${ELEMENTS[mp.sign.element].need}.`,
      mercuryRetro(date)
        ? '☿ Меркурий ретроградный: перепроверяйте договорённости, не подписывайте вслепую, возвращайтесь к отложенному.'
        : '☿ Меркурий директный: хорошее время для переговоров, запусков и новых договорённостей.'
    ].join('\n\n')
  };
}

/* ------------------------------------------------- ЕЖЕДНЕВНЫЙ ГОРОСКОП */
const DAY_TOPICS=['карьера и статус','деньги и ресурсы','отношения','здоровье и режим','творчество','обучение и поездки','дом и семья','внутренняя работа'];
const DAY_ADVICE=['не торопите события — сегодня выигрывает терпение','скажите вслух то, что откладывали','сделайте одно дело до конца, остальное отложите',
 'дайте телу нагрузку — голова прояснится следом','откажитесь от одного лишнего обязательства','послушайте того, кто младше или проще вас',
 'проверьте цифры и детали дважды','позвольте себе удовольствие без чувства вины'];
export function dailyHoroscope(signId,date=new Date()){
  const S=getEl(signId), E=ELEMENTS[S.element];
  const key=`${signId}|${date.toDateString()}`;
  const r=mulberry32(seedFrom(key));
  const topic=DAY_TOPICS[Math.floor(r()*DAY_TOPICS.length)];
  const adv=DAY_ADVICE[Math.floor(r()*DAY_ADVICE.length)];
  const energy=55+Math.floor(r()*45);
  const love=40+Math.floor(r()*60);
  const money=40+Math.floor(r()*60);
  const tr=transitsOf(date);
  return {
    energy,love,money,
    text:[
      `${S.glyph} ${S.label}. Главная тема дня — ${topic}.`,
      `${cap(E.label)} ${E.icon} внутри вас сегодня требует ${E.need}. ${cap(S.style)} — именно так вы сработаете эффективнее всего.`,
      `Фон неба: Луна ${tr.moonSign.prep}, ${tr.moon.name.toLowerCase()}. ${tr.moon.advice}`,
      `🧭 Совет: ${adv}.`,
      `⚠️ Не включайте сегодня: ${S.risk}.`
    ].join('\n\n')
  };
}

/* ============================================================================
 *  НУМЕРОЛОГИЯ / МАТРИЦА СУДЬБЫ / БИОРИТМЫ
 * ========================================================================= */
const digitSum = n => String(n).split('').reduce((a,b)=>a+ +b,0);
const reduceTo = (n,max=22)=>{ while(n>max) n=digitSum(n); return n; };
const reduce9 = n => { while(n>9 && n!==11 && n!==22) n=digitSum(n); return n; };

const NUM_MEANING = {
 1:'Лидер. Задача — научиться начинать и отвечать за свой выбор.',
 2:'Дипломат. Сила в партнёрстве, чувствительности и умении соединять.',
 3:'Творец и коммуникатор. Через самовыражение приходит и радость, и доход.',
 4:'Строитель. Порядок, дисциплина и надёжный фундамент — ваша валюта.',
 5:'Исследователь. Свобода, движение, риск и постоянное расширение опыта.',
 6:'Хранитель. Ответственность за близких, красота, гармония и служение.',
 7:'Аналитик-мистик. Глубина, уединение, поиск истины за очевидным.',
 8:'Управленец. Деньги, власть, масштаб и карма справедливого обмена.',
 9:'Гуманист. Завершение циклов, милосердие, отдача большему целому.',
 11:'Мастер-число интуиции. Повышенная чувствительность и роль проводника.',
 22:'Мастер-число строителя. Способность воплощать великое в материи.'
};

export function numerology(birth){
  const d=new Date(birth);
  const D=d.getDate(),M=d.getMonth()+1,Y=d.getFullYear();
  const life=reduce9(digitSum(D)+digitSum(M)+digitSum(Y));
  const soul=reduce9(D);
  const now=new Date();
  const personalYear=reduce9(digitSum(D)+digitSum(M)+digitSum(now.getFullYear()));
  return {
    lifePath:life, lifePathText:NUM_MEANING[life]||NUM_MEANING[reduce9(life)],
    dayNumber:soul, dayText:NUM_MEANING[soul]||'',
    personalYear, yearText:[
      'Год посева: начинайте, даже если страшно.','Год партнёрства и терпения — результаты зреют.',
      'Год творчества, связей и заметности.','Год труда и структуры: стройте фундамент.',
      'Год перемен, поездок и свободы.','Год семьи, обязательств и красоты.',
      'Год внутренней работы и обучения.','Год денег, власти и крупных решений.',
      'Год завершений: отпускайте всё отжившее.'][ (personalYear>9?reduce9(personalYear):personalYear) -1 ] || ''
  };
}

export function matrixOfDestiny(birth){
  const d=new Date(birth);
  const D=d.getDate(),M=d.getMonth()+1,Y=d.getFullYear();
  const A=reduceTo(D), B=reduceTo(M), C=reduceTo(digitSum(Y)+digitSum(Y)>22?digitSum(digitSum(Y)):digitSum(Y));
  const Cc=reduceTo(digitSum(Y));
  const Dd=reduceTo(A+B+Cc);
  const E=reduceTo(A+B+Cc+Dd);
  const sky=reduceTo(A+B), earth=reduceTo(Cc+Dd), love=reduceTo(E+Dd), money=reduceTo(E+Cc);
  const arc = n => { const m=MAJORS[(n-1+22)%22] || MAJORS[0]; return m; };
  const wrap = (title,n,note)=>({title,num:n,arcana:arc(n).name,text:`${arc(n).up} ${note}`});
  return [
    wrap('Портрет личности',A,'Это ваш базовый характер и то, как вас считывают.'),
    wrap('Талант и ресурс',B,'Дар, который включается сам, если им пользоваться.'),
    wrap('Кармический хвост',Cc,'Наработка прошлого: опора, но не место жительства.'),
    wrap('Предназначение',Dd,'Главная ось жизни — здесь ваши основные уроки и смысл.'),
    wrap('Зона комфорта / сердце',E,'Через это вы восстанавливаетесь и отдаёте любовь.'),
    wrap('Линия Неба (духовное)',sky,'Что приходит свыше и через род по мужской линии.'),
    wrap('Линия Земли (материальное)',earth,'Как вы обращаетесь с материей и телом.'),
    wrap('Канал любви',love,'Сценарий отношений и то, что вам нужно проработать в паре.'),
    wrap('Канал денег',money,'Через что к вам приходит финансовый поток.')
  ];
}

export function biorhythms(birth,date=new Date()){
  const days=Math.floor((date-new Date(birth))/86400000);
  const calc=(p)=>Math.round(Math.sin(2*Math.PI*days/p)*100);
  return { days, physical:calc(23), emotional:calc(28), intellectual:calc(33), intuitive:calc(38) };
}

/* ============================================================================
 *  АВТОРСКИЕ (КУРИРОВАННЫЕ) ТЕКСТЫ — имеют приоритет над генерацией
 * ========================================================================= */
export const CURATED = F({
 'sun':'Солнце: Эго, искра Творца, ядро личности. Это наше истинное «Я», сознательные намерения, жизненная энергия и творческий потенциал.',
 'moon':'Луна: Душа, подсознание, эмоции и инстинкты. Управляет зоной комфорта, базовым чувством безопасности, привычками и образом матери.',
 'mercury':'Меркурий: Интеллект, мышление, логика и коммуникация. Как мы усваиваем информацию, говорим, пишем, учимся, торгуем.',
 'venus':'Венера: Любовь, красота, гармония и эстетика. Формирует вкус, отношение к деньгам и то, как мы выбираем партнёров.',
 'mars':'Марс: Действие, агрессия, страсть и воля. Внутренний воин, инициатива, сексуальная энергия, защита границ.',
 'jupiter':'Юпитер: Великий благодетель. Расширение, удача, философия, высшее образование, мораль и социальный успех.',
 'saturn':'Сатурн: Владыка кармы и времени. Дисциплина, ограничения, ответственность и внутренний стержень.',
 'uranus':'Уран: Бунт, инновации, гениальность и внезапные перемены. Требует абсолютной свободы.',
 'neptune':'Нептун: Океан бессознательного, иллюзии, мечты, интуиция, мистика и безусловная любовь.',
 'pluto':'Плутон: Трансформация, власть, кризисы, смерть и возрождение.',
 'node_n':'Северный Узел (Раху): Кармическая задача воплощения. Новый опыт, который пугает, но необходим.',
 'node_s':'Южный Узел (Кету): Багаж прошлых жизней. Опираться можно, оставаться нельзя.',
 'asc':'Асцендент: Социальная маска, внешность, конституция тела и первое впечатление.',
 'lilith':'Лилит (Чёрная Луна): Тёмная сторона бессознательного, искушения и «слепое пятно» психики.',
 'chiron':'Хирон: «Раненый целитель». Точка глубочайшей уязвимости, через которую приходит уникальный дар.',

 'aries':'Овен ♈: Кардинальный Огонь (Марс). Импульсивность, инициатива, бесстрашие, лидерство. Минусы: агрессия, нетерпеливость.',
 'taurus':'Телец ♉: Фиксированная Земля (Венера). Упорство, практичность, комфорт. Минусы: упрямство, лень.',
 'gemini':'Близнецы ♊: Мутабельный Воздух (Меркурий). Любознательность, общительность. Минусы: поверхностность.',
 'cancer':'Рак ♋: Кардинальная Вода (Луна). Чувствительность, эмпатия, семья. Минусы: обидчивость.',
 'leo':'Лев ♌: Фиксированный Огонь (Солнце). Яркость, харизма, щедрость. Минусы: тщеславие.',
 'virgo':'Дева ♍: Мутабельная Земля (Меркурий). Анализ, детали, трудолюбие. Минусы: критиканство.',
 'libra':'Весы ♎: Кардинальный Воздух (Венера). Дипломатия, гармония. Минусы: нерешительность.',
 'scorpio':'Скорпион ♏: Фиксированная Вода (Плутон). Страсть, магнетизм. Минусы: ревность.',
 'sagittarius':'Стрелец ♐: Мутабельный Огонь (Юпитер). Оптимизм, свобода. Минусы: фанатизм.',
 'capricorn':'Козерог ♑: Кардинальная Земля (Сатурн). Дисциплина, карьера. Минусы: холодность.',
 'aquarius':'Водолей ♒: Фиксированный Воздух (Уран). Независимость, гуманизм. Минусы: отстранённость.',
 'pisces':'Рыбы ♓: Мутабельная Вода (Нептун). Эмпатия, мистицизм. Минусы: иллюзии.',

 'h1':'1 дом: внешность, имидж, тело, «Я», личная инициатива.',
 'h2':'2 дом: личные финансы, ценности, врождённые таланты.',
 'h3':'3 дом: общение, братья/сёстры, короткие поездки, обучение.',
 'h4':'4 дом: род, родители, дом, недвижимость, фундамент личности.',
 'h5':'5 дом: романтика, дети, хобби, сцена, азарт.',
 'h6':'6 дом: рутина, работа по найму, здоровье, питомцы.',
 'h7':'7 дом: брак, партнёры, договоры, открытые враги.',
 'h8':'8 дом: чужие деньги, секс, оккультизм, кризисы.',
 'h9':'9 дом: высшее образование, дальние путешествия, религия.',
 'h10':'10 дом: статус, амбиции, слава, руководство.',
 'h11':'11 дом: друзья, единомышленники, планы на будущее.',
 'h12':'12 дом: подсознание, страхи, уединение, эзотерика.',

 'sun_aries':'Солнце в Овне: Яркий лидер, первопроходец. Действует быстро, напористо. Вспыльчив, отходчив.',
 'sun_taurus':'Солнце в Тельце: Созидатель. Ценит стабильность и комфорт, доводит начатое до конца.',
 'sun_gemini':'Солнце в Близнецах: Коммуникатор, интеллектуал, делает несколько дел одновременно.',
 'sun_cancer':'Солнце в Раке: Хранитель. Эмоциональный, заботливый, мощная интуиция.',
 'sun_leo':'Солнце во Льве (обитель): Рождён блистать. Щедрый, гордый, нуждается в признании.',
 'sun_virgo':'Солнце в Деве: Аналитик. Практичный, внимателен к деталям, стремится к порядку.',
 'sun_libra':'Солнце в Весах (падение): Дипломат, эстет, избегает конфликтов, нуждается в партнёре.',
 'sun_scorpio':'Солнце в Скорпионе: Трансформатор. Бесстрашен, вынослив, обожает преодолевать кризисы.',
 'sun_sagittarius':'Солнце в Стрельце: Учитель, оптимист, философ, путешественник.',
 'sun_capricorn':'Солнце в Козероге: Стратег. Амбициозен, готов упорно трудиться ради статуса.',
 'sun_aquarius':'Солнце в Водолее (изгнание): Бунтарь, чудаковатый гений, не терпит рамок.',
 'sun_pisces':'Солнце в Рыбах: Мистик, эмпат, склонен к идеализации.',

 'moon_aries':'Луна в Овне: Эмоции вспыхивают как порох. Успокаивается через физическую нагрузку.',
 'moon_taurus':'Луна в Тельце (экзальтация): Потребность в комфорте, эмоции максимально стабильны.',
 'moon_gemini':'Луна в Близнецах: Комфорт через общение и информацию, рационализирует чувства.',
 'moon_cancer':'Луна в Раке (обитель): Невероятная чувствительность и эмпатия, важен уютный дом.',
 'moon_leo':'Луна во Льве: Потребность во внимании и похвале, в душе — щедрый ребёнок.',
 'moon_virgo':'Луна в Деве: Расслабляется, когда всё распланировано. Заботу проявляет делами.',
 'moon_libra':'Луна в Весах: Потребность в гармонии и партнёрстве, не переносит одиночества.',
 'moon_scorpio':'Луна в Скорпионе (падение): Потребность в интенсивных переживаниях и контроле.',
 'moon_sagittarius':'Луна в Стрельце: Расслабляется в путешествиях и философских спорах.',
 'moon_capricorn':'Луна в Козероге (изгнание): Блок на эмоции, безопасность через работу.',
 'moon_aquarius':'Луна в Водолее: Эмоциональная независимость, боится поглощения.',
 'moon_pisces':'Луна в Рыбах: Бездонный океан эмпатии, впитывает чужие эмоции.',

 'venus_aries':'Венера в Овне (изгнание): Любовь как завоевание. Страсть мгновенна, но быстро остывает.',
 'venus_taurus':'Венера в Тельце (обитель): Гедонизм, тактильность, преданность.',
 'venus_gemini':'Венера в Близнецах: Любовь как беседа, флирт, ценит свободу.',
 'venus_cancer':'Венера в Раке: Любовь как забота и слияние, ранимая и привязчивая.',
 'venus_leo':'Венера во Льве: Любовь как королевский приём, требует восхищения.',
 'venus_virgo':'Венера в Деве (падение): Любовь как служение и расчёт, придирчива.',
 'venus_libra':'Венера в Весах (обитель): Любовь как искусство, ценит эстетику и манеры.',
 'venus_scorpio':'Венера в Скорпионе (изгнание): Любовь как трансформация, ревнива.',
 'venus_sagittarius':'Венера в Стрельце: Любовь как приключение, партнёр-учитель или иностранец.',
 'venus_capricorn':'Венера в Козероге: Любовь как контракт, выбирает по статусу и надёжности.',
 'venus_aquarius':'Венера в Водолее: Любовь как дружба, свободные отношения без рамок.',
 'venus_pisces':'Венера в Рыбах (экзальтация): Абсолютная, жертвенная любовь, всепрощение.',

 'mars_aries':'Марс в Овне (обитель): Действует здесь и сейчас, взрывной и смелый спринтер.',
 'mars_taurus':'Марс в Тельце (изгнание): Разгоняется медленно, но упорно тянет до конца.',
 'mars_gemini':'Марс в Близнецах: Оружие — слово, действует хаотично.',
 'mars_cancer':'Марс в Раке (падение): Действует из эмоций, пассивная агрессия.',
 'mars_leo':'Марс во Льве: Действует красиво, на публику, благородная воля.',
 'mars_virgo':'Марс в Деве: Действует методично, агрессия уходит в критику.',
 'mars_libra':'Марс в Весах (изгнание): Сложно решиться действовать в одиночку.',
 'mars_scorpio':'Марс в Скорпионе (обитель): Скрытый тактик, один точный удар.',
 'mars_sagittarius':'Марс в Стрельце: Действует за идею и справедливость.',
 'mars_capricorn':'Марс в Козероге (экзальтация): Ледяной танк, идёт к цели годами.',
 'mars_aquarius':'Марс в Водолее: Действует нестандартно и внезапно, ради идеи.',
 'mars_pisces':'Марс в Рыбах: Действует по наитию, предпочитает тайные операции.',

 'mercury_gemini':'Меркурий в Близнецах (обитель): Гений коммуникации, схватывает на лету.',
 'mercury_virgo':'Меркурий в Деве (обитель и экзальтация): Эталон логики и внимания к деталям.',
 'mercury_sagittarius':'Меркурий в Стрельце (изгнание): Мыслит масштабно, страдают детали.',
 'mercury_pisces':'Меркурий в Рыбах (изгнание и падение): Интуитивный ум, мыслит образами.',
 'mercury_aquarius':'Меркурий в Водолее (экзальтация): Инновационное мышление, парадоксальная логика.',

 'jupiter_sagittarius':'Юпитер в Стрельце (обитель): Высшие знания, авторитет, заграница — удача во всём масштабном.',
 'jupiter_cancer':'Юпитер в Раке (экзальтация): Традиции, семейный масштаб, удача через род и недвижимость.',
 'saturn_capricorn':'Сатурн в Козероге (обитель): Вершина целеустремлённости, прочный фундамент.',
 'saturn_libra':'Сатурн в Весах (экзальтация): Строгая справедливость, надёжность в браке и делах.',

 'sun_h1':'Солнце в 1 доме: «Я — центр Вселенной». Прирождённый лидер, заметная личность.',
 'sun_h7':'Солнце в 7 доме: Личность раскрывается через партнёрство и публичность.',
 'sun_h10':'Солнце в 10 доме: Жизнь посвящена карьере и статусу. Рождён руководить.',
 'moon_h4':'Луна в 4 доме: Мощная связь с родом, матерью и домом. Потребность вить гнездо.',
 'moon_h12':'Луна в 12 доме: Глубочайшая интуиция, вещие сны, комфорт в уединении.',
 'venus_h7':'Венера в 7 доме: Брак — главная ценность. Талант миротворца и дипломата.',
 'mars_h10':'Марс в 10 доме: Высокие амбиции, прорыв в карьере, быстрые решения.',
 'jupiter_h9':'Юпитер в 9 доме (обитель): Истинный Гуру. Удача за границей и в образовании.',
 'saturn_h10':'Сатурн в 10 доме (обитель): Медленный, но самый верный путь к власти.',
 'pluto_h8':'Плутон в 8 доме (обитель): Дар работы с кризисами и чужими ресурсами. Перерождение из пепла.',
 'neptune_h12':'Нептун в 12 доме (обитель): Дар медиума, психолога или музыканта.',
 'uranus_h11':'Уран в 11 доме (обитель): Друзья-оригиналы, стартапы, взгляд в будущее.',

 'syn_sun_moon':'Солнце П1 + Луна П2: Сильнейший аспект для брака. Солнце оберегает, Луна питает заботой.',
 'syn_moon_moon':'Луна П1 + Луна П2: Абсолютное душевное родство и эмоциональный комфорт.',
 'syn_sun_sun':'Солнце П1 + Солнце П2: Понимание на уровне Эго, но возможна борьба за корону.',
 'syn_venus_mars':'Венера П1 + Марс П2: Испепеляющая страсть и мощнейший сексуальный магнетизм.',
 'syn_mars_venus':'Марс П1 + Венера П2: Искры летят! Активное завоевание владельца Венеры.',
 'syn_venus_pluto':'Венера П1 + Плутон П2: Роковое притяжение, любовь как одержимость.',
 'syn_moon_pluto':'Луна П1 + Плутон П2: Тяжёлая карма, риск эмоционального вампиризма.',
 'syn_jupiter_sun':'Юпитер П1 + Солнце П2: «Печать счастья» — расширяет возможности и успех партнёра.',
 'syn_saturn_moon':'Сатурн П1 + Луна П2: Сатурн охлаждает эмоции, но даёт стабильность.',
 'syn_sun_h7':'Солнце П1 в 7 доме П2: Владелец дома видит в партнёре идеального супруга.',
 'syn_moon_h4':'Луна П1 в 4 доме П2: Ощущение невероятного семейного уюта.',
 'syn_venus_h5':'Венера П1 в 5 доме П2: Классика ярких романов и бесконечной романтики.',
 'syn_mars_h8':'Марс П1 в 8 доме П2: Провоцирует трансформации, даёт сексуальный драйв.'
});

/* ============================================================================
 *  ЕДИНАЯ ТОЧКА ДОСТУПА К ИНТЕРПРЕТАЦИЯМ
 * ========================================================================= */
export function interpretKey(parts){
  const {planetId=null,signId=null,houseId=null} = parts;
  const key=[planetId,signId,houseId].filter(Boolean).join('_');
  const curated = Object.prototype.hasOwnProperty.call(CURATED,key) ? CURATED[key] : null;
  let generated=null;
  if(planetId&&signId&&houseId) generated=tripleText(planetId,signId,houseId);
  else if(planetId&&signId) generated=planetInSign(planetId,signId);
  else if(planetId&&houseId) generated=planetInHouse(planetId,houseId);
  else if(signId&&houseId) generated=signInHouse(signId,houseId);
  else if(planetId){ const P=getEl(planetId);
    generated=`${P.label} ${P.glyph} — ${P.core}. Функция: ${P.verb}. Потребность: ${P.need}.\n\n💎 Дар: ${P.gift}.\n\n🌑 Тень: ${P.shadow}.`; }
  else if(signId){ const S=getEl(signId),E=ELEMENTS[S.element],M=MODALITIES[S.modality];
    generated=`${S.label} ${S.glyph} (${S.dates}) — ${M.label} ${E.label} ${E.icon}, управитель ${getEl(S.ruler).label}.\n\nПроявляется ${S.style}.\n\n💎 ${cap(S.gift)}.\n\n🌑 ${cap(S.risk)}.\n\n🔑 Девиз: «${S.key}».`; }
  else if(houseId){ const H=getEl(houseId),NS=getEl(H.sign);
    generated=`${H.label} ${H.glyph} — сфера ${H.sphere}.\n\nЭто ${H.arena}. Фокус — ${H.focus}. Натуральный управитель — ${NS.label} ${NS.glyph}.`; }
  return { key, text: curated ? `${curated}\n\n— — —\n\n${generated}` : generated, curated: !!curated };
}

export function formulaBlocks(f){
  const blocks=[];
  const {planetId,signId,houseId}=f;
  if(planetId&&signId&&houseId){
    blocks.push({icon:'✨',title:'Синтез связки',...interpretKey({planetId,signId,houseId})});
    blocks.push({icon:'🪐',title:`${getEl(planetId).label} ${getEl(signId).prep}`,...interpretKey({planetId,signId})});
    blocks.push({icon:'🏠',title:`${getEl(planetId).label} в ${getEl(houseId).num} доме`,...interpretKey({planetId,houseId})});
    blocks.push({icon:'🌌',title:`${getEl(signId).label} в ${getEl(houseId).num} доме`,...interpretKey({signId,houseId})});
  } else {
    if(planetId&&signId) blocks.push({icon:'🪐',title:`${getEl(planetId).label} ${getEl(signId).prep}`,...interpretKey({planetId,signId})});
    else if(planetId&&houseId) blocks.push({icon:'🏠',title:`${getEl(planetId).label} в ${getEl(houseId).num} доме`,...interpretKey({planetId,houseId})});
    else if(signId&&houseId) blocks.push({icon:'🌌',title:`${getEl(signId).label} в ${getEl(houseId).num} доме`,...interpretKey({signId,houseId})});
    else if(planetId) blocks.push({icon:'🪐',title:getEl(planetId).label,...interpretKey({planetId})});
    else if(signId) blocks.push({icon:'🌌',title:getEl(signId).label,...interpretKey({signId})});
    else if(houseId) blocks.push({icon:'🏠',title:getEl(houseId).label,...interpretKey({houseId})});
  }
  return blocks;
}

export function synastryBlocks(f1,f2,n1,n2){
  const out=[];
  if(f1.planetId&&f2.planetId){
    const k=`syn_${f1.planetId}_${f2.planetId}`;
    const c=CURATED[k];
    out.push({icon:'✨',title:`${getEl(f1.planetId).label} (${n1}) ↔ ${getEl(f2.planetId).label} (${n2})`,
      text:(c?c+'\n\n— — —\n\n':'')+synastryPP(f1.planetId,f2.planetId,n1,n2),curated:!!c,
      score:synergyPlanets(f1.planetId,f2.planetId).score});
  }
  if(f1.planetId&&f2.houseId){
    const k=`syn_${f1.planetId}_${f2.houseId}`; const c=CURATED[k];
    out.push({icon:'🏠',title:`${getEl(f1.planetId).label} (${n1}) в ${getEl(f2.houseId).num} доме (${n2})`,
      text:(c?c+'\n\n— — —\n\n':'')+synastryPH(f1.planetId,f2.houseId,n1,n2),curated:!!c});
  }
  if(f2.planetId&&f1.houseId){
    out.push({icon:'🏠',title:`${getEl(f2.planetId).label} (${n2}) в ${getEl(f1.houseId).num} доме (${n1})`,
      text:synastryPH(f2.planetId,f1.houseId,n2,n1),curated:false});
  }
  if(f1.planetId&&f2.signId){
    out.push({icon:'🌌',title:`${getEl(f1.planetId).label} (${n1}) × ${getEl(f2.signId).label} (${n2})`,
      text:synastryPS(f1.planetId,f2.signId,n1,n2),curated:false});
  }
  if(!out.length) out.push({icon:'🔮',title:'Контакт',text:'Для этой пары элементов достаточно общего правила: совпадающие стихии дают понимание, разные — рост через различие.'});
  return out;
}

export const VERSION='3.0.0';
