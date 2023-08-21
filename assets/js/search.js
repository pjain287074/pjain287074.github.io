async function fetchSearchResults() {
    event.preventDefault(); // Prevent form submission

    const searchInput = document.getElementById("shoptop-product-search-field-0");
    const searchQuery = searchInput.value.replace(/ /g, '+');
    const apiUrl = `https://flipkart-api.pjain287074.workers.dev/search/${searchQuery}`;

    try {
        const response = await fetch(apiUrl);
        const html = await response.text(); // Get the response as HTML text

        // Create a temporary div to hold the fetched HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        // Extract the content you want to update
        const updatedContent = tempDiv.querySelector('.products.columns-4').innerHTML;

        // Update the content inside the <ul> element
        const ulElement = document.querySelector('.products.columns-4');
        ulElement.innerHTML = updatedContent;
    } catch (error) {
        console.error("Error fetching search results:", error);
    }
}


const productContainer = document.getElementById('productContainer');
const loadingIndicator = document.getElementById('loading-indicator');
let page = 1; // Current page of products
let loading = false; // To prevent multiple API calls on a single scroll event

function loadMoreProducts() {
  if (loading) return;
  loading = true;
  document.getElementById('loading-indicator').style.display = 'block';

  // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
  const apiUrl = `https://flipkart-api.pjain287074.workers.dev/search/tv`;

  fetch(apiUrl)
    .then(response => response.text())
    .then(htmlResponse => {
      productContainer.insertAdjacentHTML('beforeend', htmlResponse);
      loading = false;
      page++;
      loadingIndicator.style.display = 'none';
    })
    .catch(error => {
      console.error('Error loading more products:', error);
      loading = false;
      loadingIndicator.style.display = 'none';
    });
}

// Detect when user scrolls to the bottom of the page
window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 85) {
    loadMoreProducts();
  }
});