<template>
  <nav class="navbar fixed-top navbar-expand navbar-dark bg-dark">
    <router-link to="/" class="navbar-brand">Consuming APIS</router-link>
    <div class="navbar-nav mr-auto">
      <li class="nav-item">
         <router-link to="/" class="nav-link">Stories</router-link> 
      </li>
      <li class="nav-item">
        <router-link to="/movies" class="nav-link">Movies</router-link>
      </li>
    </div>
  </nav>
  <!-- display each item here, this is the target for each component -->
  <router-view />
</template>

<script>


export default {
  name: "App",
  /*
  components: {
    
  },
  */
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
