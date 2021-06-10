import React, { useContext, useEffect, useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { IProduct } from "../../../app/models/product";
import { v4 as uuid } from "uuid";
import ProductStore from "../../../app/stores/productStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import { Formik, Form, } from 'formik';
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";

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

  }, [initialFormState,loadProduct,match.params.id])
  const [product, setProduct] = useState<IProduct>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: null,
    price: ""
  });

  const validationSchema = Yup.object({
    title: Yup.string().required('The products title is required'),
    description: Yup.string().required('The products description is required'),
    category: Yup.string().required('Image name is required'),
    date: Yup.string().required(),
    price: Yup.string().required()
  })

  const handleFormSubmit = (product: IProduct) => {
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



  return (
    <Segment clearing>
      <Header content='Product Details' color='teal'/>
      <Formik 
      validationSchema={validationSchema}
      enableReinitialize 
      initialValues={product} 
      onSubmit={values=> handleFormSubmit(values)}>
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className='ui form' onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput name='title' placeholder='Title' />

            <MyTextArea rows={3} name="description" placeholder="Description"/>
            <MySelectInput options={categoryOptions} name="category" placeholder="Image Name"/>
            <MyDateInput 
              name="date" 
              placeholderText="Date"
              dateFormat='MMMM d, yyyy h:mm aa'
            />
            <Header content='Price Details' color='teal'/>
            <MyTextInput name="price" placeholder="Price"/>
            <Button.Group widths={2}>
            <Button 
              disabled={isSubmitting || !dirty || !isValid}
              positive type="submit" 
              content="Add" 
            />
            <Button onClick={() => history.push(`/admin/manageaccesories/${product.id}`)} basic color="grey" content="Back"/>
            </Button.Group>
        </Form>
        )}
      
        
        </Formik>
    </Segment>
  );
};
export default observer(ProductForm);
