import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Link} from 'react-router-dom'
import { Button, Card,  Image } from 'semantic-ui-react'
import FoodAndDrinksStore from '../../../app/stores/foodandDrinksStore'
 interface DetailParams {
   id: string
 }

 const FoodAndDrinksDetails: React.FC<RouteComponentProps<DetailParams>> = ({match,history}) => {
   const FoodAndDrinksstore = useContext(FoodAndDrinksStore);
   const {FoodAndDrinks,loadFoodAndDrinks}= FoodAndDrinksstore;
    
   useEffect(() => {
     loadFoodAndDrinks(match.params.id)
   },[loadFoodAndDrinks,match.params.id])
   
   if(!FoodAndDrinks) return <h1>FoodAndDrinks</h1>
   return (
     
  <Card fluid>
    <Image src={`/assets/categoryImages/${FoodAndDrinks!.category}.jpg`} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{FoodAndDrinks!.title}</Card.Header>  
      <Card.Description>
      {FoodAndDrinks!.description}</Card.Description>
      <Card.Description>{FoodAndDrinks!.price}$</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button.Group widths={2}>
          <Button as={Link} to={`/admin/manageFoodAndDrinksForm/${FoodAndDrinks.id}`} basic color='blue' content='Edit'/>
          <Button onClick={() => history.push('/admin/manageFoodAndDrinkss')} basic color='grey' content='Back'/>
      </Button.Group>
    </Card.Content>
  </Card>
    )
}
export default observer (FoodAndDrinksDetails);  




