import { Route, Routes } from 'react-router-dom'
import Category from '../../category/category.component';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import './shop.styles.scss'
const Shop = () => {
    return (

        <Routes>
            {/* this is index route for its parent route that is /shop 
                means it will render along with its parent route
                so when the shop route render , CategoriesPreview will also render in same time.
        
            */}
            <Route index element={<CategoriesPreview/>}/>
            <Route path=':category' element={<Category/>}/>

        </Routes>
    )



}

export default Shop;