<template>
  <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <h1 class="title navbar-item">
          Zenika Cities weather
        </h1>
      </router-link>
      <div class="navbar-menu">
        <h2 class="navbar-item has-text-white">
          The best weather app in Vuejs
        </h2>
        <router-link class="navbar-item has-text-white" to="/create">
          Add city
        </router-link>
      </div>
    </div>
  </nav>
</template>
