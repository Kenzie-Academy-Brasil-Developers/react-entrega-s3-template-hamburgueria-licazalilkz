import { ProductCard } from "./ProductCard";
import styles from "./styles.module.scss";


export const ProductList = ({ addCart, productList }) => {
   return (
      <div className="container">
         {productList.length > 0 ?(
            <ul className={styles.content}>
               {productList.map((product) => (
                  <ProductCard key={product.id} product={product} addCart={addCart} />
               ))}
            </ul>
         ):(
            <p>Nenhum resultado encontrado !</p>
         )}

      </div>
   );
};
