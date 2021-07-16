import React, { useContext, useEffect, useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { IClothing } from "../../../app/models/clothing";
import { v4 as uuid } from "uuid";
import ClothingStore from "../../../app/stores/clothingStore";
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

const ClothingForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,history
}) => {
  const clothingStore = useContext(ClothingStore);
  const {
    createClothing,
    editClothing,
    clothing: initialFormState,
    loadClothing
  } = clothingStore;

  useEffect(() => {
    if (match.params.id) {
      loadClothing(match.params.id).then(
        () => initialFormState && setClothing(initialFormState));
    }

  }, [initialFormState,loadClothing,match.params.id])
  const [clothing, setClothing] = useState<IClothing>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: null,
    price: ""
  });

  const validationSchema = Yup.object({
    title: Yup.string().required('The clothings title is required'),
    description: Yup.string().required('The clothings description is required'),
    category: Yup.string().required('Category is required'),
    date: Yup.string().required(),
    price: Yup.string().required()
  })

  function handleFormSubmit(clothing: IClothing) {
    if (clothing.id.length === 0) {
      let newClothing = {
        ...clothing,
        id: uuid(),
      };
      createClothing(newClothing).then(() => history.push(`/admin/manageclothing/${newClothing.id}`));
    } else {
      editClothing(clothing).then(() => history.push(`/admin/manageclothing/${clothing.id}`));
    }
  };

  return (
    <Segment clearing>
      <Header content='Clothing Details' ub color='teal'/>
      <Formik 
      validationSchema={validationSchema}
      enableReinitialize 
      initialValues={clothing} 
      onSubmit={values => handleFormSubmit(values)}>
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className='ui form' onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput name='title' placeholder='Title' />

            <MyTextArea rows={3} name="description" placeholder="Description"/>
            <MySelectInput options={categoryOptions} name="category" placeholder="Category"/>
            <MyDateInput 
              name="date" 
              placeholderText="Date"
              showTimeSelect
              timeCaption='time'
              dateFormat='MMMM d, yyyy h:mm aa'
            />
            <Header content='Price Details' ub color='teal'/>
            <MyTextInput name="price" placeholder="Price"/>
            <Button.Group widths={2}>
            <Button 
              disabled={isSubmitting || !dirty || !isValid}
              positive type="submit" 
              content="Add" 
            />
            <Button onClick={() => history.push(`/admin/manageclothing/${clothing.id}`)} basic color="grey" content="Back"/>
            </Button.Group>
        </Form>
        )}
      
        
        </Formik>
    </Segment>
  );
};
export default observer(ClothingForm);



