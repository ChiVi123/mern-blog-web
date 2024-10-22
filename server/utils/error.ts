class ErrorHandler extends Error {
    public statusCode: number;
    public message: string;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
}

export const getErrorHandler = (statusCode: number, message: string): Error => {
    return new ErrorHandler(statusCode, message);
};
