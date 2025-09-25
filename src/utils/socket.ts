type Message = { content: string; type: 'message'; time?: string };

export type SocketHandlers = {
    onOpen?: () => void;
    onMessage?: (data: unknown) => void;
    onError?: (e: Event) => void;
    onClose?: (e: CloseEvent) => void;
};

export class ChatSocket {
    private socket: WebSocket | null = null;
    private pingIntervalId: number | null = null;

    constructor(
        private userId: number,
        private chatId: number,
        private token: string,
        private handlers: SocketHandlers = {},
    ) {}

    public connect() {
        const url = `wss://ya-praktikum.tech/ws/chats/${this.userId}/${this.chatId}/${this.token}`;
        this.socket = new WebSocket(url);

        this.socket.addEventListener('open', () => {
            this.startPing();
            this.handlers.onOpen?.();
            this.requestOldMessages();
        });

        this.socket.addEventListener('message', (event) => {
            const data = safeParse(event.data);
            this.handlers.onMessage?.(data);
        });

        this.socket.addEventListener('error', (e) => {
            this.handlers.onError?.(e);
        });

        this.socket.addEventListener('close', (e) => {
            this.stopPing();
            this.handlers.onClose?.(e);
        });
    }

    public send(text: string) {
        if (!this.socket || this.socket.readyState !== WebSocket.OPEN) return;
        const message: Message = { content: text, type: 'message' };
        this.socket.send(JSON.stringify(message));
    }

    public requestOldMessages() {
        if (!this.socket || this.socket.readyState !== WebSocket.OPEN) return;
        this.socket.send(JSON.stringify({ content: '0', type: 'get old' }));
    }

    public disconnect() {
        this.socket?.close();
        this.stopPing();
    }

    private startPing() {
        this.pingIntervalId = window.setInterval(() => {
            if (this.socket && this.socket.readyState === WebSocket.OPEN) {
                this.socket.send(JSON.stringify({ type: 'ping' }));
            }
        }, 10000);
    }

    private stopPing() {
        if (this.pingIntervalId) {
            clearInterval(this.pingIntervalId);
            this.pingIntervalId = null;
        }
    }
}

function safeParse(data: unknown): unknown {
    if (typeof data === 'string') {
        try {
            return JSON.parse(data);
        } catch {
            return data;
        }
    }
    return data;
}
