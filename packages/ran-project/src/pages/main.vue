<script setup>
import { userStore } from '../store/index'
import { ref, reactive, onMounted, computed} from 'vue'
import { useRoute,useRouter } from 'vue-router'

// pinia
const store = userStore()

// data
const route = useRoute()
const router = useRouter()
let activeIndex = ref(0)
let list = ref([])
let carsList = ref([
  [
    {
      id: 1,
      img: 'https://img12.360buyimg.com/jdcms/s300x300_jfs/t1/127267/31/27130/761698/62591377E3bce2bde/4e2a4e8ae25a9d85.png.webp',
      title: '测试土豆 500ml/瓶',
      desCribe: '手工制作 | 柔和 | 味甜',
      num: 4,
      addNum: 0,
      price: '¥5.0',
      sell: '袋',
      selected: true,
    },
    {
      id: 2,
      img: 'https://img30.360buyimg.com/jdcms/s300x300_jfs/t1/217449/21/8595/422011/61c28aa2E1fe2d1f4/b9bd0198d47a672f.jpg.webp',
      title: '测试黑米 1斤/袋',
      desCribe: '3-5人份 | 一料多用',
      num: 1,
      addNum: 0,
      price: '¥15.0',
      sell: '瓶',
      selected: true,
    },
  ],
  [
    {
      id: 1,
      img: 'https://img12.360buyimg.com/jdcms/s300x300_jfs/t1/127267/31/27130/761698/62591377E3bce2bde/4e2a4e8ae25a9d85.png.webp',
      title: '奶 700ml/瓶',
      desCribe: '手工制作 | 柔和 | 味甜',
      num: 4,
      addNum: 0,
      price: '¥5.0',
      sell: '袋',
      selected: true,
    },
    {
      id: 2,
      img: 'https://img30.360buyimg.com/jdcms/s300x300_jfs/t1/217449/21/8595/422011/61c28aa2E1fe2d1f4/b9bd0198d47a672f.jpg.webp',
      title: '米 1斤/袋',
      desCribe: '3-5人份 | 一料多用',
      num: 1,
      addNum: 0,
      price: '¥15.0',
      sell: '瓶',
      selected: true,
    },
  ],
  [
    {
      id: 1,
      img: 'https://img12.360buyimg.com/jdcms/s300x300_jfs/t1/127267/31/27130/761698/62591377E3bce2bde/4e2a4e8ae25a9d85.png.webp',
      title: '豆芽 500ml/瓶',
      desCribe: '手工制作 | 柔和 | 味甜',
      num: 4,
      addNum: 0,
      price: '¥5.0',
      sell: '袋',
      selected: true,
    },
    {
      id: 2,
      img: 'https://img30.360buyimg.com/jdcms/s300x300_jfs/t1/217449/21/8595/422011/61c28aa2E1fe2d1f4/b9bd0198d47a672f.jpg.webp',
      title: '面 1斤/袋',
      desCribe: '3-5人份 | 一料多用',
      num: 1,
      addNum: 0,
      price: '¥15.0',
      sell: '瓶',
      selected: true,
    },
  ],
])
let btnList = ref([
  { content: '新品' },
  { content: '饮用水' },
  { content: '碳酸/果饮' },
  { content: '乳饮咖啡' },
  { content: '啤酒' },
  { content: '白酒' },
  { content: '谷物冲调' },
  { content: '宝藏单品' },
  { content: '白酒' },
  { content: '谷物冲调' },
  { content: '宝藏单品' },{ content: '白酒' },
  { content: '谷物冲调' },
  { content: '宝藏单品' },{ content: '白酒' },
  { content: '谷物冲调' },
  { content: '宝藏单品' },{ content: '白酒' },
  { content: '谷物冲调' },
  { content: '宝藏单品' },
])
// 购物车总共的数量
let allNumber = computed(() => {
  let allNumCount = 0
  for (const item of carsList.value) {
    for (const it of item) {
      allNumCount = it.addNum + allNumCount
    }
  }
  return allNumCount
})
list.value = carsList.value[0]

