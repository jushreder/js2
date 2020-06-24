
class ProductList {

  constructor(container = '.products') {
      this.container = container;
      this.goods = [];
      this.allProducts = [];
      this.fetchProducts();
      this.render();
  }

  fetchProducts() {
      this.goods = [
          {id: 1, title: 'Notebook', price: 20000},
          {id: 2, title: 'Mouse', price: 1500},
          {id: 3, title: 'Keyboard', price: 5000},
          {id: 4, title: 'Gamepad', price: 4500}
      ]
  }

  render() {
      const block = document.querySelector(this.container);
      for (let product of this.goods) {
          const productObject = new ProductItem(product);
          this.allProducts.push(productObject);
          block.insertAdjacentHTML('beforeend', productObject.render());
      }
  }
}

class ProductItem {
  constructor(product, img = 'https://placehold.it/200x150') {
      this.title = product.title;
      this.price = product.price;
      this.id = product.id;
      this.img = img;
  }

  render() {
      return `<div class="product-item" data-id="${this.id}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.title}</h3>
                  <p>${this.price} \u20bd</p>
                  <button class="buy-btn">Купить</button>
              </div>
          </div>`;
  }
}
class Basket {

}

class ItemBasket{
  
}

const list = new ProductList();


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

