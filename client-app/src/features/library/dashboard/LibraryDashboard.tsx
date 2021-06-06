import { observer } from "mobx-react-lite";
import { Button, Grid } from "semantic-ui-react";
import LibraryList from "./LibraryList";
import { NavLink } from "react-router-dom";

const LibraryDashboard: React.FC = () => {
  return (
    <div>
  <Button  style={{marginLeft:1200}} 
    as={NavLink}
    to="/admin/createLibrary"
    positive
    content="Add Library"
  />
  <ProductList />
  </div>
    
       
  );
};

export default observer(LibraryDashboard);


