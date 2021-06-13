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
const App = () => {
  const productStore = useContext(ProductStore);
  const clothingStore = useContext(ClothingStore);
  const {commonStore,userStore} = useStore();

  useEffect(() => {
    productStore.loadProducts();
    clothingStore.loadClothings();
    if(commonStore.token){
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    }else{
      commonStore.setAppLoaded();
    }
  }, [productStore,commonStore,userStore,clothingStore]);

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
        <Route  exact path="/clothings/:id" component={ClothingDetail} />
        <Route exact path={["/admin/createClothing", '/admin/manageClothinForm/:id']} component={ClothingForm} />
        <Route exact path="/admin/manageclothing" component={ClothingDashboard} />
        <Route  exact path="/admin/manageclothing/:id" component={ClothingDetails} />

        {/* Library's Routing */}
        <Route exact path="/library" component={Library} />
        <Route path="/library/:id" component={LibraryDetail} />
        <Route path={["/admin/createLibrary", '/admin/manageLibrary/:id']} component={LibraryForm} />
        <Route path="/admin" component={NavBarAdmin} />
        <Route exact path="/admin/managelibrary" component={LibraryDashboard} />
        <Route path="/admin/managelibrary/:id" component={LibraryDetails} />
      </Container>
    </Fragment>
    </>
  );
};

export default observer(App);
