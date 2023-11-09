import axios from "axios";
import { IHotelsData, IHotel } from "@/interfaces";

export function getHotels(page: number) {
    return async () => {
        const response = await axios.get(`/public/api/auth/hotels?page=${page}`) as IHotelsData;
        return response;
    }
}

export const createHotel = async (data: IHotel) => {
    const response = await axios.post("/public/api/auth/hotels", data) as { data: IHotel };
    return response;
};

export const updateHotel = async (id: number, data: IHotel) => {
    const response = await axios.put(`/public/api/auth/hotels/${id}`, data);
    return response;
}

export const deleteHotel = async (id: number) => {
    const response = await axios.delete(`/public/api/auth/hotels/${id}`);
    return response;
};