<template>
  <div class="post">
    <h1 class="text-xs">Route Path: {{route.path}}</h1>
    <h1 class="text-xs">Computed Full Slug: {{post.result.slug_full}}</h1>
  </div>

  <div v-if="post.loading">
    <Loading msg="loading post..." />
  </div>
  <div v-else>
    <h1 class="text-xl">{{post.result.title}}</h1>
    <hr>
    <section>
      {{post.result.body}}
    </section>
  </div>

</template>

<script lang="ts">

import { Post } from '@/models'
import { useRoute } from 'vue-router'
import { defineComponent, watch } from 'vue'
import Loading from '@/components/Loading.vue'


export default defineComponent({
  name: 'Post',

  components: {
    Loading
  },

  inject: ['config'],

  setup() {

    // Get current route
    const route = useRoute()

    // Create an empty Post ref outside the watch
    const post = Post.newRef();

    // Watch for route path changes, and also run "immediate"
    watch(() => route.path, (path) => {
      const paths = Post.explode_path(path);

      // Notice we are passing in our existing ref not opting to build a new one
      // If we returned a new ref, it would be a new different ref than the one
      // we already returned.  You must always keep the same ref instance.
      Post.query()
        .include(['topic.section.space'])
        .where('slug', '=', paths.post)
        .where('topic.slug', '=', paths.topic)
        .where('topic.section.slug', '=', paths.section)
        .where('topic.section.space.slug', '=', paths.space)
        .ref(post)
        .find()
    }, {immediate: true})

    // onMounted(() => {
    //   console.log('Posts mounted')
    // })

    // Setup return
    return {
      post,
      route,
    }
  },

})

</script>
