<template>
	
	<view class="myAddress">
		<view class="main">
			<view v-if="false">
				<view class="noAddress">
					暂无地址信息
				</view>				
			</view>
			<template v-else>
				<view v-for="(address, index) in addressList" :key="index" class="item" @click="selectAddress(address)">
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
					<view>
						<image src="../../static/image/edit.png" mode="" class="edit" @click="editAddress(address.id)"></image>
						<image src="../../static/image/delete--grey.png" mode="" class="delete" @click="deleteAddress(address.id)"></image>
					</view>
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
				isSelecting: false,
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
		onLoad: function (option) {
			if(option.isSelecting){
				this.isSelecting = true;
			}
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
			},
			deleteAddress(aid){
				let _this = this;
				uni.showModal({
				    title: '提示',
				    content: '是否确认删除此地址？',
				    success: function (res) {
				        if (res.confirm) {
							_this.$http.post('/address/delete', {aid: aid}).then(res => {
								if(res.data.code !== 0){
									uni.showToast({
									    title: res.data.message,
									    duration: 1000,
										icon: 'none'
									});
									return;
								}else{
									uni.showToast({
									    title: '删除成功',
									    duration: 1000,
										icon: 'success'
									});
									_this.$http.get('/address/getList').then(res => {
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
								}
								
							}).catch(err => {
								uni.showToast({
								    title: "网络问题，地址删除失败",
								    duration: 1000,
									icon: 'none'
								});
							});
				        }
				    }
				});
			},
			selectAddress(address){
				if(this.isSelecting){
					uni.setStorageSync('selectedAddress',address)
					uni.navigateBack();
				}
			}
			
			
		}
	}
</script>

<style lang="less">
@import url('../../common/less/address.less');
</style>
