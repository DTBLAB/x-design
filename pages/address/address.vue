<template>
	
	<view class="myAddress">
		<view class="main">
			<view v-if="false">
				<view class="noAddress">
					暂无地址信息
				</view>				
			</view>
			<template v-else>
				<view class="item">
					<view class="address">
						<view class="address-item-top">
							<text class="name">
								余杭⻄西兰花
							</text>
							<text class="number">
								12373628265
							</text>
						</view>
						<view class="address-item-bottom">
							<text v-if="true" class="default">
								默认
							</text>
							<text class="detailed">
								浙江省杭州市 XX区 XX街道 XX路路XX号
							</text>
						</view>
					</view>
					<image src="../../static/image/edit.png" mode="" class="edit"></image>
				</view>
				<view class="item">
					<view class="address">
						<view class="address-item-top">
							<text class="name">
								余杭⻄西兰花
							</text>
							<text class="number">
								12373628265
							</text>
						</view>
						<view class="address-item-bottom">
							<text class="detailed">
								浙江省杭州市 XX区 XX街道 XX路路XX号
							</text>
						</view>
					</view>
					<image src="../../static/image/edit.png" mode="" class="edit"></image>
				</view>


			</template>
		</view>
		<view class="add">
			<navigator url="../addAddress/addAddres" class="addAddress">+添加地址</navigator>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				address: {
					
				}
			}
		},
		methods: {
			add() {
				uni.navigateTo({
					url: '/pages/address/add'
				})
			}
			
		}
	}
</script>

<style lang="less">
@import url('../../common/less/address.less');
</style>
