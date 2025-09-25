export const CONFIG = {
    API_BASE_URL: 'https://ya-praktikum.tech/api/v2',
    WS_BASE_URL: 'wss://ya-praktikum.tech/ws',
    STATIC_BASE_URL: '/static',
} as const;

export type Config = typeof CONFIG;
