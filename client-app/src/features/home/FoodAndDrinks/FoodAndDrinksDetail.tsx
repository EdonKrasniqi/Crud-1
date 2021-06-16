import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Button, Card,  Image } from 'semantic-ui-react'
import FoodAndDrinksStore from '../../../app/stores/foodandDrinksStore'
import FoodAndDrinksDetails from '../../foodandDrinks/details/FoodAndDrinksDetails'

 interface DetailParams {
   id: string
 }

 const FoodAndDrinkDetails: React.FC<RouteComponentProps<DetailParams>> = ({match,history}) => {
   const foodAndDrinksStore = useContext(FoodAndDrinksStore);
   const {FoodAndDrinks,loadFoodAndDrinks}= foodAndDrinksStore;
    
   useEffect(() => {
    loadFoodAndDrinks(match.params.id)
   },[loadFoodAndDrinks,match.params.id])
   
   if(!FoodAndDrinks) return <h1>FoodAndDrinks</h1>
   return (
  <Card style={{width:500}} centered color="red">
    <Image src={`/assets/categoryImages/${FoodAndDrinks!.category}.jpg`} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{FoodAndDrinks!.title}</Card.Header>   
      <Card.Description>{FoodAndDrinks!.description}</Card.Description>
      <Card.Description>{FoodAndDrinks!.price}$</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button.Group widths={2}>
          <Button onClick={() => history.push('/orderform')} basic color='green' content='Buy Now'/>
          <Button onClick={() => history.push('/FoodAndDrinkss')} basic color='red' content='Back'/>
      </Button.Group>
    </Card.Content>
  </Card>
    )
}
export default observer (FoodAndDrinksDetails);  



