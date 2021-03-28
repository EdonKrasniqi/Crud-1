import axios, { AxiosResponse } from 'axios';
import { IProduct } from '../models/product';

axios.defaults.baseURL = 'http://localhost:5000/api';

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


export default{

    Products
}