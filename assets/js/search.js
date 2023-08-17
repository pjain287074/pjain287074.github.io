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
