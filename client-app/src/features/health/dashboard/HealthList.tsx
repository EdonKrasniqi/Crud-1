import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Item, Button, Segment, Image, Grid, Card, } from "semantic-ui-react";
import HealthStore from "../../../app/stores/healthStore";

const HealthList: React.FC = (

) => {
  const healthStore = useContext(HealthStore);
  const { healthsByDate, deleteHealth } = healthStore;
  return (
    <Grid centered>
      <Card.Group>
        {healthsByDate.map((healths) => (
          <Card key={healths.id} style={{width: 270}}>
            <Card.Content>
              <Image src={`/assets/categoryImages/${healths.category}.jpg`} />
              <Card.Header>{healths.title}</Card.Header>
              <Card.Meta>{healths.date}</Card.Meta>
              <Card.Description>
                <div>{healths.description}</div>
                <div>{healths.price}$</div>
              </Card.Description>
              <Card.Content >
                <Button
                  as={Link}
                  to={`/admin/managehealth/${healths.id}`}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Button
                  onClick={() => deleteHealth(healths.id)}
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
          <Icon name='clock' />{format(healths.date!, 'dd MMM yyyy h:mm aa')}
          <Icon name='marker' />{healths.price}
        </span>marker
      </Segment> */}
    </Grid>

  );
    
};

export default observer(HealthList);



