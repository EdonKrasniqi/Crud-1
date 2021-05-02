import { action, makeObservable, observable } from "mobx";
import { createContext } from "react";
import agent from "../api/agent";
import { IProduct } from "../models/product";

class ProductStore{
    @observable products: IProduct[]  = [];
    @observable selectedProduct: IProduct | undefined;
    @observable editMode = false;

    constructor(){
      makeObservable(this);
    }

  @action loadProducts = () => {
        agent.Products.list()
        .then(products =>  {
        products.forEach(product => { 
        product.date = product.date.split('.')[0];
        this.products.push(product);
       })
     })
    }
  @action selectProduct = (id: string) => {
    this.selectedProduct= this.products.find(a => a.id === id);
    this.editMode = false;
  }
}

export default createContext(new ProductStore());