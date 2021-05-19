import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Button, Grid } from "semantic-ui-react";
import ProductList from "./ProductList";
import { NavLink } from "react-router-dom";

const ProductsDashboard: React.FC = ({}) => {
  return (
    <Grid>
      <Grid.Column >
      <Button
        as={NavLink}
        to="/admin/createProducts"
        positive
        content="Add Products"
      />
        <ProductList />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ProductsDashboard);
