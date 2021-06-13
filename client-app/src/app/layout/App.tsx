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
import ClothingDetails from "../../features/health/details/ClothingDetails";
import ClothingForm from "../../features/clothing/form/ClothingForm";
import ClothingDashboard from "../../features/clothing/dashboard/ClothingDashboard";
import Library from "../../features/home/Library/Library";
import LibraryDetails from "../../features/library/details/LibraryDetails";
import LibraryForm from "../../features/library/form/LibraryForm";
import LibraryDashboard from "../../features/library/dashboard/LibraryDashboard";
import Clothing from "../../features/home/Clothing/Clothing";
const App = () => {
  const productStore = useContext(ProductStore);
  const {commonStore,userStore} = useStore();

  useEffect(() => {
    productStore.loadProducts();
    if(commonStore.token){
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    }else{
      commonStore.setAppLoaded();
    }
  }, [productStore,commonStore,userStore]);

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
        <Route path="/accesories/:id" component={AccessoriesDetail} />
        <Route path={["/admin/createProducts", '/admin/manage/:id']} component={ProductForm} />
        <Route path="/admin" component={NavBarAdmin} />
        <Route exact path="/admin" component={AdminDashboard} />
        <Route exact path="/admin/manageaccesories" component={ProductsDashboard} />
        <Route path="/admin/manageaccesories/:id" component={ProductDetails} />
        <Route path="/login" component={LoginForm} />

        {/* Clothing's Routing */}
        <Route exact path="/clothing" component={Clothing} />
        <Route path="/clothings/:id" component={ClothingDetails} />
        <Route path={["/admin/createClothing", '/admin/manageClothing/:id']} component={ClothingForm} />
        <Route exact path="/admin/manageclothing" component={ClothingDashboard} />
        <Route path="/admin/manageclothing/:id" component={ClothingDetails} />

        {/* Library's Routing */}
        <Route exact path="/library" component={Library} />
        <Route path="/library/:id" component={LibraryDetails} />
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
