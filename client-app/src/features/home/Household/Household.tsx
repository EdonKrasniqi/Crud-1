import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Item, Button, Segment, Image, Grid, Card, Dropdown,} from 'semantic-ui-react'
import HouseholdStore from '../../../app/stores/householdStore'

 const HouseholdList: React.FC= () => {
    const householdStore = useContext(HouseholdStore);
    const {householdsByDate} = householdStore;
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
        {householdsByDate.map(household => (
        <Card className='cardP'  key={household.id} style={{width: 270}}>
          <Card.Content>
          <Image  as={Link} to={`/household/${household.id}`} src={`/assets/categoryImages/${household.category}.jpg`} />
            <Card.Header className='ProductName' as={Link} to={`/household/${household.id}`} >{household.title}</Card.Header>
            <Card.Content extra>
            <div className='price'>{household.price} €</div>
            <Card.Description  as={Link} to={`/household/${household.id}`}  className='details'>Look the details</Card.Description>
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

export default observer (HouseholdList);

