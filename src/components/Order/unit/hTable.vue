<template>
  <div>
    <x-table class="order-table">
      <thead>
        <tr class="order-table-title">
          <th>网站</th>
          <th>账号</th>
          <th>订单详情</th>
          <th>购买金额(赔率)</th>
          <th>下单时间</th>
          <th>结算金额</th>
          <th>收益</th>
        </tr>
      </thead>
      <tbody :key="i + 'key'" v-for="(item,i) in list">
        <tr v-if="isUnilateral(item)">
          <td>{{item.first_website}}</td>
          <td>{{item.first_account}}</td>
          <td>{{handleOrderDetial(item)}}</td>
          <td>{{item.first_order_amount}}({{item.first_odds}})</td>
          <td>{{item.first_order_time}}</td>
          <td>{{item.first_settle_amount === null ? '-' : item.first_settle_amount}}</td>
          <td>{{item.profit === null ? '-' : item.profit}}</td>
        </tr>

        <tr v-if="!isUnilateral(item)">
          <td>{{item.first_website}}</td>
          <td>{{item.first_account}}</td>
          <td>{{handleOrderDetial(item)}}</td>
          <td>{{item.first_order_amount}}({{item.first_odds}})</td>
          <td>{{item.first_order_time}}</td>
          <td>{{item.first_settle_amount === null ? '-' : item.first_settle_amount}}</td>
          <td rowspan="2">{{item.profit === null ? '-' : item.profit}}</td>
        </tr>
        <tr v-if="!isUnilateral(item)">
          <td>{{item.second_website}}</td>
          <td>{{item.second_account}}</td>
          <td>{{handleOrderDetial(item)}}</td>
          <td>{{item.second_order_amount}}({{item.second_odds}})</td>
          <td>{{item.second_order_time}}</td>
          <td>{{item.second_settle_amount === null ? '-' : item.second_settle_amount }}</td>
          <td></td>
        </tr>
      </tbody>
    </x-table>
  </div>
</template>

<script>
import Api from "@/service/Order";
import { XTable } from "vux";

export default {
  props: {
    list: Array
  },
  components: { XTable },
  data() {
    return {};
  },
  methods: {
    handleOrderDetial(item) {
      const { game_time, host_team, guest_team } = item;
      return `${game_time} ${host_team} 对 ${guest_team}`;
    },
    isUnilateral(item) {
      return item.is_unilateral === 1;
    }
  },
  mounted: function() {}
};
</script>

<style>
</style>
