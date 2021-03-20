<template>
  <h1 class="title">Create city</h1>

  <div class="card">
    <form class="card-content" role="form" @submit.prevent="createCity()">
      <div class="field city-name">
        <label for="city-name-input" class="label">Name</label>
        <div class="control">
          <input id="city-name-input" class="input" type="text" @input="validateCityName($event.target.value)"
                 placeholder="City name">
        </div>
        <p class="help is-danger" v-if="vm.cityNameError" aria-label="city name error">{{ vm.cityNameError }}</p>
      </div>
      <div class="field latitude">
        <label for="latitude-input" class="label">Latitude</label>
        <div class="control">
          <input id="latitude-input" class="input" type="text" @input="validateLatitude($event.target.value)"
                 placeholder="Latitude">
        </div>
        <p class="help is-danger" v-if="vm.latitudeError" aria-label="latitude error">{{ vm.latitudeError }}</p>
      </div>
      <div class="field longitude">
        <label for="longitude-input" class="label">Longitude</label>
        <div class="control">
          <input id="longitude-input" class="input" type="text" @input="validateLongitude($event.target.value)"
                 placeholder="Longitude">
        </div>
        <p class="help is-danger" v-if="vm.longitudeError" aria-label="longitude error">{{ vm.longitudeError }}</p>
      </div>
      <div class="control">
        <button type="submit" class="button is-primary" :disabled="!vm.canCreateCity">Create</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, ref } from 'vue'
import { AddCityPresenter } from '@grenoble-hands-on/web-adapters'
import { ADD_CITY_PRESENTER_FACTORY } from '@/DependencyInjection'

export default defineComponent({
  name: 'AddCity',
  components: {},
  setup() {
    const addCityPresenter = inject(ADD_CITY_PRESENTER_FACTORY)?.build() as AddCityPresenter
    const vm = ref(addCityPresenter.vm)

    onMounted(() => {
      addCityPresenter.onVmUpdate(updatedVm => {
        vm.value = { ...updatedVm }
      })
    })

    return {
      vm,
      validateCityName(input: string) {
        addCityPresenter.validateCityName(input)
      },
      validateLatitude(input: string) {
        addCityPresenter.validateLatitude(input)
      },
      validateLongitude(input: string) {
        addCityPresenter.validateLongitude(input)
      },
      createCity() {
        addCityPresenter.create()
      },
    }
  }
})
</script>
