import { observer } from "mobx-react-lite";
import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Header, Menu } from "semantic-ui-react";

const NavBarAdmin: React.FC = () => {
  return (
    <Menu fixed="top" inverted pointing secondary>
      <Header as='h2' content='OneStopBuy' style={{marginTop: 10}} />
      <Container>
        <Menu.Item className= "adminnav" name="AdminDashboard" as={NavLink} exact to="/admin"></Menu.Item>
        <Menu.Item className= "adminnav" name="Manage Accessories" as={NavLink} exact to="/admin/manageaccesories"></Menu.Item>
        <Menu.Item className= "adminnav" name="Manage Sport" as={NavLink} exact to="/admin/managesport"></Menu.Item>
        <Menu.Item className= "adminnav" name="Manage Library" as={NavLink} exact to="/admin/managelibrary"></Menu.Item>
        <Menu.Item className= "adminnav" name="Manage Clothing" as={NavLink} exact to="/admin/manageclothing"></Menu.Item>
        <Menu.Item className= "adminnav" name="Manage Health" as={NavLink} exact to="/admin/managehealth"></Menu.Item>
        <Menu.Item className= "adminnav" name="Manage Household" as={NavLink} exact to="/admin/managehousehold"></Menu.Item>
      </Container>
      <Menu.Item>
      </Menu.Item>
    </Menu>
  );
};

export default observer(NavBarAdmin);
