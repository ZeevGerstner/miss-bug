'use strict'

export default {
    template: `
        <section class="bug-filter">
        <span>Filter</span>
        <input @input="setFilter" type="text" v-model="filter.byTitle">
        </section>
    `,
    data() {
        return {
            filter: {
                byTitle: ''
            }
        }
    },
    methods: {
        setFilter() {
            this.$emit('set-filter', {...this.filter})
        }
    }
}