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
        <div class="navbar-end">
          <div v-if="vm.bookmarkCityWeather"
               class="navbar-item has-text-white">
            <WeatherWidget :weather="vm.bookmarkCityWeather"></WeatherWidget>
          </div>
          <div v-if="vm.bookmarkCityWeatherMessage" class="navbar-item has-text-white" aria-label="weather not display">{{vm.bookmarkCityWeatherMessage}}</div>
        </div>
      </div>
    </div>
  </nav>
</template>


<script lang="ts">
import { defineComponent, inject, onMounted, ref } from 'vue'
import { NAVBAR_CONTROLLER_FACTORY } from '@/DependencyInjection'
import WeatherWidget from '@/components/WeatherWidget.vue'

export default defineComponent({
  name: 'Navbar',
  components: { WeatherWidget },
  setup() {
    const controller = inject(NAVBAR_CONTROLLER_FACTORY)!.build()
    const vm = ref(controller.vm)

    onMounted(() => {
      controller.subscribeVM(updatedVm => {
        vm.value = { ...updatedVm }
      })
      controller.fetchBookmarkCityWeather()
    })

    return {
      vm
    }
  }
})
</script>
