import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Link} from 'react-router-dom'
import { Button, Card,  Image } from 'semantic-ui-react'
import Toolstore from '../../../app/stores/toolstore'

 interface DetailParams {
   id: string
 }

 const ToolDetails: React.FC<RouteComponentProps<DetailParams>> = ({match,history}) => {
   const ToolStore = useContext(Toolstore);
   const {Tool,loadTool}= ToolStore;
    
   useEffect(() => {
     loadTool(match.params.id)
   },[loadTool,match.params.id])
   
   if(!Tool) return <h1>Tool</h1>
   return (
     
  <Card fluid>
    <Image src={`/assets/categoryImages/${Tool!.category}.jpg`} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{Tool!.title}</Card.Header>
      <Card.Description>
      {Tool!.description}</Card.Description>
      <Card.Description>{Tool!.price}$</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button.Group widths={2}>
          <Button as={Link} to={`/admin/manageToolForm/${Tool.id}`} basic color='blue' content='Edit'/>
          <Button onClick={() => history.push('/admin/managelibraries')} basic color='grey' content='Back'/>
      </Button.Group>
    </Card.Content>
  </Card>
    )
}
export default observer (ToolDetails);  


