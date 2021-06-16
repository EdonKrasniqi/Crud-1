import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Button, Card,  Image } from 'semantic-ui-react'
import ToolStore from '../../../app/stores/toolstore'

 interface DetailParams {
   id: string
 }

 const ToolDetails: React.FC<RouteComponentProps<DetailParams>> = ({match,history}) => {
   const toolStore = useContext(ToolStore);
   const {Tool,loadTool}= toolStore;
    
   useEffect(() => {
     loadTool(match.params.id)
   },[loadTool,match.params.id])
   
   if(!Tool) return <h1>Tools</h1>
   return (
  <Card style={{width:500}} centered color="red">
    <Image src={`/assets/categoryImages/${Tool!.category}.jpg`} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{Tool!.title}</Card.Header>   
      <Card.Description>{Tool!.description}</Card.Description>
      <Card.Description>{Tool!.price}$</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button.Group widths={2}>
          <Button onClick={() => history.push('/orderform')} basic color='green' content='Buy Now'/>
          <Button onClick={() => history.push('/Tools')} basic color='red' content='Back'/>
      </Button.Group>
    </Card.Content>
  </Card>
    )
}
export default observer (ToolDetails);  



