import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button, Image, Grid, Card, Dropdown,} from 'semantic-ui-react'
import ClothingStore from '../../../app/stores/clothingStore'

 const ClothingList: React.FC= () => {
    const clothingStore = useContext(ClothingStore);
    const {clothingsByDate,} = clothingStore;
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
    <Card.Group>
        {clothingsByDate.map(clothings => (
        <Card className='cardP'  key={clothings.id} style={{width: 270}}>
          <Card.Content>
          <Image  as={Link} to={`/clothing/${clothings.id}`} src={`/assets/categoryImages/${clothings.category}.jpg`} />
            <Card.Header className='ProductName' as={Link} to={`/clothings/${clothings.id}`} >{clothings.title}</Card.Header>
            <Card.Content extra>
            <div className='price'>{clothings.price} €</div>
            <Card.Description  as={Link} to={`/clothing/${clothings.id}`}  className='details'>Look the details</Card.Description>
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

export default observer (ClothingList);