export default {
  template:`
  <div class="modal" tabindex="-1" ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ tempProduct.title}}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <img :src="tempProduct.imageUrl"  class="card-img-top" :alt="tempProduct.title">
          <p> {{ tempProduct.content}} </p>
          <div>原價: {{tempProduct.origin_price}} </div>   
          <div>現價: {{tempProduct.price}} </div>   
          <div>數量: <input type="number" v-model.number="qty" min="1"></div>
       
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">返回</button>
          <button type="button" class="btn btn-primary" @click="$emit('add-cart', tempProduct.id, qty)">加到購物車</button>
        </div>
      </div>
    </div>
  </div>
  `,
  props: ['product','addCart'],
  data(){
    return {
      status:{},
      tempProduct: {},
      modal:'',
      qty:1,
    }
  },
  watch:{
    product(){
      this.tempProduct = this.product;
    }

  },
  mounted(){
    this.modal = new bootstrap.Modal(this.$refs.modal);
  },
  methods:{
    openModal(){
      this.modal.show();
    },
    hideModal(){
      this.modal.hide();
    }
  }
}