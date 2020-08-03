<template>
  <div class="blog col-3 my-1 card" @click="showBlog">
    <div
      class="card-body visible bg-primary text-dark border shadow"
      v-if="this.$auth.userInfo.email==current_blog.creatorEmail"
    >
      <p class="card-title text-dark">{{current_blog.title}}</p>
      <p
        class="card-subtitle mb-2 text-dark"
        v-if="current_blog.creator!=null"
      >By: {{current_blog.creator.name}}</p>
      <p class="card-subtitle mb-2 text-dark">{{current_blog.creatorEmail}}</p>
      <small>
        <img v-if="current_blog.creator" :src="current_blog.creator.picture" alt />
      </small>
    </div>
    <div
      class="card-body visible text-dark border shadow"
      v-else
    >
      <p class="card-title">{{current_blog.title}}</p>
      <p
        class="card-subtitle mb-2"
        v-if="current_blog.creator!=null"
      >By: {{current_blog.creator.name}}</p>
      <p class="card-subtitle mb-2">{{current_blog.creatorEmail}}</p>
      <small>
        <img v-if="current_blog.creator" :src="current_blog.creator.picture" alt />
      </small>
    </div>
  </div>
</template>

<script>
export default {
  name: "blog",
  data() {
    return {};
  },
  computed: {},
  methods: {
    showBlog() {
      this.$store.dispatch("getActiveBlog", this.current_blog.id);
    },
  },
  components: {},
  props: ["current_blog"],
};
</script>
<style scoped csss>
div.card-body {
  cursor: pointer;
}
img {
  max-height: 50px;
}
</style>