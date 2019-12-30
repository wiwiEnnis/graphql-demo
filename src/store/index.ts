import Vue from 'vue';
import Vuex from 'vuex';

import { marvinClient } from '@/api';
import { rest as restPost, graph as restGraph } from '@/api/post';
import { Post, postsSchema } from '@/api/post/types';

Vue.use(Vuex);

export default new Vuex.Store<{ posts: Post[] }>({
  state: {
    posts: [],
  },
  mutations: {
    getPosts(state, payload: Post[]) {
      state.posts = payload;
    },
  },
  actions: {
    async getRestPost({ commit }) {
      const r = await marvinClient
        .query(() => restPost.posts())
        .validate(postsSchema)
        .coerce(postsSchema)
        .execute();

      console.log(r);
      commit('getPosts', r.data);
    },
    async getGraphPost({ commit }) {
      const r = await marvinClient
        .query(() => restGraph.posts())
        .validate(postsSchema)
        .coerce(postsSchema)
        .execute();

      console.log(r);
      commit('getPosts', r.data);
    },
  },
  modules: {},
});
