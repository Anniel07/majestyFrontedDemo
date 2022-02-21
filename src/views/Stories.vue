<template>
  <div class="container">
    <br /><br /><br />
    <h1>Stories<book-open-page-variant-icon /></h1>

    <table class="table">
      <tr class="bg-dark text-white">
        <th>#</th>
        <th>Plot</th>
        <th>Writer</th>
        <th>
          Upvotes
          <span @click="sortStories">
            <arrow-down-icon v-if="this.order == 'desc'" title="Sort desc" />
            <arrow-up-icon v-else title="Sort asc" />
          </span>
        </th>
        <th>Actions</th>
      </tr>
      <story v-for="story in stories" :key="story.id" :story="story" />
    </table>
    <p class="lead">
      Here's a list of all your stories.
      <button @click="createStory()" class="btn btn-primary">
        <plus-icon title="Add"/>
        Add a new one?
      </button>
    </p>

    <!-- for test -->
    <!-- <pre>{{ $data }}</pre> -->
  </div>
</template>


<script>
import Story from "./Story.vue";
import ArrowUpIcon from "vue-material-design-icons/ArrowUp.vue";
import ArrowDownIcon from "vue-material-design-icons/ArrowDown.vue";
import PlusIcon from 'vue-material-design-icons/Plus.vue';
import BookOpenPageVariantIcon from 'vue-material-design-icons/BookOpenPageVariant.vue';

import { APISettings } from "../config.js";

export default {
  name: "Stories",
  components: {
    Story, //use this component inside Stories
    //below are icons components
    ArrowUpIcon,
    ArrowDownIcon,
    PlusIcon,
    BookOpenPageVariantIcon,
  },
  data: function () {
    return {
      stories: [],
      order: "desc", //order for sort according upvotes
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
      // params array and field to sort, is needed lodash is order to use _.orderBy
      this.stories = _.orderBy(this.stories, "upvotes", this.order);
      this.order = this.order == "desc" ? "asc" : "desc";
    },
  },
  /**
   * Recommended make this inside create hook, fetch all records from api
   */
  created() {
    this.getAllStories();
  },
};
</script>