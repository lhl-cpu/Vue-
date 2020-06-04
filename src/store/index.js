import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    jobs: [],
    displayjobs: [],
    rows: 0,
    showSpinner: false,
  },
  mutations: {
    SET_JOBS(state, jobs) {
      state.jobs = jobs;
    },
    SET_ROWS(state, rows) {
      state.rows = rows;
    },
    SET_DISPLAY_JOBS(state, displayjobs) {
      state.displayjobs = displayjobs;
    },
    SET_SPINNER(state, spinner) {
      state.showSpinner = spinner;
    },
  },
  actions: {
    async fetchData({ commit }) {
      commit("SET_SPINNER", true);
      return new Promise((resolve) => {
        setTimeout(async () => {
          const res = await fetch("jobs.json");
          const val = res.json();
          resolve(val);
          commit("SET_SPINNER", false);
        }, 600);
      });
    },
    async fetchJobs({ dispatch, commit }) {
      const myJson = await dispatch("fetchData");
      commit("SET_JOBS", myJson);
      const displayjobs = myJson.slice(0, 3);
      commit("SET_DISPLAY_JOBS", displayjobs);
      commit("SET_ROWS", myJson.length);
    },
    async paginate({ commit, state }, { currentPage, perPage }) {
      const start = (currentPage - 1) * perPage;
      const jobs = state.jobs.slice(start, start + 3);
      commit("SET_DISPLAY_JOBS", jobs);
    },
    updatePagination({ commit, dispatch }, { myJson, currentPage, perPage }) {
      commit("SET_JOBS", myJson);
      commit("SET_ROWS", myJson.length);
      dispatch("paginate", { currentPage, perPage });
    },
    async search({ dispatch }, { text }) {
      const myJson = await this.dispatch("fetchData");
      const value = myJson.filter((val) =>
        val.name.toLowerCase().includes(text.toLowerCase())
      );
      dispatch("updatePagination", {
        myJson: value,
        currentPage: 1,
        perPage: 3,
      });
    },
  },
  getters: {
    jobs(state) {
      return state.jobs;
    },
    rows(state) {
      return state.rows;
    },
    displayjobs(state) {
      return state.displayjobs;
    },
    showSpinner(state) {
      return state.showSpinner;
    },
  },
  modules: {},
});
