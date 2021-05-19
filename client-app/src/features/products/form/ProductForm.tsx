import React, { FormEvent, useContext, useEffect, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { IProduct } from "../../../app/models/product";
import { v4 as uuid } from "uuid";
import ProductStore from "../../../app/stores/productStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";

interface DetailParams {
  id: string;
}

const ProductForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,history
}) => {
  const productStore = useContext(ProductStore);
  const {
    createProduct,
    editProduct,
    product: initialFormState,
    loadProduct
  } = productStore;

  useEffect(() => {
    if (match.params.id) {
      loadProduct(match.params.id).then(
        () => initialFormState && setProduct(initialFormState));
    }

  }, [])
  const [product, setProduct] = useState<IProduct>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    price: ""
  });

  const handleSubmit = () => {
    if (product.id.length === 0) {
      let newProduct = {
        ...product,
        id: uuid(),
      };
      createProduct(newProduct).then(() => history.push(`/admin/manageaccesories/${newProduct.id}`));
    } else {
      editProduct(product).then(() => history.push(`/admin/manageaccesories/${product.id}`));
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setProduct({ ...product, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name="title"
          placeholder="Title"
          value={product.title}
        />
        <Form.TextArea
          onChange={handleInputChange}
          name="description"
          rows={2}
          placeholder="Description"
          value={product.description}
        />
        <Form.Input
          onChange={handleInputChange}
          name="category"
          placeholder="Image Name"
          value={product.category}
        />
        <Form.Input
          onChange={handleInputChange}
          name="date"
          type="datetime-local"
          placeholder="Date"
          value={product.date}
        />
        <Form.Input
          onChange={handleInputChange}
          name="price"
          placeholder="Price"
          value={product.price}
        />
        <Button.Group widths={2}>
          <Button positive type="submit" content="Add" />
          <Button
            onClick={() => history.push(`/admin/manageaccesories/${product.id}`)}
            basic
            color="grey"
            content="Back"
          />
        </Button.Group>
      </Form>
    </Segment>
  );
};
export default observer(ProductForm);
