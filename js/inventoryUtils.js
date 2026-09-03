export function searchProducts(products, query){
    const normalizedQuery = query.trim().toLowerCase();
    if(normalizedQuery ===""){
        return products;
    }
    return products.filter((product)=>
        product.name.toLowerCase().includes(normalizedQuery)
     );
}

export function filterProductsByCategory(products, category){
    if (category === "All"){
        return products;
    }
    return products.filter((product) => product.category === category);
}

export function getStockStatus(stock){
    if (stock === 0){
        return "Out of Stock";
    } else if (stock >= 1 && stock <= 5){
        return "Low Stock";
    }else {
        return "In Stock";
    }
}

export function calculateTotalInventoryValue(products){
    return products.reduce((total, product) => total + product.price * product.stock, 0);
}

export function countLowStockProducts(products){
    return products.filter((product) => product.stock >= 1 && product.stock <= 5).length;
}

export function countOutOfStockProducts(products) {
    return products.filter((product) => product.stock === 0).length;
}