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

export class HTTP {
    get<TResponse>(
        url: string,
        options: OptionsWithoutMethod = {},
    ): Promise<TResponse> {
        return this.request<TResponse>(url, {
            ...options,
            method: EMethods.GET,
        });
    }

    post<TRequest extends string | Record<string, unknown>, TResponse>(
        url: string,
        data?: TRequest,
        options: OptionsWithoutMethod = {},
    ): Promise<TResponse> {
        return this.request<TResponse>(url, {
            ...options,
            method: EMethods.POST,
            data,
        });
    }

    put<TRequest extends string | Record<string, unknown>, TResponse>(
        url: string,
        data?: TRequest,
        options: OptionsWithoutMethod = {},
    ): Promise<TResponse> {
        return this.request<TResponse>(url, {
            ...options,
            method: EMethods.PUT,
            data,
        });
    }

    delete<TResponse>(
        url: string,
        options: OptionsWithoutMethod = {},
    ): Promise<TResponse> {
        return this.request<TResponse>(url, {
            ...options,
            method: EMethods.DELETE,
        });
    }

    private request<TResponse>(
        url: string,
        options: Options,
    ): Promise<TResponse> {
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
            xhr.withCredentials = true;
            xhr.timeout = timeout;

            Object.entries(headers).forEach(([key, value]) => {
                xhr.setRequestHeader(key, value);
            });

            xhr.onload = function () {
                try {
                    const contentType = xhr.getResponseHeader('Content-Type');
                    const isJSON = contentType?.includes('application/json');
                    const responseData = isJSON
                        ? JSON.parse(xhr.responseText)
                        : xhr.responseText;

                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve(responseData as TResponse);
                    } else {
                        reject(responseData);
                    }
                } catch (e) {
                    reject(e);
                }
            };

            xhr.onabort = () => reject(new Error('Request aborted'));
            xhr.onerror = () => reject(new Error('Request error'));
            xhr.ontimeout = () => reject(new Error('Request timeout'));

            if (isGet || !data) {
                xhr.send();
            } else if (typeof data === 'string') {
                xhr.send(data);
            } else {
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify(data));
            }
        });
    }
}

// Преобразует { a: 1, b: 2 } → "?a=1&b=2"
function queryStringify(data: Record<string, unknown>): string {
    const params = Object.entries(data)
        .map(
            ([key, value]) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
        )
        .join('&');
    return params ? `?${params}` : '';
}
