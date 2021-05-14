<template>
	<view class="page-container">
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#FC9A04" class="top-bar"></uni-segmented-control>
        <view class="content">
			<view class="order-list" >
				<order-item v-for="(item,index) in orderItemList" :key="index" :item="item" @arrive="refresh"></order-item>
			</view>
        </view>
	</view>
</template>

<script>
	import uniSegmentedControl from "@/component/uni-segmented-control/mineOrders-segmented-control.vue"
	import orderItem from "@/component/orderItem/orderItem.vue"
	import category from '../../config/whiteMoldData'
	
	export default {
		components: {uniSegmentedControl,orderItem},
		onLoad: function () {
			let _this = this;
			this.$http.get('/order/getItemList').then(res => {
				if(res.data.code !== 0){
					uni.showToast({
					    title: res.data.message,
					    duration: 1000,
						icon: 'none'
					});
					return;
				}
				_this.orderItemList = res.data.data;
			}).catch(err => {
				uni.showToast({
				    title: "网络问题，订单加载失败",
				    duration: 1000,
					icon: 'none'
				});
				console.log(err);
			});
		},
		data() {
			return {
				aaa: '1111',
				orderItemList:[{'pic':'../../static/image/canvas-bag.png','name':'帆布包','price':16,'count':2,status:'待发货'},{'pic':'../../static/image/pillow.png','name':'抱枕','price':26,'count':1,status:'已发货'},{'pic':'../../static/image/notebook.png','name':'笔记本','price':16,'count':1,status:'待评价'}],
				items: ['全部','待发货','待收货','待评价'],
				current: 0
			}
		},
		methods: {
			onClickItem(e) {
				// console.log(e);
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
				this.getItemsByState();
			},
			getItemsByState(){
				// console.log("here");
				let _this = this;
				const stateList = ['all', 'paid', 'delivered', 'arrived'];
				let state = stateList[this.current];
				if(state === "all"){
					this.$http.get('/order/getItemList').then(res => {
						if(res.data.code !== 0){
							uni.showToast({
							    title: res.data.message,
							    duration: 1000,
								icon: 'none'
							});
							return;
						}
						_this.orderItemList = res.data.data;
						
					}).catch(err => {
						uni.showToast({
						    title: "网络问题，订单加载失败",
						    duration: 1000,
							icon: 'none'
						});
						console.log(err);
					});
				}else{
					this.$http.get('/order/getItemList?state='+state).then(res => {
						if(res.data.code !== 0){
							uni.showToast({
							    title: res.data.message,
							    duration: 1000,
								icon: 'none'
							});
							return;
						}
						_this.orderItemList = res.data.data;
						
					}).catch(err => {
						uni.showToast({
						    title: "网络问题，订单加载失败",
						    duration: 1000,
							icon: 'none'
						});
						console.log(err);
					});
				}
			},
			refresh(e) {
				this.getItemsByState();
			}
			// orderDetail(){
			// 	uni.navigateTo({
			// 		url: "/pages/order/orderInfo"
			// 	})
			// }
		},
	}
</script>

<style lang="less" scoped>
@import url('../../common/less/myOrders.less');
</style>
