import axios, { AxiosResponse } from 'axios';
import { IProduct } from '../models/product';
import { ILibrary } from '../models/library';
import { IClothing } from '../models/clothing';
import { IHealth } from '../models/health';
import { ISport } from '../models/Sport';
import { IHousehold } from '../models/household';
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

const Account = {
    current: (): Promise<User> => requests.get('/account'), 
    login: (user: UserFormValues): Promise<User> => requests.post('/account/login', user),
    register:(user: UserFormValues): Promise<User> => requests.post('/account/register', user),
}



const Library = {
    list: (): Promise<ILibrary[]> => requests.get('/library'),
    details:(id: string) => requests.get(`/library/${id}`),
    create: (library: ILibrary) => requests.post('/library', library),
    update: (library: ILibrary) => requests.put(`/library/${library.id}`,library),
    delete: (id: string) => requests.del(`/library/${id}`)
}

//t
const Clothing = {

    list: (): Promise<IClothing[]> => requests.get('/clothings'),
    details:(id: string) => requests.get(`/clothings/${id}`),
    create: (clothing: IClothing) => requests.post('/clothings', clothing),
    update: (clothing: IClothing) => requests.put(`/clothings/${clothing.id}`,clothing),
    delete: (id: string) => requests.del(`/clothings/${id}`)
}

//t
const Health = {

    list: (): Promise<IHealth[]> => requests.get('/healths'),
    details:(id: string) => requests.get(`/healths/${id}`),
    create: (health: IHealth) => requests.post('/healths', health),
    update: (health: IHealth) => requests.put(`/healths/${health.id}`,health),
    delete: (id: string) => requests.del(`/healths/${id}`)
}
const Sport = {

    list: (): Promise<ISport[]> => requests.get('/sports'),
    details:(id: string) => requests.get(`/sports/${id}`),
    create: (Sport: ISport) => requests.post('/sports', Sport),
    update: (Sport: ISport) => requests.put(`/sports/${Sport.id}`,Sport),
    delete: (id: string) => requests.del(`/sports/${id}`)
}

//t
const Household = {

    list: (): Promise<IHousehold[]> => requests.get('/household'),
    details:(id: string) => requests.get(`/household/${id}`),
    create: (household: IHousehold) => requests.post('/household', household),
    update: (household: IHousehold) => requests.put(`/household/${household.id}`,household),
    delete: (id: string) => requests.del(`/household/${id}`)
}



const agent ={
    Products,
    Account,
    Library,
    Clothing,
    Health,
    Sport,
    Household
}
export default agent;
