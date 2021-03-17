<template>
  <div id="app">
    <div class="container">
      <button @click="logout">Logout</button>
      <p>{{error}}</p>
      <BaseForm :form ="form" 
      @onCreate="onCreate"
      @onFileChange="onFileChange"
      @onUpdate="onUpdate"
      />
      <ProductList :products="products" @deleteProduct="deleteProduct" @editProduct="editProduct"/>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import BaseForm from './components/BaseForm';
import ProductList from './components/ProductList';
export default {
  name: 'App',
  components: {
    BaseForm,
    ProductList
  },
  data(){
    return {
      url:"https://jsonplaceholder.typicode.com/posts",
      products:[],
      form:{
        title:'',
        description:'',
        price:'',
        isEdit:false,
      },
      image:"",
      error:""
    }
  },
  methods: {
    onFileChange(e){
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (!validImageTypes.includes(files[0]["type"])) {
        // invalid file type code goes here.
        this.error = "Only image supported.";
        return;
      }
      this.form.files = files[0];
    },
    async deleteProduct(value){
      await axios.delete('/products/'+value)
      .then( response => {
        if(response.data.success){
          this.getProducts()
        }
      })
      .catch( error => {
        this.error = error.response.data.message
      })     
    },
    editProduct(value){
      this.form = value;
      this.form.isEdit=true
    },
    async onUpdate(value){
      let params = {
        title: value.title,
        description: value.description,
        price: value.price
      }
      if(value.files){
        let payload = {
          image: value.files
        };
        let formData = new FormData();

        for (let key in payload) {
          formData.append(key, payload[key]);
        }
        await axios.post('/upload-image',formData,{
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then( response => {
          if(response.data.success) {
            params.image=response.data.data.file
            document.getElementById("image").value = "";
          }
        })
        .catch( error => {
          this.error = error.response.data.message
        })
      }

      await axios.patch('/products/'+value.id,params)
      .then( response => {
        if(response.data.success){
          this.getProducts()
          this.form.title=""
          this.form.description=""
          this.form.price=""
        }
      })
    },
    async getProducts(){
      await axios.get('/products').
        then( response => {
          this.products = response.data.data
        })
        .catch( error => {
          this.error = error.response.data.message
        })      
    },
    logout() {
      localStorage.removeItem('access_token')
      this.$router.push({ name : 'login'})
    },
    async onCreate(form){
      let payload = {
        image: form.files
      };
      let formData = new FormData();
      for (let key in payload) {
        formData.append(key, payload[key]);
      }
      await axios.post('/upload-image',formData,{
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then( response => {
        if(response.data.success) {
          this.image = response.data.data.file
        }
      })
      .catch( error => {
        console.log(error)
        //this.error = error.response.data.message
      })
      let param = {
        title: this.form.title,
        description: this.form.description,
        price: this.form.price,
        image: this.image,
      }
      await axios.post('/products',param)
        .then( response => {
          console.log('response')
          if(response.data.success){
            this.getProducts();
            this.form.title=""
            this.form.description=""
            this.form.price=""
            document.getElementById("image").value = "";  
            this.error=""       
          }else{           
            this.error=response.data.message
          }
        })
        .catch( error => {
          this.error = error.response.data.message
        })
      
    }
  },
  mounted() {
    this.getProducts();
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
p{
  color: red;
}
</style>
