<template>
  <div class="address-list">
    <van-nav-bar
      title="地址列表"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-swipe-cell v-for="(item) in list" :key="item.id">
      <van-list>
        <van-cell
          :title="item.name"
          :label="item.tel"
          :value="item.area + item.detail"
          is-link
          @click="onClick(item)"
        ></van-cell>
      </van-list>
      <template #right>
        <van-button
          square
          text="删除"
          type="danger"
          class="delete-button"
          @click="deladdress(item.id)"
        />
        <van-button
          square
          text="使用"
          type="danger"
          class="delete-button"
          @click="use(item.id)"
        />
      </template>
    </van-swipe-cell>
    <div class="a">
      <!-- 点击新增地址按钮，跳转到 addresslist 组件 -->
      <van-button round block type="primary" native-type="submit" @click="goToAddAddress">
        新增地址
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

// 使用 useRouter 创建 router 实例
const router = useRouter();

// 点击返回按钮，返回至上一级界面
function onClickLeft() {
  router.go(-1);
}

// 点击新增地址按钮，跳转到 addresslist 组件
function goToAddAddress() {
  router.push('/addresslist');
}
</script>

<style scoped>
.a {
  margin: 0px;
  padding: 0px;
  width: 100%;
  position: fixed;
  top: 93%;
}
</style>
