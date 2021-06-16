import { action, observable, computed, configure, runInAction, makeObservable } from "mobx";
import { createContext } from "react";
import agent from "../api/agent";
import { ICosmetics } from "../models/cosmetics";

configure({ enforceActions: "never" });

 class CosmeticsStore {
  @observable CosmeticsRegistry = new Map();
  @observable Cosmeticss: ICosmetics[] = [];
  @observable Cosmetics: ICosmetics | null = null;
  @observable editMode = false;
  @observable target = "";
  constructor() {
    makeObservable(this);
  }
  @computed get CosmeticsByDate() {
    return Array.from(this.CosmeticsRegistry.values())
      .slice()
      .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  }

  @action loadCosmetics = async () => {
    try {
      const Cosmeticss = await agent.Cosmetics.list();
      Cosmeticss.forEach((Cosmetics) => {
        this.CosmeticsRegistry.set(Cosmetics.id, Cosmetics);
      });
    }catch (error) {
      console.log(error);
    }
  };

  @action loadcosmetics = async (id: string) => {
    let Cosmetics = this.getCosmetics(id);
    if (Cosmetics){ this.Cosmetics = Cosmetics;
  }else{
    try{
      Cosmetics = await agent.Cosmetics.details(id);
      runInAction(() => {
        this.Cosmetics = Cosmetics;
      })
      
    }catch (error){
      console.log(error);
    }
  }
}

  getCosmetics = (id: string) => {
    return this.CosmeticsRegistry.get(id);
  }

  @action createCosmetics = async (Cosmetics: ICosmetics) => {
    try {
      await agent.Cosmetics.create(Cosmetics);
      this.CosmeticsRegistry.set(Cosmetics.id, Cosmetics);
      this.editMode = false;
    } catch (error) {
      console.log(error);
    }
  };

  @action OpenCreateForm = () => {
    this.editMode = true;
    this.Cosmetics = null;
  };

  @action selectCosmetics = (id: string) => {
    this.Cosmetics = this.CosmeticsRegistry.get(id);
    this.editMode = false;
  };

  @action editCosmetics = async (Cosmetics: ICosmetics) => {
    try {
      await agent.Cosmetics.update(Cosmetics);
      // Cosmetics.date = new Date(Cosmetics.date!);
      this.CosmeticsRegistry.set(Cosmetics.id, Cosmetics);
      this.Cosmetics = Cosmetics;
      this.editMode = false;
    } catch (error) {
      console.log(error);
    }
  };

  @action openEditForm = (id: string) => {
    this.Cosmetics = this.CosmeticsRegistry.get(id);
    this.editMode = true;
  };

  @action cancelSelectedCosmetics = () => {
    this.Cosmetics = null;
  };

  @action cancelFormOpen = () => {
    this.editMode = false;
  };

  @action deleteCosmetics = async (id: string) => {
    try {
      await agent.Cosmetics.delete(id);
      this.CosmeticsRegistry.delete(id);
    } catch (error) {
      console.log(error);
    }
  };
}
export default createContext(new CosmeticsStore());


