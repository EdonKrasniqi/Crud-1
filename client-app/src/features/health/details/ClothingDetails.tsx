import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Link} from 'react-router-dom'
import { Button, Card,  Image } from 'semantic-ui-react'
import Healthtore from '../../../app/stores/healthStore'

 interface DetailParams {
   id: string
 }

 const HealthDetails: React.FC<RouteComponentProps<DetailParams>> = ({match,history}) => {
   const healthtore = useContext(Healthtore);
   const {health,loadHealth}= healthtore;
    
   useEffect(() => {
     loadHealth(match.params.id)
   },[loadHealth,match.params.id])
   
   if(!health) return <h1>Health</h1>
   return (
     
  <Card fluid>
    <Image src={`/assets/categoryImages/${health!.category}.jpg`} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{health!.title}</Card.Header>   
      <Card.Meta><span>{health!.date}</span></Card.Meta>
      <Card.Description>
      {health!.description}</Card.Description>
      <Card.Description>{health!.price}$</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button.Group widths={2}>
          <Button as={Link} to={`/admin/manage/${health.id}`} basic color='blue' content='Edit'/>
          <Button onClick={() => history.push('/admin/managehealths')} basic color='grey' content='Back'/>
      </Button.Group>
    </Card.Content>
  </Card>
    )
}
export default observer (HealthDetails);  