// 左边选择商品类别
const chooseShop = (index) => {
  activeIndex.value = index
  list.value = carsList.value[index]
}
// 添加商品
const addShop = (val, itemValue) => {
  for (const item of carsList.value) {
    for (const it of item) {
      if (it.title === val) {
        it.addNum++
      }
    }
  }
  // 看pinia是否已经存在，存在就用最新的值替换掉
  if (store.carLists.length) {
    for (const it of store.carLists) {
      if (it.title === itemValue.title) {
        store.delete(itemValue.title)
        store.addShopCarList(itemValue)
      } else {
        store.addShopCarList(itemValue)
      }
    }
  } else {
    store.addShopCarList(itemValue)
  }
  list.value = carsList.value[activeIndex.value]
}
// 跳转详情
const gotoDetail = (e) => {
  router.push('shopDetail')
}
</script>

<template>
  <div class="boxShopping">
    <div class="left">
      <div
        class="leftBtn"
        v-for="(item, index) in btnList"
        :key="index"
        :class="{ isBtnClick: activeIndex === index }"
        @click="chooseShop(index)"
      >
        <div class="sonBox" :class="{ isBtnSonClick: activeIndex === index }">
          {{ item.content }}
        </div>
      </div>
    </div>
    <div class="right">
      <div
        class="boxContent"
        v-for="(item, index) in list"
        :key="index"
      >
        <div class="leftContent">
          <img :src="item.img" alt="" class="img" />
        </div>
        <div class="rightContent">
          <div class="titleTop">{{ item.title }}</div>
          <div class="desCribe">{{ item.desCribe }}</div>
          <div class="bottomTitle">
            {{ item.price }}/<span>{{ item.sell }}</span>
            <div class="add" @click.stop="addShop(item.title, item)">+
              <div class="number" v-if='item.addNum'>{{item.addNum}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="car">
      <div class="carBtn"></div>
      <div class="carBtn"></div>
      <div class="carBtn"></div>
      <div class="carBtn" v-if="allNumber" @click.stop="gotoDetail">购物车
        <div class="carNumber">{{allNumber}}</div>
      </div>
      <div class="carBtn"></div>
    </div>
  </div>
</template>

<style scoped lang="stylus">
.boxShopping {
    width: 100vw;
    height: 100vh;
    position: relative;
    display: flex;

    .left {
        width: 20%;
        height: 100%;
        font-size: 13px;
        overflow: scroll;
        background-color: rgb(246, 246, 246);
        -webkit-overflow-scrolling: touch;
        .leftBtn {
            width: 100%;
            height: 40px;
            display: flex;
            align-items: center;

            .sonBox {
                width: 100%;
                height: 20px;
                line-height: 20px;
                text-align: center;
            }
            .isBtnSonClick {
                border-left: 2px solid green;
            }
        }
        .isBtnClick {
            color: green;
            background-color: white;
        }
    }
    .right {
        width: 80%;
        height: 100%;

        .boxContent {
          width: 100%;
          height: 100px;
          padding-top: 10px;
          border-bottom: 1px solid #cccc;
          display: flex;

          .leftContent {
            flex: 2.5;
            padding-bottom: 22px;

            .img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
          .rightContent {
            padding-left: 12px;
            box-sizing: border-box;
            flex: 7.5;

            .titleTop {
              font-size: 16px;
            }
            .desCribe {
              font-size: 12px;
              color: #cccc;
            }
            .bottomTitle {
              margin-top: 10px;
              color: red;

              .add {
                float: right;
                color: #cccc;
                display: inline-block;
                position: relative;
                border: 1px solid red;
                border-radius: 2px;
                text-align: center;
                line-height: 20px;
                width: 20px;
                height: 20px;

                .number {
                  position: absolute;
                  left: -10px;
                  top: -10px;
                  border-radius: 50%;
                  width: 20px;
                  height: 20px;
                  color: white;
                  background-color: red;
                  text-align: center;
                  line-height: 20px;
                }
              }
            }
          }
        }
    }
    .car {
      display: flex;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100vw;
      height: 30px;

      .carBtn {
        position: relative;
        border: 1px solid #cccc;
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;

        .carNumber {
          width: 30px;
          height: 30px;
          color: white;
          border-radius: 50%;
          background-color: red;
          position: absolute;
          right: -15px;
          top: -15px;
          text-align: center;
          line-height: 30px;
        }
      }
    }
}
</style>
