import { useEffect, useState } from "react";
import { CartModal } from "../../components/CartModal";
import { Header } from "../../components/Header";
import { ProductList } from "../../components/ProductList";
import {api} from "../../axios/api";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

export const HomePage = () => {
   const [productList, setProductList] = useState([]);
   const [cartList, setCartList] = useState([]);
   const [search, setSearch] = useState("");
   const [isVisible, setVisible] = useState(false);

   useEffect(() => {
      const getProducts = async() => {
         try{
            const response = await api.get("products");
            setProductList(response.data)
         }catch (error){
            console.log(error);
         }
      }
      getProducts();
   }, []);

   /** */
   /** */
   const filteredProducts = productList.filter( product => 
      product.name.toLowerCase().includes(search.toLocaleLowerCase()) 
      ||
      product.category.toLowerCase().includes(search.toLocaleLowerCase()) 
   );

   const resetFilter  = () => {
      setSearch("");
   }

   const productListered = search ? filteredProducts : productList ; 

   /** */

   const addCart = (product) => {
      if(!cartList.some(cartProduct => cartProduct.id === product.id )){
         setCartList([...cartList, product]);
         toast.success(`${product.name} adicionado ao carrinho ! :)`)
      }else{
         toast.error("Opa! Ja foi adicionado, que tal outra coisa ein ?")
      }
   }

   const removeCart = (productId) => {
      const newCartList = cartList.filter(cart => cart.id !== productId);
      toast.dark(`Item removido do carrinho ! Que pena, era tao gostoso :(`)
      setCartList(newCartList);
   }

   // console.log(productListered);
   // console.log(cartList);

   // useEffect montagem - carrega os produtos da API e joga em productList
   // useEffect atualização - salva os produtos no localStorage (carregar no estado)
   // adição, exclusão, e exclusão geral do carrinho
   // renderizações condições e o estado para exibir ou não o carrinho
   // filtro de busca
   // estilizar tudo com sass de forma responsiva

   return (
      <>
         <Header setSearch={setSearch} setVisible={setVisible} resetFilter={resetFilter}/>
         <main>
            <ProductList addCart={addCart} resetFilter={resetFilter} productList={productListered}/>
            {/* {isVisible ? <CartModal CartModal={cartList} setVisible={setVisible}/> : null} */}
            <CartModal cartList={cartList} setVisible={setVisible} removeCart={removeCart} />
            <ToastContainer/>
         </main>
      </>
   );
};
