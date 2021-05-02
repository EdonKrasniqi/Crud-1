import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Grid } from 'semantic-ui-react'
import { IProduct } from '../../../app/models/product'
import ProductDetails from '../details/ProductDetails'
import ProductForm from '../form/ProductForm'
import ProductList from './ProductList'
import ProductStore from '../../../app/stores/productStore'

interface IProps {
    products: IProduct[]
    selectProduct: (id: string) => void;
    setEditMode: (editMode:boolean) => void;
    setSelectedProduct: (product: IProduct | null) => void;
    createProduct: (product: IProduct) => void;
    editProduct: (product: IProduct) => void;
    deleteProduct: (id: string) => void;
}

 const ProductsDashboard: React.FC<IProps> = ({
     products, 
     selectProduct,
     setEditMode,
     setSelectedProduct,
     createProduct,
     editProduct,
     deleteProduct

    
    }) => {
        const productStore = useContext(ProductStore);
        const {editMode, selectedProduct} = productStore;
    return (
        <Grid>
            <Grid.Column width={10}>
                <ProductList
                deleteProduct={deleteProduct}
                
                />
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedProduct && !editMode &&(
                <ProductDetails
                setEditMode={setEditMode}
                setSelectedProduct={setSelectedProduct}
                />
                )}
                {editMode &&
                <ProductForm 
                key={selectedProduct && selectedProduct.id || 0}
                setEditMode={setEditMode} 
                product={selectedProduct!} 
                createProduct={createProduct} 
                editProduct={editProduct} />}
            </Grid.Column>
        </Grid>
    )
}

export default observer (ProductsDashboard);