import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Item, Button, Segment, Image, Grid, Card, } from "semantic-ui-react";
import ToolStore from "../../../app/stores/toolstore";

const ToolList: React.FC = (

) => {
  const toolsstore = useContext(ToolStore);
  const { ToolsByDate, deleteTool } = toolsstore;
  return (
    <Grid centered>
      <Card.Group>
        {ToolsByDate.map((Tool) => (
          <Card key={Tool.id} style={{width: 270}}>
            <Card.Content>
              <Image src={`/assets/categoryImages/${Tool.category}.jpg`} />
              <Card.Header>{Tool.title}</Card.Header>
              <Card.Description>
                <div>{Tool.description}</div>
                <div>{Tool.price}$</div>
              </Card.Description>
              <Card.Content >
                <Button
                  as={Link}
                  to={`/admin/manageTool/${Tool.id}`}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Button
                  onClick={() => deleteTool(Tool.id)}
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
          <Icon name='clock' />{format(Tools.date!, 'dd MMM yyyy h:mm aa')}
          <Icon name='marker' />{Tools.price}
        </span>marker
      </Segment> */}
    </Grid>

  );
    
};

export default observer(ToolList);



