<template>
  <div>
    <panel :list="list" type="1"></panel>
  </div>
</template>

<script>
import { Panel } from "vux";

export default {
  components: { Panel },
  data() {
    let list = window.localStorage.getItem("list");
    try {
      list = JSON.parse(list);
    } catch (e) {
      console.log(e);
    }
    return {
      list
    };
  },
  methods: {},
  mounted: function() {}
};
</script>

<style scoped>
</style>
