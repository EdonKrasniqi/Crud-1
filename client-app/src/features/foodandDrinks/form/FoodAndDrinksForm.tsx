import React, { useContext, useEffect, useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { IFoodAndDrinks } from "../../../app/models/foodandDrinks";
import { v4 as uuid } from "uuid";
import FoodAndDrinksStore from "../../../app/stores/foodandDrinksStore";
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

const FoodAndDrinksForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,history
}) => {
  const foodAndDrinksStore = useContext(FoodAndDrinksStore);
  const {
    createFoodAndDrinks,
    editFoodAndDrinks,
    FoodAndDrinks: initialFormState,
    loadFoodAndDrinks
  } = foodAndDrinksStore;

  useEffect(() => {
    if (match.params.id) {
      loadFoodAndDrinks(match.params.id).then(
        () => initialFormState && setFoodAndDrinks(initialFormState));
    }

  }, [initialFormState,loadFoodAndDrinks,match.params.id])
  const [FoodAndDrinks, setFoodAndDrinks] = useState<IFoodAndDrinks>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: null,
    price: ""
  });

  const validationSchema = Yup.object({
    title: Yup.string().required('The FoodAndDrinkss title is required'),
    description: Yup.string().required('The FoodAndDrinkss description is required'),
    category: Yup.string().required('Category is required'),
    date: Yup.string().required(),
    price: Yup.string().required()
  })

  const handleFormSubmit = (FoodAndDrinks: IFoodAndDrinks) => {
    if (FoodAndDrinks.id.length === 0) {
      let newFoodAndDrinks = {
        ...FoodAndDrinks,
        id: uuid(),
      };
      createFoodAndDrinks(newFoodAndDrinks).then(() => history.push(`/admin/manageaccesories/${newFoodAndDrinks.id}`));
    } else {
      editFoodAndDrinks(FoodAndDrinks).then(() => history.push(`/admin/manageaccesories/${FoodAndDrinks.id}`));
    }
  };


  return (
    <Segment clearing>
      <Header content='FoodAndDrinks Details' color='teal'/>
      <Formik 
      validationSchema={validationSchema}
      enableReinitialize 
      initialValues={FoodAndDrinks} 
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
            <Button onClick={() => history.push(`/admin/manageaccesories/${FoodAndDrinks.id}`)} basic color="grey" content="Back"/>
            </Button.Group>
        </Form>
        )}
      
        
        </Formik>
    </Segment>
  );
};
export default observer(FoodAndDrinksForm);


