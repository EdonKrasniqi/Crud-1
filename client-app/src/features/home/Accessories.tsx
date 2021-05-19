import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Item, Button, Segment, Image,} from 'semantic-ui-react'
import ProductStore from '../../app/stores/productStore'

 const ProductList: React.FC= ({
  }) => {
    const productStore = useContext(ProductStore);
    const {productsByDate,} = productStore;
    return (
      <Segment clearing>
    <Item.Group divided>
        {productsByDate.map(products => (
        <Item key={products.id}>
          <Item.Content>
          <Image src={`/assets/categoryImages/${products.category}.jpg`} />
            <Item.Header >{products.title}</Item.Header>
            <Item.Meta>{products.date}</Item.Meta>
            <Item.Description>
              <div>{products.description}</div>
              <div>{products.price}$</div>
            </Item.Description>
            <Item.Extra>
                <Button as={Link} to={`/accesories/${products.id}`}
                   floated='right' content='View' color='blue'/>
            </Item.Extra>
          </Item.Content>
        </Item>
        ))}
    </Item.Group>
    </Segment>
    )
}

export default observer (ProductList);