import { memo, useEffect } from "react";
import { useAppContext } from "@/context/appContext";
import { onStorage } from "@/utils/onStorage";
import { USER_DATA_KEY } from "@/consts";

const GetUserData = memo(() => {
    const { setUser } = useAppContext();
    const userStorage = onStorage(USER_DATA_KEY) || {};
    
    useEffect(() => {
        if (userStorage) {
            setUser(userStorage);
        }
        // eslint-disable-next-line
    }, []);

    return null;
});

export default GetUserData;
