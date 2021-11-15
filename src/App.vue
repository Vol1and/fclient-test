<template>
  <div id="app">
    <div id="nav" style="display: flex; justify-content: center">
      <q-btn
          flat
          :style="{margin: '0 20px', color: $route.name === 'AnswerList' ? 'blue': 'black'}"
          :to="{name: 'AnswerList'}"
      >
        Таблица ответов
      </q-btn>
      <q-btn
          flat
          :style="{margin: '0 20px', color: $route.name === 'ChartList'  ? 'blue': 'black'}"
          :to="{name: 'ChartList'}"
      >
        Список графиков
      </q-btn>
    </div>
    <router-view/>
  </div>
</template>


<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import AnswerList from '@/views/AnswerList';
@Component({
    components: {AnswerList},
})
export default class App extends Vue {
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
