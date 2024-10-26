import { AxiosError } from 'axios';

const errorDefault = {
    success: false,
    statusCode: 500,
    message: 'Internal Server Error',
};

export const getAxiosError = (error: unknown) => (error instanceof AxiosError ? error.response?.data : errorDefault);
