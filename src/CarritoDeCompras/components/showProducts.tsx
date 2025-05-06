import { filterProducts } from './filterProducts.tsx';
import Products from '../mocks/products.json';
import { useState } from 'react';
import { useCart } from '../hooks/context.tsx';

export function ProductsShow(){
    const [produc, setProduct] = useState(Products.products);
    const { cart, addToCart, removeFromCart } = useCart()
    const handleChange = (event) => {
        const selection = event.target.value;
        setProduct(filterProducts(selection, Products));
    }
    return(
        <main>
            <h1>Shopping Cart 🛒</h1>
            <h2>Products: </h2>
            <label htmlFor="">Eliga su Categorias</label>
            <select name="" id="" style={{marginLeft: "10px"}} onChange={handleChange}>
                <option value="">Todo</option>
                <option value="smartphones">smartphones</option>
                <option value="laptops">laptops</option>
                <option value="fragrances">fragrances</option>
                <option value="groceries">groceries</option>
                <option value="home-decoration">home-decoration</option>
            </select>
            <section className='container'>
            {
                produc.map(product => {
                    const isInCart = cart.some(item => item.id === product.id);
                    return(
                        <article key={product.id}>
                            <h3>{product.title} - ${product.price}</h3>
                            <img src={product.thumbnail} alt={product.title}/>
                            <p>{product.description}</p>
                            <button className='btn' style={{backgroundColor: isInCart ? 'red': 'rgb(0, 132, 255)'}} value={product.id} onClick={() => isInCart ? removeFromCart(product): addToCart(product)}>{isInCart ? 'Eliminar del 🛒': 'Agregar al 🛒'}</button>
                        </article>
                    )
                })
            }
            </section>
        </main>
    )
}