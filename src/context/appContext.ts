import { createContext, useContext } from "react";
import { ActionType, IAppContext, IState } from "./types";

export const initialState: IAppContext = {
    user: null,
    companies: null,
    setUser: () => { },
    setCompanies: () => { },
    currentCompanyId: null,
    setCurrentCompanyId: () => { },
};

export const AppContext = createContext<IAppContext>(initialState);

export enum ActionTypes {
    SET_USER = "SET_USER",
    SER_COMPANIES = "SER_COMPANIES",
    SET_CURRENT_COMPANY_ID = 'SET_CURRENT_COMPANY_ID'
}

export function reducer(state: IState, action: ActionType) {
    switch (action.type) {
        case ActionTypes.SET_USER:
            return { ...state, user: action.payload };
        case ActionTypes.SER_COMPANIES:
            return { ...state, companies: action.payload };
        case ActionTypes.SET_CURRENT_COMPANY_ID:
            return { ...state, currentCompanyId: action.payload };
        default:
            return state;
    }
}

export function useAppContext(): IAppContext {
    const appContext: IAppContext = useContext<IAppContext>(AppContext);
    return appContext;
}
