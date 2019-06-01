<template>
  <div class="box-wraper">
    <x-header title="账户">
      <div class="title">账户</div>
    </x-header>
    <router-view></router-view>
    <tabbar/>
  </div>
</template>

<script>
import Tabbar from "./unit/tabbar";
export default {
  components: { Tabbar },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped lang="less">
</style>
