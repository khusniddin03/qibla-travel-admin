import { USER_DATA_KEY } from "@/consts";
import { IUser } from "../interfaces";
import axios from "axios";

export const logOutHandle = (
    navigate: (value: string) => void,
    setUser: (value: null | IUser) => void
): void => {
    setUser(null);
    localStorage.removeItem(USER_DATA_KEY);
    navigate("/login");
    delete axios.defaults.headers.common["Authorization"];
};
