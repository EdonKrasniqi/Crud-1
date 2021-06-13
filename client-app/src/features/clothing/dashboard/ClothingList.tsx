import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Item, Button, Segment, Image, Grid, Card, } from "semantic-ui-react";
import ClothingStore from "../../../app/stores/clothingStore";

const ClothingList: React.FC = (

) => {
  const clothingStore = useContext(ClothingStore);
  const { clothingsByDate, deleteClothing } = clothingStore;
  return (
    <Grid centered>
      <Card.Group>
        {clothingsByDate.map((clothings) => (
          <Card key={clothings.id} style={{width: 270}}>
            <Card.Content>
              <Image src={`/assets/categoryImages/${clothings.category}.jpg`} />
              <Card.Header>{clothings.title}</Card.Header>
              <Card.Meta>{clothings.date}</Card.Meta>
              <Card.Description>
                <div>{clothings.description}</div>
                <div>{clothings.price}$</div>
              </Card.Description>
              <Card.Content >
                <Button
                  as={Link}
                  to={`/admin/manageclothing/${clothings.id}`}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Button
                  onClick={() => deleteClothing(clothings.id)}
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
          <Icon name='clock' />{format(clothings.date!, 'dd MMM yyyy h:mm aa')}
          <Icon name='marker' />{clothings.price}
        </span>marker
      </Segment> */}
    </Grid>

  );
    
};

export default observer(ClothingList);



