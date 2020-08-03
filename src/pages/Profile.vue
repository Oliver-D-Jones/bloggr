<template>
  <div class="about text-center text-dark">
    <h3>Welcome {{ profile.name }}</h3>
    <img class="rounded" :src="profile.picture" alt />
    <p>{{ profile.email }}</p>
    <!-- Button to Open the Modal -->
    <button
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      data-target="#blogPostModal"
    >Post New Blog</button>

    <div class="container-fluid">
      <div class="row mt-1">
        <profileblog v-for="v in aBlogs" :current_blog="v" :key="'key:'+v.id" />
      </div>
    </div>
    <blogmodal :profile="profile" :key="'key'+profile.name"/>
  </div>
</template>
<script>
import profileblog from "../components/ProfileBlog";
import blogmodal from "../components/PostBlogModel";
export default {
  name: "Profile",
  methods: {},
  computed: {
    profile() {
      if (this.$auth.isAuthenticated) {
        return this.$store.state.profile;
      }
    },
    aBlogs() {
      if (this.$auth.isAuthenticated) {
        return this.$store.state.profileBlogs;
      }
    },
  },
  mounted() {
    if (this.$auth.isAuthenticated) {
      this.$store.dispatch("getProfile");
      this.$store.dispatch("getProfileBlogs");
    }
  },
  components: {
    blogmodal,
    profileblog,
  },
};
</script>

<style>
img {
  max-width: 200px;
}
input {
  border: none;
  font-size: small;
  min-width: 90%;
}
textarea {
  min-width: 100%;
}
p {
  margin-top: 0px;
  margin-bottom: 2px;
}
</style>
