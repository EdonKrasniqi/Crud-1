import React, { useContext, useEffect, useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { IHealth } from "../../../app/models/health";
import { v4 as uuid } from "uuid";
import HealthStore from "../../../app/stores/healthStore";
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

const HealthForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,history
}) => {
  const healthStore = useContext(HealthStore);
  const {
    createHealth,
    editHealth,
    health: initialFormState,
    loadHealth
  } = healthStore;

  useEffect(() => {
    if (match.params.id) {
      loadHealth(match.params.id).then(
        () => initialFormState && setHealth(initialFormState));
    }

  }, [initialFormState,loadHealth,match.params.id])
  const [health, setHealth] = useState<IHealth>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: null,
    price: ""
  });

  const validationSchema = Yup.object({
    title: Yup.string().required('The healths title is required'),
    description: Yup.string().required('The healths description is required'),
    category: Yup.string().required('Category is required'),
    date: Yup.string().required(),
    price: Yup.string().required()
  })

  function handleFormSubmit(health: IHealth) {
    if (health.id.length === 0) {
      let newHealth = {
        ...health,
        id: uuid(),
      };
      createHealth(newHealth).then(() => history.push(`/admin/managehealth/${newHealth.id}`));
    } else {
      editHealth(health).then(() => history.push(`/admin/managehealth/${health.id}`));
    }
  };

  return (
    <Segment clearing>
      <Header content='Health Details' ub color='teal'/>
      <Formik 
      validationSchema={validationSchema}
      enableReinitialize 
      initialValues={health} 
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
            <Button onClick={() => history.push(`/admin/managehealth/${health.id}`)} basic color="grey" content="Back"/>
            </Button.Group>
        </Form>
        )}
      
        
        </Formik>
    </Segment>
  );
};
export default observer(HealthForm);



