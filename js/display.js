import { getStockStatus } from "./inventoryUtils.js";
export function displayProducts(products){
    const productList = document.getElementById("productList");
    const noResultsMessage = document.getElementById("noResultsMessage");
    productList.innerHTML = "";
    if (products.length === 0){
        noResultsMessage.textContent = "No product found";
        noResultsMessage.style.display = "block";
        return;
    }

    noResultsMessage.style.display = "none";

    products.forEach((product) => {
       const {id, name, category, price, stock} = product;
       const status = getStockStatus(stock);
       const card = document.createElement("div");
       card.className = "product-card";
       card.dataset.id = id;
       
       const statusClass = status.toLowerCase().replace(/\s+/g, "-");
       card.innerHTML = `
       <h3 class="product-name">${name}</h3>
       <p class="product-category">${category}</p>
       <p class="product-price">P${price.toLocaleString()}</p>
       <p class="product-stock">stock: ${stock}</p>
       <p class="product-status ${statusClass}">${status}</p>
       `;
       productList.appendChild(card);
    });
}

export function displayTotalInventoryValue(total){
    const totalInventoryValue = document.getElementById("totalInventoryValue");
    totalInventoryValue.textContent = `P${total.toLocaleString()}`;
}


export function displayStockCounts(lowStockCount, outOfStockCount){
    const lowStockCountEl = document.getElementById("lowStockCount");
    const outOfStockCountEl = document.getElementById("outOfStockCount");

    lowStockCountEl.textContent = lowStockCount;
    outOfStockCountEl.textContent = outOfStockCount;
}

export function displaySummary(total, lowStockCount, outOfStockCount){
    displayTotalInventoryValue(total);
    displayStockCounts(lowStockCount, outOfStockCount);
}