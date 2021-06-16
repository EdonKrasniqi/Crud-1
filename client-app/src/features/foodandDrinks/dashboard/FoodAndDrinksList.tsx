import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Item, Button, Segment, Image, Grid, Card, } from "semantic-ui-react";
import FoodAndDrinksStore from "../../../app/stores/foodandDrinksStore";

const FoodAndDrinksList: React.FC = (

) => {
  const foodandDrinksStore = useContext(FoodAndDrinksStore);
  const { FoodAndDrinkssByDate, deleteFoodAndDrinks } = foodandDrinksStore;
  return (
    <Grid centered>
      <Card.Group>
        {FoodAndDrinkssByDate.map((FoodAndDrinks) => (
          <Card key={FoodAndDrinks.id} style={{width: 270}}>
            <Card.Content>
              <Image src={`/assets/categoryImages/${FoodAndDrinks.category}.jpg`} />
              <Card.Header>{FoodAndDrinks.title}</Card.Header>
              <Card.Description>
                <div>{FoodAndDrinks.description}</div>
                <div>{FoodAndDrinks.price}$</div>
              </Card.Description>
              <Card.Content >
                <Button
                  as={Link}
                  to={`/admin/manageFoodAndDrinkss/${FoodAndDrinks.id}`}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Button
                  onClick={() => deleteFoodAndDrinks(FoodAndDrinks.id)}
                  floated="right"
                  content="Delete"
                  color="red"
                />
              </Card.Content>
            </Card.Content>
          </Card>
          
        ))}
      </Card.Group>
      {/* <Segment>
        <span>
          <Icon name='clock' />{format(FoodAndDrinkss.date!, 'dd MMM yyyy h:mm aa')}
          <Icon name='marker' />{FoodAndDrinkss.price}
        </span>marker
      </Segment> */}
    </Grid>

  );
    
};

export default observer(FoodAndDrinksList);




