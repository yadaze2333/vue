<template>
  <div class="goods-list-page">
    <van-nav-bar
      title="商品列表"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <van-list>
      <van-swipe-cell
        v-for="(goods, index) in store.state.goodslist.goodsList"
        :key="index"
        right-width="110"
      >
        <van-card
          :num="goods.num"
          tag="new"
          :price="goods.price"
          :desc="goods.sell_point"
          :title="goods.name"
          :thumb="goods.image"
          class="goods-card"
        />
        <template #right>
          <van-button
            square
            text="加入购物车"
            type="primary"
            class="add-to-cart-button"
            @click="addToCart(goods)"
          />
        </template>
      </van-swipe-cell>
    </van-list>

    <van-back-top />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const fetchGoodsList = async () => {
  await store.dispatch('goodslist/initGoodsList')
}

onMounted(async () => {
  await fetchGoodsList()
  console.log(store.state.goodslist)
})
</script>

<style scoped>
.goods-list-page {
  padding: 10px;
}

.goods-card {
  margin-bottom: 10px;
}

.add-to-cart-button {
  margin-top: 10px;
}
</style>
