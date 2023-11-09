import { useAppContext } from "@/context/appContext";
import { logOutHandle } from "@/utils/logOutHandle";
import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useNavigate } from "react-router-dom";

const ReactQueryConfig = ({ children }: PropsWithChildren) => {
    const navigate = useNavigate();
    const { setUser } = useAppContext();
    
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                refetchOnReconnect: false,
                retry: false,
                onError: (error: unknown) => {
                    const errorChangeType = error as { response: { status: number } };
                    if (errorChangeType?.response?.status === 401) {
                        logOutHandle(navigate, setUser);
                    }
                }
            },
        },
    });

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}

export default ReactQueryConfig;