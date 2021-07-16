import React, { useContext, useEffect, useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { ITools } from "../../../app/models/tools";
import { v4 as uuid } from "uuid";
import ToolStore from "../../../app/stores/toolstore";
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

const ToolForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,history
}) => {
  const Toolstore = useContext(ToolStore);
  const {
    createTool,
    editTool,
    Tool: initialFormState,
    loadTool
  } = Toolstore;

  useEffect(() => {
    if (match.params.id) {
      loadTool(match.params.id).then(
        () => initialFormState && setTool(initialFormState));
    }

  }, [initialFormState,loadTool,match.params.id])
  const [Tool, setTool] = useState<ITools>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: null,
    price: ""
  });

  const validationSchema = Yup.object({
    title: Yup.string().required('The Tools title is required'),
    description: Yup.string().required('The Tools description is required'),
    category: Yup.string().required('Category is required'),
    date: Yup.string().required(),
    price: Yup.string().required()
  })

  const handleFormSubmit = (Tool: ITools) => {
    if (Tool.id.length === 0) {
      let newTool = {
        ...Tool,
        id: uuid(),
      };
      createTool(newTool).then(() => history.push(`/admin/manageaccesories/${newTool.id}`));
    } else {
      editTool(Tool).then(() => history.push(`/admin/manageaccesories/${Tool.id}`));
    }
  };


  return (
    <Segment clearing>
      <Header content='Tool Details' color='teal'/>
      <Formik 
      validationSchema={validationSchema}
      enableReinitialize 
      initialValues={Tool} 
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
            <Button onClick={() => history.push(`/admin/manageaccesories/${Tool.id}`)} basic color="grey" content="Back"/>
            </Button.Group>
        </Form>
        )}
      
        
        </Formik>
    </Segment>
  );
};
export default observer(ToolForm);


