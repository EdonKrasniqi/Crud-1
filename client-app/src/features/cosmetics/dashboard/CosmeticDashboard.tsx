import { observer } from "mobx-react-lite";
import { Button, Grid } from "semantic-ui-react";
import CosmeticList from "./CosmeticList";
import { NavLink } from "react-router-dom";

const CosmeticDashboard: React.FC = () => {
  return (
    <div>
  <Button  style={{marginLeft:1200}} 
    as={NavLink}
    to="/admin/createCosmetic"
    positive
    content="Add Cosmetic"
  />
  <CosmeticList />
  </div>
    
       
  );
};

export default observer(CosmeticDashboard);




