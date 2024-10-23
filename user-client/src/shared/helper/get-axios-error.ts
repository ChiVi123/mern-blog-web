import { AxiosError } from 'axios';

export const getAxiosError = (error: unknown) => (error instanceof AxiosError ? error.response?.data : error);
