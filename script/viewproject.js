const API_URL = "http://localhost:5000/api/latest-projects"; // Adjust as per your backend route
const token = localStorage.getItem("token");

const getLatestProjects = async () => {
  try {
    const res = await fetch(`${API_URL}/all`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const projects = await res.json();
    const container = document.getElementById("latest-projects");
    const template = document.querySelector(".project-template");

    // Clear existing cards
    container.innerHTML = "";

    projects.slice(0,4).forEach(project => {
      const clone = template.cloneNode(true);
      clone.classList.remove("hidden", "project-template");

      const img = clone.querySelector(".project-image");
      const title = clone.querySelector(".project-title");
      const desc = clone.querySelector(".project-description");

      img.src = project.image;
      img.alt = project.title;
      title.textContent = project.title;
      desc.textContent = project.description || "";

      container.appendChild(clone);
    });

  } catch (err) {
    console.error("Fetch error:", err);
  }
};

// Image Modal Functions
const showImageModal = (imgElement) => {
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  modalImage.src = imgElement.src;
  modal.classList.remove("hidden");
};

const closeModal = () => {
  document.getElementById("imageModal").classList.add("hidden");
};

// Load on page load
document.addEventListener("DOMContentLoaded", getLatestProjects);
