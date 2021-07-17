import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Link} from 'react-router-dom'
import { Button, Card,  Image } from 'semantic-ui-react'
import Householdtore from '../../../app/stores/householdStore'

 interface DetailParams {
   id: string
 }

 const HouseholdDetails: React.FC<RouteComponentProps<DetailParams>> = ({match,history}) => {
   const householdtore = useContext(Householdtore);
   const {household,loadHousehold}= householdtore;
    
   useEffect(() => {
     loadHousehold(match.params.id)
   },[loadHousehold,match.params.id])
   
   if(!household) return <h1>Household</h1>
   return (
     
  <Card fluid>
    <Image src={`/assets/categoryImages/${household!.category}.jpg`} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{household!.title}</Card.Header>   
      <Card.Description>
      {household!.description}</Card.Description>
      <Card.Description>{household!.price}$</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button.Group widths={2}>
          <Button as={Link} to={`/admin/manageHouseholdForm/${household.id}`} basic color='blue' content='Edit'/>
          <Button onClick={() => history.push('/admin/managehousehold')} basic color='grey' content='Back'/>
      </Button.Group>
    </Card.Content>
  </Card>
    )
}
export default observer (HouseholdDetails);  


