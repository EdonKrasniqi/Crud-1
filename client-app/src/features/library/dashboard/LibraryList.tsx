import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Item, Button, Segment, Image, Grid, Card, } from "semantic-ui-react";
import LibraryStore from "../../../app/stores/libraryStore";

const LibraryList: React.FC = (

) => {
  const libraryStore = useContext(LibraryStore);
  const { librarysByDate, deleteLibrary } = libraryStore;
  return (
    <Grid centered>
      <Card.Group>
        {librarysByDate.map((librarys) => (
          <Card key={librarys.id} style={{width: 270}}>
            <Card.Content>
              <Image src={`/assets/categoryImages/${librarys.category}.jpg`} />
              <Card.Header>{librarys.title}</Card.Header>
              <Card.Meta>{librarys.date}</Card.Meta>
              <Card.Description>
                <div>{librarys.description}</div>
                <div>{librarys.price}$</div>
              </Card.Description>
              <Card.Content >
                <Button
                  as={Link}
                  to={`/admin/managelibrarys/${librarys.id}`}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Button
                  onClick={() => deleteLibrary(librarys.id)}
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
          <Icon name='clock' />{format(librarys.date!, 'dd MMM yyyy h:mm aa')}
          <Icon name='marker' />{librarys.price}
        </span>marker
      </Segment> */}
    </Grid>

  );
    
};

export default observer(LibraryList);


