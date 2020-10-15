<template>
	<view class="">
		<view v-for="(p,i) in myProducts" :key="i" class="cart-content">
			<view class="cart-items">
				<view>
					<checkbox class="cart-items__checkbox"></checkbox>
				</view>
				<view class="cart-items__item">
					<image :src="p.preview" mode="aspectFit" class="cart-items__item__image"></image>
				</view>
				<view class="">
					<view class="cart-title">
						{{categoryList[p.category].name}}
					</view>
					<view class="cart-numbers">
						<view class="cart-numbers__font">
							<b>{{p.price}}</b>
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
	import category from '../../config/category'
	export default {
		data() {
			return {
				checked:true,
				myProducts:[],
				categoryList: category
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
				this.$http.get('/product/getList').then(res => {
					if(res.data.code !== 0){
						uni.showToast({
							title: res.data.message,
							duration: 1000,
							icon: 'none'
						});
						return;
					}
					_this.myProducts = res.data.data;
								
				}).catch(err => {
					uni.showToast({
						title: "网络问题，图片加载失败",
						duration: 1000,
						icon: 'none'
					});
				});
			}
		}
	}
	
</script>

<style lang="less">
@import url('../../common/less/cart.less');
</style>

