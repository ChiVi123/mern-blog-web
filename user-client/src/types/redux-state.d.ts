interface IReduxState {
    loading: 'idle' | 'pending' | 'fulfilled' | 'rejected';
    error: string | undefined;
}
