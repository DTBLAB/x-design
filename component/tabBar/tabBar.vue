<template>
	<view class="tab-bar-container">
		<view class="tab-bar-content">
			<navigator :class="isHome ? 'tab-bar-item--selected' : 'tab-bar-item'" @click="toHome">
				<image class="tab-bar-item__icon" src="/static/image/home--select.png" v-if="isHome"></image>
				<image class="tab-bar-item__icon" src="/static/image/home.png" v-else></image>
				<text class="tab-bar-item__text">首页</text>
			</navigator>
			<image class="tab-bar-item--middle" src="/static/image/add.png" @click="showAddPanel"></image>
			<navigator :class="isMine ? 'tab-bar-item--selected' : 'tab-bar-item'" @click="toMine">
				<image class="tab-bar-item__icon" src="/static/image/user--select.png" v-if="isMine"></image>
				<image class="tab-bar-item__icon" src="/static/image/user.png" v-else></image>
				<text class="tab-bar-item__text">我的</text>
			</navigator>
		</view>
		<view class="add-panel" v-show="ifShowAddPanel">
			<image class="add-panel__close" src="/static/image/add/close.png" @click="hideAddPanel"></image>
			<view class="add-panel__selections">
				<navigator class="add-panel__selection" url="/pages/pictureDesign/pictureDesign">
					<image class="add-panel__selection__button" src="/static/image/add/picture.png"></image>
					<view class="add-panel__selection__text">定制图片</view>
				</navigator>
				<navigator class="add-panel__selection" url="/pages/productList/productList">
					<image class="add-panel__selection__button" src="/static/image/add/product.png"></image>
					<view class="add-panel__selection__text">定制商品</view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'tabBar',
		props:{
			position: String
		},
		data() {
			return {
				bannerImages: [
					'/static/image/home/_Group4_8799ca78dc3040bf87291c9fb11df025KG_c_b_huihua(6)@3x.png',
					'/static/image/home/微信图片_20191111155607@3x.png'
				],
				isHome: this.position === 'home',
				isMine: this.position === 'mine',
				ifShowAddPanel: false
			}
		},
		methods: {
			toHome(){
				if(!this.isHome){
					uni.reLaunch({
						url: "/pages/index/index"
					})
				}
			},
			toMine(){
				if(!this.isMine){
					uni.reLaunch({
						url: "/pages/mine/mine"
					})
				}
			},
			showAddPanel(){
				this.ifShowAddPanel = true;
			},
			hideAddPanel(){
				this.ifShowAddPanel = false;
			}
			
		}
			
	}
</script>

<style lang="less" scoped>
@import url('../../common/less/component/tabBar.less');
</style>
