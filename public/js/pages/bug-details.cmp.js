'use strict'
import bugService from '../service/bug.service.js'
export default {
    template:`
    <section v-if="bug" class="bug-details">
        <router-link to="/bug" >Back to list</router-link>
        <h1>{{bug.title}}</h1>
        <p>{{bug.description}}</p>
        <p>severity:{{bug.severity}}</p>
        <span>Create at:{{new Date(bug.createdAt).toDateString()}}</span>
        <button @click="closeDetails">Back</button>
    </section>
    `,
    data(){
        return{
            bug:null
        }
    },
    methods:{
        closeDetails(){
            this.$router.push('/bug');
        }
    },
     created() {
         console.log('CREATED');
        const bugId = this.$route.params.bugId;
        if (bugId) {
            bugService.getById(bugId)
                .then(bug => {
                    console.log('BUG', bug);
                    this.bug = bug
                })
                
        }
    },
}