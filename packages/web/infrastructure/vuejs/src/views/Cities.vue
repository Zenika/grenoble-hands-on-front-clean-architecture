<template>
  <section>
    <h1 class="title">Offices</h1>

    <div class="panel">
      <router-link class="panel-block p-4"
                   v-for="city in vm.cities"
                   :to="'/city/' + city.name"
                   :key="city.name"
                   role="link">
        <h2 class="subtitle">{{ city.name }}</h2>
      </router-link>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, inject, ref, onMounted } from 'vue'
import { CITIES_PRESENTER_FACTORY } from '@/DependencyInjection'

export default defineComponent({
  name: 'Cities',
  components: {},
  setup() {
    const citiesPresenter = inject(CITIES_PRESENTER_FACTORY)!.build()
    const vm = ref(citiesPresenter.vm)

    onMounted(() => {
      citiesPresenter.onVmUpdate(updatedVm => {
        vm.value = { ...updatedVm }
      })
      citiesPresenter.fetchCities()
    })

    return {
      vm
    }
  }
})
</script>
