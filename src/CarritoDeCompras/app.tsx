import { ProductsShow } from './components/showProducts.tsx';
import {Cart} from './components/cart.tsx'
import { CartProvider } from './components/addToCart.tsx';
export function App() {
    return(
        <CartProvider>
            <Cart/>
            <ProductsShow/>
        </CartProvider>
    )
}

