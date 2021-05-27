import { action, observable, computed, configure, runInAction, makeAutoObservable, makeObservable } from "mobx";
import { createContext } from "react";
import agent from "../api/agent";
import { IProduct } from "../models/product";
import {format} from 'date-fns';

configure({ enforceActions: "always" });

class ProductStore {
  @observable productRegistry = new Map();
  @observable products: IProduct[] = [];
  @observable product: IProduct | null = null;
  @observable editMode = false;
  @observable target = "";
  constructor() {
    makeObservable(this);
  }
  @computed get productsByDate() {
    return Array.from(this.productRegistry.values())
      .slice()
      .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  }

  @action loadProducts = async () => {
    try {
      const products = await agent.Products.list();
      products.forEach((product) => {
        product.date = product.date;
        this.productRegistry.set(product.id, product);
      });
    }catch (error) {
      console.log(error);
    }
  };

  @action loadProduct = async (id: string) => {
    let product = this.getProduct(id);
    if (product){ this.product = product;
  }else{
    try{
      product = await agent.Products.details(id);
      runInAction(() => {
        this.product = product;
      })
      
    }catch (error){
      console.log(error);
    }
  }
}

  getProduct = (id: string) => {
    return this.productRegistry.get(id);
  }

  @action createProduct = async (product: IProduct) => {
    try {
      await agent.Products.create(product);
      this.productRegistry.set(product.id, product);
      this.editMode = false;
    } catch (error) {
      console.log(error);
    }
  };

  @action OpenCreateForm = () => {
    this.editMode = true;
    this.product = null;
  };

  @action selectProduct = (id: string) => {
    this.product = this.productRegistry.get(id);
    this.editMode = false;
  };

  @action editProduct = async (product: IProduct) => {
    try {
      await agent.Products.update(product);
      product.date = new Date(product.date!);
      this.productRegistry.set(product.id, product);
      this.product = product;
      this.editMode = false;
    } catch (error) {
      console.log(error);
    }
  };

  @action openEditForm = (id: string) => {
    this.product = this.productRegistry.get(id);
    this.editMode = true;
  };

  @action cancelSelectedProduct = () => {
    this.product = null;
  };

  @action cancelFormOpen = () => {
    this.editMode = false;
  };

  @action deleteProduct = async (id: string) => {
    try {
      await agent.Products.delete(id);
      this.productRegistry.delete(id);
    } catch (error) {
      console.log(error);
    }
  };
}
export default createContext(new ProductStore());
