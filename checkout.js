document.querySelectorAll('.gender-button').forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        document.querySelectorAll('.gender-button').forEach(btn => btn.classList.remove('active'));

        // Add active class to the clicked button
        this.classList.add('active');

        // Update the hidden radio input's checked state
        const value = this.getAttribute('data-value');
        document.querySelector(`input[value="${value}"]`).checked = true;
    });
});

// Initialize the first button as active (optional based on default selection)
document.querySelector('.gender-button[data-value="mrs"]').classList.add('active');

// List of countries in alphabetical order
const countries = [
    "Australia", "Brazil", "Canada", "Egypt", "France", "Germany", 
    "India", "Italy", "Japan", "United Kingdom", "United States"
  ];

// Get both select elements
var countrySelects = document.querySelectorAll('select[name="country"]');

// Loop through each select element
countrySelects.forEach(selectElement => {
  // Add each country as an option in the dropdown
  countries.forEach(country => {
    const option = document.createElement("option");
    option.value = country;
    option.textContent = country;
    selectElement.appendChild(option);
  });
});
  
// checkout
document.addEventListener('DOMContentLoaded', function() {
  let cartSubtotal = localStorage.getItem('cartSubtotal');
  let cartShipping = localStorage.getItem('cartShipping');
  let cartTotal = localStorage.getItem('cartTotal');

  if (cartSubtotal && cartShipping && cartTotal) {
      document.getElementById('subtotal').textContent = `${cartSubtotal} SAR`;
      document.getElementById('shipping').textContent = `${cartShipping} SAR`;
      document.getElementById('vat').innerHTML = `
          <strong>${cartTotal} SAR</strong><br>
          <p>(VAT included)</p>
      `;
  } else {
      document.getElementById('subtotal').textContent = '0.00 SAR';
      document.getElementById('shipping').textContent = '0.00 SAR';
      document.getElementById('vat').innerHTML = `
          <strong>0.00 SAR</strong><br>
          <p>(VAT included)</p>
      `;
  }
});
