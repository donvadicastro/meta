import axios, {AxiosResponse} from "axios";

export function request(url: string): Promise<any> {
    return axios.get(url).then((response: AxiosResponse) => response.data);
}
