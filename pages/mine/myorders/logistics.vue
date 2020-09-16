<template>
	<view>
		<view class="logistics-info">
			<view class="name">{{name}}</view>
			<view class="number">运单号:{{number}}</view>
		</view>
		<steps v-if="traceData.Traces.length != 0" :options="traceData.Traces" direction="column"></steps>
		<view v-else class="no-trace">暂无物流信息</view>
	</view>
</template>

<script>
	import Steps from "@/component/steps/steps.vue"
	export default {
		components: {Steps},
		mounted: function () {
		  this.$nextTick(function () {
			this.item = this.$route.query.item
			this.getTraceData()
		  })
		},
		data() {
			return {
				name: 'XX快递',
				number:'12345678',
				item: {},
				traceData: { "EBusinessID": "1237100", "Traces": [], "State": "0", "ShipperCode": "ZTO", "LogisticCode": "638650888018", "Success": true, "Reason": "暂无轨迹信息"}
			}
		},
		methods: {
			getTraceData(){
				//this.name = this.item.key
				// let _this = this;
				// //发起网络请求,
				// _this.$http.get('http://api.kdniao.com/Ebusiness/EbusinessOrderHandle.aspx', { "OrderCode": "", "CustomerName": "001K12345", "ShipperCode": "JD", "LogisticCode": "VA00003618100", }).then(result => {
				// 	if(result.Success){
				// 		//有物流信息
				//		this.traceData = result;
				// 	}else{
				// 		//没有物流信息
				// 	}
				// }).catch(err => {
				// 	uni.showToast({
				// 	    title: '网络错误，请重试',
				// 	    duration: 2000,
				// 		icon: 'none'
				// 	});
				// });
				this.traceData = { 
					"EBusinessID": "1237100", 
					"OrderCode": "", 
					"ShipperCode": "ZTO", 
					"LogisticCode": "638650888018", 
					"Success": true, 
					"State": 3, 
					"Traces": [{ 
							"AcceptTime": "2020-06-03 20:52:41", 
							"AcceptStation": "杭州转运中心已发出，下一站广州转运中心", 
						},{ 
							"AcceptTime": "2020-06-03 20:52:41", 
							"AcceptStation": "已揽收，XXXXXXXXXXXX已收件", 
						},{ 
							"AcceptTime": "2020-06-03 20:52:41", 
							"AcceptStation": "已发货，包裹正在等待揽收", 
						},{ 
							"AcceptTime": "2020-06-03 20:52:41", 
							"AcceptStation": "您的订单正在制作中",
						},{
							"AcceptTime": "2020-06-03 20:52:41",
							"AcceptStation": "订单已支付",
						},
					],
				}
			}
		}
	}
</script>

<style lang="less" scoped>
@import url('../../../common/less/logistics.less');
</style>
