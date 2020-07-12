Vue.component('product',{

  props:['product', 'img'],
  data(){
    return {
      basketAPI: this.$root.$refs.basket,
    }
  },
  methods:{
  
  },
  

  template:`
  <div>
  <img :src="img" alt="img">
  <div class="desc">
  <h3>{{ product.product_name }}</h3>
  <p>{{ product.price }}₽</p>
      <button class="buy-btn" @click="basketAPI.addProduct(product)">Купить</button>
  </div>
        </div>
  `
})