<template>
  <div class="address-edit-container">
    <van-nav-bar
      title="新增地址"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="address-edit-content">
      <!-- 手动输入地址信息 -->
      <van-field v-model="address.name" label="收货人姓名" placeholder="请输入姓名" />
      <van-field v-model="address.tel" label="联系电话" placeholder="请输入电话号码" />
      <van-field
        v-model="address.detail"
        label="详细地址"
        placeholder="请输入详细地址"
        autosize
        type="textarea"
        rows="3"
      />
      <div class="save-button-container">
        <van-button round block type="primary" native-type="submit" @click="onSave" class="save-button">
          保存
        </van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { reactive } from 'vue';
import shop3 from '@/api/shop3';
import { showNotify } from 'vant';

const router = useRouter();

const address = reactive({
  name: "",
  tel: "",
  detail: "",
});

function onSave() {
  console.log(address);
  shop3.addersscreate(address).then(res => {
    console.log(res);
    showNotify({ type: 'primary', message: res.data.msg });
    if (res.code === 0) {
      router.push('/addresslist'); // Redirect to address list after successful save
    }
  });
}

const onClickLeft = () => router.back();
</script>

<style scoped>
.address-edit-container {
  padding: 12px;
  max-width: 320px;
  margin: 0 auto;
}

.address-edit-content {
  padding: 12px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.van-field {
  margin-bottom: 12px;
}

.save-button-container {
  padding: 16px;
  background-color: rgba(255, 211, 67, 0.2);
}

.save-button {
  font-size: 14px;
}

.van-nav-bar {
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: #fff;
}
</style>
