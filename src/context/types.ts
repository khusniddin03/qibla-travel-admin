import { ICompany, IUser } from "../interfaces";

export type ActionType = {
    payload: any;
    type: string;
};

export interface IState {
    user: IUser;
    companies: ICompany[];
    currentCompanyId: number | null;
}

export type TDispatch = React.Dispatch<ActionType>;

export type TSetUser = (dispatch: TDispatch) => (payload: IUser) => void;
export type TSetCompanies = (dispatch: TDispatch) => (payload: ICompany[]) => void;
export type TSetCurrentCompanyId = (dispatch: TDispatch) => (payload: number) => void;

export interface IAppContext {
    user: IUser;
    companies: ICompany[] | null;
    setUser: (user: IUser) => void;
    setCompanies: (companies: ICompany[]) => void;
    currentCompanyId: number | null;
    setCurrentCompanyId: (companies: number) => void;
}
