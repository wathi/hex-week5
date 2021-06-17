import productModal from './productModal.js'

const app = Vue.createApp({
  data(){
    return {
      apiUrl:'https://vue3-course-api.hexschool.io',
      apiPath:'bustour',
      currency: "日元",
      //products
      products:[],
      product:{},
      //shopping cart
      cart:{},
      //user form
      form:{
        user:{
          name:'',
          email:'',
          tel:'',
          address:'',
        },
        message:'',
      },
      //loading effect
      loadingStatus:{
        loadingItem:'',
      }
    }
  },
  methods:{
    getProducts: function(page = 1){
      axios.get(`${this.apiUrl}/api/${this.apiPath}/products?page=${page}`)
      .then((res) => {
        if(res.data.success){
            console.log(res.data.products);
            this.products = res.data.products;
        } else {
          console.log(res.data);
        };
      })
      .catch((err) => {
        console.log(err);
      });
    },
    openModal: function(item){
      this.loadingStatus.loadingItem = item.id;
      this.$refs.userProductModal.openModal();
      axios.get(`${this.apiUrl}/api/${this.apiPath}/product/${item.id}`)
      .then((res) => {
        if(res.data.success){
            console.log(res.data.product);
            this.product = res.data.product;
            this.loadingStatus.loadingItem = '';
        } else {
          console.log(res.data);
        };
      })
      .catch((err) => {
        console.log(err);
      });
    },
    addCart: function(id, qty = 1){
      this.loadingStatus.loadingItem = id;
      const cart = {
        product_id: id,
        qty,
      }
      console.log(cart);
      axios.post(`${this.apiUrl}/api/${this.apiPath}/cart`, {data:cart})
      .then((res) => {
        if(res.data.success){
          alert(res.data.message);
          this.loadingStatus.loadingItem = '';
            console.log(res.data);
            this.getCart();
        } else {
          console.log(res.data);
          alert(res.data.message);
        };
      })
      .catch((err) => {
        console.log(err);
      });
    },
    getCart(){
      axios.get(`${this.apiUrl}/api/${this.apiPath}/cart`)
      .then((res) => {
        if(res.data.success){
            // console.log(res.data);
            this.cart = res.data.data;
            console.log(this.cart)
        } else {
          console.log(res.data);
        };
      })
      .catch((err) => {
        console.log(err);
      });
    },
    updateCart(item){
      this.loadingStatus.loadingItem = item.id;
      const cart = {
        product_id: item.product.id,
        qty: item.qty
      }
      axios.put(`${this.apiUrl}/api/${this.apiPath}/cart/${item.id}`, {data: cart})
      .then((res) => {
        if(res.data.success){
          console.log(res.data);
          this.loadingStatus.loadingItem = '';
          this.getCart();
        } else {
          console.log(res.data);
        };
      })
      .catch((err) => {
        console.log(err);
      });
    },
    deleteOne(item){
      this.loadingStatus.loadingItem = item.id;
      axios.delete(`${this.apiUrl}/api/${this.apiPath}/cart/${item.id}`)
      .then((res) => {
        if(res.data.success){
          console.log(res.data);
          alert(res.data.message)
          this.loadingStatus.loadingItem = '';
          this.getCart();
        } else {
          console.log(res.data);
        };
      })
      .catch((err) => {
        console.log(err);
      });
    },
    deleteAll(){
      axios.delete(`${this.apiUrl}/api/${this.apiPath}/carts`)
      .then((res) => {
        if(res.data.success){
          console.log(res.data);
          alert(res.data.message)
          this.getCart();
        } else {
          console.log(res.data);
        };
      })
      .catch((err) => {
        console.log(err);
      });
    },
    createOrder(){
      const form = this.form;
      axios.post(`${this.apiUrl}/api/${this.apiPath}/order`, {data: form})
      .then((res) => {
        if(res.data.success){
          console.log(res.data);
          this.getCart();
          alert(res.data.message)
        } else {
          console.log(res.data);
        };
      })
      .catch((err) => {
        console.log(err);
      });
    }
  },
  mounted() {
    this.getProducts();
    this.getCart();
  },
})

VeeValidateI18n.loadLocaleFromURL('./zh_TW.json');

// Activate the locale
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize('zh_TW'),
  validateOnInput: true, // 調整為輸入字元立即進行驗證
});

Object.keys(VeeValidateRules).forEach(rule => {
  if (rule !== 'default') {
    VeeValidate.defineRule(rule, VeeValidateRules[rule]);
  }
});

app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);

app.component('userProductModal', productModal)

app.mount('#app')