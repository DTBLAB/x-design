<template>
	<view class="">
		<view v-for="(p,i) in lists" :key="i" class="cart-content">
			<view class="cart-items">
				<view>
					<checkbox class="cart-items__checkbox"></checkbox>
				</view>
				<view class="cart-items__item">
					<image src="https://x-design.oss-cn-hangzhou.aliyuncs.com/home/111111@3x.png" mode="" class="cart-items__item__image"></image>
				</view>
				<view class="">
					<view class="cart-title">
						抱枕
					</view>
					<view class="cart-numbers">
						<view class="cart-numbers__font">
							<b>¥26</b>
						</view>
						<view class="">
							<uni-number-box :min="0" :max="9"></uni-number-box>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom-bar">
			<view class="select-all">
				<view class="checkbox">
					<checkbox-group @change="changeAll">
						<checkbox :checked="checked"></checkbox>
					</checkbox-group>
					
				</view>
				<view class="select-text">
					全选
				</view>
			</view>

			<view class="settle-all">
				<view class="total">
					合计<text style="font-size: 36rpx;"><b>¥ 78</b></text>
					<!-- {{sum}} -->
				</view>
				<view class="settle">
					<navigator url="" class="settle-accounts">结算(3)</navigator>
				</view>
			</view>
		</view>
		<view class="background">
			
		</view>
	</view>
</template>

<script>
	import uniNumberBox from "../../components/uni-number-box/uni-number-box.vue"
	export default {
		data() {
			return {
				checked:true,
				lists:[]
			}
		},
		onLoad() {
			this.getdata();
		},
		components:{
			uniNumberBox
		},
		methods: {
			changeAll(e) {
				this.checked?this.checked=false:this.checked=true;
			},
			getdata() {
				var data=[{
					id:1,
					img:"https://x-design.oss-cn-hangzhou.aliyuncs.com/home/111111@3x.png",
					title:"抱枕",
					price:"26",
					num:1,
					checked:true
				},{
					id:2,
					img:"https://x-design.oss-cn-hangzhou.aliyuncs.com/home/111111@3x.png",
					title:"帆布袋",
					price:"26",
					num:1,
					checked:true
				},{
					id:3,
					img:"https://x-design.oss-cn-hangzhou.aliyuncs.com/home/111111@3x.png",
					title:"抱枕",
					price:"26",
					num:1,
					checked:true
				}];
				this.lists=data;
			}
		}
	}
	
</script>

<style lang="less">
@import url('../../common/less/cart.less');
</style>

