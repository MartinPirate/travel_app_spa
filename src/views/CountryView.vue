<template>
  <div class="country-view container">
    <router-link class="nav-link flex" :to="{name : 'Home'}">
      <img src="@/assets/icon-arrow-left.svg" alt=""> Go Back
    </router-link>

    <div class="header flex">
      <div class="left flex">
        <span>Status</span>
        <div class="status-button flex paid">
          <span> {{ country.status }}</span>
        </div>
      </div>
      <div class="right flex">
        <button class="dark-purple">Add To List</button>
        <button class="red"> Remove From List
        </button>
      </div>
    </div>

    <div class="country-details flex flex-column">
      <div class="top flex">
        <div class="left flex flex-column">
          <p><span>#ccn3: </span>{{ country.ccn3 }}</p>
          <p>name : {{ country.name.official }}</p>

        </div>
        <div class="right flex flex-column">
          <p>Tld: {{ country.tld['0'] }}</p>
          <p>Root: {{ country.idd.root }}</p>
          <p>suffixes: {{ country.idd.suffixes['0'] }}</p>
        </div>
      </div>
      <div class="middle flex">
        <div class="region flex flex-column">
          <h4>Region</h4>
          <p>
            {{ country.region }}
          </p>
          <h4>Sub Region</h4>
          <p>
            {{ country.subregion }}
          </p>
        </div>
        <div class="bill flex flex-column">
          <h4>Other info:</h4>
          <p> capital: {{ country.capital['0'] }}</p>
          <p> Area: {{ country.area }} sq m</p>
          <p> LangLing: {{ country.latlng }}</p>
          <p> Languages: {{ country.languages }}</p>
        </div>
        <div class="send-to flex flex-column">
          <h4>more info.....</h4>

          <p v-if="country.landlocked"> {{ country.name.official }} is a Landlocked country</p>
          <p v-else>{{ country.name.official }} is a Landlocked country</p>

          <p v-if="country.independent"> {{ country.name.official }} is an Independent country</p>
          <p v-else>{{ country.name.official }} is not an Independent country</p>

          <p v-if="country.unMember"> {{ country.name.official }} is a member of the UN</p>
          <p v-else>{{ country.name.official }} is not a memeber of the o the UN</p>

        </div>
      </div>

      <div class="bottom flex flex-column">
        <div class="other-items">
          <h4>Currencies</h4>
          <div class="headings flex">
            <p>Item Name</p>
            <p>QTY</p>
          </div>
          <div v-for="(item, index) in country.currencies" :key="index" class="item flex">
            <p>{{ item.name }}</p>
            <p>{{ item.symbol }}</p>
          </div>
        </div>
      </div>

      <div class="bottom flex flex-column">
        <div class="other-items">
          <h4>Frag</h4>
          <div class="flag flex">
            <img :src="country.flags['0']" :alt="country.name.common + '-flag'"/>

          </div>
        </div>
      </div>

      <div class="bottom flex flex-column">
        <div class="other-items">
          <h4>Street Map Link</h4>
          <div class="flag flex">
            <p> {{ country.maps['openStreetMaps'] }} </p>

          </div>
        </div>
      </div>


    </div>
  </div>


</template>

<script>
import {mapMutations} from "vuex/dist/vuex.mjs";

export default {
  name: "CountryView",

  created() {
    //get the country with that specific code
    this.getCurrentCountry()

  },
  methods: {
    ...mapMutations(['SET_CURRENT_COUNTRY']),

    getCurrentCountry() {
      this.SET_CURRENT_COUNTRY(this.$route.params.countryCode)
    },

  },
  computed: {

    country() {
      return this.$store.state.countryPayloadArray['0'];

    },
  }
}
</script>

<style lang="scss" scoped>
.country-view {
  .nav-link {
    margin-bottom: 32px;
    align-items: center;
    color: #ffffff;
    font-size: 12px;

    img {
      margin-right: 16px;
      width: 7px;
      height: 7px;
    }
  }

  .header,
  .country-details {
    background-color: #1e2139;
    border-radius: 20px;
  }

  .header {
    align-items: center;
    padding: 24px 32px;
    font-size: 12px;

    .left {
      align-items: center;

      span {
        color: #dfe3fa;
        margin-right: 16px;
      }
    }

    .right {
      flex: 1;
      justify-content: flex-end;

      button {
        color: #ffffff;
      }

    }

  }

  .country-details {
    padding: 48px;
    margin-top: 24px;

    .top {
      div {
        color: #dfe3fa;
        flex: 1;

      }

      .left {
        font-size: 12px;

        p:first-child {
          font-size: 24px;
          text-transform: uppercase;
          color: #ffffff;
          margin-bottom: 8px;
        }

        p:nth-child(2) {
          font-size: 16px;
        }

        span {
          color: #888eb0;
        }
      }

      .right {
        font-size: 12px;
        align-items: flex-end;
      }
    }

    .middle {

      margin-top: 50px;
      color: #dfe3fa;
      gap: 16px;

      h4 {
        font-size: 12px;
        font-weight: 400;
        margin-bottom: 12px;
      }

      p {
        font-size: 16px;
      }

      .bill,
      .region {
        flex: 1;
      }

      .region {
        h4:nth-child(3) {
          margin-top: 32px;
        }

        p {
          font-weight: 600;
        }
      }

      .bill {
        p:nth-child(2) {
          font-size: 16px;
        }

        p:nth-child(3) {
          margin-top: auto;
        }

        p {
          font-size: 12px;
        }
      }

      .send-to {
        flex: 2;
      }

    }

    .bottom {
      margin-top: 50px;

      .other-items {
        padding: 32px;
        border-radius: 20px 20px 0 0;
        background-color: #252945;

        .headings {
          color: #dfe3fa;
          font-size: 12px;
          margin-bottom: 32px;

          p:first-child {
            flex: 3;
            text-align: left;

          }

          p {
            flex: 1;
            text-align: right;
          }

        }

        .item {
          margin-bottom: 32px;
          font-size: 13px;
          color: #ffffff;
        }

        &:last-child {
          margin-bottom: 0;
        }

        p:first-child {
          flex: 3;
          text-align: left;

        }

        p {
          flex: 1;
          text-align: right;
        }

      }

      .total {
        color: #ffffff;
        padding: 32px;
        background-color: rgba(12, 14, 22, 0.7);
        align-items: center;
        border-radius: 0 0 20px 20px;

        p {
          flex: 1;
          font-size: 12px;
        }

        p:nth-child(2) {
          font-size: 20px;
          text-align: right;
        }
      }


      .flag {
        height: 60px;
        width: 100%;
      }
    }
  }

}


</style>

