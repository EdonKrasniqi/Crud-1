import { observer } from "mobx-react-lite";
import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Header, Menu } from "semantic-ui-react";

const NavBarAdmin: React.FC = () => {
  return (
    <Menu fixed="top" inverted>
      <Header as='h2' content='OneStopBuy' style={{marginTop: 10}} />
      <Container>
        <Menu.Item header as={NavLink} exact to="/admin">
          AdminDashboard
        </Menu.Item>
        <Menu.Item name="Manage Accessories" as={NavLink} exact to="/admin/manageaccesories"></Menu.Item>
        <Menu.Item name="Manage Auto" as={NavLink} exact to="/admin/manageauto"></Menu.Item>
        <Menu.Item name="Manage Library" as={NavLink} exact to="/admin/managelibrary"></Menu.Item>
        <Menu.Item name="Manage Clothing" as={NavLink}exact to="/admin/manageclothing"></Menu.Item>
        <Menu.Item name="Manage Health" as={NavLink} exact to="/admin/managehealth"></Menu.Item>
      </Container>
      <Menu.Item>
      </Menu.Item>
    </Menu>
  );
};

export default observer(NavBarAdmin);
