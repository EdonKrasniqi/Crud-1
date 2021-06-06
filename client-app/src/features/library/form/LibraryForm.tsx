import React, { useContext, useEffect, useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { ILibrary } from "../../../app/models/library";
import { v4 as uuid } from "uuid";
import LibraryStore from "../../../app/stores/libraryStore";
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

const LibraryForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,history
}) => {
  const libraryStore = useContext(LibraryStore);
  const {
    createLibrary,
    editLibrary,
    library: initialFormState,
    loadLibrary
  } = libraryStore;

  useEffect(() => {
    if (match.params.id) {
      loadLibrary(match.params.id).then(
        () => initialFormState && setLibrary(initialFormState));
    }

  }, [initialFormState,loadLibrary,match.params.id])
  const [library, setLibrary] = useState<ILibrary>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: null,
    price: ""
  });

  const validationSchema = Yup.object({
    title: Yup.string().required('The librarys title is required'),
    description: Yup.string().required('The librarys description is required'),
    category: Yup.string().required('Image name is required'),
    date: Yup.string().required(),
    price: Yup.string().required()
  })

  function handleFormSubmit(library: ILibrary) {
    if (library.id.length === 0) {
      let newLibrary = {
        ...library,
        id: uuid(),
      };
      createLibrary(newLibrary).then(() => history.push(`/admin/manageaccesories/${newLibrary.id}`));
    } else {
      editLibrary(library).then(() => history.push(`/admin/manageaccesories/${library.id}`));
    }
  };

  return (
    <Segment clearing>
      <Header content='Library Details' ub color='teal'/>
      <Formik 
      validationSchema={validationSchema}
      enableReinitialize 
      initialValues={library} 
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
            <Button onClick={() => history.push(`/admin/manageaccesories/${library.id}`)} basic color="grey" content="Back"/>
            </Button.Group>
        </Form>
        )}
      
        
        </Formik>
    </Segment>
  );
};
export default observer(LibraryForm);


