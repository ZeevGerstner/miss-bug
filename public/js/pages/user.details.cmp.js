"use strict";

import userService from '../service/user.service.js'

export default {
  template: `
    <section v-if="user">
    <router-link to="/user" >Back to list</router-link>

    <table>
            <thead>
                <tr>
                    <th>
                        Name
                    </th>
                    <th>
                        Password
                    </th>
                    <th>
                        Id
                    </th>
                    <th>
                        created At
                    </th>
                </tr>
            </thead>
            <tbody>
            <tr>
                <td>{{user.username}}</td>
                <td>{{user.pass}}</td>
                <td>{{user.id}}</td>
            </tr>
        </tbody>
    </table>
       
    </section>

    <section v-else>User dosnt excist</section>
    `,
  data() {
    return {
      user: null
    };
  },
  getById(id) {
    var bug = bugs.find(bug => bug.id === id);
    if (bug) return Promise.resolve(bug);
    else return Promise.reject("Unknown Bug");
  },

  created() {
    var userId = this.$route.params.userId;
    if (userId) {
      userService.getById(userId).then(user => {
        this.user = user;
      });
    }
  }
};
