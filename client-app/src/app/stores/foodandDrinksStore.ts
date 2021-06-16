import { action, observable, computed, configure, runInAction, makeObservable } from "mobx";
import { createContext } from "react";
import agent from "../api/agent";
import { IFoodAndDrinks } from "../models/foodandDrinks";

configure({ enforceActions: "always" });

 class FoodAndDrinksStore {
  @observable FoodAndDrinksRegistry = new Map();
  @observable FoodAndDrinkss: IFoodAndDrinks[] = [];
  @observable FoodAndDrinks: IFoodAndDrinks | null = null;
  @observable editMode = false;
  @observable target = "";
  constructor() {
    makeObservable(this);
  }
  @computed get FoodAndDrinkssByDate() {
    return Array.from(this.FoodAndDrinksRegistry.values())
      .slice()
      .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  }

  @action loadFoodAndDrinkss = async () => {
    try {
      const FoodAndDrinkss = await agent.FoodAndDrinks.list();
      FoodAndDrinkss.forEach((FoodAndDrinks) => {
        this.FoodAndDrinksRegistry.set(FoodAndDrinks.id, FoodAndDrinks);
      });
    }catch (error) {
      console.log(error);
    }
  };
  

  @action loadFoodAndDrinks = async (id: string) => {
    let FoodAndDrinks = this.getFoodAndDrinks(id);
    if (FoodAndDrinks){ this.FoodAndDrinks = FoodAndDrinks;
  }else{
    try{
      FoodAndDrinks = await agent.FoodAndDrinks.details(id);
      runInAction(() => {
        this.FoodAndDrinks = FoodAndDrinks;
      })
      
    }catch (error){
      console.log(error);
    }
  }
}

  getFoodAndDrinks = (id: string) => {
    return this.FoodAndDrinksRegistry.get(id);
  }

  @action createFoodAndDrinks = async (FoodAndDrinks: IFoodAndDrinks) => {
    try {
      await agent.FoodAndDrinks.create(FoodAndDrinks);
      this.FoodAndDrinksRegistry.set(FoodAndDrinks.id, FoodAndDrinks);
      this.editMode = false;
    } catch (error) {
      console.log(error);
    }
  };

  @action OpenCreateForm = () => {
    this.editMode = true;
    this.FoodAndDrinks = null;
  };

  @action selectFoodAndDrinks = (id: string) => {
    this.FoodAndDrinks = this.FoodAndDrinksRegistry.get(id);
    this.editMode = false;
  };

  @action editFoodAndDrinks = async (FoodAndDrinks: IFoodAndDrinks) => {
    try {
      await agent.FoodAndDrinks.update(FoodAndDrinks);
      FoodAndDrinks.date = new Date(FoodAndDrinks.date!);
      this.FoodAndDrinksRegistry.set(FoodAndDrinks.id, FoodAndDrinks);
      this.FoodAndDrinks = FoodAndDrinks;
      this.editMode = false;
    } catch (error) {
      console.log(error);
    }
  };

  @action openEditForm = (id: string) => {
    this.FoodAndDrinks = this.FoodAndDrinksRegistry.get(id);
    this.editMode = true;
  };

  @action cancelSelectedFoodAndDrinks = () => {
    this.FoodAndDrinks = null;
  };

  @action cancelFormOpen = () => {
    this.editMode = false;
  };

  @action deleteFoodAndDrinks = async (id: string) => {
    try {
      await agent.FoodAndDrinks.delete(id);
      this.FoodAndDrinksRegistry.delete(id);
    } catch (error) {
      console.log(error);
    }
  };
}
export default createContext(new FoodAndDrinksStore());



