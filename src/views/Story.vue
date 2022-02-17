<template>
  <tr>
    <td>
      {{ story.id }}
    </td>
    <td>
      <input v-if="story.editing" v-model="story.plot" class="form-control" />
      <!--in other occasions show the story plot-->
      <span v-else>
        {{ story.plot }}
      </span>
    </td>
    <td>
      <input v-if="story.editing" v-model="story.writer" class="form-control" />
      <!--in other occasions show the story writer-->
      <span v-else>
        {{ story.writer }}
      </span>
    </td>
    <td>
      {{ story.upvotes }}
    </td>
    <td>
      <div v-if="!story.editing">
        <button @click="upvoteStory(story)" class="btn btn-primary">
          Upvote
        </button>
        |
        <button @click="editStory(story, true)" class="btn btn-warning">
          Edit
        </button>
        |
        <button @click="deleteStory(story)" class="btn btn-danger">
          Delete
        </button>
      </div>
      <div v-else>
        <!--If the story is taken from the db then it will have an id-->
        <button
          v-if="story.id"
          class="btn btn-primary"
          @click="updateStory(story)"
        >
          Update Story
        </button>
        <!--If the story is new we want to store it-->
        <button
          v-else
          class="btn btn-success"
          @click="storeStory(story)"
        >
          Save New Story
        </button>
        <!--Always show cancel-->
        <button @click="editStory(story, false)" class="btn btn-default">
          Cancel
        </button>
      </div>
    </td>
  </tr>
</template>
<!-- there is an error on
8:50  error  Unexpected mutation of "story" prop  vue/no-mutating-props
Aunque pasa este error la aplicacion funciona bien
-->

<script>
import { APISettings } from '../config.js'; 
//Story Component, this component is used in Stories.vue
export default {
  name: "Story",
  props: {
    story: Object,
  },
  /**
   * All method used in story Component
   */
  methods: {
    /**
     * Delete an story from DB
     */
    deleteStory: function (story) {
      if (
        confirm(
          "Are you sure you want to delete this record with id: " +
            story.id +
            " ?"
        )
      ) {
        var index = this.$parent.stories.indexOf(story);
        //console.log(index+ " " + baseUrl+ " " + story.id)
        //console.log(this.$parent.stories)
        this.$parent.stories.splice(index, 1); // this code eliminate the storie from the array
        this.axios.delete(APISettings.baseUrl + "/api/stories/" + story.id); // this code eliminate from DB
      }
    },
    /**
     * Increment the votes for stories and save on DB
     */
    upvoteStory: function (story) {
      story.upvotes++;
      this.axios.put(APISettings.baseUrl + "/api/stories/" + story.id, story);
    },
    /**
     * Enable/Disable input and buttons for make update on story
     * Utility fun
     */
    editStory: function (story, flag) {
      story.editing = flag;
    },
    /**
     * Update
     */
    updateStory: function (story) {
      this.axios.put(APISettings.baseUrl + "/api/stories/" + story.id, story);
      //Set editing to false to show actions again and hide the inputs
      this.editStory(story, false);
    },
    /**
     * Create a new story  on DB
     */
    storeStory: function (story) {
      var context = this;
      this.axios
        .post(APISettings.baseUrl + "/api/stories/", story)
        .then(function (response) {
          /*
            After the the new story is stored in the database 
            update the id of the created story
            */
          story.id = response.data.id;
          //console.log(response);
          //Set editing to false to show actions again and hide the inputs
          context.editStory(story, false);
        });
    },
  },
};
</script>
