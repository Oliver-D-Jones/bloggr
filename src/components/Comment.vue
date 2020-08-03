<template>
  <div class="comment text-center text-wrap col-sm-12 col-md-3">
    <div class="com my-2 py-2 bg-primary" v-if="com.creatorEmail == this.$auth.userInfo.email">
      <button
        class="btn btn-info py-0 pr-1 my-0"
        data-toggle="modal"
        :data-target="'#modal'+com.id"
      >EDIT</button>
      <button class="btn btn-danger py-0 pl-1 my-0" @click="deleteComment">Delete</button>

      <h6 class="pt-2 text-light">{{com.body}}</h6>
      <p class="pt-0 m-0" v-if="com.creator!=null">By: {{com.creator.name}}</p>
      <p class="pt-0 m-0">Email: {{com.creatorEmail}}</p>
      <small>
        <img v-if="com.creator!=null" :src="com.creator.picture" class="img-fluid border mt-2" />
      </small>

      <div class="container">
        <div class="modal fade" :id="'modal'+com.id">
          <div class="modal-dialog">
            <div class="modal-content bg-dark">
              <div class="modal-header">
                <h4 class="modal-title text-light"></h4>
                <small>
                  <button type="button" class="close bg-warning" data-dismiss="modal">&times;</button>
                </small>
              </div>
              <div class="modal-body">
                <form>
                  <div class="form-group">
                    <label for="blogPostEntry">Edit Comment</label>
                    <textarea v-model="com.body" class="form-control" :id="'text'+com.id" rows="4"></textarea>
                  </div>
                </form>
              </div>

              <div class="modal-footer justify-content-center">
                <button type="button" class="btn btn-success" @click="updateComment(com.body)">POST</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="com my-2 py-2 bg-dark">
      <h6 class="pt-2 text-light">{{com.body}}</h6>
      <p class="pt-0 m-0" v-if="com.creator!=null">By: {{com.creator.name}}</p>
      <p class="pt-0 m-0">Email: {{com.creatorEmail}}</p>
      <small>
        <img v-if="com.creator!=null" :src="com.creator.picture" class="img-fluid border mt-2" />
      </small>
    </div>
  </div>
</template>
<script>
export default {
  name: "comment",
  data() {
    return {};
  },
  methods: {
    deleteComment() {
      if (this.$auth.isAuthenticated) {
        let id = this.com.id;
        this.$store.dispatch("deleteComment",id)
      }
    },
    updateComment(body) {
      if (this.$auth.isAuthenticated) {
        let update = this.com;
        update.body = body;
        let _id = update.id;
        this.$store.dispatch("updateComment", { data: update, _id: update.id });
      }
    },
  },
  props: ["com"],
  components: {},
};
</script>


<style scoped>
.com {
  overflow-y: auto;
}
img {
  max-height: 125px;
}
.badge {
  cursor: pointer;
}
</style>