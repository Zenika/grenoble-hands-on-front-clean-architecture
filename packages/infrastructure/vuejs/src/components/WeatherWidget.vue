<template>
  <img :src="'https://ssl.gstatic.com/onebox/weather/32/'+weather?.weather+'.png'"
       :alt="weather?.weather">
  <div>{{ weather.temperatureMax }} {{ weather.unite }}° / {{ weather.temperatureMin }} {{ weather.unite }}°</div>
</template>

<script>
export default {
  name: 'WeatherWidget',
  props: {
    weather: Object
  }
}
</script>

<style scoped>

</style>
