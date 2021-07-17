import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Item, Button, Segment, Image, Grid, Card, } from "semantic-ui-react";
import HouseholdStore from "../../../app/stores/householdStore";

const HouseholdList: React.FC = (

) => {
  const householdStore = useContext(HouseholdStore);
  const { householdsByDate, deleteHousehold } = householdStore;
  return (
    <Grid centered>
      <Card.Group>
        {householdsByDate.map((households) => (
          <Card key={households.id} style={{width: 270}}>
            <Card.Content>
              <Image src={`/assets/categoryImages/${households.category}.jpg`} />
              <Card.Header>{households.title}</Card.Header>
              <Card.Description>
                <div>{households.description}</div>
                <div>{households.price}$</div>
              </Card.Description>
              <Card.Content >
                <Button
                  as={Link}
                  to={`/admin/managehousehold/${households.id}`}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Button
                  onClick={() => deleteHousehold(households.id)}
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
          <Icon name='clock' />{format(households.date!, 'dd MMM yyyy h:mm aa')}
          <Icon name='marker' />{households.price}
        </span>marker
      </Segment> */}
    </Grid>

  );
    
};

export default observer(HouseholdList);



