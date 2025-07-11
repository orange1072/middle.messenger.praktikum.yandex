enum EMethods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

type Options = {
    method: EMethods;
    data?: Record<string, unknown> | string;
    headers?: Record<string, string>;
    timeout?: number;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

export class HTTPTransport {
    get = (
        url: string,
        options: OptionsWithoutMethod = {},
    ): Promise<XMLHttpRequest> => {
        return this.request(url, { ...options, method: EMethods.GET });
    };

    post = (
        url: string,
        options: OptionsWithoutMethod = {},
    ): Promise<XMLHttpRequest> => {
        return this.request(url, { ...options, method: EMethods.POST });
    };

    put = (
        url: string,
        options: OptionsWithoutMethod = {},
    ): Promise<XMLHttpRequest> => {
        return this.request(url, { ...options, method: EMethods.PUT });
    };

    delete = (
        url: string,
        options: OptionsWithoutMethod = {},
    ): Promise<XMLHttpRequest> => {
        return this.request(url, { ...options, method: EMethods.DELETE });
    };

    request = (url: string, options: Options): Promise<XMLHttpRequest> => {
        const { headers = {}, method, data, timeout = 5000 } = options;

        return new Promise((resolve, reject) => {
            if (!method) {
                reject(new Error('No method'));
                return;
            }

            const xhr = new XMLHttpRequest();

            const isGet = method === EMethods.GET;

            let requestUrl = url;

            if (isGet && data && typeof data === 'object') {
                requestUrl += queryStringify(data as Record<string, unknown>);
            }

            xhr.open(method, requestUrl);

            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            xhr.timeout = timeout;

            if (isGet || !data) {
                xhr.send();
            } else {
                if (typeof data === 'string') {
                    xhr.send(data);
                } else {
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.send(JSON.stringify(data));
                }
            }
        });
    };
}

/**
 * Преобразует объект в query string
 * Например: { a: 1, b: 2 } → "?a=1&b=2"
 */
function queryStringify(data: Record<string, unknown>): string {
    const params = Object.entries(data)
        .map(
            ([key, value]) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(
                    String(value),
                )}`,
        )
        .join('&');

    return params ? `?${params}` : '';
}
