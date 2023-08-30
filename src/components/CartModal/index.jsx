import { MdClose } from "react-icons/md";
import { CartItemCard } from "./CartItemCard";
import { nanoid } from "nanoid";
import styles from "./styles.module.scss"

export const CartModal = ({ cartList, setVisible, removeCart, removeAll}) => {
      const total = cartList.reduce((acumulador, valorAtual)=>{
         return acumulador += valorAtual.price;
      },0);
      
   return (
      <div className={styles.modal} role="dialog">
         <div className={styles.modalBox}>
            <div className={styles.headerModal}>
               <h2 className="heading3">Carrinho de compras</h2>
               <button onClick={()=> setVisible(false)} aria-label="close" title="Fechar">
                  <MdClose size={21} />
               </button>
            </div>
            <div>
               <ul>
                  {cartList.map((product) => (
                     <CartItemCard key={nanoid()} product={product} removeCart={removeCart} />
                  ))
                  }
               </ul>
            </div>
            <div className={styles.rectangle}></div>
            <div className={styles.footerModal}>
               <div>
                  <span>Total</span>
                  <span>{total.toLocaleString('pt-BR', { style: "currency", currency: "BRL"})}</span>
               </div>
               <button onClick={()=> removeAll()}>Remover todos</button>
            </div>
         </div>
      </div>
   );
};