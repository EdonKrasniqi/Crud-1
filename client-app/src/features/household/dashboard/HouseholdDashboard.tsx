import { observer } from "mobx-react-lite";
import { Button, Grid } from "semantic-ui-react";
import HouseholdList from "./HouseholdList";
import { NavLink } from "react-router-dom";

const HouseholdDashboard: React.FC = () => {
  return (
    <div>
  <Button  style={{marginLeft:1200}} 
    as={NavLink}
    to="/admin/createHousehold"
    positive
    content="Add Household"
  />
  <HouseholdList />
  </div>
    
       
  );
};

export default observer(HouseholdDashboard);



