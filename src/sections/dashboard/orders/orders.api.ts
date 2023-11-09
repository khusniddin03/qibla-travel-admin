import axios from "axios";
import { IOrdersData } from "@/interfaces";

export function getOrders(page: number) {
    return async () => {
        const response = await axios.get(`/public/api/auth/orders?page=${page}`) as IOrdersData;
        return response;
    }
}
export const updateOrder = async (id: number, data: any) => {
    const response = await axios.put(`/public/api/auth/orders/${id}`, data);
    return response;
}

export const deleteOrder = async (id: number) => {
    const response = await axios.delete(`/public/api/auth/orders/${id}`);
    return response;
}
