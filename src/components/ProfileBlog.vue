<template>
  <div class="profileblog col-3 my-1 justify-content-center border">
    <p>
      <small>Title</small>
      <br />
      <input
        :id="'title'+current_blog.id"
        class="mb-2 bg-dark text-center text-xs"
        v-model="blog.title"
        readonly
      />
    </p>
    <p>
      <small>Image URL:</small>
      <br />
      <input
        :id="'url'+current_blog.id"
        class="mb-2 bg-dark text-center textx-xs"
        v-model="blog.imgUrl"
        readonly
      />
    </p>

    <small v-if="current_blog.imgUrl">
      <img :src="current_blog.imgUrl" alt />
    </small>
    <br />
    <textarea
      :id="'body'+current_blog.id"
      type="text"
      rows="5"
      v-model="blog.body"
      class="bg-info text-light p-1 mt-2"
      :readonly="true"
    ></textarea>

    <div class="form-group" style="display:none;text-align:left;" :id="'publish' + current_blog.id">
      <div class="form-check">
        <input class="form-check-input" v-model="blog.published" type="checkbox" id="gridCheck" />
        <label class="form-check-label" for="gridCheck">Make Public</label>
      </div>
    </div>

    <div class="justify-content-around">
      <button
        :id="'update'+current_blog.id"
        style="display:none;"
        type="button"
        class="btn btn-outline-warning"
        @click="updateBlog"
      >Update Blog</button>
      <button
        :id="'edit'+current_blog.id"
        type="button"
        class="btn btn-outline-info"
        @click="editBlog"
      >Edit Blog</button>
      <button type="button" class="btn btn-outline-warning" @click="deleteBlog">Delete Blog</button>
    </div>
    <div class="justify-content-center visible">
      <div class="text-center" v-if="current_blog.comments">
        {{current_blog.comments.length}} Comments Posted
        <comment class="border" v-for="c in current_blog.comments" :key="'id'+c.id" :com="c" />
      </div>
      <p v-else>0 Comments Posted</p>
    </div>
  </div>
</template>
<script>
import comment from "./Comment";
export default {
  name: "blog",
  data(current_blog) {
    return {
      blog: this.getBlog(),
    };
  },
  computed: {},
  methods: {
    editBlog() {
      let _id = this.current_blog.id;
      $("#edit" + _id).hide();
      $("#update" + _id).css("display", "inline");
      $("#publish" + _id).css("display", "block");

      $("#title" + _id)
        .attr("readonly", false)
        .attr("class", "mb-2 bg-dark text-center textx-xs text-warning");
      $("#url" + _id)
        .attr("readonly", false)
        .attr("class", "mb-2 bg-dark text-center textx-xs text-warning");
      $("#body" + _id)
        .attr("readonly", false)
        .attr("class", "bg-dark text-warning p-1 mt-2");
    },
    deleteBlog() {
      let _id = this.current_blog.id;
      let index = this.$store.state.profileBlogs.findIndex((b) => b.id == _id);
      this.$store.state.profileBlogs.splice(index, 1);
      this.$store.dispatch("deleteBlog", _id);
    },
    updateBlog() {
      let id = this.current_blog.id;
      let blog = this.blog;
      blog.id =  this.current_blog.id
      this.$store.dispatch("updateBlog", { data: blog, _id: blog.id });

      $("#edit" + id).show();
      $("#update" + id).css("display", "none");
      $("#publish" + id).css("display", "none");

      $("#title" + id)
        .attr("readonly", true)
        .attr("class", "mb-2 bg-dark text-center textx-xs");
      $("#url" + id)
        .attr("readonly", true)
        .attr("class", "mb-2 bg-dark text-center textx-xs");
      $("#body" + id)
        .attr("readonly", true)
        .attr("class", "bg-info text-light p-1 mt-2");
    },
    getBlog() {
      return {
        body: this.current_blog.body,
        title: this.current_blog.title,
        imgUrl: this.current_blog.imgUrl,
        creatorEmail: this.current_blog.creatorEmail,
        name: this.current_blog.creator.name,
        published: this.current_blog.published,
      };
    },
  },
  components: { comment },
  props: ["current_blog"],
};
</script>
<style scoped scss>
</style>