<template>
  <div>
    <button id="abc" @click="diyfun">点击我一下</button>
  </div>


</template>


<script>
  // import {query1} from "js/jquery.min.js"
  // import {homePage} from "js/HomePage.js"

  export default {
    data() {
      return {
        testvalue: ''
      }
    },
    methods: {
      diyfun: function () {
        homePage();
      }
    }

  }
</script>


<style>

</style>
