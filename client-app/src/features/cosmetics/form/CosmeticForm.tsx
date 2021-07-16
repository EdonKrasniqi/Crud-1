import React, { useContext, useEffect, useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { ICosmetics } from "../../../app/models/cosmetics";
import { v4 as uuid } from "uuid";
import CosmeticStore from "../../../app/stores/cosmeticStore";
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

const CosmeticForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,history
}) => {
  const cosmeticStore = useContext(CosmeticStore);
  const {
    createCosmetics,
    editCosmetics,
    Cosmetics: initialFormState,
    loadcosmetics
  } = cosmeticStore;

  useEffect(() => {
    if (match.params.id) {
      loadcosmetics(match.params.id).then(
        () => initialFormState && setCosmetic(initialFormState));
    }

  }, [initialFormState,loadcosmetics,match.params.id])
  const [Cosmetic, setCosmetic] = useState<ICosmetics>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: null,
    price: ""
  });

  const validationSchema = Yup.object({
    title: Yup.string().required('The Cosmetics title is required'),
    description: Yup.string().required('The Cosmetics description is required'),
    category: Yup.string().required('Category is required'),
    date: Yup.string().required(),
    price: Yup.string().required()
  })

  const handleFormSubmit = (Cosmetic: ICosmetics) => {
    if (Cosmetic.id.length === 0) {
      let newCosmetic = {
        ...Cosmetic,
        id: uuid(),
      };
      createCosmetics(newCosmetic).then(() => history.push(`/admin/manageaccesories/${newCosmetic.id}`));
    } else {
      editCosmetics(Cosmetic).then(() => history.push(`/admin/manageaccesories/${Cosmetic.id}`));
    }
  };


  return (
    <Segment clearing>
      <Header content='Cosmetic Details' color='teal'/>
      <Formik 
      validationSchema={validationSchema}
      enableReinitialize 
      initialValues={Cosmetic} 
      onSubmit={values=> handleFormSubmit(values)}>
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className='ui form' onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput name='title' placeholder='Title' />

            <MyTextArea rows={3} name="description" placeholder="Description"/>
            <MySelectInput options={categoryOptions} name="category" placeholder="Category"/>
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
            <Button onClick={() => history.push(`/admin/manageaccesories/${Cosmetic.id}`)} basic color="grey" content="Back"/>
            </Button.Group>
        </Form>
        )}
      
        
        </Formik>
    </Segment>
  );
};
export default observer(CosmeticForm);


