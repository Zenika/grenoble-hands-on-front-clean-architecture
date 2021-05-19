<template>
  <Navbar></Navbar>

  <section class="section">
    <div class="container">
      <router-view/>
    </div>
  </section>

  <Footer/>
</template>

<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default {
  components: {
    Footer,
    Navbar
  }
}
</script>

<style lang="scss">
@import "~bulma";


.section {
  min-height: 75vh;
}
</style>
