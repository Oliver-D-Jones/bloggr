<template>
  <div class="postBlogModal">
    <div class="container">
      <div class="modal fade" id="blogPostModal">
        <div class="modal-dialog">
          <div class="modal-content bg-dark">
            <div class="modal-header">
              <h4 class="modal-title text-light">New Blog Entry For {{profile.name}}</h4>
              <small>
                <button type="button" class="close bg-warning" data-dismiss="modal">&times;</button>
              </small>
            </div>

            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="blogPostImg">Image URL</label>
                  <input
                    v-model="post.imgUrl"
                    class="form-control"
                    id="blogPostImg"
                    type="text"
                    :placeholder="profile.picture"
                  />
                </div>
              </form>
              <form>
                <div class="form-group">
                  <label for="blogPostTitle">Title</label>
                  <input
                    v-model="post.title"
                    class="form-control"
                    id="blogPostTitle"
                    type="text"
                    placeholder="Title..."
                  />
                </div>
              </form>
              <form>
                <div class="form-group">
                  <label for="blogPostEntry">Body</label>
                  <textarea
                    v-model="post.body"
                    class="form-control"
                    id="blogPostEntry"
                    rows="3"
                    placeholder="Blog Body..."
                  ></textarea>
                </div>
              </form>
              <div class="form-group form-check">
                <input
                  v-model="post.published"
                  type="checkbox"
                  class="form-check-input"
                  id="check1"
                />
                <label class="form-check-label" for="check1">Make Public</label>
              </div>
            </div>

            <div class="modal-footer justify-content-center">
              <button type="button" class="btn btn-success" @click="postBlog(post,profile)">POST</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "postBlogModal",
  data() {
    return {
      post: {
        title: "",
        body: "",
        imgUrl: "",
        published: false,
        creatorEmail: "",
      },
    };
  },
  computed: {},
  methods: {
    postBlog(post, profile) {
      post.creatorEmail = profile.email;
      if (!post.imgUrl) post.imgUrl = profile.picture;
      this.$store.dispatch("createBlog", post);
      $("#blogPostModal").modal("hide");
    },
  },
  components: {},
  props: ["profile"],
};
</script>


<style scoped>
</style>

