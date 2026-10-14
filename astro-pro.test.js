import { ElementsRepository, DescriptionsRepository } from './astro-database.js';
import { AstroModel } from './astro-model.js';

describe('AstroModel PRO — Аспекты, Стихии, Соляр и Синастрия', () => {
    let repo;
    let descRepo;
    let model;

    beforeEach(() => {
        repo = new ElementsRepository();
        descRepo = new DescriptionsRepository();
        model = new AstroModel(repo, descRepo);
    });

    test('getSignDistance корректно считает квиконс (150° = 5 знаков) для Овна и Скорпиона', () => {
        expect(model.getSignDistance('aries', 'scorpio')).toBe(5);
        const aspect = model.getAspectMeta(5);
        expect(aspect.code).toBe('quinc');
    });

    test('getSignDistance корректно считает квадратуру (90° = 3 знака) для Овна и Козерога', () => {
        expect(model.getSignDistance('aries', 'capricorn')).toBe(3);
        const aspect = model.getAspectMeta(3);
        expect(aspect.code).toBe('sq');
    });

    test('calculateNatalAspects находит аспекты между планетами в карте', () => {
        const inv = [
            model.createCompleteFormula('sun', 'aries', 'h1'),
            model.createCompleteFormula('moon', 'scorpio', 'h8')
        ];
        const aspects = model.calculateNatalAspects(inv, descRepo);
        expect(aspects).toHaveLength(1);
        expect(aspects[0].code).toBe('quinc');
    });

    test('calculateElementalBalance вычисляет доминирующую стихию', () => {
        const inv = [
            model.createCompleteFormula('sun', 'aries', 'h1'),
            model.createCompleteFormula('mars', 'leo', 'h5')
        ];
        const bal = model.calculateElementalBalance(inv);
        expect(bal.fire).toBe(100);
        expect(bal.dominant).toBe('fire');
    });

    test('calculateSolarForecast подтягивает ключи solar_ из базы данных', () => {
        const inv = [model.createCompleteFormula('sun', 'aries', 'h1')];
        const solar = model.calculateSolarForecast(inv, descRepo);
        expect(solar).toHaveLength(1);
        expect(solar[0].isExactDbMatch).toBe(true);
        expect(solar[0].key).toBe('solar_sun_h1');
    });

    test('calculateSynastryScore возвращает валидный процент совместимости (25..99)', () => {
        const inv1 = [model.createCompleteFormula('sun', 'aries', 'h1')];
        const inv2 = [model.createCompleteFormula('moon', 'leo', 'h5')];
        const res = model.calculateSynastryScore(inv1, inv2, descRepo);
        expect(res.score).toBeGreaterThanOrEqual(25);
        expect(res.score).toBeLessThanOrEqual(99);
    });
});
