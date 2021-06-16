import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Item, Button, Segment, Image, Grid, Card, } from "semantic-ui-react";
import CosmeticStore from "../../../app/stores/cosmeticStore";

const CosmeticList: React.FC = (

) => {
  const cosmeticStore = useContext(CosmeticStore);
  const { CosmeticsByDate, deleteCosmetics } = cosmeticStore;
  return (
    <Grid centered>
      <Card.Group>
        {CosmeticsByDate.map((cosmetics) => (
          <Card key={cosmetics.id} style={{width: 270}}>
            <Card.Content>
              <Image src={`/assets/categoryImages/${cosmetics.category}.jpg`} />
              <Card.Header>{cosmetics.title}</Card.Header>
              <Card.Description>
                <div>{cosmetics.description}</div>
                <div>{cosmetics.price}$</div>
              </Card.Description>
              <Card.Content >
                <Button
                  as={Link}
                  to={`/admin/manageCosmetic/${cosmetics.id}`}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Button
                  onClick={() =>  deleteCosmetics(cosmetics.id)}
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
          <Icon name='clock' />{format(Cosmetics.date!, 'dd MMM yyyy h:mm aa')}
          <Icon name='marker' />{Cosmetics.price}
        </span>marker
      </Segment> */}
    </Grid>

  );
    
};

export default observer(CosmeticList);




