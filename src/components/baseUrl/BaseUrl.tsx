import { BASE_URL } from "@/consts";
import axios from "axios";

function BaseUrl() {
    axios.defaults.baseURL = BASE_URL;
    return null;
}

export default BaseUrl;