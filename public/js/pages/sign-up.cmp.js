import userService from '../service/user.service.js'

export default {
    template: `
        <section class="sign-up-page">
            <h1>Sign Up</h1>
            <form @submit.prevent="createUser">
                Set Username:<input v-model="newUser.username" type="text" required>
                Set Password:<input v-model="newUser.pass" type="password" required >
                <button>Done</button>
                <router-link tag="button" to="/">Close</router-link>
            </form>
        </section>
    `,
    data() {
        return {
            newUser: {
                username: '',
                pass: ''
            }
        }
    },
    methods: {
        createUser() {
            userService.add(this.newUser)
                .then(user => this.$router.push('/'))
        }
    }
}