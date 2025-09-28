import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { HTTP } from '../HTTP';

// Мокаем XMLHttpRequest
class MockXMLHttpRequest {
  public status: number = 200;
  public responseText: string = '{}';
  public readyState: number = 4;
  public timeout: number = 5000;
  public withCredentials: boolean = false;
  public method: string = '';
  public url: string = '';
  public data: unknown = null;
  public headers: Record<string, string> = {};

  public open = jest.fn((method: string, url: string) => {
    this.method = method;
    this.url = url;
  });

  public send = jest.fn((data?: unknown) => {
    this.data = data;
    // Симулируем успешный ответ
    setTimeout(() => {
      this.onload?.();
    }, 0);
  });

  public setRequestHeader = jest.fn((key: string, value: string) => {
    this.headers[key] = value;
  });

  public getResponseHeader = jest.fn((name: string): string | null => {
    if (name === 'Content-Type') {
      return 'application/json';
    }
    return null;
  });

  public onload: (() => void) | null = null;
  public onerror: (() => void) | null = null;
  public onabort: (() => void) | null = null;
  public ontimeout: (() => void) | null = null;
}

// Мокаем глобальный XMLHttpRequest
const mockXHR = new MockXMLHttpRequest();
Object.defineProperty(globalThis, 'XMLHttpRequest', {
  value: jest.fn(() => mockXHR),
  writable: true
});

describe('HTTP', () => {
  let http: HTTP;

  beforeEach(() => {
    http = new HTTP();
    jest.clearAllMocks();
    mockXHR.status = 200;
    mockXHR.responseText = '{"success": true}';
  });

  describe('GET requests', () => {
    it('should make GET request', async () => {
      const promise = http.get('/api/test');
      
      expect(mockXHR.open).toHaveBeenCalledWith('GET', '/api/test');
      expect(mockXHR.send).toHaveBeenCalled();
      expect(mockXHR.withCredentials).toBe(true);
      
      const result = await promise;
      expect(result).toEqual({ success: true });
    });

    it('should add query parameters for GET requests', async () => {
      const params = { page: 1, limit: 10 };
      http.get('/api/test', { data: params });
      
      expect(mockXHR.open).toHaveBeenCalledWith('GET', '/api/test?page=1&limit=10');
    });

    it('should set custom headers', async () => {
      const headers = { 'Authorization': 'Bearer token' };
      http.get('/api/test', { headers });
      
      expect(mockXHR.setRequestHeader).toHaveBeenCalledWith('Authorization', 'Bearer token');
    });
  });

  describe('POST requests', () => {
    it('should make POST request with data', async () => {
      const data = { name: 'test', value: 123 };
      http.post('/api/test', data);
      
      expect(mockXHR.open).toHaveBeenCalledWith('POST', '/api/test');
      expect(mockXHR.setRequestHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
      expect(mockXHR.send).toHaveBeenCalledWith(JSON.stringify(data));
    });

    it('should handle string data', async () => {
      const data = 'test string';
      http.post('/api/test', data);
      
      expect(mockXHR.send).toHaveBeenCalledWith('test string');
    });

    it('should handle FormData', async () => {
      const formData = new FormData();
      formData.append('file', 'test');
      http.post('/api/test', formData as unknown as Record<string, unknown>);
      
      expect(mockXHR.send).toHaveBeenCalledWith(formData);
    });
  });

  describe('PUT requests', () => {
    it('should make PUT request', async () => {
      const data = { id: 1, name: 'updated' };
      http.put('/api/test/1', data);
      
      expect(mockXHR.open).toHaveBeenCalledWith('PUT', '/api/test/1');
      expect(mockXHR.send).toHaveBeenCalledWith(JSON.stringify(data));
    });
  });

  describe('DELETE requests', () => {
    it('should make DELETE request', async () => {
      http.delete('/api/test/1');
      
      expect(mockXHR.open).toHaveBeenCalledWith('DELETE', '/api/test/1');
      expect(mockXHR.send).toHaveBeenCalled();
    });

    it('should make DELETE request with data', async () => {
      const data = { reason: 'test' };
      http.delete('/api/test/1', data);
      
      expect(mockXHR.send).toHaveBeenCalledWith(JSON.stringify(data));
    });
  });

  describe('error handling', () => {
    it('should handle HTTP errors', async () => {
      mockXHR.status = 404;
      mockXHR.responseText = '{"error": "Not found"}';
      
      await expect(http.get('/api/test')).rejects.toEqual({ error: 'Not found' });
    });

    it('should handle network errors', async () => {
      const promise = http.get('/api/test');
      mockXHR.onerror?.();
      
      await expect(promise).rejects.toThrow('Request error');
    });

    it('should handle timeouts', async () => {
      const promise = http.get('/api/test', { timeout: 100 });
      mockXHR.ontimeout?.();
      
      await expect(promise).rejects.toThrow('Request timeout');
    });

    it('should handle aborted requests', async () => {
      const promise = http.get('/api/test');
      mockXHR.onabort?.();
      
      await expect(promise).rejects.toThrow('Request aborted');
    });
  });

  describe('response parsing', () => {
    it('should parse JSON responses', async () => {
      mockXHR.responseText = '{"data": "test"}';
      mockXHR.getResponseHeader = jest.fn((name: string): string | null => {
        return name === 'Content-Type' ? 'application/json' : null;
      });
      
      const result = await http.get('/api/test');
      expect(result).toEqual({ data: 'test' });
    });

    it('should return text for non-JSON responses', async () => {
      mockXHR.responseText = 'plain text response';
      mockXHR.getResponseHeader = jest.fn((name: string): string | null => {
        return name === 'Content-Type' ? 'text/plain' : null;
      });
      
      const result = await http.get('/api/test');
      expect(result).toBe('plain text response');
    });
  });

  describe('timeout handling', () => {
    it('should set custom timeout', async () => {
      http.get('/api/test', { timeout: 10000 });
      
      expect(mockXHR.timeout).toBe(10000);
    });

    it('should use default timeout', async () => {
      http.get('/api/test');
      
      expect(mockXHR.timeout).toBe(5000);
    });
  });

  describe('credentials', () => {
    it('should set withCredentials to true', async () => {
      http.get('/api/test');
      
      expect(mockXHR.withCredentials).toBe(true);
    });
  });
});
