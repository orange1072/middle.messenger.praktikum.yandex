import { errorMessages, validationRules } from './validationRules';

export function validateInput(name: string, value: string): string | null {
    const rule = validationRules[name];
    if (!rule) {
        return null;
    }

    return rule.test(value) ? null : errorMessages[name];
}
