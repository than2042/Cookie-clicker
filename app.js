let counterDisplay = document.querySelector("#counter");
let startCounter = document.querySelector("#start");
let stopCounter = document.querySelector("#stop");
let resetCounter = document.querySelector("#reset");
let handleOnImg = document.querySelector(".cookieImg");

let count = 0;
let interval;
let isCounting = false;

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

const getLocalStore = () => {
  const localData = localStorage.getItem("count");
  count = JSON.parse(localData);

  counterDisplay.textContent = count;
};
getLocalStore();

const start = () => {
  if (isCounting) {
    return;
  }
  count++;
  interval = setInterval(() => {
    count++;
    updateCounter();
  }, 100);
  isCounting = true;
};

const stop = () => {
  clearInterval(interval);
  isCounting = false;
  localStorage.setItem("count", JSON.stringify(count));
};

const updateCounter = () => {
  counterDisplay.innerHTML = `${count}`;
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
        <div class="item" data-category="${category}" data-item="${items.indexOf(
        item
      )}">${item.quantity} </div>
        <button class="buyBtn"  data-category="${category}" data-item="${items.indexOf(
        item
      )}">${item.button} </button>
        `;
      categoryContainer.appendChild(itemElement);
    });
    itemsContainer.appendChild(categoryContainer);
  }
};

const buyButtons = document.querySelectorAll(".buyBtn");
buyButtons.forEach((button) => {
  button.addEventListener("click", handleBtnClick);
  console.log(handleBtnClick());
});

document.addEventListener("DOMContentLoaded", () => {
  const storeData = getStoreData();
  displayStoreItems(storeData);
  getStoreData();
});

startCounter.addEventListener("click", start);

handleOnImg.addEventListener("click", start);

stopCounter.addEventListener("click", stop);

resetCounter.addEventListener("click", () => {
  count = 0;
  updateCounter();
  isCounting = false;
});
