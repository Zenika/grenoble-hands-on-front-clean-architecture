<template>
  <section>
    <h1 class="title">Offices</h1>

    <div class="panel">
      <router-link class="panel-block p-4 is-justify-content-space-between is-align-content-center"
                   v-for="city in vm.cities"
                   :to="'/city/' + city.name"
                   :key="city.name"
                   role="link">
        <h2 class="subtitle">{{ city.name }}</h2>
        <button class="button" :class="{'is-success': vm.favoriteCityId === city.name}" @click.prevent.stop="bookmarkCity(city.name)">
          <span class="icon is-small">⭐️</span>
        </button>
      </router-link>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, ref } from 'vue'
import { CITIES_CONTROLLER_FACTORY } from '@/DependencyInjection'

export default defineComponent({
  name: 'Cities',
  components: {},
  setup() {
    const controller = inject(CITIES_CONTROLLER_FACTORY)!.build()
    const vm = ref(controller.vm)

    onMounted(() => {
      controller.subscribeVM(updatedVm => {
        vm.value = { ...updatedVm }
      })
      controller.fetchCities()
    })

    return {
      vm,
      bookmarkCity: (cityId: string) => controller.bookmarkCity(cityId)
    }
  }
})
</script>
