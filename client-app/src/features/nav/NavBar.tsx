import { observer } from "mobx-react-lite";
import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu, Header } from "semantic-ui-react";

const NavBar: React.FC = ({}) => {
  return (
    <Menu fixed="top" inverted>
      <Header as='h2' content='OneStopBuy' style={{marginTop: 10}} />
      <Container>
        <Menu.Item header as={NavLink} exact to="/">
          Home
        </Menu.Item>
        <Menu.Item name="Accessories" as={NavLink} exact to="/accesories"></Menu.Item>
        <Menu.Item name="Auto" as={NavLink} exact to="/auto"></Menu.Item>
        <Menu.Item name="Library" as={NavLink} exact to="/library"></Menu.Item>
        <Menu.Item name="Clothing" as={NavLink}exact to="/clothing"></Menu.Item>
        <Menu.Item name="Health" as={NavLink} exact to="/health"></Menu.Item>
      </Container>
      <Menu.Item>
        <Button
           positive
           content="LogIn"
        />
        <Button
           grey
           content="Sign Up"
        />
      </Menu.Item>
    </Menu>
  );
};

export default observer(NavBar);
