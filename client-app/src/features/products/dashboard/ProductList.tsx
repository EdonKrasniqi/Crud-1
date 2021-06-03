import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Item, Button, Segment, Image, Grid, Card, } from "semantic-ui-react";
import ProductStore from "../../../app/stores/productStore";

const ProductList: React.FC = (

) => {
  const productStore = useContext(ProductStore);
  const { productsByDate, deleteProduct } = productStore;
  return (
    <Grid centered>
      <Card.Group>
        {productsByDate.map((products) => (
          <Card key={products.id} style={{width: 270}}>
            <Card.Content>
              <Image src={`/assets/categoryImages/${products.category}.jpg`} />
              <Card.Header>{products.title}</Card.Header>
              <Card.Meta>{products.date}</Card.Meta>
              <Card.Description>
                <div>{products.description}</div>
                <div>{products.price}$</div>
              </Card.Description>
              <Card.Content >
                <Button
                  as={Link}
                  to={`/admin/manageaccesories/${products.id}`}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Button
                  onClick={() => deleteProduct(products.id)}
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
          <Icon name='clock' />{format(products.date!, 'dd MMM yyyy h:mm aa')}
          <Icon name='marker' />{products.price}
        </span>marker
      </Segment> */}
    </Grid>

  );
    
};

export default observer(ProductList);
