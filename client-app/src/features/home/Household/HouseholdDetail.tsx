import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Button, Card,  Image } from 'semantic-ui-react'
import HouseholdStore from '../../../app/stores/householdStore'
import HouseholdDetails from '../../household/details/HouseholdDetails'

 interface DetailParams {
   id: string
 }

 const SportDetails: React.FC<RouteComponentProps<DetailParams>> = ({match,history}) => {
   const householdStore = useContext(HouseholdStore);
   const {household,loadHousehold}= householdStore;
    
   useEffect(() => {
    loadHousehold(match.params.id)
   },[loadHousehold,match.params.id])
   
   if(!household) return <h1>Household</h1>
   return (
  <Card style={{width:500}} centered color="red">
    <Image src={`/assets/categoryImages/${household!.category}.jpg`} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{household!.title}</Card.Header>   
      <Card.Description>{household!.description}</Card.Description>
      <Card.Description>{household!.price}$</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button.Group widths={2}>
          <Button onClick={() => history.push('/orderform')} basic color='green' content='Buy Now'/>
          <Button onClick={() => history.push('/households')} basic color='red' content='Back'/>
      </Button.Group>
    </Card.Content>
  </Card>
    )
}
export default observer (HouseholdDetails);  


