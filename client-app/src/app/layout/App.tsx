import React, { Fragment, useContext, useEffect } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import ProductsDashboard from "../../features/products/dashboard/ProductsDashboard";
import ProductStore from "../stores/productStore";
import { observer } from "mobx-react-lite";
import { Route } from "react-router";
import { HomePage } from "../../features/home/HomePage";
import ProductForm from "../../features/products/form/ProductForm";
import Accessories from "../../features/home/Accessories/Accessories";
import NavBarAdmin from "../../features/nav/NavBarAdmin";
import ProductDetails from "../../features/products/details/ProductDetails";
import AccessoriesDetail from "../../features/home/Accessories/AccessoriesDetail";
import {AdminDashboard} from "../../features/admin/AdminDashboard";
import LoginForm from "../../features/users/LoginForm";
import { useStore } from "../stores/store";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../common/modals/modalContainer";
import ClothingDetails from "../../features/clothing/details/ClothingDetails";
import ClothingForm from "../../features/clothing/form/ClothingForm";
import ClothingDashboard from "../../features/clothing/dashboard/ClothingDashboard";
import Library from "../../features/home/Library/Library";
import LibraryDetails from "../../features/library/details/LibraryDetails";
import LibraryForm from "../../features/library/form/LibraryForm";
import LibraryDashboard from "../../features/library/dashboard/LibraryDashboard";
import Clothing from "../../features/home/Clothing/Clothing";
import LibraryDetail from "../../features/home/Library/LibraryDetail";
import ClothingDetail from "../../features/home/Clothing/ClothingDetail";
import ClothingStore from "../stores/clothingStore";
import LibraryStore from "../stores/libraryStore";
import Sport from "../../features/home/Sport/Sport";
import SportDetail from "../../features/home/Sport/SportDetail";
import SportForm from "../../features/sport/form/SportForm";
import SportDashboard from "../../features/sport/dashboard/SportDashboard";
import SportDetails from "../../features/sport/details/SportDetails";
import SportStore from "../stores/sportStore";
import Health from "../../features/home/Health/Health";
import HealthDetail from "../../features/home/Health/HealthDetail";
import HealthForm from "../../features/health/form/HealthForm";
import HealthDashboard from "../../features/health/dashboard/HealthDashboard";
import HealthDetails from "../../features/health/details/HealthDetails";
import HealthStore from "../stores/healthStore";
import Household from "../../features/home/Household/Household";
import HouseholdDetail from "../../features/home/Household/HouseholdDetail";
import HouseholdForm from "../../features/household/form/HouseholdForm";
import HouseholdDashboard from "../../features/household/dashboard/HouseholdDashboard";
import HouseholdDetails from "../../features/household/details/HouseholdDetails";
import HouseholdStore from "../stores/householdStore";
const App = () => {
  const productStore = useContext(ProductStore);
  const clothingStore = useContext(ClothingStore);
  const libraryStore = useContext(LibraryStore);
  const sportStore = useContext(SportStore);
  const healthStore = useContext(HealthStore);
  const householdStore = useContext(HouseholdStore);
  const {commonStore,userStore} = useStore();

  useEffect(() => {
    productStore.loadProducts();
    clothingStore.loadClothings();
    libraryStore.loadLibrarys();
    sportStore.loadSports();
    healthStore.loadHealths();
    householdStore.loadHouseholds();
    if(commonStore.token){
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    }else{
      commonStore.setAppLoaded();
    }
  }, [productStore,commonStore,userStore,clothingStore,libraryStore,sportStore]);

  if(!commonStore.appLoaded) return <LoadingComponent content='Loading...'/>

  return (
    <>
    <ModalContainer/>
    <Fragment>
      <Container style={{ marginTop: "5em" }}>
        {/* Accessories Routing */}
        <Route exact path="/" component={HomePage} />
        <Route path="/" component={NavBar} />
        <Route exact path="/accesories" component={Accessories} />
        <Route exact path="/accesories/:id" component={AccessoriesDetail} />
        <Route exact path={["/admin/createProducts", '/admin/manage/:id']} component={ProductForm} />
        <Route path="/admin" component={NavBarAdmin} />
        <Route exact path="/admin/manageaccesories" component={ProductsDashboard} />
        <Route exact path="/admin/manageaccesories/:id" component={ProductDetails} />
        <Route path="/login" component={LoginForm} />

        {/* Clothing's Routing */}
        <Route exact path="/clothing" component={Clothing} />
        <Route exact path="/clothings/:id" component={ClothingDetail} />
        <Route exact path={["/admin/createClothing", '/admin/manageClothinForm/:id']} component={ClothingForm} />
        <Route exact path="/admin/manageclothing" component={ClothingDashboard} />
        <Route exact path="/admin/manageclothing/:id" component={ClothingDetails} />

        {/* Library's Routing */}
        <Route exact path="/library" component={Library} />
        <Route exact path="/librarys/:id" component={LibraryDetail} />
        <Route exact path={["/admin/createLibrary", '/admin/manageLibraryForm/:id']} component={LibraryForm} />
        <Route exact path="/admin/managelibrary" component={LibraryDashboard} />
        <Route exact path="/admin/managelibrary/:id" component={LibraryDetails} />

        {/* Sport's Routing */}
        <Route exact path="/sport" component={Sport} />
        <Route exact path="/sports/:id" component={SportDetail} />
        <Route exact path={["/admin/createSports", '/admin/manageSportsForm/:id']} component={SportForm} />
        <Route exact path="/admin/managesport" component={SportDashboard} />
        <Route exact path="/admin/managesport/:id" component={SportDetails} />

        {/* Health's Routing */}
        <Route exact path="/health" component={Health} />
        <Route exact path="/healths/:id" component={HealthDetail} />
        <Route exact path={["/admin/createHealth", '/admin/manageHealthForm/:id']} component={HealthForm} />
        <Route exact path="/admin/managehealth" component={HealthDashboard} />
        <Route exact path="/admin/managehealth/:id" component={HealthDetails} />

        {/* Household's Routing */}
        <Route exact path="/household" component={Household} />
        <Route exact path="/households/:id" component={HouseholdDetail} />
        <Route exact path={["/admin/createHousehold", '/admin/manageHouseholdForm/:id']} component={HouseholdForm} />
        <Route exact path="/admin/managehousehold" component={HouseholdDashboard} />
        <Route exact path="/admin/managehousehold/:id" component={HouseholdDetails} />
      </Container>
    </Fragment>
    </>
  );
};

export default observer(App);
