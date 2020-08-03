<template>
  <div class="active container-fluid">
    <div class="row justify-content-center bg-gradient-light">
      <div class="col-10 my-1 card text-center border border-rounded shadow-lg">
        <div class="card-body">
          <h5 class="card-title text-dark">{{activeBlog.blog.id}}</h5>
          <h6
            class="card-subtitle mb-2 text-muted"
            v-if="activeBlog.blog.creator!=null"
          >By: {{activeBlog.blog.creator.name}}</h6>
          <h6 class="card-subtitle mb-2 text-muted">Email: {{activeBlog.blog.creatorEmail}}</h6>
          <p v-if="activeBlog.imgUrl">
            <img :src="activeBlog.imgUrl" alt />
          </p>
          <p class="card-text bg-info text-light border-rounded">{{activeBlog.blog.body}}</p>
        </div>
        <button
          type="button"
          class="btn btn-outline-light bg-info"
          data-toggle="modal"
          data-target="#commentModal"
        >Post A Comment</button>
      </div>
      <!-- The Modal -->
      <div class="modal fade" id="commentModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
              <h4 class="modal-title">Comment On This Blog</h4>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>

            <!-- Modal body -->
            <div class="modal-body">
              <textarea v-model="body" type="text" class="text-dark" cols="30" rows="10"></textarea>
            </div>

            <!-- Modal footer -->
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-danger"
                @click="postComment"
                data-dismiss="modal"
              >Comment</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="text-center">{{activeBlog.comments.length}} Comments Posted</p>
    <div class="row rowComment justify-content-center">
      <comment class="comment border" v-for="c in activeBlog.comments" :key="'key'+c.id" :com="c" />
    </div>
  </div>
</template>
<script>
import comment from "../components/Comment";
export default {
  name: "active",
  data() {
    return {
      body: "",
    };
  },
  computed: {
    activeBlog() {
      if (this.current_blog) {
        return this.$store.state.activeBlog;
      } else {
       this.$store.dispatch("getStateFromLocal");
       return this.$store.state.activeBlog;
      }
    },
  },
  methods: {
    postComment() {
      let comment = {};
      comment.blogId = this.activeBlog.blog.id;
      comment.creatorEmail = this.$auth.userInfo.email;
      comment.imgUrl = this.$auth.userInfo.picture;
      comment.body = this.body;
      this.$store.dispatch("postComment", comment);
    },
  },
  components: { comment },
};
</script>


<style scoped scss>
.rowComment {
  max-height: 60vh;
  overflow: auto;
  border: lavender 2px;
  border-style: outset;
}
.rowComment::-webkit-scrollbar {
  display: none;
}
.card {
  cursor: pointer;
}
p.card-text {
  min-height: 4rem;
  max-height: 12rem;
  overflow-y: auto;
  cursor: pointer;
  border: inset;
}
p.card-text::-webkit-scrollbar {
  display: none;
}
</style>