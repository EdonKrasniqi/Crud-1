import { observer } from "mobx-react-lite";
import { Button, Grid } from "semantic-ui-react";
import HealthList from "./HealthList";
import { NavLink } from "react-router-dom";

const HealthDashboard: React.FC = () => {
  return (
    <div>
  <Button  style={{marginLeft:1200}} 
    as={NavLink}
    to="/admin/createHealth"
    positive
    content="Add Health"
  />
  <HealthList />
  </div>
    
       
  );
};

export default observer(HealthDashboard);



