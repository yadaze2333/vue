<template>
  <div class="address-list">
    <van-nav-bar
      title="地址列表"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-swipe-cell v-for="(item ,index) in list" :key="index"> 
      <van-list>
        <van-cell
          :title="item.name"
          :label="item.tel"
          :value="item.area + item.detail"
          is-link
          @click="onClick(item.id)"
        />
      </van-list>
      <template #right>
        <van-button square text="删除" type="danger" class="delete-button" @click="deladdress(item.id)" />
        <van-button square text="使用" type="danger" class="delete-button" @click="use(item.id)" />
      </template>
    </van-swipe-cell>
    <div class="add-address-button"> 
      <van-button round block type="primary" native-type="submit" @click="onAdd">
        新增地址
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue';
import shop3 from '@/api/shop3';

const router = useRouter()
const list = ref("")

function getaddress() {       
  shop3.addresslist().then(res => {       
    list.value = res.data
    console.log(res.data) 
  })       
  
  let a = 18
  shop3.getaddress(a).then(res => {
    console.log(res)
  })
}       

function onAdd() {
  router.push("/address")
}

function deladdress(a) {
  console.log(a)
  shop3.delgetaddress(a).then(res => {
    console.log(res)
  })
}

function use(a) {
  router.push({
    path :"shoppinglist",
    query : { address: a }
  })
}

function onClick(a) {
  router.push({
    path :"addressdetail",
    query : { address: a }
  })
}

const onClickLeft = () => history.back();
getaddress()
</script>

<style scoped>
.add-address-button {
  margin-top: 20px;
  position: fixed;
  bottom: 10px;
  width: 100%;
}
</style>
