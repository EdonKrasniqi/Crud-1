import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Item, Button, Segment, Image, Grid, Card,} from 'semantic-ui-react'
import ProductStore from '../../app/stores/productStore'

 const ProductList: React.FC= () => {
    const productStore = useContext(ProductStore);
    const {productsByDate,} = productStore;
    return (
      <Grid>
      
    <Card.Group divided>
        {productsByDate.map(products => (
        <Card color='orange' key={products.id} style={{width: 270}}>
          <Card.Content>
          <Image src={`/assets/categoryImages/${products.category}.jpg`} />
            <Card.Header >{products.title}</Card.Header>
            <Card.Meta>{products.date}</Card.Meta>
            <Card.Description>
              <div>{products.description}</div>
              <div>{products.price}$</div>
            </Card.Description>
            <Card.Content extra>
                <Button as={Link} to={`/accesories/${products.id}`}
                   floated='right' content='View' color='blue'/>
            </Card.Content>
          </Card.Content>
        </Card>
        ))}
    </Card.Group>
    </Grid>
    )
}

export default observer (ProductList);