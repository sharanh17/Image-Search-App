
const ACCESS_KEY = "fF5cAgjQ9uGXCavPC_HUsQyRuwvmYUptPozRRdly0fg";

const container = document.querySelector("#images-container");
const searchInput = document.querySelector("#search");

const defaultUrl = `https://api.unsplash.com/photos/?client_id=${ACCESS_KEY}&page=1`;
const queryUrl = `https://api.unsplash.com/search/photos/?client_id=${ACCESS_KEY}&page=1`;

function initializeApp() {
  async function fetchData(url) {
    try {
      displayLoader(container);
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        if (url.includes("search")) {
          processSearchResults(data);
        } else {
          processRandomResults(data);
        }
      }
    } catch (error) {
      displayMessage("An error occurred while fetching data", container);
    }
  }

  function processSearchResults(data) {
    const results = data.results || [];
    if (results.length === 0) {
      displayMessage("No data available", container);
    } else {
      renderImages(results);
    }
  }

  function processRandomResults(data) {
    renderImages(data);
  }

  function createImageElement(image) {
    const wrapper = document.createElement("div");
    const img = document.createElement("img");
    img.src = image.urls.small;
    wrapper.appendChild(img);
    wrapper.className = "flex flex-col justify-center items-center w-80";
    return wrapper;
  }

  function handleSearchInput(event) {
    const query = event.target.value.trim();
    const apiUrl = query ? `${queryUrl}&query=${query}` : defaultUrl;
    fetchData(apiUrl);
  }

  function createLoaderElement() {
    const loader = document.createElement("div");
    loader.innerHTML = `
      <svg class="w-8 h-8 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none">
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>`;
    return loader;
  }

  function displayLoader(root) {
    root.innerHTML = "";
    const loader = createLoaderElement();
    root.appendChild(loader);
  }

  function createTextElement(text) {
    const paragraph = document.createElement("p");
    paragraph.className = "text-xl";
    paragraph.innerText = text;
    return paragraph;
  }

  function displayMessage(message, root) {
    root.innerHTML = "";
    const messageElement = createTextElement(message);
    root.appendChild(messageElement);
  }

  function renderImages(images) {
    container.innerHTML = "";
    images.forEach((image) => {
      const imageElement = createImageElement(image);
      container.appendChild(imageElement);
    });
  }

  fetchData(defaultUrl);
  searchInput.addEventListener("input", handleSearchInput);
}

document.addEventListener("DOMContentLoaded", initializeApp);
