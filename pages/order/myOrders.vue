<template>
	<view>
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#FC9A04"></uni-segmented-control>
        <view class="content">
            <view v-if="current === 0">
				<view class="order-list" >
					<order-item v-for="(item,index) in orderList" :key="index" :item="item" @click="orderDetail"></order-item>
				</view>
            </view>
            <view v-if="current === 1">
                <view id="price">{{aaa}}</view>
            </view>
            <view v-if="current === 2">
                选项卡3的内容
            </view>
            <view v-if="current === 3">
                选项卡3的内容
            </view>
            <view v-if="current === 4">
                选项卡3的内容
            </view>
        </view>
	</view>
</template>

<script>
	import uniSegmentedControl from "@/component/uni-segmented-control/mineOrders-segmented-control.vue"
	import	orderItem from "@/component/orderItem/orderItem.vue"
	export default {
		components: {uniSegmentedControl,orderItem},
		onLoad: function (option) {
			this.aaa = option.price;
			console.log(option.price);
		},
		data() {
			return {
				aaa: '1111',
				orderList:[{'pic':'../../static/image/canvas-bag.png','name':'帆布包','price':16,'count':2,status:'待发货'},{'pic':'../../static/image/pillow.png','name':'抱枕','price':26,'count':1,status:'已发货'},{'pic':'../../static/image/notebook.png','name':'笔记本','price':16,'count':1,status:'待评价'}],
				items: ['全部','待付款','待发货','待收货','待评价'],
				current: 0
			}
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			},
			orderDetail(){
				uni.navigateTo({
					url: "/pages/order/orderInfo"
				})
			}
		},
	}
</script>

<style lang="less" scoped>
@import url('../../common/less/myOrders.less');
</style>
