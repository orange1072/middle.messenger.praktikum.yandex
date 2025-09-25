// store.ts
type CurrentChat = {
    id: number;
    title: string;
};

class Store {
    private currentChat: CurrentChat | null = null;

    setCurrentChat(chat: CurrentChat) {
        this.currentChat = chat;
        localStorage.setItem('currentChat', JSON.stringify(chat));
    }

    getCurrentChat(): CurrentChat | null {
        if (!this.currentChat) {
            const saved = localStorage.getItem('currentChat');
            this.currentChat = saved ? JSON.parse(saved) : null;
        }
        return this.currentChat;
    }

    getCurrentChatId(): number | null {
        return this.currentChat?.id || null;
    }
}

export const store = new Store();
