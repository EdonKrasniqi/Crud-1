import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Button, Card,  Image } from 'semantic-ui-react'
import SportStore from '../../../app/stores/sportStore'

 interface DetailParams {
   id: string
 }

 const SportDetails: React.FC<RouteComponentProps<DetailParams>> = ({match,history}) => {
   const sportStore = useContext(SportStore);
   const {Sport,loadSport}= sportStore;
    
   useEffect(() => {
     loadSport(match.params.id)
   },[loadSport,match.params.id])
   
   if(!Sport) return <h1>Sports</h1>
   return (
  <Card style={{width:500}} centered color="red">
    <Image src={`/assets/categoryImages/${Sport!.category}.jpg`} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{Sport!.title}</Card.Header>   
      <Card.Description>{Sport!.description}</Card.Description>
      <Card.Description>{Sport!.price}$</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button.Group widths={2}>
          <Button onClick={() => history.push('/orderform')} basic color='green' content='Buy Now'/>
          <Button onClick={() => history.push('/sports')} basic color='red' content='Back'/>
      </Button.Group>
    </Card.Content>
  </Card>
    )
}
export default observer (SportDetails);  


