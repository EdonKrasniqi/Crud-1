import { observer } from "mobx-react-lite";
import { Button, Grid } from "semantic-ui-react";
import SportList from "./SportList";
import { NavLink } from "react-router-dom";

const SportDashboard: React.FC = () => {
  return (
    <div>
  <Button  style={{marginLeft:1200}} 
    as={NavLink}
    to="/admin/createSports"
    positive
    content="Add Sport"
  />
  <SportList />
  </div>
    
       
  );
};

export default observer(SportDashboard);



