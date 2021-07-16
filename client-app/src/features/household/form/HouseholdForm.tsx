import React, { useContext, useEffect, useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { IHousehold } from "../../../app/models/household";
import { v4 as uuid } from "uuid";
import HouseholdStore from "../../../app/stores/householdStore";
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

const HouseholdForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,history
}) => {
  const householdStore = useContext(HouseholdStore);
  const {
    createHousehold,
    editHousehold,
    household: initialFormState,
    loadHousehold
  } = householdStore;

  useEffect(() => {
    if (match.params.id) {
      loadHousehold(match.params.id).then(
        () => initialFormState && setHousehold(initialFormState));
    }

  }, [initialFormState,loadHousehold,match.params.id])
  const [household, setHousehold] = useState<IHousehold>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: null,
    price: ""
  });

  const validationSchema = Yup.object({
    title: Yup.string().required('The households title is required'),
    description: Yup.string().required('The households description is required'),
    category: Yup.string().required('Category is required'),
    date: Yup.string().required(),
    price: Yup.string().required()
  })

  function handleFormSubmit(household: IHousehold) {
    if (household.id.length === 0) {
      let newHousehold = {
        ...household,
        id: uuid(),
      };
      createHousehold(newHousehold).then(() => history.push(`/admin/managehousehold/${newHousehold.id}`));
    } else {
      editHousehold(household).then(() => history.push(`/admin/managehousehold/${household.id}`));
    }
  };

  return (
    <Segment clearing>
      <Header content='Household Details' ub color='teal'/>
      <Formik 
      validationSchema={validationSchema}
      enableReinitialize 
      initialValues={household} 
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
            <Button onClick={() => history.push(`/admin/managehousehold/${household.id}`)} basic color="grey" content="Back"/>
            </Button.Group>
        </Form>
        )}
      
        
        </Formik>
    </Segment>
  );
};
export default observer(HouseholdForm);



