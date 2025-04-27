
let productsList = [];

const nameBox = document.getElementById("nameBox");
const priceBox = document.getElementById("priceBox");
const categorySelect = document.getElementById("categorySelect");
const urlBox = document.getElementById("urlBox");
const tbodyContainer = document.getElementById("tbodyContainer");

function loadProducts() {
    loadProduct();
    displayProduct();

}

function addProduct() {
    pushProduct();
    clearForm();
    saveProduct();
    displayProduct();
    totalProductsF();
    totalPriceF();
    priceAvgF();
}

function pushProduct() {
    const productName = nameBox.value;
    const productPrice = priceBox.value;
    const productCategory = categorySelect.value;
    const productUrl = urlBox.value;
    
    let product = { productName, productPrice, productCategory, productUrl};
    const isValid = isValidProduct();
    if(!isValid)
        return;
    productsList.push(product);
    
}


function clearForm() {
    nameBox.value = "";
    priceBox.value = "";
    categorySelect.value = "";
    urlBox.value = "";

    nameBox.focus();
}

function displayProduct() {
    let content = "";
    for(let i = 0; i < productsList.length; i++) {
        let price = +productsList[i].productPrice;
        let decimalPrice = price.toFixed(2)
        const tr = `
        <tr>
            <td>${productsList[i].productName}</td>
            <td>$${decimalPrice}</td>
            <td>${productsList[i].productCategory}</td>
            <td><img src="${productsList[i].productUrl}"></td>
            <td><button onclick="deleteMe(${i})" class="delete-btn">X</button></td>
        </tr>
        `
        content += tr;
    }
    tbodyContainer.innerHTML = content;
}


function saveProduct() {
    const saveProducts = JSON.stringify(productsList);
    localStorage.setItem("products", saveProducts);
}
function loadProduct() {
    const getProducts = localStorage.getItem("products");
    if(getProducts)
       productsList = JSON.parse(getProducts);
}

function isValidProduct() {
    const productName = nameBox.value;
    const productPrice = priceBox.value;
    const productCategory = categorySelect.value;
    const productUrl = urlBox.value;
    if(!productName){
        alert("Missing Product Name");
        return false;
    }
    if(!productPrice){
        alert("Missing Product Price");
        return false;
    }
    if(productPrice > 1000){
        alert("Product Price is Invalid");
        return false;
    }
    if(!productCategory){
        alert("Missing Product Category");
        return false;
    }
    if(!productUrl){
        alert("Missing Product Url");
        return false;
    }
    return true;
}

function totalProductsF() {
    const totalProducts = document.getElementById("totalProducts");
    totalProducts.innerHTML = productsList.length;
}

function totalPriceF() {
    const totalPrice = document.getElementById("totalPrice");
    let price = 0;
    for(const product in productsList) {
            price += +productsList[product].productPrice;
    }
    totalPrice.innerHTML = price;
}

function priceAvgF() {
    const totalAverage = document.getElementById("totalAverage");
    let priceAvg = 0;
    let price = 0;
    for(const product in productsList){
        price += +productsList[product].productPrice;
    }
    priceAvg = price / productsList.length;
    totalAverage.innerHTML = priceAvg.toFixed(2);
}

function deleteMe(index) {
    productsList.splice(index, 1);
    displayProduct();
    saveProduct();
    totalProductsF();
    totalPriceF();
    priceAvgF();
}








