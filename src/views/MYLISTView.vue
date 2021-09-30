<template>
  <router-link class="container nav-link flex" :to="{name : 'Home'}">
    <img src="@/assets/icon-arrow-left.svg" alt=""> Go Back
  </router-link>
  <MyCountry/>
</template>

<script>
import MyCountry from "../components/MyCountry";

export default {
  name: "My_List",
  components: {MyCountry},
}
</script>

<style lang="scss" scoped>
.nav-link {
  margin-top: 30px;
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
</style>
