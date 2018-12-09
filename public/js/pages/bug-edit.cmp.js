'use strict'
import bugService from '../service/bug.service.js'


export default {
    template: `
    <section class="bug-edit">
        <h1>{{(bug.id)? 'Edit Bug': 'Add Bug'}}</h1>
        <form @submit.prevent="handleSubmit">
            <label> 
                <span>Title:</span>
                <input type="text" v-model="bug.title" placeholder="Enter title...">
            </label>
            <label>
                <span>Description:</span>
                <input type="text" v-model="bug.description" placeholder="Enter description..." >
            </label>
            <label>
                <span>Severity</span>
                <input type="number" v-model="bug.severity" placeholder="Enter severity..."  >
            </label>
            <button type="submit"> {{(bug.id)? 'Save': 'Add'}}</button>
            <button @click.prevent="closeEdit">Close</button>
        </form>
    </section>
    `,
    data() {
        return {
            
            bug: {
                title: '',
                description: '',
                severity: '',
                createdAt: Date.now(),
            }
        }
    },
    created() {
        const bugId = this.$route.params.bugId;
        if (bugId) {
            bugService.getById(bugId)
                .then(bug => {
                    this.bug = bug
                })
        }
    },
    methods: {
        handleSubmit(){
            if(this.bug.id) this.saveBug();
            else this.addBug()
        },
        saveBug() {
            bugService.update(this.bug)
                .then(() => {
                    console.log('Saved!');
                    this.$router.push('/bug');
                })
        },
        closeEdit() {
            this.$router.push('/bug');
        },
        addBug() {
            bugService.add(this.bug)
                .then(addedBug => {
                    this.bug = {}
                    this.$router.push('/bug');
                })
        }
    }
}