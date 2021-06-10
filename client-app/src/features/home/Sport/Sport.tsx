import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Item, Button, Segment, Image, Grid, Card, Dropdown,} from 'semantic-ui-react'
import SportsStore from '../../../app/stores/sportStore'

 const SportList: React.FC= () => {
    const sportStore = useContext(SportsStore);
    const {SportsByDate} = sportStore;
    return (
      <Grid>
      <Dropdown style={{marginLeft:1022,marginBottom:10}}
    text='Filter'
    icon='filter'
    floating
    labeled
    button
    className='icon'
  >
    <Dropdown.Menu>
      <Dropdown.Header icon='tags' content='Filter by price' />
      <Dropdown.Item>Relevance</Dropdown.Item>
      <Dropdown.Item>Price:Low to High</Dropdown.Item>
      <Dropdown.Item>Price:High to Low</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
    <Card.Group divided>
        {SportsByDate.map(sports => (
        <Card className='cardP'  key={sports.id} style={{width: 270}}>
          <Card.Content>
          <Image  as={Link} to={`/accesories/${sports.id}`} src={`/assets/categoryImages/${sports.category}.jpg`} />
            <Card.Header className='ProductName' as={Link} to={`/accesories/${sports.id}`} >{sports.title}</Card.Header>
            <Card.Content extra>
            <div className='price'>{sports.price} €</div>
            <Card.Description  as={Link} to={`/accesories/${sports.id}`}  className='details'>Look the details</Card.Description>
                <Button className='cart' as={Link} to={`/orderForm`}
                   floated='right' icon='add to cart' color='orange'/>
            </Card.Content>
          </Card.Content>
        </Card>
        ))}
    </Card.Group>
    </Grid>
    )
}

export default observer (SportList);

