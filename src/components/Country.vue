<template>
  <div class="country flex"
       v-for="(country, index) in paginatedCountries"
       v-bind:key="index">
    <div class="left flex">
      <span class="country-name">  {{ country.name.common }}</span>
    </div>

    <div class="right flex">
      <span class="region">  {{ country.region }}</span>
      <button class="status-button flex paid" @click="addToMyList(index,country )">
        Add to List
      </button>

    </div>
    <router-link class="icon" :to="{name: 'Country', params:{countryCode : country.ccn3}}">
      <img src="@/assets/icon-arrow-right.svg" alt="">
    </router-link>
  </div>

  <button
      @click="loadMore"
      class="loadMoreBtn"
      v-if="currentPage * maxPerPage < countries.length"
  >
    Load more .....
  </button>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "Country",
  data() {
    return {
      currentPage: 1,
      maxPerPage: 10,
      showReadMore: true,
    }
  },
  computed: {
    countries() {
      return this.$store.state.countries;

    },
    loading() {
      return this.$store.state.isLoading;
    },
    paginatedCountries() {
      return this.countries.slice(0, this.currentPage * this.maxPerPage);
    },
  },
  methods: {
    ...mapMutations(['ADD_COUNTRY_TO_MY_LIST']),
    loadMore() {
      this.currentPage += 1;
    },
    openCountry(id) {
      this.$router.push(`/country/${id}`);
    },
    addToMyList(index, country) {
      this.ADD_COUNTRY_TO_MY_LIST(country)

      this.countries.splice(index, 1)


    }
  },
  mounted() {
    this.$store.dispatch("getCountries");
  },

}
</script>

<style lang="scss" scoped>
.country {
  text-decoration: none;
  cursor: pointer;
  gap: 16px;
  margin-bottom: 16px;
  color: #fff;
  border-radius: 20px;
  padding: 10px 10px;
  background-color: #1e2139;
  align-items: center;

  .left {
    align-items: center;
    flex-basis: 60%;
    gap: 16px;

    span {
      flex: 1;
    }

    .country-name {
      text-transform: uppercase;
    }

  }

  .right {
    gap: 60px;
    flex-basis: 40%;
    align-items: center;

    span {
      font-size: 13px;
    }

    .region {
      flex: 1;
      font-size: 16px;
      font-weight: 600;
    }
  }

}

.loadMoreBtn {
  background-color: #7c5dfa;
}

</style>
