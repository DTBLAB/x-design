<template>
	
	<view class="myAddress">
		<view class="main">
			<view v-if="false">
				<view class="noAddress">
					暂无地址信息
				</view>				
			</view>
			<template v-else>
				<view v-for="(address, index) in addressList" :key="index" class="item">
					<view class="address">
						<view class="address-item-top">
							<text class="name">
								{{address.consignee}}
							</text>
							<text class="number">
								{{address.phone}}
							</text>
						</view>
						<view class="address-item-bottom">
							<text v-if="address.isDefault" class="default">
								默认
							</text>
							<text class="detailed">
								{{address.province}}{{address.city}} {{address.district}} {{address.detail}}
							</text>
						</view>
					</view>
					<image src="../../static/image/edit.png" mode="" class="edit" @click="editAddress(address.id)"></image>
				</view>
			</template>
		</view>
		<view class="add">
			<navigator url="/pages/address/addAddress" class="addAddress">+添加地址</navigator>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				addressList: [
					{id: 1, consignee: '西蓝花', phone: '12373628265', province: '浙江省', city: '宁波市', district: '鄞州区', detail: '江南路1689号 浙江大学软件学院', isDefault: true}
				]
			}
		},
		onShow(){
			let _this = this;
			this.$http.get('/address/getList').then(res => {
				if(res.data.code !== 0){
					uni.showToast({
					    title: res.data.message,
					    duration: 1000,
						icon: 'none'
					});
					return;
				}
				_this.addressList = res.data.data;
				
			}).catch(err => {
				uni.showToast({
				    title: "网络问题，地址加载失败",
				    duration: 1000,
					icon: 'none'
				});
			});
		},
		methods: {
			// add() {
			// 	uni.navigateTo({
			// 		url: '/pages/address/add'
			// 	})
			// },
			editAddress(aid){
				uni.navigateTo({
					url: `/pages/address/addAddress?aid=${aid}`				})
			}
			
		}
	}
</script>

<style lang="less">
@import url('../../common/less/address.less');
</style>
