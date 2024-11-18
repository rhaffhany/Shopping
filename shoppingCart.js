let cartBody = document.querySelector('#cart tbody');
let quantity = document.getElementsByClassName('quantity');
let subtotalElement = document.getElementById('subtotal');
let totalElement = document.getElementById('total');

let subtotal = 0 ;
let shipping = 10.91; 

let productsContainer = JSON.parse(localStorage.getItem("cartProducts")) || [];


function displayProducts(arr)
{
    cartBody.innerHTML = ''; 
    
    var cartoona=``;
    arr.forEach((product, i) => {
        let quantity = Number(product.quantity);
        let price = parseFloat(product.price);

        let totalPrice = (price * quantity).toFixed(2);

        cartoona += `<tr>
            <td><img src="${product.image}" style="width:50px; height: auto;"></td>
            <td class="d-block">
                <h6 style="font-size:16px">${product.name}</h6>
                <p style="font-size:10px; color: #A1A1A1;">Lorem Ipsum</p>
            </td>
            <td>${price.toFixed(2)} SAR</td>
            <td>
                <i class="fa-solid fa-minus border" onclick="decreaseQuantity(${i})"></i>
                ${product.quantity}
                <i class="fa-solid fa-plus border" onclick="increaseQuantity(${i})"></i>
            </td>
            <td class="total-price">${totalPrice} SAR</td>
            <td><button class="border-0 bg-light" onclick="deleteProduct(${i})"><i class="fa-solid fa-trash-can"></i></button></td>
        </tr>`;
    });
    cartBody.innerHTML = cartoona;
    updateTotal();
}




function updateTotal() {
    let subtotal = productsContainer.reduce((acc, product) => acc + (parseFloat(product.price) * product.quantity), 0);
    subtotalElement.textContent = `${subtotal.toFixed(2)} SAR`;
    totalElement.textContent = `${(subtotal + shipping).toFixed(2)} SAR`;
}


function updateCart(){
    localStorage.setItem("cartProducts", JSON.stringify(productsContainer));
    displayProducts(productsContainer);
    updateTotal();
}

function decreaseQuantity(index) {
    if (productsContainer[index].quantity > 1) {
        productsContainer[index].quantity--;
        displayProducts(productsContainer);
        localStorage.setItem("cartProducts", JSON.stringify(productsContainer));
    } else {
        deleteProduct(index);
    }
    updateTotal();
    updateCart();
}
function increaseQuantity(index){
    productsContainer[index].quantity++;
    productsContainer[index].totalPrice = productsContainer[index].quantity * productsContainer[index].price;
    updateCart();
}

function deleteProduct(index){
    productsContainer.splice(index,1);
    updateCart();
}


document.addEventListener('DOMContentLoaded', () => {
    displayProducts(productsContainer);
});


let discountInput = document.querySelector('input[placeholder="Enter the code"]');
let redeemButton = document.querySelector('.btn-dark');

redeemButton.addEventListener('click',()=>{
    const discountCode = discountInput.value.trim();
    let discountPercentage = 0;

    if (discountCode === "Rhaff10" || discountCode === "Rhaff" || discountCode === "RhaffHany") {
        discountPercentage = 0.10; 
    }else{
        Swal.fire({
            icon: 'warning',
            title: 'Code ',
            text: 'Please select a quantity greater than 0.',
        });
    }

    let subtotal = productsContainer.reduce((acc, product) => acc + (parseFloat(product.price) * product.quantity), 0);
    let discountAmount = subtotal * discountPercentage;
    let discountedSubtotal = subtotal - discountAmount;
    let total = discountedSubtotal + shipping;

    subtotalElement.innerHTML = `${subtotal.toFixed(2)} SAR`;
    totalElement.innerHTML = `
        <span style="text-decoration: line-through; color:red;">${(subtotal + shipping).toFixed(2)} SAR</span> 
        <br> 
        <strong>${total.toFixed(2)} SAR</strong>
    `;
    
    discountInput.value = '';


});


const checkoutButton = document.querySelector('.checkout');

checkoutButton.addEventListener('click', function() {
    
    let subtotal = productsContainer.reduce((acc, product) => acc + (parseFloat(product.price) * product.quantity), 0);
    localStorage.setItem('cartSubtotal', subtotal.toFixed(2));
    localStorage.setItem('cartShipping', shipping.toFixed(2));
    localStorage.setItem('cartTotal', (subtotal + shipping).toFixed(2));

    window.location.href = 'checkout.html';
});