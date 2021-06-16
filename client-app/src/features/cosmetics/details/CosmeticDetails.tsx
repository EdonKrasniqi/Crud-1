import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Link} from 'react-router-dom'
import { Button, Card,  Image } from 'semantic-ui-react'
import CosmeticStore from '../../../app/stores/cosmeticStore'
 interface DetailParams {
   id: string
 }

 const CosmeticDetails: React.FC<RouteComponentProps<DetailParams>> = ({match,history}) => {
   const Cosmeticstore = useContext(CosmeticStore);
   const {Cosmetics,loadcosmetics}= Cosmeticstore;
    
   useEffect(() => {
     loadcosmetics(match.params.id)
   },[loadcosmetics,match.params.id])
   
   if(!Cosmetics) return <h1>Cosmetic</h1>
   return (
     
  <Card fluid>
    <Image src={`/assets/categoryImages/${Cosmetics!.category}.jpg`} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{Cosmetics!.title}</Card.Header>  
      <Card.Description>
      {Cosmetics!.description}</Card.Description>
      <Card.Description>{Cosmetics!.price}$</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button.Group widths={2}>
          <Button as={Link} to={`/admin/manageCosmeticForm/${Cosmetics.id}`} basic color='blue' content='Edit'/>
          <Button onClick={() => history.push('/admin/manageCosmetics')} basic color='grey' content='Back'/>
      </Button.Group>
    </Card.Content>
  </Card>
    )
}
export default observer (CosmeticDetails);  



