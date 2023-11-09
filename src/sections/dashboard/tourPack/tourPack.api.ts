import axios from "axios";
import { ITourPacksData, ITourPack } from "@/interfaces";

export function getTourPacks(page: number) {
    return async () => {
        const response = await axios.get(`/public/api/auth/tour-pack?page=${page}`) as ITourPacksData;
        return response;
    }
}

export const createTourPack = async (data: ITourPack) => {
    const response = await axios.post("/public/api/auth/tour-pack", data) as { data: ITourPack };
    return response;
};

export const updateTourPack = async (id: number, data: ITourPack) => {
    const response = await axios.put(`/public/api/auth/tour-pack/${id}`, data);
    return response;
}

export const deleteTourPack = async (id: number) => {
    const response = await axios.delete(`/public/api/auth/tour-pack/${id}`);
    return response;
};