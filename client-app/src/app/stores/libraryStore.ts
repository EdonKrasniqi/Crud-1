//ERRORI OSHT TE LIBRARYS
//Duhet me u bo diqka si te Products -> Librarys
//spo vazhdoj me tjerat 


/////////////////////ERRORRR ->>>>>>>>> 33



import { action, observable, computed, configure, runInAction, makeObservable } from "mobx";
import { createContext } from "react";
import agent from "../api/agent";
import { ILibrary } from "../models/library";

configure({ enforceActions: "always" });

 class LibraryStore {
  @observable libraryRegistry = new Map();
  @observable librarys: ILibrary[] = [];
  @observable library: ILibrary | null = null;
  @observable editMode = false;
  @observable target = "";
  constructor() {
    makeObservable(this);
  }
  @computed get librarysByDate() {
    return Array.from(this.libraryRegistry.values())
      .slice()
      .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  }

  /*
  @action loadLibrary = async () => {
    try {
      const librarys = await agent.Library.list();
      librarys.forEach((library) => {
        this.libraryRegistry.set(library.id, library);
      });
    }catch (error) {
      console.log(error);
    }
  }; 
  */

  @action loadLibrary = async (id: string) => {
    let library = this.getLibrary(id);
    if (library){ this.library = library;
  }else{
    try{
      library = await agent.Library.details(id);
      runInAction(() => {
        this.library = library;
      })
      
    }catch (error){
      console.log(error);
    }
  }
}

  getLibrary = (id: string) => {
    return this.libraryRegistry.get(id);
  }

  @action createLibrary = async (library: ILibrary) => {
    try {
      await agent.Library.create(library);
      this.libraryRegistry.set(library.id, library);
      this.editMode = false;
    } catch (error) {
      console.log(error);
    }
  };

  @action OpenCreateForm = () => {
    this.editMode = true;
    this.library = null;
  };

  @action selectLibrary = (id: string) => {
    this.library = this.libraryRegistry.get(id);
    this.editMode = false;
  };

  @action editLibrary = async (library: ILibrary) => {
    try {
      await agent.Library.update(library);
      library.date = new Date(library.date!);
      this.libraryRegistry.set(library.id, library);
      this.library = library;
      this.editMode = false;
    } catch (error) {
      console.log(error);
    }
  };

  @action openEditForm = (id: string) => {
    this.library = this.libraryRegistry.get(id);
    this.editMode = true;
  };

  @action cancelSelectedLibrary = () => {
    this.library = null;
  };

  @action cancelFormOpen = () => {
    this.editMode = false;
  };

  @action deleteLibrary = async (id: string) => {
    try {
      await agent.Library.delete(id);
      this.libraryRegistry.delete(id);
    } catch (error) {
      console.log(error);
    }
  };
}
export default createContext(new LibraryStore());

