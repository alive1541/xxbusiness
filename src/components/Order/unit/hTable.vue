<template>
  <div>
    <x-table class="order-table" full-bordered>
      <thead>
        <tr class="order-table-title">
          <th>{{$i18n.translate("web")}}</th>
          <th>{{$i18n.translate("account")}}</th>
          <th>{{$i18n.translate("order details")}}</th>
          <th>{{$i18n.translate("money")}}({{$i18n.translate("odds")}})</th>
          <th>{{$i18n.translate("Order time")}}</th>
          <th>{{$i18n.translate("Settlement amount")}}</th>
          <th>{{$i18n.translate("profit")}}</th>
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
          <!-- <td></td> -->
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
      return `${game_time} ${host_team} & ${guest_team}`;
    },
    isUnilateral(item) {
      return item.is_unilateral === 1;
    }
  },
  mounted: function() {}
};
</script>

<style>
/* .order-table-title {
  font-weight: 500;
  background-color: #f7f7f7;
  color: black;
}

.order-table {
  table-layout: fixed;
  color: black;
  background-color: #fff;
}
.order-table th,
.order-table td {
  line-height: 20px;
  word-break: break-all;
} */
</style>
