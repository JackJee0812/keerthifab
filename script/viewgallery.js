const API_URL = "http://localhost:5000/api/gallery";  // Replace with your actual API URL
const apitoken = localStorage.getItem("token"); // Assuming the token is saved in localStorage

// Function to fetch galleries data and display it
const getGalleries = async () => {
  try {
    const res = await fetch(`${API_URL}/all`, {
      headers: { Authorization: `Bearer ${apitoken}` },
    });

    const data = await res.json();
    const container = document.getElementById("galleries");
    const cardTemplate = document.querySelector(".blog-template");

    // Clear any previous content in the container
    container.innerHTML = "";

    data.forEach((item) => {
      const clone = cardTemplate.cloneNode(true);
      clone.style.display = "block";
      clone.classList.remove("blog-template");

      // Bind data to the cloned template
      const img = clone.querySelector(".image-card");
      const title = clone.querySelector(".card_title");
      const content = clone.querySelector(".card_text");

      img.src = item.image;
      img.alt = item.title;
      title.textContent = item.title;
      content.textContent = item.content;

      container.appendChild(clone);
    });

  } catch (err) {
    console.error("Fetch error:", err);
  }
};

// Function to show the image in a modal
const showImageModal = (imgElement) => {
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  modalImage.src = imgElement.src;  // Set the modal image source to the clicked image
  modal.classList.remove("hidden"); // Show the modal
};

// Function to close the modal
const closeModal = () => {
  const modal = document.getElementById("imageModal");
  modal.classList.add("hidden"); // Hide the modal
};

// Automatically fetch galleries when the page loads
document.addEventListener("DOMContentLoaded", getGalleries);
