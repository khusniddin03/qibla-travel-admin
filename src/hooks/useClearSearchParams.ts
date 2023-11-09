import { useSearchParams } from "react-router-dom";

export const useClearSearchParams = (): (() => void) => {
    const [, setSearchParams] = useSearchParams();

    const clearParams = () => {
        setSearchParams('');
    }

    return clearParams;
}