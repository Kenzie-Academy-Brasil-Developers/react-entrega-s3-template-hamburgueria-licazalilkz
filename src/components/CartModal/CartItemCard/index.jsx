import { MdDelete } from "react-icons/md";
import styles from "./styles.module.scss"

export const CartItemCard = ({ product, removeCart }) => {
   return (
      <li className={styles.content}>
         <div className={styles.productCard}>
            <div>
               <img src={product.img} alt={product.name} />
            </div>
            <h3>{product.name}</h3>
         </div>
         <button onClick={() => removeCart(product.id)} aria-label="delete" title="Remover item">
            <MdDelete size={21} />
         </button>
      </li>
   );
};
