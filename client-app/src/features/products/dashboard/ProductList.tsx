import React from 'react'
import { Item, Button, Label, Segment} from 'semantic-ui-react'
import { IProduct } from '../../../app/models/product'

interface IProps {
    products: IProduct[];
    selectProduct: (id: string) => void;
    deleteProduct: (id: string) => void;

}


 const ProductList: React.FC<IProps> = ({
   products, 
   selectProduct,
   deleteProduct 
  }) => {
    return (
<Segment clearing>
    <Item.Group divided>
        {products.map(products => (
        <Item key={products.id}>
          <Item.Content>
            <Item.Header as='a'>{products.title}</Item.Header>
            <Item.Meta>{products.date}</Item.Meta>
            <Item.Description>
              <div>{products.description}</div>
              <div>{products.price}$</div>
            </Item.Description>
            <Item.Extra>
                <Button onClick={() => selectProduct(products.id)}
                   floated='right' content='View' color='blue'/>
                <Button onClick={() => deleteProduct(products.id)}
                   floated='right' content='Delete' color='red'/>
                <Label basic content={products.category}/>
            </Item.Extra>
          </Item.Content>
        </Item>
        ))}
    </Item.Group>
</Segment>
        
    )
}

export default ProductList