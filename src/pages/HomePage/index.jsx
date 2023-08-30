import { useEffect, useState } from "react";
import { CartModal } from "../../components/CartModal";
import { Header } from "../../components/Header";
import { ProductList } from "../../components/ProductList";
import {api} from "../../axios/api";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

export const HomePage = () => {
   const storageCart = localStorage.getItem("@cartProduct");

   const [productList, setProductList] = useState([]);
   const [cartList, setCartList] = useState(storageCart ?JSON.parse(storageCart) : []);
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

   useEffect(()=>{
      localStorage.setItem("@cartProduct", JSON.stringify(cartList))
   }, [cartList])

   const filteredProducts = productList.filter( product => 
      product.name.toLowerCase().includes(search.toLocaleLowerCase()) 
      ||
      product.category.toLowerCase().includes(search.toLocaleLowerCase()) 
   );

   const productListered = search ? filteredProducts : productList ; 

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

   function removeAll(){
      setCartList([]);
   }

   return (
      <>
         <Header setSearch={setSearch} setVisible={setVisible} cartList={cartList}/>
         <main>
            <ProductList addCart={addCart} productList={productListered}/>
            {isVisible ? <CartModal cartList={cartList} setVisible={setVisible} removeCart={removeCart} removeAll={removeAll}/> : null}
            <ToastContainer/>
         </main>
      </>
   );
};
