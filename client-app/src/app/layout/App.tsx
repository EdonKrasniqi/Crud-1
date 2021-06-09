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
      </Container>
    </Fragment>
    </>
  );
};

export default observer(App);
