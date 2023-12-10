let counterDisplay = document.querySelector("#counter");
let startCounter = document.querySelector("#start");
let stopCounter = document.querySelector("#stop");
let resetCounter = document.querySelector("#reset");
let handleOnImg = document.querySelector(".cookieImg");

// initial value of count is 0
let count = 0;
let interval;
let isCounting = false;

// declare initial data
let initialData = {
  NaNa: [
    {
      price: 0.2,
      quantity: 1000,
      button: "Buy",
    },
  ],
  Oven: [
    {
      price: 1,
      quantity: 200,
      button: "Buy",
    },
  ],
  Factory: [
    {
      price: 20,
      quantity: 300,
      button: "Buy",
    },
  ],
  Outlet: [
    {
      price: 10,
      quantity: 600,
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
  Mine: [
    {
      price: 1,
      quantity: 10,
      button: "Buy",
    },
  ],
};

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

// handle stop counting
const stop = () => {
  clearInterval(interval);
  isCounting = false;
  localStorage.setItem("count", JSON.stringify(count));
};

// updating counter
const updateCounter = () => {
  const message = document.querySelector(".counter");
  counterDisplay.innerHTML = `${count}`;

  // remove message after showing and put back counting when start button click
  message.classList.remove("message");
  message.innerHTML = `Total Cookies: ${count}`;

  // when count is 0 and less it showed message
  if (count <= 0) {
    toggleBuyBtn(true);
    if (message) {
      message.classList.add("message");
      message.innerHTML = "Oop, Not enough fund!!";
    }
  } else {
    toggleBuyBtn(false);
  }

  // add animation every count to 20
  if (count % 20 === 0) {
    const handleJump = document.querySelector(".cookieImg");
    handleJump.classList.add("jumping");
    handleJump.addEventListener(
      "animationend",
      () => {
        handleJump.classList.remove("jumping");
      },
      { once: true }
    );
  }
};

// disabled buy buttons once total count is 0
const toggleBuyBtn = (isDisable) => {
  const buyButtons = document.querySelectorAll(".buyBtn");
  buyButtons.forEach((button) => {
    button.disabled = isDisable;
  });
};

// get storeData
const getStoreData = () => {
  const storedData = localStorage.getItem("storeData");

  // if storedData exit turn it to array
  if (storedData) {
    return JSON.parse(storedData);
  }

  // Save the initial data to localStorage
  localStorage.setItem("storeData", JSON.stringify(initialData));

  return initialData;
};

// display stored create html elements of store header
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

  // loop category in data and create html elements
  for (const category in data) {
    const items = data[category];

    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("categoryContainer");

    items.map((item, index) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("itemElement");
      itemElement.innerHTML = `
        <div class="item">${category} </div>
        <div class="item">£${item.price} </div>
        <div class="item" data-category="${category}" data-item="${index}" id="quantity-${category}-${index}">${item.quantity} </div>
        <button class="buyBtn"  data-category="${category}" data-item="${index}">${item.button} </button>
        `;
      categoryContainer.appendChild(itemElement);
    });
    itemsContainer.appendChild(categoryContainer);
  }
};

// handle click to decrement and increment quantity from data set and count
const handleClick = document.getElementById("cookieStore");

handleClick.addEventListener("click", (e) => {
  const target = e.target;

  if (target.classList.contains("buyBtn")) {
    const category = target.dataset.category;
    const itemIndex = target.dataset.item;

    const storeData = getStoreData();

    const selectedItem = storeData[category][itemIndex];
    console.log(selectedItem);

    if (selectedItem.quantity > 0 && count > 0) {
      selectedItem.quantity--; // decrement the quantity of selected item

      const myCookieItem = storeData["Mine"][0]; // get the correct items
      myCookieItem.quantity++; // increment the quantity

      count--;
      updateCounter();

      localStorage.setItem("storeData", JSON.stringify(storeData));
      localStorage.setItem("count", JSON.stringify(count));

      // update and display of selected item
      updateQuantityDisplay(category, itemIndex, selectedItem.quantity);

      // update display quantity of Mine
      updateMyCookies();
    } else {
      console.log("Out of stock");
    }
  }
});

// display updated quantity
const updateQuantityDisplay = (category, itemIndex, quantity) => {
  const quantityElement = document.getElementById(
    `quantity-${category}-${itemIndex}`
  );

  if (quantityElement) {
    quantityElement.textContent = `${quantity}`;

    if (category === "My Cookies") {
      updateMyCookies();
    }
  }
};

// display updated quantity of Mine after click buy form other store
const updateMyCookies = () => {
  const myCookieQuantity = document.getElementById("quantity-Mine-0");

  if (myCookieQuantity) {
    const myCookieItem = getStoreData()["Mine"][0];
    myCookieQuantity.innerHTML = `${myCookieItem.quantity}`;
  }
};

// loading content callback
document.addEventListener("DOMContentLoaded", () => {
  const storeData = getStoreData();
  displayStoreItems(storeData);
  const localCount = localStorage.getItem("count");
  count = localCount ? JSON.parse(localCount) : 0;
  document.getElementById("counter").textContent = count;
  toggleBuyBtn();
  // updateCounter();
});

// callback start, stop, and reset function when the button click
startCounter.addEventListener("click", start);

handleOnImg.addEventListener("click", start);

stopCounter.addEventListener("click", stop);

resetCounter.addEventListener("click", () => {
  count = 0;
  updateCounter();
  isCounting = false;
  clearInterval(interval);
});
