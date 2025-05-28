import React, { useId } from "react"
import { useCart } from "../hooks/context.tsx";

export function Cart (){
    const{cart, addToCart, clearCart} = useCart();
    const anyItem = cart.length;
    const cartCheckBox = useId();
    return(
        <>
            <label htmlFor={cartCheckBox} className="iconCarro">🛒</label>
            <input type="checkbox" hidden id={cartCheckBox}/>
            <aside className="carroAside">
            {
                anyItem ? ( 
                    cart.map( item => (  
                        <ul>
                            <li className="itemCarrito">
                                <img src={item.thumbnail} alt={item.title} />
                                <div>
                                    <strong>{item.title}</strong> - ${item.price}
                                </div>
                                <footer>
                                    <small>
                                        Qty: {item.quantity}
                                    </small>
                                    <button style={{marginLeft:"5px"}} onClick={() => addToCart(item)}>+</button>
                                </footer>
                            </li>
                        </ul>
                    ))
                ): (<p style={{textAlign: "center"}}>No Agregaste nada al carrito</p>)
            }
            <button className="clearCarrito" onClick={() => clearCart()}>Limpiar Carrito</button>
            </aside>
        </>
    )
}