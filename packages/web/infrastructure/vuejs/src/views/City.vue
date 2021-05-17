<template>
  <h1 class="title">Cities weather</h1>
  <article class="panel is-primary">
    <div class="panel-heading"><h2 aria-label="city name">{{ vm.city?.name }}</h2></div>
    <div class="panel-block">
      <div class="control">
        <label class="radio">
          <input type="radio" id="select-daily-view"
                 name="mode"
                 :checked="vm.mode === 'daily'"
                 @change="updateMode('daily')">
          Simple
        </label>
        <label class="radio">
          <input type="radio" id="select-hourly-view"
                 name="mode" value=""
                 :checked="vm.mode === 'hourly'"
                 @change="updateMode('hourly')">
          Detailed
        </label>
      </div>
    </div>
    <div class="panel-block">
      <div class="control">
        <label class="radio">
          <input type="radio" id="select-celsius-unit"
                 name="unit"
                 :checked="vm.temperatureUnite === 'C'"
                 @change="updateTemperatureUnite('C')">
          C°
        </label>
        <label class="radio">
          <input type="radio" id="select-fahrenheit-unit"
                 name="unit"
                 :checked="vm.temperatureUnite === 'F'"
                 @change="updateTemperatureUnite('F')">
          F°
        </label>
      </div>
    </div>
    <div class="panel-block" v-if="vm.dailyWeather?.length">
      <table id="daily-weather" class="table is-bordered">
        <tr>
          <th>Date</th>
          <th>Weather</th>
          <th>Max</th>
          <th>Min</th>
        </tr>
        <tr v-for="weather in vm.dailyWeather" :key="weather.weather">
          <td>{{ weather.day }}</td>
          <td><img :src="'https://ssl.gstatic.com/onebox/weather/48/'+weather.weather+'.png'" :alt="weather.weather">
          </td>
          <td>{{ weather.temperatureMax + ' ' + weather.unite + '°' }}</td>
          <td>{{ weather.temperatureMin + ' ' + weather.unite + '°' }}</td>
        </tr>
      </table>
    </div>
    <div class="panel-block" v-if="vm.hourlyWeather?.length">
      <table id="hourly-weather" class="table is-bordered">
        <tr>
          <th>Time</th>
          <th>Weather</th>
          <th>Temperature</th>
        </tr>
        <tr v-for="weather in vm.hourlyWeather" :key="weather.weather">
          <td>{{ weather.time }}</td>
          <td><img :src="'https://ssl.gstatic.com/onebox/weather/48/'+weather.weather+'.png'" :alt="weather.weather">
          </td>
          <td>{{ weather.temperature + ' ' + weather.unite + '°' }}</td>
        </tr>
      </table>
    </div>
    <div class="panel-block" v-if="vm.loading">Loading...</div>
    <div class="panel-block">
      <router-link to="/" class="button is-rounded">
        Go back home
      </router-link>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { CityController } from '@grenoble-hands-on/web-adapters'
import { CITY_CONTROLLER_FACTORY } from '@/DependencyInjection'

export default defineComponent({
  name: 'City',
  components: {},
  setup() {
    const cityId = useRoute().params.cityId.toString()
    const controller = inject(CITY_CONTROLLER_FACTORY)?.build(cityId) as CityController
    const vm = ref(controller.presenter.vm)

    onMounted(() => {
      controller.presenter.subscribeVM(updatedVm => {
        vm.value = { ...updatedVm }
      })
      controller.fetchWeather()
      controller.fetchCity()
    })

    return {
      vm,
      updateMode(mode: 'daily' | 'hourly') {
        controller.updateMode(mode)
      },
      updateTemperatureUnite(temperature: 'C' | 'F') {
        controller.updateTemperatureUnite(temperature)
      }
    }
  }
})
</script>
