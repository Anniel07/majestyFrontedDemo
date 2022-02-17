<template>
  <div class="container">
    <br/><br/><br/>
    <h1>Movies</h1>

    <table class="table">
      <tr class="bg-dark text-white">
        <th>#</th>
        <th>Title</th>
        <th>Director</th>
        <th>Actions</th>
      </tr>
      <movie
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
      />
    </table>
    <p class="lead">
      Here's a list of all your Movies.
      <button @click="createMovie()" class="btn btn-primary">
        Add a new one?
      </button>
    </p>
    <!-- for test -->
    <!-- <pre>{{ $data }}</pre> -->
  </div>
</template>


<script>
import Movie from "./Movie.vue";
import { APISettings } from '../config.js'; 


export default {
  name: "Movies",
  components: {
    Movie, //use this component inside Movies
  },
  data: function () {
    return {
      movies: [],
      
    };
  },
  methods: {
    // this is used for fecth all Movies from api
    async getAllMovies() {
      try {
        const res = await this.axios.get(APISettings.baseUrl + "/api/movies");
        var moviesReady = res.data.map(function (movie) {
          movie.editing = false;
          console.log(movie);
          return movie;
        });
        this.movies = moviesReady;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * This code enable to add input fields for the user create a new record
     */
    createMovie: function () {
      var newMovie = {
        title: "",
        director: "",
        editing: true,
      };
      this.movies.push(newMovie);
    },

  },
  async mounted() {
    this.getAllMovies();
  },

 
};
</script>