<script setup>
import { userStore } from '../store/index'
import { ref, reactive, onMounted, computed, watch} from 'vue'
import { useRoute,useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const store = userStore()

// data
let shopLists = store.carLists
// 购物车总共的数量
let allNumber = computed(() => {
  let allNumCount = 0
  for (const item of shopLists) {
      allNumCount = item.addNum + allNumCount
  }
  return allNumCount
})
// 选中的商品
let checkedList = ref([])
// 总结算价格
let allPrice = computed(() => {
    let priceAll = 0
    for (const item of checkedList.value) {
        for (const it of shopLists) {
            if (it.title === item) {
               priceAll =  Number(it.price.split('¥')[1]) * Number(it.addNum) + priceAll
            }
        }
    }
    return priceAll
})

// methods
watch(
    () => checkedList, 
    (newValue, oldValue) => {
    }, 
    {
        deep: true
    }
)
// 增加商品数量
const addShopNumber = (item) => {
    store.addNumber(item.title)
}
// 减少商品数量
const deleteShopNumber = (item) => {
    store.deleteNumber(item.title)
}
// 全选
const chooseALl = () => {
    if (compare()) { // 都在
        checkedList.value = []
    } else {
        for (const item of shopLists) {
            if (!checkedList.value.includes(item.title)) {
                checkedList.value.push(item.title)
            }
        }
    }
}

const compare = () => {
    let flag = true
    for (const item of shopLists) {
        if (!checkedList.value.includes(item.title)) {
            flag = false
            break
        }
    }
    return flag
}
</script>

<template>
    <div class="boxDetail" v-for='(item, index) in shopLists' :key='index'>
        <div class="left">
            <input type="checkbox" v-model='checkedList' :value='item.title'>
        </div>
        <div class="centerImg">
            <img :src="item.img" alt="">
        </div>
        <div class="right">
            <div class="topTitle">{{item.title}}</div>
            <div class="bottom">
                <div class="price"> <span>{{item.price}}</span>/<span>{{item.sell}}</span></div>
                <div class="chooseNumber">
                    <div class="leftDelete" @click.stop="deleteShopNumber(item)">-</div>
                    <div class="centerInput">
                        <input type="number" v-model='item.addNum' class='addNum'>
                    </div>
                    <div class="rightAdd" @click.stop="addShopNumber(item)">+</div>
                </div>
            </div>
        </div>
    </div>
    <div class="choose">
        <div class="left">
            <input type="checkbox" @click="chooseALl">
            全选
        </div>
        <div class="centerBox">
            合计¥{{allPrice}}
        </div>
        <div class="right">去结算</div>
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
</template>

<style scoped lang='stylus'>
.boxDetail {
    width: 100vw;
    height: 80px;
    padding-right: 10px;
    box-sizing: border-box;
    display: flex;
    border-bottom: 1px solid #cccc;
    margin-bottom: 10px;
    padding-bottom: 10px;

    .left {
        flex: 1;
        display: flex;
        align-items: center;

        input[type='checkbox'] {
            -webkit-appearance: radio;
            outline: none;
            
        }
        input[type="checkbox"] {
            width: 15px;
            height: 15px;
            display: inline-block;
            text-align: center;
            vertical-align: middle;
            line-height: 18px;
            margin-right: 10px;
            position: relative;
        }
        input[type="checkbox"]::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            background: #fff;
            width: 100%;
            height: 100%;
            border: 1px solid #d9d9d9;
            border-radius: 4px;
        }

        input[type="checkbox"]:checked::before {
            content: "\2713";
            background-color: #fff;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            border: 1px solid red;
            border-radius:4px;
            color: red;
            font-size: 20px;
            font-weight: bold;
        }
    }
    .centerImg {
        flex: 2;
        background-color: blue;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .right {
        flex: 7;
        padding-left: 21px;
        box-sizing: border-box;

        .topTitle {
            font-size: 15px;
            font-weight: 420;
        }
        .bottom {
            width: 100%;
            height: 20px;
            font-size: 14px;
            display: flex;
            justify-content: space-between;
            margin-top: 30px;

            .price {
                height: 100%;

                span:nth-child(1) {
                    color: red;
                }
                span:nth-child(2) {
                    color: #cccc;
                }
            }
            .chooseNumber {
                width: 100px;
                height: 100%;
                display: flex;
                justify-content: center;

                .leftDelete {
                    width: 20px;
                    text-align: center;
                    height: 100%;
                }
                .centerInput {
                    width: 30px;
                    height: 100%;
                    margin-left: 10px;
                    margin-right: 10px;
                    background-color: #cccc;

                    .addNum {
                        width: 30px;
                        height: 100%;
                        text-align: center;
                        padding: 0;
                        margin: 0;
                        border: 0;
                        background-color: #cccc;
                    }
                }
                .rightAdd {
                    width: 20px;
                    height: 100%;
                    text-align: center;
                }
            }
        }
    }
}
.choose {
    display: flex;
    position: absolute;
    bottom: 30px;
    left: 0;
    width: 100vw;
    height: 30px;

        input[type="checkbox"] {
            width: 15px;
            height: 15px;
            display: inline-block;
            text-align: center;
            vertical-align: middle;
            line-height: 18px;
            margin-right: 10px;
            position: relative;
        }
        input[type="checkbox"]::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            background: #fff;
            width: 100%;
            height: 100%;
            border: 1px solid #d9d9d9;
            border-radius: 4px;
        }

        input[type="checkbox"]:checked::before {
            content: "\2713";
            background-color: #fff;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            border: 1px solid red;
            border-radius:4px;
            color: red;
            font-size: 20px;
            font-weight: bold;
        }

    .left {
        flex: 2
    }
    .centerBox {
        flex: 2
    }
    .right {
        flex: 6;
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
</style>