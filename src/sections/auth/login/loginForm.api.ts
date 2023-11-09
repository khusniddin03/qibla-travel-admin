import axios from "axios";

interface ILoginData {
    email: string;
    password: string;
}

export const registrationPost = async (data: ILoginData) => {
    const response = await axios.post("/public/api/login", data);
    return response;
};