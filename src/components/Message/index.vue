<template>
  <div class="message-wraper">
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
      console.log("message data方法出错", e);
    }
    return {
      list
    };
  },
  methods: {
    log() {
      const ele = document.querySelector(".message-wraper");
      const h = window.getComputedStyle(ele).height;
      console.log(1111, h);
    }
  },
  mounted: function() {
    this.log();
  }
};
</script>

<style scoped>
.message-wraper {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
