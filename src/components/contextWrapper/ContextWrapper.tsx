import { FC, PropsWithChildren, ReactNode, useMemo, useReducer } from "react";
import {
    setUser,
    setCompanies,
    setCurrentCompanyId,
} from "../../context/action";
import { AppContext, reducer } from "../../context/appContext";
import { IAppContext } from "../../context/types";

interface Props {
    children: ReactNode;
}

const ContextWrapper: FC<Props> = ({ children }: PropsWithChildren<Props>) => {
    const initialStore = {
        user: null,
        companies: null,
        currentCompanyId: null,
    }

    const [store, dispatch] = useReducer(reducer, initialStore);

    const combineStore: IAppContext = useMemo(
        () => ({
            setUser: setUser(dispatch),
            setCompanies: setCompanies(dispatch),
            setCurrentCompanyId: setCurrentCompanyId(dispatch),
            ...store,
        }),

        // eslint-disable-next-line react-hooks/exhaustive-deps
        [store]
    );

    return (
        <AppContext.Provider value={combineStore}>{children}</AppContext.Provider>
    );
};

export default ContextWrapper;
