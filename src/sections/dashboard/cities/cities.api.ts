import axios from "axios";
import { ICitiesData, ICity } from "@/interfaces";

export function getCitiesAll(open: boolean) {
    return async () => {
        if (open) {
            const response = await axios.get(`/public/api/auth/cities`) as ICitiesData;
            return response;
        }
        const data: ICitiesData = { data: { data: [], total: 0 } };
        return Promise.resolve(data);
    };
}

export function getCities(page: number) {
    return async () => {
        const response = await axios.get(`/public/api/auth/cities?page=${page}`) as ICitiesData;
        return response;
    }
}

export const createCity = async (data: ICity) => {
    const response = await axios.post("/public/api/auth/cities", data) as { data: ICity };
    return response;
};

export const updateCity = async (id: number, data: ICity) => {
    const response = await axios.put(`/public/api/auth/cities/${id}`, data);
    return response;
}

export const deleteCity = async (id: number) => {
    const response = await axios.delete(`/public/api/auth/cities/${id}`);
    return response;
};