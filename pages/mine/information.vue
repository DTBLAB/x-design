<template>
	<view class="information-container">
		<view class="information-body">
			
			<view class="information-item">
				<view class="information-title">头像</view>
				<image class="information-image" src="../../static/image/椭圆 400@3x.png" mode=""></image>
			</view>
			<view class="information-item">
				<view class="information-title">昵称</view>
				{{name}}
			</view>
			<view class="information-item">
				<view class="information-title">性别</view>
				<checkbox-group name="">
					<label class="information-check">
						<checkbox :value="man" checked="true"/>男
					</label>
					<label class="information-check">
						<checkbox :value="women" />女
					</label>
				</checkbox-group>
			</view>
			<view class="information-item">
				<view class="information-title">手机</view>
				{{HidePhoneNumber}}
				<button class="information-changePhone"type="default">更换手机</button>
			</view>
			<view class="information-item">
				<view class="information-title">生日</view>
				{{date}}
			</view>
		</view>
		<button class="information-button" type="default">保存</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				img:'../../static/image/椭圆 400@3x.png',
				name:'余杭西蓝花',
				phone: '12373628265',
				birthday:'',
				date: new Date().toISOString().slice(0, 10),
			}
		},
		methods: {
			
		},
		computed:{
			HidePhoneNumber(){
				return this.phone.substring(0, 3) + '****' + this.phone.substring(7);
			}
		}
	}
</script>

<style>
@import url('../../common/less/information.less');
</style>
