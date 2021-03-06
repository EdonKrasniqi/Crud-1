import { observer } from "mobx-react-lite";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Container, Menu, Header, Image, Dropdown} from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

const NavBar: React.FC = () => {
  const {userStore: {user,logout,isLoggedIn},modalStore} = useStore(); 
  return (
    <Menu fixed='top' inverted pointing secondary>
      <Header as='h2' content='OneStopBuy' style={{marginTop: 10}} />
      <Container style={{marginBottom:10}}>
        <Menu.Item name='Home'  as={NavLink} exact to="/">
        </Menu.Item>
        <Menu.Item name="Accessories" as={NavLink} exact to="/accesories"></Menu.Item>
        <Menu.Item name="Sport" as={NavLink} exact to="/sport"></Menu.Item>
        <Menu.Item name="Library" as={NavLink} exact to="/library"></Menu.Item>
        <Menu.Item name="Clothing" as={NavLink} exact to="/clothing"></Menu.Item>
        <Menu.Item name="Health" as={NavLink} exact to="/health"></Menu.Item>
        <Menu.Item name="Household" as={NavLink} exact to="/household"></Menu.Item>
      </Container>
      {isLoggedIn ?(
        <>
         <Menu.Item style={{marginRight:50}}>
           <Image src ={user?.image || '/assets/user.png'} avatar spaced ='right'/>
            <Dropdown pointing ='top left' text={user?.displayName}>
             <Dropdown.Menu>
             <Dropdown.Item as={Link} to={`/profile/${user?.username}`} text="My Profile" icon='user'/>
             <Dropdown.Item text='Orders' icon='cart arrow down'/>
            <Dropdown.Item onClick={logout} text='Logout' icon='power'/>
             </Dropdown.Menu>
            
           </Dropdown>
          </Menu.Item>
        </>
      ): (
        <>
         <Menu.Item name="Contact" as={NavLink} exact to="/contact"></Menu.Item>
        <Menu.Item>
        <Button
           positive
           content="LogIn" onClick={() => modalStore.openModal(<LoginForm />)} exact to="/login" style={{marginRight: 5}}
        />
        <Button
           content="Register" onClick={() => modalStore.openModal(<RegisterForm/>)} exact to="/Register"
        />
      </Menu.Item>
      </>
      )}
    </Menu>
  );
};

export default observer(NavBar);
