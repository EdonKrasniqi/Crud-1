import { observer } from "mobx-react-lite";
import { Button, Grid } from "semantic-ui-react";
import FoodAndDrinksList from "./FoodAndDrinksList";
import { NavLink } from "react-router-dom";

const FoodAndDrinksDashboard: React.FC = () => {
  return (
    <div>
  <Button  style={{marginLeft:1200}} 
    as={NavLink}
    to="/admin/createFoodAndDrinks"
    positive
    content="Add FoodAndDrinks"
  />
  <FoodAndDrinksList />
  </div>
    
       
  );
};

export default observer(FoodAndDrinksDashboard);




