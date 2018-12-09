'use strict'
import previewBug from './bug-preview.cmp.js'
export default {
    props: ['bugs'],
    template: `
    <section>
    <table>
            <thead>
                <tr>
                    <th>
                        Title
                    </th>
                    <th>
                        description
                    </th>
                    <th>
                        severity
                    </th>
                    <th>
                        created At
                    </th>
                    <th>
                        By
                    </th>
                    <th>
                        actions
                    </th>
                </tr>
            </thead>
            <tbody>
            <preview-bug v-for="bug in bugs" :bug="bug" @deleteBug="$emit('deleteBug', $event)"></preview-bug>
            </tbody>
        </table>
       
    </section>
    `,
    methods: {

    },
    components: {
        previewBug
    }

}