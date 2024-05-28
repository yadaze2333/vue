<template>
  <div>
    <router-view></router-view>
    <van-tabbar v-model="active" route>
      <van-tabbar-item name="news" size="55" icon="home-o" to="/shopping">首页</van-tabbar-item>
      <van-tabbar-item to="/shoppinglist">
        <van-icon name="shopping-cart-o" size="25" /><br />购物车
      </van-tabbar-item>
      <van-tabbar-item name="setting" icon="setting-o" to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const active = ref(0);
</script>

<style scoped>
/* 可以考虑为 ".my-swipe .van-swipe-item" 添加一些具体的样式 */
.my-swipe .van-swipe-item {
  margin: 0;
  padding: 0;
}
</style>
