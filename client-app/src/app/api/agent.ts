import axios, { AxiosResponse } from 'axios';
import { IProduct } from '../models/product';
import { User, UserFormValues } from '../models/user';
import { store } from '../stores/store';

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if(token) config.headers.Authorization = `Bearer ${token}`
    return config;
})

const responseBody = (response: AxiosResponse) => response.data;

const requests = {

    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {})  => axios.put(url, body).then(responseBody),
    del: (url: string) => axios.delete(url).then(responseBody)
}

const Products = {

    list: (): Promise<IProduct[]> => requests.get('/products'),
    details:(id: string) => requests.get(`/products/${id}`),
    create: (product: IProduct) => requests.post('/products', product),
    update: (product: IProduct) => requests.put(`/products/${product.id}`,product),
    delete: (id: string) => requests.del(`/products/${id}`)
}
const Autos = {

    list: (): Promise<IProduct[]> => requests.get('/auto'),
    details:(id: string) => requests.get(`/auto/${id}`),
    create: (product: IProduct) => requests.post('/auto', product),
    update: (product: IProduct) => requests.put(`/auto/${product.id}`,product),
    delete: (id: string) => requests.del(`/auto/${id}`)
}

const Account = {
    current: (): Promise<User> => requests.get('/account'), 
    login: (user: UserFormValues): Promise<User> => requests.post('/account/login', user),
    register:(user: UserFormValues): Promise<User> => requests.post('/account/register', user),
}

const agent ={
    Products,
    Autos,
    Account
}
export default agent;
