import { Block } from '../framework/Block';

type PlainObject<T = unknown> = {
    [k in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
    return (
        typeof value === 'object' &&
        value !== null &&
        value.constructor === Object &&
        Object.prototype.toString.call(value) === '[object Object]'
    );
}

function isArray(value: unknown): value is [] {
    return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
    return isPlainObject(value) || isArray(value);
}

export function isEqual(lhs: PlainObject, rhs: PlainObject) {
    if (Object.keys(lhs).length !== Object.keys(rhs).length) {
        return false;
    }

    for (const [key, value] of Object.entries(lhs)) {
        const rightValue = rhs[key];
        if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
            if (isEqual(value, rightValue)) {
                continue;
            }
            return false;
        }

        if (value !== rightValue) {
            return false;
        }
    }

    return true;
}

export function render(query: string, block: Block) {
    const root = document.querySelector(query);
    if (root) {
        root.innerHTML = '';
        root.appendChild(block.getContent());
        block.dispatchComponentDidMount();
    }
}

function getKey(key: string, parentKey?: string) {
    return parentKey ? `${parentKey}[${key}]` : key;
}

function getParams(data: PlainObject | [], parentKey?: string) {
    const result: [string, string][] = [];

    for (const [key, value] of Object.entries(data)) {
        if (isArrayOrObject(value)) {
            result.push(...getParams(value, getKey(key, parentKey)));
        } else {
            result.push([
                getKey(key, parentKey),
                encodeURIComponent(String(value)),
            ]);
        }
    }

    return result;
}

export function queryString(data: PlainObject) {
    if (!isPlainObject(data)) {
        throw new Error('input must be an object');
    }

    return getParams(data)
        .map((arr) => arr.join('='))
        .map((item) => item.toString())
        .join('');
}

export function queryStringify2(data: Record<string, unknown>): string {
    const params = Object.entries(data)
        .map(
            ([key, value]) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
        )
        .join(',');
    return params ? `?${params}` : '';
}
