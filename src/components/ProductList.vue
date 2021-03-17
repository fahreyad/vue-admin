<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Description</th>
          <th scope="col">Price</th>
          <th scope="col">Image</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <Product v-for="product in products" :key="product.id" 
        :product="product"
        @editProduct="editProduct"
        @deleteProduct="deleteProduct"/>
      </tbody>
    </table>
  </div>
</template>

<script>
import Product from './Product';
export default {
  name: 'Form',
  props: {
    products:{
      type: Array
    }
  },
  components: {
    Product
  },
  methods: {
    deleteProduct(value){
      this.$emit('deleteProduct',value)
    },
    editProduct(value){
      this.$emit('editProduct',value)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
