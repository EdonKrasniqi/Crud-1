import { action, observable, computed, configure, runInAction, makeObservable } from "mobx";
import { createContext } from "react";
import agent from "../api/agent";
import { IHousehold } from "../models/household";

configure({ enforceActions: "always" });

 class HouseholdStore {
  @observable householdRegistry = new Map();
  @observable households: IHousehold[] = [];
  @observable household: IHousehold | null = null;
  @observable editMode = false;
  @observable target = "";
  constructor() {
    makeObservable(this);
  }
  @computed get householdsByDate() {
    return Array.from(this.householdRegistry.values())
      .slice()
      .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  }

  @action loadHouseholds = async () => {
    try {
      const households = await agent.Household.list();
      households.forEach((household) => {
        this.householdRegistry.set(household.id, household);
      });
    }catch (error) {
      console.log(error);
    }
  };
  

  @action loadHousehold = async (id: string) => {
    let household = this.getHousehold(id);
    if (household){ this.household = household;
  }else{
    try{
      household = await agent.Household.details(id);
      runInAction(() => {
        this.household = household;
      })
      
    }catch (error){
      console.log(error);
    }
  }
}

  getHousehold = (id: string) => {
    return this.householdRegistry.get(id);
  }

  @action createHousehold = async (household: IHousehold) => {
    try {
      await agent.Household.create(household);
      this.householdRegistry.set(household.id, household);
      this.editMode = false;
    } catch (error) {
      console.log(error);
    }
  };

  @action OpenCreateForm = () => {
    this.editMode = true;
    this.household = null;
  };

  @action selectHousehold = (id: string) => {
    this.household = this.householdRegistry.get(id);
    this.editMode = false;
  };

  @action editHousehold = async (household: IHousehold) => {
    try {
      await agent.Household.update(household);
      household.date = new Date(household.date!);
      this.householdRegistry.set(household.id, household);
      this.household = household;
      this.editMode = false;
    } catch (error) {
      console.log(error);
    }
  };

  @action openEditForm = (id: string) => {
    this.household = this.householdRegistry.get(id);
    this.editMode = true;
  };

  @action cancelSelectedHousehold = () => {
    this.household = null;
  };

  @action cancelFormOpen = () => {
    this.editMode = false;
  };

  @action deleteHousehold = async (id: string) => {
    try {
      await agent.Household.delete(id);
      this.householdRegistry.delete(id);
    } catch (error) {
      console.log(error);
    }
  };
}
export default createContext(new HouseholdStore());


