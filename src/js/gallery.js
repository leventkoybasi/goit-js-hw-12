"use strict";
// IMPORT
import axios from "axios";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// IMPORT JS FILES
import { getImages } from "./fetchData.js";
import { createImage } from "./createImage.js";

// VARIABLES
const form = document.querySelector("#searchBar");
const input = document.querySelector("#textInput");
const failModal = document.querySelector("#failModal");
const app = document.querySelector("#app");
const loadMoreBtn = document.querySelector("#loadMoreBtn");
const scrollTopBtn = document.querySelector("#scrollTopBtn");

let currentPage = 1;
let totalPages = 1;
let searchParams = "";
let loadMoreClickCount = 0;
const loader = document.querySelector(".loader");

// LOADER
function showLoader() {
  loader.classList.remove("hidden");
}

function hideLoader() {
  loader.classList.add("hidden");
}

// CREATE IMAGE ELEMENTS
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  app.innerHTML = "";
  showLoader();
  loadMoreBtn.classList.add("hidden");
  if (input.value.trim()) {
    searchParams = input.value.split(" ").join("+");
    currentPage = 1;
    try {
      const data = await getImages(currentPage, searchParams);
      hideLoader();
      createImage(data.hits);
      totalPages = Math.ceil(data.totalHits / 15);

      // SIMPLE LIGHTBOX
      const lightbox = new SimpleLightbox(".gallery a", {
        captionsData: "alt",
        captionDelay: 250,
        close: true,
        scrollZoom: false,
      });

      // LOAD BTN SHOW
      if (totalPages > 1) {
        loadMoreBtn.classList.remove("hidden");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      failModal.classList.remove("displaying");
      failModal.textContent = "An error occurred. Please try again!";
    }
    form.reset();
  } else {
    failModal.classList.remove("displaying");
    app.innerHTML = "";
    hideLoader();
    form.reset();
  }
});

// CLOSE MODAL
window.addEventListener("click", (event) => {
  if (!event.target.classList.contains("failModal") && !failModal.contains(event.target)) {
    failModal.classList.add("displaying");
  } else if (event.target.classList.contains("close")) {
    failModal.classList.add("displaying");
  }
});

// LOAD MORE IMAGES
loadMoreBtn.addEventListener("click", async () => {
  if (currentPage < totalPages) {
    currentPage++;
    loadMoreClickCount++;

    if (loadMoreClickCount >= 2) {
      scrollTopBtn.classList.remove("hidden");
    }

    try {
      const data = await getImages(currentPage, searchParams);
      createImage(data.hits);
      totalPages = Math.ceil(data.totalHits / 15);

      if (currentPage === totalPages) {
        loadMoreBtn.classList.add("hidden");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      failModal.classList.remove("displaying");
      failModal.textContent = "An error occurred. Please try again!";
    }
  }
});

// SCROLL TO TOP
window.addEventListener("scroll", () => {
  // LOAD MORE BTN SHOW
  if (window.scrollY > 200) {
    if (loadMoreClickCount >= 1) {
      scrollTopBtn.classList.remove("hidden");
    }
  } else {
    scrollTopBtn.classList.add("hidden");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
