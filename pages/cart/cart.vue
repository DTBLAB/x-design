<template>
	<view class="cart-container">
	
		<checkbox-group class="cart-list" @change="selectedStatus" checked>
			<label class="cart-item" v-for="(item,index) in items" :key="index" >
				<checkbox class="cart-item__check" :value="item.value" :checked="checkList.includes(String(item.value))"></checkbox>
				<view class="cart-item__background">
					<image class="cart-item__img" :src="item.pic" mode="widthFix"></image>
				</view>
				
				<view class="cart-item__right">
					<text class="cart-item__right__top">{{item.name}}</text>
					<view class="cart-item__right__bottom">
						<text class="cart-item__right__bottom__price">￥{{item.price}}</text>
						<text>按钮位置</text>
					</view>
				</view>
				
			</label>
		</checkbox-group>
		
		<view class="cart-bottom">
			<checkbox :checkded="selectedAll" @tap="_selectedAll" /><text>全选</text>
			
			
			合计<text>￥</text>
			<button class="cart-bottom__button" type="default">结算</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				seletedAll: false,
								items: [
									{
										value: '0',
										pic:'../../static/image/cart/蒙版组 51@3x.png',
										name:'抱枕',
										price:26,
										count:2
									},
									{
										value: '0',
										pic:'../../static/image/cart/组 1209@3x.png',
										name:'帆布包',
										price:26,
										count:2
										}
								],
								checkList: [], //选中值
							};
		},
		methods: {
			seletedStatus(e) {
							this.checkList = e.detail.value
							console.log(this.checkList)
							if (this.checkList.length === this.items.length) {
								this.selectedAll = true
							}
						},
						_selectedAll(){
							if(!this.selectedAll){
								this.selectedAll=true
								this.items.map(item=>{
									this.checkList.push(item.value)
								})
								console.log(this.checkList)
								console.log('true')
							}else{
								this.selectedAll=false
								this.checkList=[]
								console.log('false')
							}
						}
		}
	}
</script>

<style lang="less" scoped>
@import url('../../common/less/cart.less');
</style>
