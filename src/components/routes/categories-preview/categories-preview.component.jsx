
import { Fragment, useContext } from "react"

import { CategoriesContext } from "../../context/categories.context"
import CategoryPreview from '../../category-preview/category-preview.component'
const CategoriesPreview = () => {
    //this is the object haing five keys which are the titles of five categories
    //and their values are objects of the products
    const { categoriesMap } = useContext(CategoriesContext)
    return (
        <div className="category-preview-container">
            {/* here we are extracting all the keys of object , which are the tiltes also */}
            {Object.keys(categoriesMap).map((title) => {
                //this is the actual value of each key, which is an array and having the products
                const products = categoriesMap[title]
                return (
                    <CategoryPreview products={products} key={title} title={title} />
                )
            }

            )}

        </div>
    )

}

export default CategoriesPreview;