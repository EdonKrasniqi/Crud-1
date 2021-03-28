import React, {FormEvent, useState} from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { IProduct } from '../../../app/models/product'
import {v4 as uuid} from 'uuid';

interface IProps {
    setEditMode: (editMode: boolean) => void;
    product: IProduct;
    createProduct: (product: IProduct) => void;
    editProduct: (product: IProduct) => void;
}

 const ProductForm: React.FC<IProps> = ({
     setEditMode, 
     product: initialFormState,
     createProduct,
     editProduct
     

    
    }) => {

    const initializeForm = () => {
        if(initialFormState){
            return initialFormState
        }
        else {
            return{
                id: '',
                title: '',
                category: '',
                description: '',
                date: '',
                price: ''
            };
        }
    };

    const [product, setProduct] = useState<IProduct>(initializeForm)

    const handleSubmit = () => {
        if(product.id.length === 0){
            let newProduct ={
                ...product,
                id: uuid()
            }
            createProduct(newProduct)
        }
        else{
            editProduct(product)
        }
    }

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const {name, value} = event.currentTarget;
        setProduct({...product, [name]: value})
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input onChange={handleInputChange} name="title" placeholder='Title' value={product.title}/>
                <Form.TextArea onChange={handleInputChange} name="description" rows={2} placeholder='Description' value={product.description}/>
                <Form.Input onChange={handleInputChange} name="category" placeholder='Category' value={product.category}/>
                <Form.Input onChange={handleInputChange} name="date" type="datetime-local" placeholder='Date' value={product.date}/>
                <Form.Input onChange={handleInputChange} name="price" placeholder='Price' value={product.price}/>
                <Button.Group widths={2}>
                    <Button positive type='submit' content='Add'/>
                    <Button onClick={() => setEditMode(false)} basic color='grey' content='Cancel'/>
                </Button.Group>
                
            </Form>
        </Segment>
    )
}
export default ProductForm