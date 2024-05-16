import { useState, useEffect } from 'react';
import axios from 'axios';

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const source = axios.CancelToken.source();
        setLoading(true);
        setData(null);
        setError(null);

        axios.get(url, { cancelToken: source.token })
            .then(res => {
                if (!axios.isCancel(res)) {
                    setLoading(false);
                    setData(res.data.data);
                }
            })
            .catch(err => {
                if (!axios.isCancel(err)) {
                    setLoading(false);
                    setError(err);
                }
            });

        return () => {
            source.cancel('Operation cancelled by the user.');
        };
    }, [url]);

    return { data, loading, error };
}

export default useFetch;