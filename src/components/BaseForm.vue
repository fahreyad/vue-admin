<template>
  <div>
    <form @submit.prevent="addProduct">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title" placeholder="enter title" v-model="form.title">
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description" placeholder="enter description" v-model="form.description">
      </div>
      <div class="form-group">
        <label for="price">Price</label>
        <input type="text" class="form-control" id="price" placeholder="enter price" v-model="form.price">
      </div>
      <div class="form-group">
        <label for="image">Image</label>
        <input type="file" class="form-control-file" id="image" @change="onFileChange">
      </div>
      <button type="submit" :class="btnClass">{{btnText}}</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'BaseForm',
  props: {
    form: {
      type: Object
    }
  },
  data(){
    return {
      file: '',
      btnClass: "btn btn-primary mb-2",
      btnText:'Save'
    }
  },
  methods: {
    onFileChange: function(e) {
      this.$emit('onFileChange',e)
    },
    async addProduct() {
      if(this.form.isEdit){
        this.$emit('onUpdate',this.form)
      }else{
        this.$emit('onCreate',this.form)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
