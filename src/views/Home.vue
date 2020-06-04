<template>
  <b-container>
    <b-row align-v="center">
      <card
        v-for="(job, index) in displayjobs"
        :key="index"
        :titlename="job.name"
        :id="job.id"
      ></card>
    </b-row>

    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      first-text="First"
      prev-text="Prev"
      next-text="Next"
      last-text="Last"
      @input="paginate(currentPage)"
    ></b-pagination>
  </b-container>
</template>

<script>
// @ is an alias to /src
import card from "@/components/card";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      currentPage: 1,
      perPage: 3,
    };
  },
  computed: {
    ...mapGetters(["jobs", "displayjobs", "rows"]),
  },
  components: {
    card,
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      await this.$store.dispatch("fetchJobs");
    },
    paginate(e) {
      this.$store.dispatch("paginate", {
        currentPage: this.currentPage,
        perPage: this.perPage,
      });
    },
  },
};
</script>
