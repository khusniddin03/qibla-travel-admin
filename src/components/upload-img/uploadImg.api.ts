import { useCallback, useState } from 'react';
import axios from "axios";

export const SendPostRequest = () => {
    const [ressponse, setRes] = useState<any>({ isLoading: false, error: null, status: null, data: null });

    const callAPI = useCallback(async (url: string, body: any, config: any) => {
        axios.post(url, body, config).then(res => {
            setRes({ isLoading: false, error: null, status: true, data: res.data });
            if (res) {
                setTimeout(() => {
                    setRes({ data: null, error: null, isLoading: null, status: null })
                }, 1000);
            }
        }).catch((error) => {
            setRes({ data: null, isLoading: false, error: error?.response?.data?.message, status: false });
            if (error) {
                setTimeout(() => {
                    setRes({ error: null, isLoading: null, status: null })
                }, 1000);
            }
        })
    }, []);

    return [ressponse, callAPI];
};