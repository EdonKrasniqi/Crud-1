import { action, observable, computed, configure, runInAction, makeObservable } from "mobx";
import { createContext } from "react";
import agent from "../api/agent";
import { IClothing } from "../models/clothing";

configure({ enforceActions: "always" });

 class ClothingStore {
  @observable clothingRegistry = new Map();
  @observable clothings: IClothing[] = [];
  @observable clothing: IClothing | null = null;
  @observable editMode = false;
  @observable target = "";
  constructor() {
    makeObservable(this);
  }
  @computed get clothingsByDate() {
    return Array.from(this.clothingRegistry.values())
      .slice()
      .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  }

  @action loadClothings = async () => {
    try {
      const clothings = await agent.Clothing.list();
      clothings.forEach((clothing) => {
        this.clothingRegistry.set(clothing.id, clothing);
      });
    }catch (error) {
      console.log(error);
    }
  };
  

  @action loadClothing = async (id: string) => {
    let clothing = this.getClothing(id);
    if (clothing){ this.clothing = clothing;
  }else{
    try{
      clothing = await agent.Clothing.details(id);
      runInAction(() => {
        this.clothing = clothing;
      })
      
    }catch (error){
      console.log(error);
    }
  }
}

  getClothing = (id: string) => {
    return this.clothingRegistry.get(id);
  }

  @action createClothing = async (clothing: IClothing) => {
    try {
      await agent.Clothing.create(clothing);
      this.clothingRegistry.set(clothing.id, clothing);
      this.editMode = false;
    } catch (error) {
      console.log(error);
    }
  };

  @action OpenCreateForm = () => {
    this.editMode = true;
    this.clothing = null;
  };

  @action selectClothing = (id: string) => {
    this.clothing = this.clothingRegistry.get(id);
    this.editMode = false;
  };

  @action editClothing = async (clothing: IClothing) => {
    try {
      await agent.Clothing.update(clothing);
      clothing.date = new Date(clothing.date!);
      this.clothingRegistry.set(clothing.id, clothing);
      this.clothing = clothing;
      this.editMode = false;
    } catch (error) {
      console.log(error);
    }
  };

  @action openEditForm = (id: string) => {
    this.clothing = this.clothingRegistry.get(id);
    this.editMode = true;
  };

  @action cancelSelectedClothing = () => {
    this.clothing = null;
  };

  @action cancelFormOpen = () => {
    this.editMode = false;
  };

  @action deleteClothing = async (id: string) => {
    try {
      await agent.Clothing.delete(id);
      this.clothingRegistry.delete(id);
    } catch (error) {
      console.log(error);
    }
  };
}
export default createContext(new ClothingStore());


