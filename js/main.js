const API =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

// Переделать в ДЗ
// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     xhr.open('GET', url, true);
//     xhr.onreadystatechange = () => {
//         if (xhr.readyState === 4) {
//             if (xhr.status !== 200) {
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

let getRequest = (url) => {
  console.log(url);
  return new Promise((res, rej) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          res(JSON.parse(xhr.responseText));
        } else {
          rej("Error loading");
        }
      }
    };
    xhr.send();
  });
};

getRequest(`${API}/catalogData.json`)
.then((data) => {
  console.log(data);
});

class ProductList {
  constructor(listbasket) {
    this.container = ".products";
    this.listbasket = listbasket;
    this.img = 'https://placehold.it/200x150'
    this.goods = [];
    this.allProducts = [];
    //   this.fetchProducts();
    this.calcsum();
    this._getProducts().then((data) => {
      this.goods = [...data];
      this.render();
      this.calcsum();
    });
    this._handleEvents();
  }
  _handleEvents() {
    document.querySelector(this.container).addEventListener("click", (evt) => {
      if (evt.target.name === "buy-btn") {
        this.listbasket.addProduct(evt.target);
        this.listbasket.render();
      }
    });

    document.querySelector(".btn-cart").addEventListener("click", (evt) => {
      let el = document.querySelector(".cart-block");
      if (el.classList.contains("hidden")) {
        el.classList.remove("hidden");
      } else {
        el.classList.add("hidden");
      }
    });
  }

  //   fetchProducts() {
  //       this.goods = [
  //           {id: 1, title: 'Notebook', price: 20000},
  //           {id: 2, title: 'Mouse', price: 1500},
  //           {id: 3, title: 'Keyboard', price: 5000},
  //           {id: 4, title: 'Gamepad', price: 4500}
  //       ]
  //   }

  calcsum() {
    console.log(this.goods.reduce((sum, good) => sum + good.price, 0));
    return this.goods.reduce((sum, good) => sum + good.price, 0);
  }

  _getProducts() {
    return fetch(`${API}/catalogData.json`)
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const block = document.querySelector(this.container);
    for (let product of this.goods) {
      const productObject = new ProductItem(product);
      this.allProducts.push(productObject);
      block.insertAdjacentHTML("beforeend", productObject.render());
    }
  }
}

class ProductItem {
  constructor(product, img = "https://placehold.it/200x150") {
    this.title = product.product_name;
    this.price = product.price;
    this.id = product.id_product;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.title}</h3>
                  <p>${this.price} \u20bd</p>
                  <button name = "buy-btn"
                  data-name="${this.title}"
                  data-price="${this.price}"
                  data-id="${this.id}">Купить</button>
              </div>
          </div>`;
  }
}

class Basket {
  items = [];
  total = 0;
  sum = 0;

  constructor(block = ".cart-items") {
    this.block = block;
    this.img = 'https://placehold.it/200x150'
    this.items = [];
    this.render();
    this._handleEvents();
  }
  _handleEvents() {
    document.querySelector(this.block).addEventListener("click", (evt) => {
      if (evt.target.name === "del-btn") {
        this.deleteProduct(evt.target);
      }
    });
  }
  deleteProduct(product) {
    let id = product.dataset["id"];

    let item = this.items.find((product) => product.id_product == id);
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      this.items.splice(this.items.indexOf(item), 1);
    }

    this._checkTotalAndSum();
    this.render();
  }
  _checkTotalAndSum() {
    let qua = 0;
    let pr = 0;
    this.items.forEach((item) => {
      qua += item.quantity;
      pr += item.price * item.quantity;
    });
    this.total = qua;
    this.sum = pr;
  }
  render() {
    let itemsBlock = document.querySelector(this.block);
    let str = "";
    this.items.forEach((item) => {
      str += `<div class="cart-item" data-id="${item.id_product}">
                    <img src="${item.img}"   alt="${item.product_name}">
                    <div class="product-desc">
                        <p class="product-title">${item.product_name}</p>
                        <p class="product-quantity">${item.quantity}</p>
                        <p class="product-single-price">${item.price}</p>
                    </div>
                    <div class="right-block">
                        <button name="del-btn" class="del-btn" data-id="${item.id_product}">&times;</button>
                    </div>
                </div>`;
    });

    itemsBlock.innerHTML = str;
    this._checkTotalAndSum();
    document.querySelector("#quantity").innerHTML = this.total;
    document.querySelector("#price").innerHTML = this.sum;
  }

  addProduct(product) {
    let id = product.dataset["id"];
    let item = this.items.find((product) => product.id_product === id);
    if (item) {
      item.quantity++;
    } else {
      let prod = this._createNewProduct(product);
      this.items.push(prod);
    }
  }
  _createNewProduct(prod) {
    return {
      id_product: prod.dataset["id"],
      product_name: prod.dataset["name"],
      price: prod.dataset["price"],

      quantity: 1,
      img: this.img,
    };
  }
}

const listbasket = new Basket();
const list = new ProductList(listbasket);

// const products = [
//   {id: 1, title: 'Notebook', price: 20000},
//   {id: 2, title: 'Mouse', price: 1500},
//   {id: 3, title: 'Keyboard', price: 5000},
//   {id: 4, title: 'Gamepad', price: 4500},]

// const renderProduct = (title, price, img='http://dummyimage.com/200') =>
//           `<div class="product-item" data-id="${this.id}">
//           <img src="${img}" alt="Some img">
//           <div class="desc">
//               <h3>${title}</h3>
//               <p>${price} \u20bd</p>
//               <button class="buy-btn">Купить</button>
//           </div>
//         </div>`;

// const renderProducts = (list) => {
//   const productList = list.map(item => renderProduct(item.title, item.price));
//   document.querySelector('.products').innerHTML = productList.join('');
// };

// renderProducts(products);
