import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button, Image, Grid, Card, Dropdown,} from 'semantic-ui-react'
import ProductStore from '../../../app/stores/productStore'

 const ProductList: React.FC= () => {
    const productStore = useContext(ProductStore);
    const {productsByDate,} = productStore;
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
        {productsByDate.map(products => (
        <Card className='cardP'  key={products.id} style={{width: 270}}>
          <Card.Content>
          <Image  as={Link} to={`/accesories/${products.id}`} src={`/assets/categoryImages/${products.category}.jpg`} />
            <Card.Header className='ProductName' as={Link} to={`/accesories/${products.id}`} >{products.title}</Card.Header>
            <Card.Content extra>
            <div className='price'>{products.price} €</div>
            <Button as={Link} to={`/accesories/${products.id}`}   className='details' content=' Look the details'/>
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

export default observer (ProductList);