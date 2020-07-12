Vue.component('basketItem', {
  props:['item','imgCart'],

  data(){
    return {

    }
  },

  template:`
  <div class="cart-item">
      <img :src=imgCart   alt="">
      <div class="product-desc">
      <p class="product-title">{{item.product_name}}</p>
      <p class="product-quantity">{{ item.quantity }}</p>
      <p class="product-single-price">{{item.price}}</p>
      </div>
      <div class="right-block">
      <button name="del-btn" class="del-btn" @click = '$parent.remove(item)'>&times;</button>
      </div>
      </div>
  `
})