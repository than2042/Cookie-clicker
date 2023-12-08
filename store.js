let initialData = {
  NaNa: [
    {
      price: 0.2,
      quantity: 1,
      button: "Buy",
    },
  ],
  Oven: [
    {
      price: 1,
      quantity: 10,
      button: "Buy",
    },
  ],
  Factory: [
    {
      price: 20,
      quantity: 100,
      button: "Buy",
    },
  ],
  Outlet: [
    {
      price: 10,
      quantity: 50,
      button: "Buy",
    },
  ],
  Bank: [
    {
      price: 100,
      quantity: 100000,
      button: "Buy",
    },
  ],
  "My Cookies": [
    {
      price: 1,
      quantity: 10,
      button: "Buy",
    },
  ],
};

const getStoreData = () => {
  const storedData = localStorage.getItem("storeData");

  if (storedData) {
    return JSON.parse(storedData);
  }

  // Save the initial data to localStorage
  localStorage.setItem("storeData", JSON.stringify(initialData));

  return initialData;
};

const displayStoreItems = (data) => {
  const itemsContainer = document.getElementById("cookieStore");
  const headerRow = document.createElement("div");
  headerRow.classList.add("headerRow");
  headerRow.innerHTML = `
        <div class="header">Store</div>
        <div class="header">Price</div>
        <div class="header">Quantity</div>
        <div class="header"></div>
     `;
  itemsContainer.appendChild(headerRow);

  for (const category in data) {
    const items = data[category];

    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("categoryContainer");

    items.map((item) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("itemElement");
      itemElement.innerHTML = `
        <div class="item">${category} </div>
        <div class="item">£${item.price} </div>
        <div class="item">${item.quantity} </div>
        <button class="buyBtn">${item.button} </button>
        `;
      categoryContainer.appendChild(itemElement);
    });
    itemsContainer.appendChild(categoryContainer);
  }
};

const handleBtnsClick = (e) => {
  const category = e.tatget
    .closest(".categoryContainer")
    .querySelector(".item")
    .textContent.trim();
  const itemIndex = Array.from(
    e.target
      .closest(".categoryContainer")
      .querySelectorAll(".buyBtn")
      .indexOf(e.target)
  );

  const storeData = getStoreData();
  storeData[category][itemIndex].quantity++;
  localStorage.setItem("storeData", JSON.stringify(storeData));
  displayStoreItems(storeData);

  updateCounter();
};

const buyButtons = document.querySelectorAll(".buyBtn");
buyButtons.forEach((button) => {
  button.addEventListener("click", handleBtnsClick);
});

document.addEventListener("DOMContentLoaded", () => {
  const storeData = getStoreData();
  displayStoreItems(storeData);
});
