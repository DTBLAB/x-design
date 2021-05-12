<template>
	<view>
		<view class="logistics-info">
			<view class="name">{{name}}</view>
			<view class="number">运单号:{{orderInfo.trackingNumber}}</view>
		</view>
		<steps v-if="orderInfo.expressInfo.list.length !== 0" :options="orderInfo.expressInfo.list" direction="column"></steps>
		<view v-else class="no-trace">暂无物流信息</view>
	</view>
</template>

<script>
	import Steps from "@/component/steps/steps.vue"
	export default {
		components: {Steps},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			let _this = this;
			this.oiid = parseInt(option.oiid);
			this.$http.get('/order/getItem', {oiid: this.oiid}).then(res => {
				if(res.data.code !== 0){
					uni.showToast({
					    title: res.data.message,
					    duration: 1000,
						icon: 'none'
					});
					return;
				}
				_this.orderInfo = res.data.data;
			}).catch(err => {
				console.log(err);
				uni.showToast({
				    title: "网络问题，物流信息加载失败",
				    duration: 1000,
					icon: 'none'
				});
			});
		},
		data() {
			return {
				orderInfo: {},
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less" scoped>
@import url('../../common/less/logistics.less');
</style>
