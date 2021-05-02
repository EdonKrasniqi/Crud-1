import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Item, Button, Label, Segment, Image} from 'semantic-ui-react'
import { IProduct } from '../../../app/models/product'
import ProductStore from '../../../app/stores/productStore'
interface IProps { 
    deleteProduct: (id: string) => void;

}  


 const ProductList: React.FC<IProps> = ({
   deleteProduct 
  }) => {
    const productStore = useContext(ProductStore);
    const {products, selectProduct} = productStore;
    return (
<Segment clearing>
    <Item.Group divided>
        {products.map(products => (
        <Item key={products.id}>
          <Item.Content>
          <Image src={`/assets/categoryImages/${products.category}.png`} />
            <Item.Header >{products.title}</Item.Header>
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

export default observer (ProductList);