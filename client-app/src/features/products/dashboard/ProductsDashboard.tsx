import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import ProductList from "./ProductList";
import { NavLink } from "react-router-dom";

const ProductsDashboard: React.FC = () => {
  return (
    <div>
  <Button  style={{marginLeft:1200}} 
    as={NavLink}
    to="/admin/createProducts"
    positive
    content="Add Products"
  />
  <ProductList />
  </div>
    
       
  );
};

export default observer(ProductsDashboard);
