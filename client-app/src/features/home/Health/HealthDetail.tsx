import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Button, Card,  Image } from 'semantic-ui-react'
import HealthStore from '../../../app/stores/healthStore'

 interface DetailParams {
   id: string
 }

 const HealthDetails: React.FC<RouteComponentProps<DetailParams>> = ({match,history}) => {
   const healthStore = useContext(HealthStore);
   const {health,loadHealth}= healthStore;
    
   useEffect(() => {
     loadHealth(match.params.id)
   },[loadHealth,match.params.id])
   
   if(!health) return <h1>Sports</h1>
   return (
  <Card style={{width:500}} centered color="red">
    <Image src={`/assets/categoryImages/${health!.category}.jpg`} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{health!.title}</Card.Header>   
      <Card.Description>{health!.description}</Card.Description>
      <Card.Description>{health!.price}$</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button.Group widths={2}>
          <Button onClick={() => history.push('/orderform')} basic color='green' content='Buy Now'/>
          <Button onClick={() => history.push('/health')} basic color='red' content='Back'/>
      </Button.Group>
    </Card.Content>
  </Card>
    )
}
export default observer (HealthDetails);  


