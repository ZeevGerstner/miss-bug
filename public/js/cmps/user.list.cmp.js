"use strict";

import userService from '../service/user.service.js'

export default {
  template: `
    <section>
    <ul>
    <li v-for="user in users">
        <h2>{{user.username}}</h2>
        <button class="delete-user" @click="removeUser(user.id)">delete</button>
        
        <router-link :to="'user/'+user.id" 
            class="delete-user" 
            @click="removeUser(user.id)">
            Details
            </router-link>
    </li>
    </ul>       
    </section>
    `,
  data() {
    return {
      users: null
    };
  },
  created() {
    userService.query().then(users => {
      this.users = users;
    });
  },
  methods: {
    removeUser(userId) {
      userService.remove(userId).then(() => {
        console.log("User deleted");
        userService.query().then(users => (this.users = users));
      });
    }
  },
  components: {
    // previewBug
  }
};
