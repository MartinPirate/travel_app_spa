<template>
  <div class="home container">
    <div v-if="totalCountriesTotal" class="header flex">
      <div class="left flex flex-column">
        <h1>Countries</h1>
        <span>There are {{ totalCountriesTotal }} total countries</span>
      </div>
      <div class="right flex">
        <div class="filter flex">
          <input type="text" placeholder="Search for a country..." v-model="query" v-on:input="Search"/>
        </div>

        <router-link v-show="getMyListCount" class="button button_home flex" :to="{name : 'My_List'}">
          <span>My List ({{ getMyListCount }})</span>
        </router-link>
      </div>
    </div>

    <Loading v-show="isLoading"></Loading>
    <Country/>
<!--  <div v-else class="empty">
    <img src="@/assets/illustration-empty.svg" alt="">
    <h3>There is nothing here</h3>
    <p>No countries were loaded please try again</p>

    </div>-->
  </div>

</template>

<script>


import Country from "../components/Country";
import Loading from "../components/Loading";

export default {
  name: "Home",
  data() {
    return {
      query: '',

    }

  },
  components: {
    Loading,
    Country,
  },
  methods: {

    openCountry(id) {
      this.$router.push(`/country/${id}`);
    },

    Search() {
      this.$store.dispatch("getSearchResults", this.query);
    },

  },
  computed: {
    getMyListCount() {
      return this.$store.state.myList.length;
    },

    totalCountriesTotal() {
      return this.$store.state.countries.length;
    },
    isLoading(){
      console.log(this.$store.state.isLoading);
      return this.$store.state.isLoading;

    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  color: #ffffff;

  .header {
    margin-bottom: 65px;

    .left,
    .right {
      flex: 1;
    }

    .right {
      justify-content: flex-end;
      align-items: center;

      input {
        width: 100%;
        background-color: #1e2139;
        color: #ffffff;
        border-radius: 4px;
        padding: 12px 4px;
        border: none;
        text-align: center;

        &:focus {
          outline: none;
        }

      }

      .button_home,
      .filter {
        align-items: center;

        span {
          font-size: 12px;
        }
      }

      .filter {
        position: relative;
        margin-right: 40px;
        cursor: pointer;

        img {
          margin-left: 12px;
          width: 9px;
          height: 5px;

        }

        .filter-menu {
          width: 120px;
          position: absolute;
          top: 25px;
          list-style: none;
          background-color: #1e2139;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

          li {
            cursor: pointer;
            font-size: 12px;
            padding: 10px 20px;

            &:hover {
              color: #1e2139;
              background-color: #ffffff;
            }
          }

        }
      }

      .button_home {
        padding: 8px 10px;
        background-color: #7c5dfa;
        border-radius: 40px;

        .inner-button {
          margin-right: 8px;
          border-radius: 50%;
          padding: 8px;
          align-items: center;
          justify-content: center;
          background-color: #ffffff;

          img {
            width: 10px;
            height: 10px;
          }
        }
      }

    }

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
}


</style>
