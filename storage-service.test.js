import { StorageService } from './storage-service.js'; // при выносе в отдельный модуль

describe('StorageService — защита от повреждённых/вредоносных данных', () => {
    let storage;

    beforeEach(() => {
        localStorage.clear();
        storage = new StorageService();
    });

    test('load() возвращает null, если ключ отсутствует', () => {
        expect(storage.load()).toBeNull();
    });

    test('load() возвращает null при битом JSON', () => {
        localStorage.setItem('astro-alchemy-state-v1', '{ broken json');
        expect(storage.load()).toBeNull();
    });

    test('load() отклоняет данные без items[]', () => {
        localStorage.setItem('astro-alchemy-state-v1', JSON.stringify({ foo: 'bar' }));
        expect(storage.load()).toBeNull();
    });

    test('load() отклоняет item с недопустимым type (allow-list)', () => {
        const malicious = { items: [{ uid: 'uid_1', type: '<script>alert(1)</script>', x: 0, y: 0 }] };
        localStorage.setItem('astro-alchemy-state-v1', JSON.stringify(malicious));
        expect(storage.load()).toBeNull();
    });

    test('load() отклоняет uid, не соответствующий формату', () => {
        const malicious = { items: [{ uid: '"><img src=x onerror=alert(1)>', type: 'astro', x: 0, y: 0, formulas: [] }] };
        localStorage.setItem('astro-alchemy-state-v1', JSON.stringify(malicious));
        expect(storage.load()).toBeNull();
    });

    test('load() отклоняет NaN/Infinity в координатах', () => {
        const malicious = { items: [{ uid: 'uid_1', type: 'astro', x: Infinity, y: 0, formulas: [] }] };
        localStorage.setItem('astro-alchemy-state-v1', JSON.stringify(malicious));
        expect(storage.load()).toBeNull();
    });

    test('load() принимает корректно сформированное состояние', () => {
        const valid = {
            items: [{ uid: 'uid_abc-123', type: 'astro', x: 10, y: 20, formulas: [
                { text: '☉', planetId: 'sun', signId: null, houseId: null, isComplete: false }
            ]}]
        };
        localStorage.setItem('astro-alchemy-state-v1', JSON.stringify(valid));
        const loaded = storage.load();
        expect(loaded).not.toBeNull();
        expect(loaded.items).toHaveLength(1);
    });

    test('save() затем load() round-trip сохраняет данные', () => {
        const state = { items: [] };
        expect(storage.save(state)).toBe(true);
        expect(storage.load()).toEqual(state);
    });

    test('save() не падает, если localStorage выбрасывает исключение (переполнение квоты)', () => {
        const spy = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
            throw new DOMException('QuotaExceededError');
        });
        expect(storage.save({ items: [] })).toBe(false);
        spy.mockRestore();
    });
});