'use strict'
import bugService from '../service/bug.service.js'
import userService from '../service/user.service.js'

import bugList from '../cmps/bug-list.cmp.js'
import bugFilter from '../cmps/bug-filter.cmp.js'
import eventBus, { REMOVE_BUG } from '../event-bus.js'

export default {
  template: `
    <section class="bug-app">
        <h1>Bugs 
            <button v-if="isLoggedin" @click="logout">Logout</button>
            <router-link  v-else tag="button" to="/">Log In</router-link>
         </h1>
         <router-link v-if="currUser.isAdmin" to="/user">User List</router-link>
         <router-link v-else :to="'/user/'+currUser.id">Profile</router-link>
        
        <bug-filter @set-filter="listToDisplay"></bug-filter>
        <router-link tag="button" to="/bug/edit">New Bug</router-link> 
        <bug-list :bugs="bugs" @deleteBug="removeBug"></bug-list>
    </section>
    `,
  data() {
    return {
      bugs: [],
      bugToEdit: {
        title: "",
        description: "problem when clicking Save",
        severity: 3,
        createdAt: Date.now()
      },
      currUser: null
    };
  },
  methods: {
    saveBug() {
      bugService.add(this.bugToEdit).then(addedBug => {
        this.bugToEdit = {};
        bugService.query().then(bugs => (this.bugs = bugs));
      });
    },
    listToDisplay(filter) {
      bugService.query(filter).then(bugs => this.bugs = bugs);
    },
    logout() {
      userService.logout();
      this.$router.push("/");
    },
    removeBug(bugId) {
      bugService.remove(bugId).then(() => {
        console.log("Bug deleted");
        bugService.query().then(bugs => (this.bugs = bugs));
      });
    }
  },
  computed: {
    isLoggedin() {
      var user = userService.getLoggedinUser();
      this.currUser = user;
      return !!user;
    }
  },
  created() {
    bugService.query().then(bugs => (this.bugs = bugs));
    this.currUser = userService.getLoggedinUser();
  },
  components: {
    bugList,
    bugFilter
  }
};