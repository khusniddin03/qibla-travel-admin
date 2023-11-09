import axios from 'axios';
import { useAppContext } from '../../context/appContext';
import { onStorage } from '../../utils/onStorage';
import { USER_DATA_KEY } from '@/consts';

function TokenSetter() {
    const { user } = useAppContext();
    const { data: {token = null} = {} } = onStorage(USER_DATA_KEY) || {};
    
    if (token || user?.data?.token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token ?? user?.data?.token}`;
    }
    
    return (
        <></>
    )
}

export default TokenSetter;