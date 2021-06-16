import { observer } from "mobx-react-lite";
import { Button, Grid } from "semantic-ui-react";
import ToolList from "./ToolsList";
import { NavLink } from "react-router-dom";

const ToolDashboard: React.FC = () => {
  return (
    <div>
  <Button  style={{marginLeft:1200}} 
    as={NavLink}
    to="/admin/createTool"
    positive
    content="Add Tool"
  />
  <ToolList />
  </div>
    
       
  );
};

export default observer(ToolDashboard);



