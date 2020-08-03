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
    setProfile(state, profile) {
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
      let blog = state.activeBlog;
      blog.comments.unshift(comment)
      state.activeBlog = blog
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
        commit("postedComment",res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async updateComment({ commit }, comment) {
      try {
        let res = await api.put("comments/" + comment._id, comment.data);
        // commit("postedComment",comment);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteComment({ state, dispatch }, id) {
      try {
        await api.delete("comments/" + id);
        // dispatch("getActiveBlog",state.activeBlog.blog.id)
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
        // data.activeBlog = data.activeBlog.map(todo => new ToDo(todo));
        commit("setActiveBlog", data.activeBlog)
      }
    },
    saveStateToLocal() {
      let save = { activeBlog: this.state.activeBlog }
      window.localStorage.setItem("Bloggr", JSON.stringify(save))
    },
    //==============================================
  },
});

