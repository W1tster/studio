
export type Message = {
    role: 'user' | 'model';
    content: {
        text: string;
        file?: {
            name: string;
            type: string;
            dataUri: string;
        }
    }
};

export type ChatInput = {
    messages: Message[];
};

export type ChatOutput = {
    response: string;
};
