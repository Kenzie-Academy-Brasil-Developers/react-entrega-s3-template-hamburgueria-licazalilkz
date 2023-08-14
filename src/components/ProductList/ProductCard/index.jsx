import styles from "./styles.module.scss"

export const ProductCard = ({ product, addCart }) => {
    return(
        <li className={styles.content}>
            <div className={styles.contentProduct}>
                <img src={product.img} alt={product.name} />
            </div>
            <div className={styles.contentInfo}>
                <h3 className="heading3">{product.name}</h3>
                <span className="caption">{product.category}</span>
                <span className="normal">{product.price.toLocaleString('pt-BR', { style: "currency", currency: "BRL"})}</span>
                <button onClick={() => addCart(product)}>Adicionar</button>
            </div>
        </li>
    )
}