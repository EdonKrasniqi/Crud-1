import React, { useContext, useEffect, useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { ISport } from "../../../app/models/Sport";
import { v4 as uuid } from "uuid";
import SportStore from "../../../app/stores/sportStore";
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

const SportForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,history
}) => {
  const sportStore = useContext(SportStore);
  const {
    createSport,
    editSport,
    Sport: initialFormState,
    loadSport
  } = sportStore;

  useEffect(() => {
    if (match.params.id) {
      loadSport(match.params.id).then(
        () => initialFormState && setSport(initialFormState));
    }

  }, [initialFormState,loadSport,match.params.id])
  const [sport, setSport] = useState<ISport>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: null,
    price: ""
  });

  const validationSchema = Yup.object({
    title: Yup.string().required('The sports title is required'),
    description: Yup.string().required('The sports description is required'),
    category: Yup.string().required('Image name is required'),
    date: Yup.string().required(),
    price: Yup.string().required()
  })

  function handleFormSubmit(sport: ISport) {
    if (sport.id.length === 0) {
      let newSport = {
        ...sport,
        id: uuid(),
      };
      createSport(newSport).then(() => history.push(`/admin/managesport/${newSport.id}`));
    } else {
      editSport(sport).then(() => history.push(`/admin/managesport/${sport.id}`));
    }
  };

  return (
    <Segment clearing>
      <Header content='Sport Details' ub color='teal'/>
      <Formik 
      validationSchema={validationSchema}
      enableReinitialize 
      initialValues={sport} 
      onSubmit={values => handleFormSubmit(values)}>
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className='ui form' onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput name='title' placeholder='Title' />

            <MyTextArea rows={3} name="description" placeholder="Description"/>
            <MySelectInput options={categoryOptions} name="category" placeholder="Image Name"/>
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
            <Button onClick={() => history.push(`/admin/managesport/${sport.id}`)} basic color="grey" content="Back"/>
            </Button.Group>
        </Form>
        )}
      
        
        </Formik>
    </Segment>
  );
};
export default observer(SportForm);


