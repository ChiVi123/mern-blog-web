import axios from 'axios';

interface IErrorData {
    success: false;
    statusCode: number;
    message: string;
}

const errorDefault: IErrorData = {
    success: false,
    statusCode: 500,
    message: 'Internal Server Error',
};

export const getAxiosError = (error: unknown) => {
    return axios.isAxiosError<IErrorData>(error) && error.response ? error.response.data : errorDefault;
};
