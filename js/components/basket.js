Vue.component('basket', {
  data(){
    return {
      goods_list:[],
      isVisibleCart : false,
      imgCart: 'https://placehold.it/150x100'
    }
  },
  methods: {
    addProduct(product){
      let find  = this.goods_list.find(el=> el.id_product === product.id_product)
      if (find){
        find.quantity++
      } else {
        let prod = Object.assign(product, {quantity: 1});
        this.goods_list.push(prod)
      } 
    },
    remove(product){
      let find = this.goods_list.find(el=>product.id_product === el.id_product)
      if (find.quantity>1){
        find.quantity--
      } else {
        this.goods_list.splice(this.goods_list.indexOf(find), 1)
      }

    }
  },
  computed: {
    count_prod(){
      let count = 0;
      this.goods_list.forEach(el=> count +=el.quantity)
      // console.log('hello count')
      return count
    },

    sum_prod(){
      let sum =0;
      this.goods_list.forEach(el=>sum += el.quantity * el.price)
      return sum
    }     
    },
    mounted(){
      // console.log(this)

    },

  template:`
  <div>
  <button class="btn-cart" type="button" @click = 'isVisibleCart=!isVisibleCart'>Корзина</button>
  <div v-show = 'isVisibleCart' class="cart-block" >
        
  <div class="d-flex">
      <strong class="d-block">Всего товаров</strong> <div>{{ count_prod }}</div>
  </div>
  <hr>
  <div v-if = '!goods_list.length'>карзина пуста </div>

  <div class="cart-items" v-for = 'item of goods_list'>
  <basketItem :item = 'item'
              :imgCart = 'imgCart' ></basketItem>

  </div>
  <hr>
  <div class="d-flex">
      <strong class="d-block">Общая ст-ть:</strong> <div>{{ sum_prod }}</div>
  </div>

</div> 
</div>
  `
});