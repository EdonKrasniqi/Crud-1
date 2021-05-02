import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Button, Card,  Image } from 'semantic-ui-react'
import { IProduct } from '../../../app/models/product'
import ProductStore from '../../../app/stores/productStore'
interface IProps {
  setEditMode: (editMode: boolean) => void;
  setSelectedProduct:(product: IProduct | null) => void;
}
 const ProductDetails: React.FC<IProps> = ({ setEditMode, setSelectedProduct}) => {
   const productStore = useContext(ProductStore);
   const {selectedProduct: product}= productStore;
    return (
  <Card fluid>
    <Image src={`/assets/categoryImages/${product!.category}.png`} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{product!.title}</Card.Header>   
      <Card.Meta>
        <span >{product!.date}</span>
      </Card.Meta>
      <Card.Description>
      {product!.description}
      {product!.price}
      </Card.Description>
      <Card.Description>
      {product!.price}$
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button.Group widths={2}>
          <Button onClick={() => setEditMode(true)} basic color='blue' content='Edit'/>
          <Button onClick={() => setSelectedProduct(null)} basic color='grey' content='Cancel'/>
      </Button.Group>
    </Card.Content>
  </Card>
    )
}
export default observer (ProductDetails);