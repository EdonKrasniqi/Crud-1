import { action, observable, computed, configure, runInAction, makeObservable } from "mobx";
import { createContext } from "react";
import agent from "../api/agent";
import { ITools } from "../models/tools";

configure({ enforceActions: "always" });

 class ToolStore {
  @observable ToolRegistry = new Map();
  @observable Tools: ITools[] = [];
  @observable Tool: ITools | null = null;
  @observable editMode = false;
  @observable target = "";
  constructor() {
    makeObservable(this);
  }
  @computed get ToolsByDate() {
    return Array.from(this.ToolRegistry.values())
      .slice()
      .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  }

  @action loadTools = async () => {
    try {
      const Tools = await agent.Tools.list();
      Tools.forEach((Tools) => {
        this.ToolRegistry.set(Tools.id, Tools);
      });
    }catch (error) {
      console.log(error);
    }
  };
  

  @action loadTool = async (id: string) => {
    let Tool = this.getTool(id);
    if (Tool){ this.Tool = Tool;
  }else{
    try{
      Tool = await agent.Tools.details(id);
      runInAction(() => {
        this.Tool = Tool;
      })
      
    }catch (error){
      console.log(error);
    }
  }
}

  getTool = (id: string) => {
    return this.ToolRegistry.get(id);
  }

  @action createTool = async (Tool: ITools) => {
    try {
      await agent.Tools.create(Tool);
      this.ToolRegistry.set(Tool.id, Tool);
      this.editMode = false;
    } catch (error) {
      console.log(error);
    }
  };

  @action OpenCreateForm = () => {
    this.editMode = true;
    this.Tool = null;
  };

  @action selectTool = (id: string) => {
    this.Tool = this.ToolRegistry.get(id);
    this.editMode = false;
  };

  @action editTool = async (Tool: ITools) => {
    try {
      await agent.Tools.update(Tool);
      Tool.date = new Date(Tool.date!);
      this.ToolRegistry.set(Tool.id, Tool);
      this.Tool = Tool;
      this.editMode = false;
    } catch (error) {
      console.log(error);
    }
  };

  @action openEditForm = (id: string) => {
    this.Tool = this.ToolRegistry.get(id);
    this.editMode = true;
  };

  @action cancelSelectedTool = () => {
    this.Tool = null;
  };

  @action cancelFormOpen = () => {
    this.editMode = false;
  };

  @action deleteTool = async (id: string) => {
    try {
      await agent.Tools.delete(id);
      this.ToolRegistry.delete(id);
    } catch (error) {
      console.log(error);
    }
  };
}
export default createContext(new ToolStore());


