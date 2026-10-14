import { ElementsRepository } from './astro-database.js';
import { AstroModel, EphemerisEngine } from './astro-model.js';

describe('EphemerisEngine — Автоматический расчёт карты по дате рождения', () => {
    test('Корректно вычисляет положения планет на 18.04.2003 (Солнце в Овне, Луна в Скорпионе, Хирон в Козероге)', () => {
        const positions = EphemerisEngine.calculateAllPositions({
            dateStr: '2003-04-18',
            timeStr: '12:00',
            tzOffset: 4,
            lat: 55.7558,
            lon: 37.6173
        });

        expect(positions.sun.signId).toBe('aries');
        expect(positions.moon.signId).toBe('scorpio');
        expect(positions.chiron.signId).toBe('capricorn');
        expect(positions.jupiter.signId).toBe('leo');
    });

    test('calculateNatalChartFromBirthData возвращает 15 полных отсортированных формул', () => {
        const repo = new ElementsRepository();
        const model = new AstroModel(repo);
        const chart = model.calculateNatalChartFromBirthData({
            dateStr: '2003-04-18',
            timeStr: '12:00',
            tzOffset: 3,
            scope: 'full'
        });

        expect(chart).toHaveLength(15);
        expect(model.allComplete(chart)).toBe(true);
    });
});
