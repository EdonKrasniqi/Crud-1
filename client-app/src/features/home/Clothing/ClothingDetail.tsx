import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Button, Card,  Image } from 'semantic-ui-react'
import ClothingStore from '../../../app/stores/clothingStore'

 interface DetailParams {
   id: string
 }

 const ClothingDetails: React.FC<RouteComponentProps<DetailParams>> = ({match,history}) => {
   const clothingStore = useContext(ClothingStore);
   const {clothing,loadClothing}= clothingStore;
    
   useEffect(() => {
    loadClothing(match.params.id)
   },[loadClothing,match.params.id])
   
   if(!clothing) return <h1>Clothings</h1>
   return (
  <Card style={{width:500}} centered color="red">
    <Image src={`/assets/categoryImages/${clothing!.category}.jpg`} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{clothing!.title}</Card.Header>   
      <Card.Description>{clothing!.description}</Card.Description>
      <Card.Description>{clothing!.price}$</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button.Group widths={2}>
          <Button onClick={() => history.push('/orderform')} basic color='green' content='Buy Now'/>
          <Button onClick={() => history.push('/clothing')} basic color='red' content='Back'/>
      </Button.Group>
    </Card.Content>
  </Card>
    )
}
export default observer (ClothingDetails);  