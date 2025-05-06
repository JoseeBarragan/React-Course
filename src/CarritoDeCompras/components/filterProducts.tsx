export function filterProducts (filter, Products) {
    const productos = Products.products;
    if(filter !== ""){
        const filterProducts = productos.filter(product => {
            const answ = product.category === filter ? product.category: null;
            return answ;
        })
        return filterProducts;
    }
    else{
        return Products.products;
    }
}