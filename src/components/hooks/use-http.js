import { useState, useCallback } from 'react'

function useHttp() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async (RequestConfig, applyData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(
                RequestConfig.url, {
                method: RequestConfig.method ? RequestConfig.method : 'GET',
                headers: RequestConfig.headers ? RequestConfig.headers : {},
                body: RequestConfig.body ? JSON.stringify(RequestConfig.body) : null
            }
            );

            if (!response.ok) {
                throw new Error('Request failed!');
            }

            const data = await response.json();
            applyData(data);
        } catch (err) {
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
    }, []);

    return {
        isLoading,
        error,
        sendRequest
    }
}

export default useHttp
