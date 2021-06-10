import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Link} from 'react-router-dom'
import { Button, Card,  Image } from 'semantic-ui-react'
import ProductStore from '../../../app/stores/productStore'

 interface DetailParams {
   id: string
 }

 const ProductDetails: React.FC<RouteComponentProps<DetailParams>> = ({match,history}) => {
   const productStore = useContext(ProductStore);
   const {product,loadProduct}= productStore;
    
   useEffect(() => {
     loadProduct(match.params.id)
   },[loadProduct,match.params.id])
   
   if(!product) return <h1>Error 404</h1>
   return (
     
  <Card fluid>
    <Image src={`/assets/categoryImages/${product!.category}.jpg`} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{product!.title}</Card.Header>
      <Card.Description>
      {product!.description}</Card.Description>
      <Card.Description>{product!.price}$</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button.Group widths={2}>
          <Button as={Link} to={`/admin/manage/${product.id}`} basic color='blue' content='Edit'/>
          <Button onClick={() => history.push('/admin/manageaccesories')} basic color='grey' content='Back'/>
      </Button.Group>
    </Card.Content>
  </Card>
    )
}
export default observer (ProductDetails);  