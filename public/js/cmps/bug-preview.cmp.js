'use strict'
import bugService from '../service/bug.service.js'
import userService from '../service/user.service.js'
// import eventBus,{} from '../event-bus.js'
export default {
  props: ["bug"],
  template: `
    <tr>
        <td>
            {{bug.title}}
        </td>
        <td>
            {{bug.description}}
        </td>
        <td>
            {{bug.severity}}
        </td>
        <td>
            {{new Date(bug.createdAt).toDateString()}}
        </td>
        <td>
            <router-link :to="'/user/'+bug.creator._id">
            {{bug.creator.name}}
            </router-link>
        </td>
        <td>
            <router-link tag="button" :to="'/bug/' + bug.id">Details</router-link>
            <router-link v-if="isBugOwner"  tag="button" :to="'/bug/edit/' + bug.id">edit</router-link>
            <button v-if="isBugOwner" class="delete-bug-btn" @click.stop="remove(bug.id)">delete</button>
        </td>
    </tr>
    `,
  methods: {
    remove(bugId) {
      this.$emit("deleteBug", bugId);
    }
  },
  computed: {
    isBugOwner() {
      var user = userService.getLoggedinUser();
      if (!user) return false;
      return this.bug.creator._id === user.id || user.isAdmin;
    }
  }
};