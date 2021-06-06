import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Button, Card,  Image } from 'semantic-ui-react'
import LibraryStore from '../../app/stores/libraryStore'

 interface DetailParams {
   id: string
 }

 const LibraryDetails: React.FC<RouteComponentProps<DetailParams>> = ({match,history}) => {
   const libraryStore = useContext(LibraryStore);
   const {library,loadLibrary}= libraryStore;
    
   useEffect(() => {
     loadLibrary(match.params.id)
   },[loadLibrary,match.params.id])
   
   if(!library) return <h1>Librarys</h1>
   return (
  <Card style={{width:500}} centered color="red">
    <Image src={`/assets/categoryImages/${library!.category}.jpg`} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{library!.title}</Card.Header>   
      <Card.Description>{library!.description}</Card.Description>
      <Card.Description>{library!.price}$</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button.Group widths={2}>
          <Button onClick={() => history.push('/orderform')} basic color='green' content='Buy Now'/>
          <Button onClick={() => history.push('/accesories')} basic color='red' content='Back'/>
      </Button.Group>
    </Card.Content>
  </Card>
    )
}
export default observer (LibraryDetails);  

