import React from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'

interface IProps {
    openCreateForm: () => void;
}

 const NavBar: React.FC<IProps> = ({openCreateForm}) => {
    return (
        <Menu fixed='top' inverted>
          <Container>
          <Menu.Item header>
              <img src="/assets/logo.png" alt="logo" style={{marginRight: 5}}/>
              HamsterShop
          </Menu.Item>
          <Menu.Item name='Products'></Menu.Item>
          </Container>
          <Menu.Item>
              <Button onClick={openCreateForm} positive content="Add Products" />
          </Menu.Item>
        </Menu>
    )
}

export default NavBar