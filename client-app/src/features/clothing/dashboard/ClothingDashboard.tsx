import { observer } from "mobx-react-lite";
import { Button, Grid } from "semantic-ui-react";
import ClothingList from "./ClothingList";
import { NavLink } from "react-router-dom";

const ClothingDashboard: React.FC = () => {
  return (
    <div>
  <Button  style={{marginLeft:1200}} 
    as={NavLink}
    to="/admin/createClothing"
    positive
    content="Add Clothing"
  />
  <ClothingList />
  </div>
    
       
  );
};

export default observer(ClothingDashboard);



