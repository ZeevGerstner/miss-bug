'use strict'
import userService from '../service/user.service.js'
export default {
    template: `
    <section class="login-page">
        <h1>Login</h1>
        <form @submit.prevent="checkUser">
            Username:<input v-model="username" type="text" name="username">
            Password:<input v-model="pass" type="password" name="pass">
            <button>login</button>
            <router-link to="/signUp">Sign up</router-link>
        </form>
    </section>
    `,
    data() {
        return {
            username: '',
            pass: ''
        }
    }
    ,
    methods: {
        checkUser() {
            userService.checkUser(this.username, this.pass)
                .then(user => {
                    if (user) this.$router.push('/bug');
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
}