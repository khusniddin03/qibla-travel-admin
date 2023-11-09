import { TDispatch, TSetCompanies, TSetCurrentCompanyId, TSetUser } from "./types";
import { ActionTypes } from "./appContext";
import { ICompany, IUser } from "../interfaces";

export const setUser: TSetUser = (dispatch: TDispatch) => (payload: IUser) => {
    dispatch({ type: ActionTypes.SET_USER, payload });
};

export const setCompanies: TSetCompanies = (dispatch: TDispatch) => (payload: ICompany[]) => {
    dispatch({ type: ActionTypes.SER_COMPANIES, payload });
};

export const setCurrentCompanyId: TSetCurrentCompanyId = (dispatch: TDispatch) => (payload: number) => {
    dispatch({ type: ActionTypes.SET_CURRENT_COMPANY_ID, payload });
};