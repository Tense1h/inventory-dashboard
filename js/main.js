import { products } from "./products.js";
import{
    searchProducts,
    filterProductsByCategory,
    calculateTotalInventoryValue,
    countLowStockProducts,
    countOutOfStockProducts
} from "./inventoryUtils.js";
import{ displayProducts, displaySummary} from "./display.js";

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const searchButton = document.getElementById("searchBtn");
const resetButton = document.getElementById("resetBtn");

function updateDisplay(){
    const query = searchInput.value;
    const category = categoryFilter.value;

    let result = searchProducts(products, query);
    result = filterProductsByCategory(result, category);
    displayProducts(result);

    const total = calculateTotalInventoryValue(products);
    const lowStockCount = countLowStockProducts(products);
    const outOfStockCount = countOutOfStockProducts(products);
    displaySummary(total, lowStockCount, outOfStockCount);
}

function resetFilters(){
    searchInput.value = "";
    categoryFilter.value = "All";
    updateDisplay();
}

searchButton.addEventListener("click", updateDisplay);
resetButton.addEventListener("click", resetFilters);

searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter"){
        updateDisplay();
    }
});

categoryFilter.addEventListener("change", updateDisplay);

document.addEventListener("DOMContentLoaded", updateDisplay);