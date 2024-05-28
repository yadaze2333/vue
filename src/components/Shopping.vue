<template>
  <div class="swiper-container">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in imagedata" :key="item.id">
        <img :src="item.img" class="swiper-img" />
      </van-swipe-item>
    </van-swipe>

    <van-tabs v-model:active="active" scrollspy sticky>
      <van-tab v-for="item in imagedata2" :key="item.id" :title="item.name">
        <div class="card-container">
          <van-card
            v-for="subItem in item.sub"
            :key="subItem.id"
            :num="0"
            :price="subItem.pid"
            desc="描述信息"
            :title="subItem.name"
            :thumb="subItem.image"
          >
            <template #tags>
              <van-tag plain type="primary">标签1</van-tag>
              <van-tag plain type="primary">标签2</van-tag>
            </template>

            <template #footer>
              <van-icon
                name="cart-o"
                color="gray"
                size="40"
                @click="toggleCartItem(item.id, subItem.id)"
                v-show="isCartItemVisible(item.id, subItem.id)"
              />
              <van-stepper
                v-model="subItem.sub.pid"
                theme="round"
                button-size="22"
                v-show="!isCartItemVisible(item.id, subItem.id)"
                disable-input
                min="-1"
                @minus="removeFromCart(item.id, subItem.id)"
              />
            </template>
          </van-card>
        </div>
      </van-tab>
    </van-tabs>
    <HomeTabberVue />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import shop3 from '@/api/shop3';
import HomeTabberVue from './HomeTabber.vue';

const active = ref(0);
const imagedata = ref([]);
const imagedata2 = ref([]);
const cart = reactive([]);

const fetchImages = async () => {
  const res = await shop3.getImgs();
  imagedata.value = res.data;
};

const fetchCategories = async () => {
  const res = await shop3.category();
  imagedata2.value = res.data;
  initializeCartVisibility();
};

const initializeCartVisibility = () => {
  imagedata2.value.forEach(category => {
    category.sub.forEach(subItem => {
      cart.push({ id: `${category.id}-${subItem.id}`, visible: true });
    });
  });
};

const findCartIndex = (categoryId, subItemId) => {
  return cart.findIndex(item => item.id === `${categoryId}-${subItemId}`);
};

const toggleCartItem = (categoryId, subItemId) => {
  const index = findCartIndex(categoryId, subItemId);
  if (index !== -1) {
    cart[index].visible = !cart[index].visible;
  }
  const item = imagedata2.value.find(c => c.id === categoryId).sub.find(s => s.id === subItemId);
  if (cart[index].visible) {
    localStorage.setItem('shopping', JSON.stringify(cart));
  } else {
    const storedCart = JSON.parse(localStorage.getItem('shopping')) || [];
    storedCart.push(item);
    localStorage.setItem('shopping', JSON.stringify(storedCart));
  }
};

const isCartItemVisible = (categoryId, subItemId) => {
  const index = findCartIndex(categoryId, subItemId);
  return index !== -1 ? cart[index].visible : false;
};

const removeFromCart = (categoryId, subItemId) => {
  const index = findCartIndex(categoryId, subItemId);
  if (index !== -1) {
    cart[index].visible = true;
    const storedCart = JSON.parse(localStorage.getItem('shopping')) || [];
    const itemIndex = storedCart.findIndex(item => item.id === `${categoryId}-${subItemId}`);
    if (itemIndex !== -1) {
      storedCart.splice(itemIndex, 1);
      localStorage.setItem('shopping', JSON.stringify(storedCart));
    }
  }
};

onMounted(() => {
  fetchImages();
  fetchCategories();
});
</script>
  <style scoped>
.swiper-container {
  width: 100%; 
  max-width: 800px; 
  margin: 0 auto; 
}

.swiper-img {
  width: 100%; 
  height: auto; 
}
  .my-swipe {
    width: 100%;
    height:auto;
  }
  .card-container{
    display:flex;
    flex-wrap: wrap;
  justify-content: space-between;
  }
  .van-card {
    width: calc(50% - 10px);
    margin-bottom: 10px;
  }
  
  .button-container {
    margin: 16px 0;
  }
  
  .van-button {
    margin-top: 10px;
  }
  </style>
  
  