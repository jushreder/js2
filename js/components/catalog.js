Vue.component('products',{
  data(){
    return{
      catalogUrl: '/catalogData.json',
      products:[],
      productsDom: [],
      imgCatalog: 'https://placehold.it/200x150',
      
    }
  },
  methods:{
  filter(value){
      const regexp = new RegExp(value, 'i');
      this.productsDom = this.products.filter(product => regexp.test(product.product_name))
  },
  
},
mounted() {
  this.$parent.getJson(`${API + this.catalogUrl}`)
      .then(data => {
          for(let el of data){
              this.products.push(el);
          }
  this.productsDom = this.products
      });
},

  template: `
 <div>
 <div class='products'>
        <div ref='catalog' class="product-item" v-for="product of productsDom" :key="product.id_product" >
        <product :product = 'product' :img = 'imgCatalog'></product>
      </div>

      </div>
      </div>

  
  `,
})
