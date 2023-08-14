import { useState } from "react";
import Logo from "../../assets/Logo.svg";
import { MdSearch, MdShoppingCart } from "react-icons/md";
import styles from "./styles.module.scss"

export const Header = ({ setSearch, setVisible, resetFilter }) => {
   const [value, setValue] = useState("");

   const submit = (e) => {
      e.preventDefault();
      setSearch(value);
      setValue("");
   }

   return (
      <header>
         <div className="container">
            <div className={styles.content}>
               <img src={Logo} alt="Logo Kenzie Burguer" />

               <button className={styles.buttonAll} onClick={resetFilter}>Mostra todos</button>

               <div>
                  <button onClick={() => setVisible(true)}>
                     <MdShoppingCart size={21} />
                     <span>0</span>
                  </button>
                  <form onSubmit={submit}>
                     <input
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        required
                     />
                     <button type="submit">
                        <MdSearch size={21} />
                     </button>
                  </form>
               </div>
            </div>
         </div>
      </header>
   );
};
