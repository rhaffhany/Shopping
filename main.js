const minusBtn = document.querySelector('.minus');
const plusBtn = document.querySelector('.plus');
const counterDisplay = document.getElementById('counter');

let quantity = document.getElementsByClassName('quantity');
let subtotalElement = document.getElementById('subtotal');
let totalElement = document.getElementById('total');

let counter = 0;
let productsContainer = JSON.parse(localStorage.getItem("cartProducts")) || [];

const updateCounter = () => {
    counterDisplay.textContent = counter;
};

plusBtn.addEventListener('click', () => {
    counter++;
    updateCounter();
});

minusBtn.addEventListener('click', () => {
    if (counter > 0) {
        counter--;
        updateCounter();
    }
});

let thumnails = document.querySelectorAll('.product-thumb');
let productName = document.getElementById('productName');
let productPrice = document.getElementById('productPrice');
let selectedImageSrc = '';

thumnails.forEach(thumb => {
    thumb.addEventListener('click', function() {
        const name = this.getAttribute('data-name');
        const price = this.getAttribute('data-price');

        selectedImageSrc = this.getAttribute('src'); 

        console.log('Selected Image Src:', selectedImageSrc);  // Debugging output
        console.log('Product Name:', name);
        console.log('Product Price:', price);
    

        productName.textContent = name;
        productPrice.textContent = price;

    });
});


let addToCartButton = document.querySelector('.cartButton');

addToCartButton.addEventListener('click', function() {
    if (counter > 0) {
        const existingProductIndex = productsContainer.findIndex(product => product.name === productName.textContent);

        if (existingProductIndex !== -1) {
            productsContainer[existingProductIndex].quantity += counter;
            productsContainer[existingProductIndex].totalPrice = productsContainer[existingProductIndex].quantity * parseFloat(productsContainer[existingProductIndex].price);
        } else {
            let product = {
                name: productName.textContent,
                price:  parseFloat(productPrice.textContent.replace(',', '.')),
                quantity: counter,
                totalPrice: parseFloat(productPrice.textContent.replace(',', '.')) * counter,  
                image: selectedImageSrc
            };
            productsContainer.push(product); 
        }

        localStorage.setItem("cartProducts", JSON.stringify(productsContainer));

        Swal.fire({
            icon: 'success',
            title: 'Added to Cart',
            text: `You have added ${counter} item(s) to your cart.`,
        });

        counter = 0; 
        updateCounter();

    } else {
        Swal.fire({
            icon: 'warning',
            title: 'No Quantity Selected',
            text: 'Please select a quantity greater than 0.',
        });
    }
});



document.addEventListener('DOMContentLoaded', () => {
    const totalQuantity = productsContainer.reduce((acc, product) => acc + product.quantity, 0);
});


