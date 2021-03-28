import React, {useState, useEffect, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import { IProduct } from '../models/product';
import NavBar from '../../features/nav/NavBar';
import ProductsDashboard from '../../features/products/dashboard/ProductsDashboard';
import agent from '../api/agent';


const App = () =>{
 
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null); 
  const [editMode, setEditMode] = useState(false);


  const handlerSelectProduct = (id: string) =>{
     setSelectedProduct(products.filter(a => a.id === id)[0])
     setEditMode(false);
  }
  const handleOpenCreateForm = () => {
    setSelectedProduct(null);
    setEditMode(true);
  }

  const handleCreateProduct = (product: IProduct) => {
    agent.Products.create(product).then(() => {
      setProducts([...products,product])
      setSelectedProduct(product);
      setEditMode(false);
    })
  }

  const handleEditProduct = (product: IProduct) => {
    agent.Products.update(product).then(() => {
      setProducts ([...products.filter(a =>a.id !== product.id), product])
      setSelectedProduct(product);
      setEditMode(false);
    })
  }

  const handleDeleteProduct = (id: string) => {
    agent.Products.delete(id).then(() => {
      setProducts([...products.filter(a => a.id !== id)])
    })
  }

  useEffect(() => {
    agent.Products.list()
     .then((response) =>  {
       let products: IProduct[] = [];
       response.forEach(product => { 
        product.date = product.date.split('.')[0];
        products.push(product);
       })
      
      setProducts(products)
     });  
  }, []); 

    return (
      <Fragment>
        <NavBar openCreateForm={handleOpenCreateForm} />
        <Container style={{marginTop: '5em'}}>
        <ProductsDashboard 
        products={products} 
        selectProduct={handlerSelectProduct} 
        selectedProduct={selectedProduct}
        editMode={editMode}
        setEditMode={setEditMode}
        setSelectedProduct={setSelectedProduct}
        createProduct={handleCreateProduct}
        editProduct={handleEditProduct}
        deleteProduct={handleDeleteProduct}
        />
        </Container>
      </Fragment>  
    );
};

export default App;