import Vue from "vue";
import Vuex, { Store } from "vuex";
import router from "../router";
import { api } from "./AxiosStore";
import { param } from "jquery";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    profile: {},
    profileBlogs: [],
    publicBlogs: [],
    activeBlog: {},
  },
  mutations: {
    setProfile(state, profile,dispatch) {
      state.profile = profile;
    },
    setProfileBlogs(state, profileBlogs) {
      state.profileBlogs = profileBlogs;
    },
    setPublicBlogs(state, publicBlogs) {
      state.publicBlogs = publicBlogs
    },
    setActiveBlog(state, activeBlog) {
      state.activeBlog = activeBlog
    },
    deleteBlog(state, id) {
      let index = state.profileBlogs.findIndex(b => b.id == id);
      state.profileBlogs.splice(index, 1);

    },
    postedComment(state,comment){
      state.activeBlog.comments.unshift(comment)
    },
    updatedComment(state,comment){
      let index = state.activeBlog.comments.findIndex(c=>c.id==comment.id)
      state.activeBlog.comments[index].body = comment.body;
    },
    deletedComment(state,id){
      let blog = state.activeBlog;
      let index = blog.comments.findIndex(c=>c.id==id);
      console.log(blog,index);
      blog.comments.splice(index,1);
      state.activeBlog = blog;
    }
  },
  actions: {
    //==================================== 
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async createBlog({ commit, dispatch }, blog) {
      try {
        let res = await api.post("blogs/", blog);
        dispatch("getProfileBlogs");
      } catch (error) {
        console.error(error);
      }
    },
    async updateBlog({ dispatch }, blog) {
      try {
        let res = await api.put("blogs/" + blog._id, blog.data);
        this.dispatch("getProfileBlogs")
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    async deleteBlog({ commit, dispatch }, id) {
      try {
        let del = await api.delete("blogs/" + id);
      } catch (error) {
        console.error(error);
      }
    },
    async getProfileBlogs({ commit }) {
      try {
        let res = await api.get("/profile/blogs/");
        commit("setProfileBlogs", res.data)
      } catch (error) {
        console.error(error);
      }
    },
    async postComment({ commit, dispatch }, comment) {
      try {
        let res = await api.post("comments/", comment);
        console.log(res.data)
        res.data.imgUrl=comment.imgUrl;
        commit("postedComment",res.data);
        dispatch("saveStateToLocal")

      } catch (error) {
        console.error(error);
      }
    },
    async updateComment({ commit,dispatch }, comment) {
      try {
        let res = await api.put("comments/" + comment._id, comment.data);
        commit("updatedComment",res.data);
        dispatch("saveStateToLocal")

      } catch (error) {
        console.error(error);
      }
    },
    async deleteComment({ dispatch, commit }, id) {
      try {
        await api.delete("comments/" + id);
        commit("deletedComment",id)
        dispatch("saveStateToLocal")

      } catch (error) {
        console.error(error);
      }
    },    
    async getPublished({ commit }) {
      try {
        let res = await api.get("blogs");
        commit("setPublicBlogs", res.data)
      } catch (error) {
        console.log(error);
      }
    },
    async getActiveBlog({ commit, dispatch }, blogID) {
      try {
        let res = await api.get("blogs/" + blogID);
        commit("setActiveBlog", res.data)
        dispatch("saveStateToLocal")
        router.push({ name: "Active" })
      } catch (error) {
        console.log(error);
      }
    },
    //============= LOCAL STORAGE METHODS ==========
    getStateFromLocal({ commit }) {
      let data = JSON.parse(window.localStorage.getItem("Bloggr"));
      if (data) {
        commit("setActiveBlog", data.activeBlog)
        console.log("in get local")
      }
    },
    saveStateToLocal({state}) {
      let save = { activeBlog: state.activeBlog }
      window.localStorage.setItem("Bloggr", JSON.stringify(save))
      console.log("in save local",save)
    },
    //==============================================
  },
});

