import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Link} from 'react-router-dom'
import { Button, Card,  Image } from 'semantic-ui-react'
import SportStore from '../../../app/stores/sportStore'

 interface DetailParams {
   id: string
 }

 const SportDetails: React.FC<RouteComponentProps<DetailParams>> = ({match,history}) => {
   const sportstore = useContext(SportStore);
   const {Sport,loadSport}= sportstore;
    
   useEffect(() => {
     loadSport(match.params.id)
   },[loadSport,match.params.id])
   
   if(!Sport) return <h1>Sport</h1>
   return (
     
  <Card fluid>
    <Image src={`/assets/categoryImages/${Sport!.category}.jpg`} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{Sport!.title}</Card.Header>  
      <Card.Description>
      {Sport!.description}</Card.Description>
      <Card.Description>{Sport!.price}$</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button.Group widths={2}>
          <Button as={Link} to={`/admin/manageSportsForm/${Sport.id}`} basic color='blue' content='Edit'/>
          <Button onClick={() => history.push('/admin/managesport')} basic color='grey' content='Back'/>
      </Button.Group>
    </Card.Content>
  </Card>
    )
}
export default observer (SportDetails);  


