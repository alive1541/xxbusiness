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
      list = this.addPlaceHolderWhenNull(list);
    } catch (e) {
      console.log("message data方法出错", e);
    }
    return {
      list
    };
  },
  methods: {
    addPlaceHolderWhenNull(list) {
      if (list === null) {
        return [{ title: "当前无消息" }];
      }
      if (list.length === 0) {
        list.push({
          title: "当前无消息"
        });
        return list;
      }
    }
  },
  mounted: function() {}
};
</script>

<style scoped>
.message-wraper {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
