<template>
  <div class="shopping-list">
    <van-nav-bar title="购物车" left-text="返回商品" right-text="地址" left-arrow @click-left="onClickLeft"
      @click-right="onClickRight" />
    <div class="shopping-list-items">
      <van-card v-for="(item, index) in shoppingList" :key="item.id" :num="0" :price="item.pid" desc="描述信息" :title="item.name"
        :thumb="item.image">
        <template #tags>
          <van-tag plain type="primary">{{ index }}</van-tag>
          <van-tag plain type="primary">标签</van-tag>
        </template>
        <template #footer>
          <van-stepper v-model="count[index]" theme="round" button-size="22" disable-input min="0" @minus="updateCount(index)"
            @plus="updateCount(index)" />
        </template>
      </van-card>
    </div>

    <van-submit-bar button-text="提交订单" @submit="submitOrder" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import shop3 from '@/api/shop3'
import { showNotify } from 'vant'

const router = useRouter()
const route = useRoute()
const shoppingList = ref([])
const count = reactive([])

onMounted(() => {
  loadShoppingList()
})

function loadShoppingList() {
  const storedShoppingList = JSON.parse(localStorage.getItem('shopping')) || []
  shoppingList.value = storedShoppingList

  for (let i = 0; i < storedShoppingList.length; i++) {
    count.push(1)
  }
}

function updateCount(index) {
  console.log(`商品 ${index + 1} 的数量变为 ${count[index]}`)
}

function onClickLeft() {
  router.push('/shopping')
}

function onClickRight() {
  router.push('/addresslist')
}

function submitOrder() {
  const order = {
    address: route.query.address || '',
    note: '',
    goods: shoppingList.value.map((item, index) => ({
      id: item.id,
      count: count[index],
      selected: true
    }))
  }

  shop3.ordercreate(order).then(res => {
    showNotify({ type: 'primary', message: res.msg })
    if (res.code !== 0) {
      shoppingList.value = []
      count.length = 0
      localStorage.removeItem('shopping')
    }
  })
}
</script>

<style scoped>
.shopping-list {
  padding: 16px;
  background-color: #f0faff;
  min-height: 100vh;
  max-width: 600px;
  margin: 0 auto;
}

.van-nav-bar {
  background-color: #ffffff;
  border-bottom: 1px solid #ebebeb;
}

.shopping-list-items {
  margin: 16px 0;
}

.van-card {
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.van-submit-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 600px;
  left: 50%;
  transform: translateX(-50%);
  border-top: 1px solid #ebebeb;
  background-color: #ffffff;
}
</style>
