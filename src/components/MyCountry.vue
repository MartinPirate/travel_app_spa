<template>
  <div v-if="myCountries.length > 0">

    <div class="my-country flex"
         v-for="(country, index) in myCountries"
         v-bind:key="index">
      <div class="left flex">
        <span class="my-region">  {{ country.name.common }}</span>
      </div>

      <div class="right flex">
        <span class="price">  {{ country.region }}</span>
        <button class="status-button flex red" @click="removeFromMyList(index,country )">
          Remove
        </button>

      </div>
      <router-link class="icon" :to="{name: 'Country', params:{countryCode : country.ccn3}}">
        <img src="@/assets/icon-arrow-right.svg" alt="">
      </router-link>
    </div>
  </div>


  <div v-else class="empty flex flex-column">
    <img src="@/assets/illustration-empty.svg" alt="">
    <h3>There is nothing here</h3>
    <p>Created add countries to your list to get started</p>

  </div>

  <!--  <button
        @click="loadMore"
        class="loadMoreBtn"
        v-if="currentPage * maxPerPage < myCountries.length"
    >
      Load more .....
    </button>-->

</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "MyCountry",
  data() {
    return {
      currentPage: 1,
      maxPerPage: 10,
      showReadMore: true,
    }
  },

  methods: {
    ...mapMutations(['ADD_TO_COUNTRIES']),

    removeFromMyList(index, country) {
      this.ADD_TO_COUNTRIES(country)
      this.myCountries.splice(index, 1)

    }

  },
  computed: {
    myCountries() {
      return this.$store.state.myList;
    },
  }
}
</script>

<style lang="scss" scoped>
.my-country {
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

    .my-region {
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

    .price {
      flex: 1;
      font-size: 16px;
      font-weight: 600;
    }
  }

}

.loadMoreBtn {
  background-color: #7c5dfa;

}

.empty {
  margin-top: 160px;
  align-items: center;

  img {
    width: 214px;
    height: 200px;
  }

  h3 {
    font-size: 20px;
    margin-top: 40px;
    color: #ffffff;

  }

  p {
    text-align: center;
    max-width: 224px;
    font-size: 12px;
    font-weight: 300;
    margin-top: 16px;
  }
}

</style>
