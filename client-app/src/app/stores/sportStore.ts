import { action, observable, computed, configure, runInAction, makeObservable } from "mobx";
import { createContext } from "react";
import agent from "../api/agent";
import { ISport } from "../models/Sport";

configure({ enforceActions: "always" });

 class SportStore {
  @observable SportRegistry = new Map();
  @observable Sports: ISport[] = [];
  @observable Sport: ISport | null = null;
  @observable editMode = false;
  @observable target = "";
  constructor() {
    makeObservable(this);
  }
  @computed get SportsByDate() {
    return Array.from(this.SportRegistry.values())
      .slice()
      .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  }

  @action loadSports = async () => {
    try {
      const Sports = await agent.Sport.list();
      Sports.forEach((sport) => {
        this.SportRegistry.set(sport.id, sport);
      });
    }catch (error) {
      console.log(error);
    }
  };

  @action loadSport = async (id: string) => {
    let Sport = this.getSport(id);
    if (Sport){ this.Sport = Sport;
  }else{
    try{
      Sport = await agent.Sport.details(id);
      runInAction(() => {
        this.Sport = Sport;
      })
      
    }catch (error){
      console.log(error);
    }
  }
}

  getSport = (id: string) => {
    return this.SportRegistry.get(id);
  }

  @action createSport = async (Sport: ISport) => {
    try {
      await agent.Sport.create(Sport);
      this.SportRegistry.set(Sport.id, Sport);
      this.editMode = false;
    } catch (error) {
      console.log(error);
    }
  };

  @action OpenCreateForm = () => {
    this.editMode = true;
    this.Sport = null;
  };

  @action selectSport = (id: string) => {
    this.Sport = this.SportRegistry.get(id);
    this.editMode = false;
  };

  @action editSport = async (Sport: ISport) => {
    try {
      await agent.Sport.update(Sport);
      Sport.date = new Date(Sport.date!);
      this.SportRegistry.set(Sport.id, Sport);
      this.Sport = Sport;
      this.editMode = false;
    } catch (error) {
      console.log(error);
    }
  };

  @action openEditForm = (id: string) => {
    this.Sport = this.SportRegistry.get(id);
    this.editMode = true;
  };

  @action cancelSelectedSport = () => {
    this.Sport = null;
  };

  @action cancelFormOpen = () => {
    this.editMode = false;
  };

  @action deleteSport = async (id: string) => {
    try {
      await agent.Sport.delete(id);
      this.SportRegistry.delete(id);
    } catch (error) {
      console.log(error);
    }
  };
}
export default createContext(new SportStore());
