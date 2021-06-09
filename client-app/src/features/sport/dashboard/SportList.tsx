import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Item, Button, Segment, Image, Grid, Card, } from "semantic-ui-react";
import sportStore from "../../../app/stores/sportStore";

const SportList: React.FC = (

) => {
  const sportStore = useContext(sportStore);
  const {SportsByDate, deleteSport } = sportStore;
  return (
    <Grid centered>
      <Card.Group>
        {SportsByDate.map((Sports) => (
          <Card key={Sports.id} style={{width: 270}}>
            <Card.Content>
              <Image src={`/assets/categoryImages/${Sports.category}.jpg`} />
              <Card.Header>{Sports.title}</Card.Header>
              <Card.Meta>{Sports.date}</Card.Meta>
              <Card.Description>
                <div>{Sports.description}</div>
                <div>{Sports.price}$</div>
              </Card.Description>
              <Card.Content >
                <Button
                  as={Link}
                  to={`/admin/manageSports/${Sports.id}`}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Button
                  onClick={() => deleteSport(Sports.id)}
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
          <Icon name='clock' />{format(Sports.date!, 'dd MMM yyyy h:mm aa')}
          <Icon name='marker' />{Sports.price}
        </span>marker
      </Segment> */}
    </Grid>

  );
    
};

export default observer(SportList);



