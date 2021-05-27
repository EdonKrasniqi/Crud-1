import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Item, Button, Segment, Image, Icon,} from "semantic-ui-react";
import ProductStore from "../../../app/stores/productStore";
import { IProduct } from '../../../app/models/product';
import {format} from 'date-fns';

const ProductList: React.FC = ({}) => {
  const productStore = useContext(ProductStore);
  const { productsByDate, deleteProduct } = productStore;
  return (
    <Segment clearing>
      <Item.Group divided>
        {productsByDate.map((products) => (
          <Item key={products.id}>
            <Item.Content>
              <Image src={`/assets/categoryImages/${products.category}.jpg`} />
              <Item.Header>{products.title}</Item.Header>
              <Item.Meta>{products.date}</Item.Meta>
              <Item.Description>
                <div>{products.description}</div>
                <div>{products.price}$</div>
              </Item.Description>
              <Item.Extra>
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
              </Item.Extra>
            </Item.Content>
          </Item>
          
        ))}
      </Item.Group>
      {/* <Segment>
        <span>
          <Icon name='clock' />{format(products.date!, 'dd MMM yyyy h:mm aa')}
          <Icon name='marker' />{products.price}
        </span>marker
      </Segment> */}
    </Segment>
      
  );
    
};

export default observer(ProductList);
