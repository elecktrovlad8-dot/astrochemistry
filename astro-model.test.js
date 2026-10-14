import { ElementsRepository } from './astro-database.js';

// Т.к. AstroModel определён внутри index.html, для тестируемости
// в реальном проекте его следует вынести в отдельный модуль
// `astro-model.js` и импортировать и в index.html, и в тесты.
// Ниже — тест-контракт, предполагающий такой вынос.
import { AstroModel } from './astro-model.js';

describe('AstroModel', () => {
    let model;
    let repo;

    beforeEach(() => {
        repo = new ElementsRepository();
        model = new AstroModel(repo);
    });

    test('sortFormulas сортирует по PLANET_ORDER, неизвестные планеты — в конец', () => {
        const list = [
            { planetId: 'mars' }, { planetId: 'sun' }, { planetId: 'unknown' }
        ];
        const sorted = model.sortFormulas(list);
        expect(sorted.map(f => f.planetId)).toEqual(['sun', 'mars', 'unknown']);
    });

    test('createFormulaFromElement корректно определяет тип planetId/signId/houseId', () => {
        const planet = repo.get('sun');
        const formula = model.createFormulaFromElement(planet);
        expect(formula).toMatchObject({ planetId: 'sun', signId: null, houseId: null, isComplete: false });
    });

    test('mergeTwoFormulas возвращает null при конфликте одинаковых типов', () => {
        const f1 = { planetId: 'sun', signId: null, houseId: null };
        const f2 = { planetId: 'moon', signId: null, houseId: null };
        expect(model.mergeTwoFormulas(f1, f2)).toBeNull();
    });

    test('mergeTwoFormulas корректно объединяет планету и знак', () => {
        const f1 = { planetId: 'sun', signId: null, houseId: null };
        const f2 = { planetId: null, signId: 'leo', houseId: null };
        const merged = model.mergeTwoFormulas(f1, f2);
        expect(merged.planetId).toBe('sun');
        expect(merged.signId).toBe('leo');
        expect(merged.isComplete).toBe(false); // нет дома
    });

    test('mergeTwoFormulas помечает isComplete=true когда есть все три части', () => {
        const partial = { planetId: 'sun', signId: 'leo', houseId: null, isComplete: false };
        const houseOnly = { planetId: null, signId: null, houseId: 'h1' };
        const merged = model.mergeTwoFormulas(partial, houseOnly);
        expect(merged.isComplete).toBe(true);
    });

    test('hasOverlapByPlanet находит пересечение по planetId', () => {
        const a = [{ planetId: 'sun' }, { planetId: 'moon' }];
        const b = [{ planetId: 'moon' }];
        expect(model.hasOverlapByPlanet(a, b)).toBe(true);
    });

    test('hasOverlapByPlanet возвращает false без пересечений', () => {
        const a = [{ planetId: 'sun' }];
        const b = [{ planetId: 'moon' }];
        expect(model.hasOverlapByPlanet(a, b)).toBe(false);
    });

    test('allComplete: пустой список считается неполным', () => {
        expect(model.allComplete([])).toBe(false);
    });

    test('addFormulasToInventory отклоняет неполные формулы', () => {
        const inventory = [];
        const result = model.addFormulasToInventory(inventory, [{ isComplete: false, planetId: 'sun' }]);
        expect(result).toBe(false);
        expect(inventory).toHaveLength(0);
    });

    test('addFormulasToInventory отклоняет дубликат планеты', () => {
        const inventory = [{ planetId: 'sun', isComplete: true }];
        const result = model.addFormulasToInventory(inventory, [{ planetId: 'sun', isComplete: true }]);
        expect(result).toBe(false);
    });

    test('addFormulasToInventory успешно добавляет и сортирует', () => {
        const inventory = [{ planetId: 'moon', isComplete: true }];
        const result = model.addFormulasToInventory(inventory, [{ planetId: 'sun', isComplete: true }]);
        expect(result).toBe(true);
        expect(inventory.map(f => f.planetId)).toEqual(['sun', 'moon']);
    });
});