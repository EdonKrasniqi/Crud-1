import axios, { AxiosResponse } from 'axios';
import { IProduct } from '../models/product';
import { ILibrary } from '../models/library';
import { IClothing } from '../models/clothing';
import { IHealth } from '../models/health';

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

//qitu spo di a duhet edhe qitu te product-> me bo library
//kur e kom bo library mka dal error

//--- u kry kjo

const Library = {

    list: (): Promise<ILibrary[]> => requests.get('/library'),
    details:(id: string) => requests.get(`/library/${id}`),
    create: (library: ILibrary) => requests.post('/library', library),
    update: (library: ILibrary) => requests.put(`/library/${library.id}`,library),
    delete: (id: string) => requests.del(`/library/${id}`)
}



//t
const Clothing = {

    list: (): Promise<IClothing[]> => requests.get('/clothing'),
    details:(id: string) => requests.get(`/clothing/${id}`),
    create: (clothing: IClothing) => requests.post('/clothing', clothing),
    update: (clothing: IClothing) => requests.put(`/clothing/${clothing.id}`,clothing),
    delete: (id: string) => requests.del(`/clothing/${id}`)
}



//t
const Health = {

    list: (): Promise<IHealth[]> => requests.get('/health'),
    details:(id: string) => requests.get(`/health/${id}`),
    create: (health: IHealth) => requests.post('/health', health),
    update: (health: IHealth) => requests.put(`/health/${health.id}`,health),
    delete: (id: string) => requests.del(`/health/${id}`)
}






const agent ={
    Products,
    Autos,
    Account,
    Library,
    Clothing,
    Health

}
export default agent;
