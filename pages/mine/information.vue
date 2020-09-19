<template>
	<view class="information-container">
		<view class="information-body">
			
			<view class="information-item">
				<view class="information-title">头像</view>

			</view>
			<view class="information-item">
				<view class="information-title">昵称</view>
				
			</view>
			<view class="information-item">
				<view class="information-title">性别</view>
				<checkbox-group name="">
					<label>
						<checkbox :value="man" />男
					</label>
					<label>
						<checkbox :value="women" />女
					</label>
				</checkbox-group>
			</view>
			<view class="information-item">
				<view class="information-title">手机</view>

			</view>
			<view class="information-item">
				<view class="information-title">生日</view>

			</view>
		</view>
		<button class="information-button" type="default">保存</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:"余杭西蓝花",
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
@import url('../../common/less/information.less');
</style>
