import { Dispatch, FormEventHandler, SetStateAction, useState } from 'react';

export type SubmitHandler = (
    setError: Dispatch<SetStateAction<string | null>>,
    setLoading: Dispatch<SetStateAction<'idle' | 'pending' | 'fulfilled' | 'rejected'>>,
) => void;

type SubmitWrapper = (
    callback: (
        setError: Dispatch<SetStateAction<string | null>>,
        setLoading: Dispatch<SetStateAction<'idle' | 'pending' | 'fulfilled' | 'rejected'>>,
    ) => void,
) => FormEventHandler<HTMLFormElement>;

export const useFormState = () => {
    const [loading, setLoading] = useState<'idle' | 'pending' | 'fulfilled' | 'rejected'>('idle');
    const [error, setError] = useState<string | null>(null);

    const onSubmit: SubmitWrapper = (callback) => (e) => {
        e.preventDefault();
        setLoading('pending');
        setError(null);
        callback(setError, setLoading);
    };

    return { loading, error, onSubmit };
};
