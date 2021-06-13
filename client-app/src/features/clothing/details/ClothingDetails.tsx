import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Link} from 'react-router-dom'
import { Button, Card,  Image } from 'semantic-ui-react'
import Clothingtore from '../../../app/stores/clothingStore'

 interface DetailParams {
   id: string
 }

 const ClothingDetails: React.FC<RouteComponentProps<DetailParams>> = ({match,history}) => {
   const clothingtore = useContext(Clothingtore);
   const {clothing,loadClothing}= clothingtore;
    
   useEffect(() => {
     loadClothing(match.params.id)
   },[loadClothing,match.params.id])
   
   if(!clothing) return <h1>Clothing</h1>
   return (
     
  <Card fluid>
    <Image src={`/assets/categoryImages/${clothing!.category}.jpg`} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{clothing!.title}</Card.Header>   
      <Card.Meta><span>{clothing!.date}</span></Card.Meta>
      <Card.Description>
      {clothing!.description}</Card.Description>
      <Card.Description>{clothing!.price}$</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button.Group widths={2}>
          <Button as={Link} to={`/admin/manageClothing/${clothing.id}`} basic color='blue' content='Edit'/>
          <Button onClick={() => history.push('/admin/manageclothings')} basic color='grey' content='Back'/>
      </Button.Group>
    </Card.Content>
  </Card>
    )
}
export default observer (ClothingDetails);  


