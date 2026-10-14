/**
 * ============================================================
 * СЕРВИС ХРАНЕНИЯ И ВАЛИДАЦИИ СОСТОЯНИЯ (Storage Layer)
 * ============================================================
 */

export class StorageService {
    static #KEY = 'astro-alchemy-state-v1';
    static #MAX_ITEMS = 500;

    load() {
        let raw;
        try {
            raw = localStorage.getItem(StorageService.#KEY);
        } catch (e) {
            return null;
        }
        if (!raw) return null;

        let parsed;
        try {
            parsed = JSON.parse(raw);
        } catch (e) {
            return null;
        }
        return this.#validateSchema(parsed) ? parsed : null;
    }

    save(state) {
        try {
            localStorage.setItem(StorageService.#KEY, JSON.stringify(state));
            return true;
        } catch (e) {
            return false;
        }
    }

    clear() {
        try {
            localStorage.removeItem(StorageService.#KEY);
        } catch (e) {}
    }

    #validateSchema(data) {
        if (!data || typeof data !== 'object') return false;
        if (!Array.isArray(data.items)) return false;
        if (data.items.length > StorageService.#MAX_ITEMS) return false;

        const isFiniteNumber = (n) => typeof n === 'number' && Number.isFinite(n);
        const isValidFormula = (f) =>
            Boolean(
                f &&
                typeof f === 'object' &&
                typeof f.text === 'string' &&
                f.text.length < 200 &&
                (f.planetId === null || typeof f.planetId === 'string') &&
                (f.signId === null || typeof f.signId === 'string') &&
                (f.houseId === null || typeof f.houseId === 'string') &&
                typeof f.isComplete === 'boolean'
            );

        return data.items.every((item) => {
            if (!item || typeof item !== 'object') return false;
            if (!['astro', 'person', 'couple'].includes(item.type)) return false;
            if (typeof item.uid !== 'string' || !/^uid_[\w-]+$/.test(item.uid)) return false;
            if (!isFiniteNumber(item.x) || !isFiniteNumber(item.y)) return false;

            if (item.type === 'astro') {
                return Array.isArray(item.formulas) && item.formulas.every(isValidFormula);
            }
            if (item.type === 'person') {
                if (item.name !== undefined && typeof item.name !== 'string') return false;
                if (item.gender !== undefined && typeof item.gender !== 'string') return false;
                return Array.isArray(item.inventory) && item.inventory.every(isValidFormula);
            }
            if (item.type === 'couple') {
                if (item.person1Name !== undefined && typeof item.person1Name !== 'string') return false;
                if (item.person2Name !== undefined && typeof item.person2Name !== 'string') return false;
                return (
                    Array.isArray(item.person1Inventory) &&
                    item.person1Inventory.every(isValidFormula) &&
                    Array.isArray(item.person2Inventory) &&
                    item.person2Inventory.every(isValidFormula)
                );
            }
            return false;
        });
    }
}
