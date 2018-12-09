'use strict'

import bugApp from './pages/bug-app.cmp.js'
import router from './routes.js'


new Vue({
    el: '#app',
    router,
    components: {
        bugApp
    },
    created() {
        console.log('Bugs App is Ready!');
        // Add a response interceptor
        axios.interceptors.response.use((response) => {
            // Do something with response data
            return response;
        }, (err) => {
            if (err.response.status === 401) {
                console.log('AXIOS INTERCEPTOR!, redirecting to LOGIN');
                this.$router.push('/')
            }
            // Do something with response error
            return Promise.reject(err);
        });

    }
});


