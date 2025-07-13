
export type ChatInput = {
    history: {
        role: 'user' | 'model';
        content: ({
            text?: string;
            media?: {
                url: string;
                contentType?: string;
            };
        })[];
    }[];
    message: string;
    fileDataUri?: string;
};

export type ChatOutput = {
    response: string;
};
