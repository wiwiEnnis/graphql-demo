<template>
  <div id="app">
    <button @click="$store.dispatch('getRestPost')">get rest posts</button>
    <button @click="$store.dispatch('getGraphPost')">get graph posts</button>
    <br />
    <table>
      <tr>
        <th>id</th>
        <th>userId</th>
        <th>title</th>
        <th>body</th>
      </tr>
      <tr v-for="n in posts" :key="n.id" style="">
        <td>{{ n.id }}</td>
        <td>{{ n.userId }}</td>
        <td>{{ n.title }}</td>
        <td>{{ n.body }}</td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Post } from '@/api/post/types';

@Component
export default class App extends Vue {
  get posts(): Post[] {
    return this.$store.state.posts;
  }
}
</script>

<style>
table {
  width: 100%;
  table-layout: fixed;
  border: 1px solid black;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid black;
}
</style>
