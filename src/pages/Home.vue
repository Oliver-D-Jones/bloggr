<template>
  <div class="home container-fluid text-center">
    <h6>Home</h6>
      <h5>All Currently Public Posts</h5>
    <div class="row">
      <blog v-for="v in aBlogs" :current_blog="v" :key="'id'+v.id" />
    </div>
  </div>
</template>

<script>
import Blog from "../components/Blog";
export default {
  name: "home",
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getPublished");
  },
  computed: {
    aBlogs() {
      return this.$store.state.publicBlogs;
    },
  },
  components: {
    Blog,
  },
};

</script>
<style lang="scss">
*{
  color: aqua;
}

</style>