import { action, observable, computed, configure, runInAction, makeObservable } from "mobx";
import { createContext } from "react";
import agent from "../api/agent";
import { IHealth } from "../models/health";

configure({ enforceActions: "always" });

 class HealthStore {
  @observable healthRegistry = new Map();
  @observable healths: IHealth[] = [];
  @observable health: IHealth | null = null;
  @observable editMode = false;
  @observable target = "";
  constructor() {
    makeObservable(this);
  }
  @computed get healthsByDate() {
    return Array.from(this.healthRegistry.values())
      .slice()
      .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  }

  @action loadHealths = async () => {
    try {
      const healths = await agent.Health.list();
      healths.forEach((health) => {
        this.healthRegistry.set(health.id, health);
      });
    }catch (error) {
      console.log(error);
    }
  };
  

  @action loadHealth = async (id: string) => {
    let health = this.getHealth(id);
    if (health){ this.health = health;
  }else{
    try{
      health = await agent.Health.details(id);
      runInAction(() => {
        this.health = health;
      })
      
    }catch (error){
      console.log(error);
    }
  }
}

  getHealth = (id: string) => {
    return this.healthRegistry.get(id);
  }

  @action createHealth = async (health: IHealth) => {
    try {
      await agent.Health.create(health);
      this.healthRegistry.set(health.id, health);
      this.editMode = false;
    } catch (error) {
      console.log(error);
    }
  };

  @action OpenCreateForm = () => {
    this.editMode = true;
    this.health = null;
  };

  @action selectHealth = (id: string) => {
    this.health = this.healthRegistry.get(id);
    this.editMode = false;
  };

  @action editHealth = async (health: IHealth) => {
    try {
      await agent.Health.update(health);
      health.date = new Date(health.date!);
      this.healthRegistry.set(health.id, health);
      this.health = health;
      this.editMode = false;
    } catch (error) {
      console.log(error);
    }
  };

  @action openEditForm = (id: string) => {
    this.health = this.healthRegistry.get(id);
    this.editMode = true;
  };

  @action cancelSelectedHealth = () => {
    this.health = null;
  };

  @action cancelFormOpen = () => {
    this.editMode = false;
  };

  @action deleteHealth = async (id: string) => {
    try {
      await agent.Health.delete(id);
      this.healthRegistry.delete(id);
    } catch (error) {
      console.log(error);
    }
  };
}
export default createContext(new HealthStore());


