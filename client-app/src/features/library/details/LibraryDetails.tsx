import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Link} from 'react-router-dom'
import { Button, Card,  Image } from 'semantic-ui-react'
import Librarytore from '../../../app/stores/libraryStore'

 interface DetailParams {
   id: string
 }

 const LibraryDetails: React.FC<RouteComponentProps<DetailParams>> = ({match,history}) => {
   const librarytore = useContext(Librarytore);
   const {library,loadLibrary}= librarytore;
    
   useEffect(() => {
     loadLibrary(match.params.id)
   },[loadLibrary,match.params.id])
   
   if(!library) return <h1>Library</h1>
   return (
     
  <Card fluid>
    <Image src={`/assets/categoryImages/${library!.category}.jpg`} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{library!.title}</Card.Header>
      <Card.Description>
      {library!.description}</Card.Description>
      <Card.Description>{library!.price}$</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button.Group widths={2}>
          <Button as={Link} to={`/admin/manageLibraryForm/${library.id}`} basic color='blue' content='Edit'/>
          <Button onClick={() => history.push('/admin/managelibrary')} basic color='grey' content='Back'/>
      </Button.Group>
    </Card.Content>
  </Card>
    )
}
export default observer (LibraryDetails);  

