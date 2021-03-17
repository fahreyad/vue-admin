<template>
  <tr>
    <td>{{product.title}}</td>
    <td>{{product.description}}</td>
    <td>{{product.price}}</td>
    <td><img :src="product.image" alt="" srcset=""></td>
    <td>
      <button class="btn btn-sm btn-primary mr-1" @click="editProduct">Edit</button>
      <button class="btn btn-sm btn-danger" @click="deleteProduct">Delete</button>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'Product',
  props: {
    product:{
      type : Object
    }
  },
  methods: {
    deleteProduct(){     
      this.$emit('deleteProduct',this.product.id)
    },
    editProduct(){
      this.$emit('editProduct',this.product)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img{
  width: 100px;
}
</style>
