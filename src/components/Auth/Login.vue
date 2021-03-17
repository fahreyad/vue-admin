<template>
    <div>
        <div class="container">
            <h2>Login Form</h2>
            <p>{{ error }}</p>
            <form action="#" @submit.prevent="login">
                <div class="form-group">
                    <label for="email">Email address:</label>
                    <input type="email" class="form-control" placeholder="Enter email" id="email" v-model="email">
                </div>
                <div class="form-group">
                    <label for="pwd">Password:</label>
                    <input type="password" class="form-control" placeholder="Enter password" id="pwd" v-model="password">
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            email: '',
            password: '',
            error: '',
            token: localStorage.getItem('access_token') || null
        }
    },
    mounted() {
        this.loggedIn()
    },
    methods:  {
        loggedIn() {
            if(this.token !== null){
                this.$router.push({ name : 'products' })
            }
        },
        login() {
            let param = {}
            param.email = this.email
            param.password = this.password
            axios.post('/auth/login',param)
                .then(response => {
                    if(response.data.success){
                        const token = response.data.data.token
                        localStorage.setItem('access_token', token)
                        this.$router.push({ name : 'products'})
                    }else{
                        this.error = response.data.message
                    }
                })
                .catch(error => {
                    this.error = 'email/password is wrong'
                    console.log(error)
                })

        }
    }
}
</script>
<style scoped>
p{
    color: red;
}
</style>