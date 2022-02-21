<template>
  <tr>
    <td>
      {{ movie.id }}
    </td>
    <td>
      <input v-if="movie.editing" v-model="movie.title" class="form-control" />
      <!--in other occasions show the movie title-->
      <span v-else>
        {{ movie.title }}
      </span>
    </td>
    <td>
      <input v-if="movie.editing" v-model="movie.director" class="form-control" />
      <!--in other occasions show the movie director-->
      <span v-else>
        {{ movie.director }}
      </span>
    </td>
   
    <td>
      <div v-if="!movie.editing">
        
        <button @click="editMovie(movie, true)" class="btn btn-warning">
          <pencil-icon title="Edit" /> 
        </button>
        |
        <button @click="deleteMovie(movie)" class="btn btn-danger">
          <delete-icon title="Delete" /> 
        </button>
      </div>
      <div v-else>
        <!--If the movie is taken from the db then it will have an id-->
        <button
          v-if="movie.id"
          class="btn btn-primary"
          @click="updateMovie(movie)"
        >
          Update movie
        </button>
        <!--If the movie is new we want to store it-->
        <button
          v-else
          class="btn btn-success"
          @click="storeMovie(movie)"
        >
          Save New movie
        </button>
        <!--Always show cancel-->
        <button @click="editMovie(movie, false)" class="btn btn-default">
          Cancel
        </button>
      </div>
    </td>
  </tr>
</template>
<!-- there is an error on
8:50  error  Unexpected mutation of "movie" prop  vue/no-mutating-props
Aunque pasa este error la aplicacion funciona bien
-->

<script>
import DeleteIcon from 'vue-material-design-icons/Delete.vue';
import PencilIcon from 'vue-material-design-icons/Pencil.vue';
import { APISettings } from '../config.js'; 
//movie Component, this component is used in movies.vue
export default {
  name: "Movie",
  props: {
    movie: Object,
  },
  components: {
    DeleteIcon, 
    PencilIcon,
  },
  /**
   * All method used in movie Component
   */
  methods: {
    /**
     * Delete an movie from DB
     */
    deleteMovie: function (movie) {
      if (
        confirm(
          "Are you sure you want to delete this record with id: " +
            movie.id +
            " ?"
        )
      ) {
        var index = this.$parent.movies.indexOf(movie);
        this.$parent.movies.splice(index, 1); // this code eliminate the storie from the array
        this.axios.delete(APISettings.baseUrl + "/api/movies/" + movie.id); // this code eliminate from DB
      }
    },
    
    /**
     * Enable/Disable input and buttons for make update on movie
     * Utility fun
     */
    editMovie: function (movie, flag) {
      movie.editing = flag;
    },
    /**
     * Update
     */
    updateMovie: function (movie) {
      this.axios.put(APISettings.baseUrl + "/api/movies/" + movie.id, movie);
      //Set editing to false to show actions again and hide the inputs
      this.editMovie(movie, false);
    },
    /**
     * Create a new movie  on DB
     */
    storeMovie: function (movie) {
      var context = this;
      this.axios
        .post(APISettings.baseUrl + "/api/movies/", movie)
        .then(function (response) {
          /*
            After the the new movie is stored in the database 
            update the id of the created movie
            */
          movie.id = response.data.id;
          //console.log(response);
          //Set editing to false to show actions again and hide the inputs
          context.editMovie(movie, false);
        });
    },
  },
};
</script>
