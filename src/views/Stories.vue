<template>
  <div class="container">
    <br/><br/><br/>
    <h1>Stories</h1>

    <table class="table">
      <tr class="bg-dark text-white">
        <th>#</th>
        <th>Plot</th>
        <th>Writer</th>
        <th @click="sortStories">Upvotes</th>
        <th>Actions</th>
      </tr>
      <story
        v-for="story in stories"
        :key="story.id"
        :story="story"
      />
    </table>
    <p class="lead">
      Here's a list of all your stories.
      <button @click="createStory()" class="btn btn-primary">
        Add a new one?
      </button>
    </p>
    <!-- for test -->
    <!-- <pre>{{ $data }}</pre> -->
  </div>
</template>


<script>
import Story from "./Story.vue";
import { APISettings } from '../config.js'; 


export default {
  name: "Stories",
  components: {
    Story, //use this component inside Stories
  },
  data: function () {
    return {
      stories: [],
      order: "desc",
    };
  },
  methods: {
    // this is used for fecth all stories from api
    async getAllStories() {
      try {
        const res = await this.axios.get(APISettings.baseUrl + "/api/stories");
        var storiesReady = res.data.map(function (story) {
          story.editing = false;
          console.log(story);
          return story;
        });
        this.stories = storiesReady;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * This code enable to add input fields for the user create a new record
     */
    createStory: function () {
      var newStory = {
        plot: "",
        upvotes: 0,
        editing: true,
      };
      this.stories.push(newStory);
    },

    sortStories: function () {
      console.log(this.order);
      // falta cambiar el orden 
      // params array and field to sort, is needed lodash is order to use _.orderBy
      //return _.orderBy(this.stories, "upvotes", this.order);
    },
  },
  async mounted() {
    this.getAllStories();
  },

 
};
</script>