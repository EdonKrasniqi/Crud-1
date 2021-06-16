import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Item, Button, Segment, Image, Grid, Card, Dropdown,} from 'semantic-ui-react'
import FoodAndDrinksStore from '../../../app/stores/foodandDrinksStore'

 const FoodAndDrinksList: React.FC= () => {
    const FoodandDrinksStore = useContext(FoodAndDrinksStore);
    const {FoodAndDrinkssByDate} = FoodandDrinksStore;
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
        {FoodAndDrinkssByDate.map(FoodAndDrinks => (
        <Card className='cardP'  key={FoodAndDrinks.id} style={{width: 270}}>
          <Card.Content>
          <Image  as={Link} to={`/FoodAndDrinks/${FoodAndDrinks.id}`} src={`/assets/categoryImages/${FoodAndDrinks.category}.jpg`} />
            <Card.Header className='ProductName' as={Link} to={`/FoodAndDrinks/${FoodAndDrinks.id}`} >{FoodAndDrinks.title}</Card.Header>
            <Card.Content extra>
            <div className='price'>{FoodAndDrinks.price} €</div>
            <Card.Description  as={Link} to={`/FoodAndDrinks/${FoodAndDrinks.id}`}  className='details'>Look the details</Card.Description>
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

export default observer (FoodAndDrinksList);


