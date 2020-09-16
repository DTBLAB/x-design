<template>
	<view :class="[styleType === 'text'?'segmented-control--text' : 'segmented-control--button' ]"  class="segmented-control">
		<view v-for="(item, index) in values" :class="[ styleType === 'text'?'segmented-control__item--text': 'segmented-control__item--button' , index === currentIndex&&styleType === 'button'?'segmented-control__item--button--active': '' , index === 0&&styleType === 'button'?'segmented-control__item--button--first': '',index === values.length - 1&&styleType === 'button'?'segmented-control__item--button--last': '' ]" :key="index" :style="{
        backgroundColor: index === currentIndex && styleType === 'text' ? '#FC9A04' : '',borderColor:'#FC9A04'
      }" class="segmented-control__item" @click="_onClick(index)">
			<text :style="{color:
          index === currentIndex
            ? styleType === 'text'
              ? activeColor
              : '#fff'
            : styleType === 'text'
              ? '#FC9A04'
              : activeColor}" class="segmented-control__text">{{ item }}</text>
		</view>
	</view>
</template>

<script>
	/**
	 * SegmentedControl 分段器
	 * @description 用作不同视图的显示
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=54
	 * @property {Number} current 当前选中的tab索引值，从0计数
	 * @property {String} styleType = [button|text] 分段器样式类型
	 * 	@value button 按钮类型
	 * 	@value text 文字类型
	 * @property {String} activeColor 选中的标签背景色与边框颜色
	 * @property {Array} values 选项数组
	 * @event {Function} clickItem 组件触发点击事件时触发，e={currentIndex}
	 */

	export default {
		name: 'UniSegmentedControl',
		props: {
			current: {
				type: Number,
				default: 0
			},
			values: {
				type: Array,
				default () {
					return []
				}
			},
			activeColor: {
				type: String,
				default: '#007aff'
			},
			styleType: {
				type: String,
				default: 'button'
			}
		},
		data() {
			return {
				currentIndex: 0
			}
		},
		watch: {
			current(val) {
				if (val !== this.currentIndex) {
					this.currentIndex = val
				}
			}
		},
		created() {
			this.currentIndex = this.current
		},
		methods: {
			_onClick(index) {
				if (this.currentIndex !== index) {
					this.currentIndex = index
					this.$emit('clickItem', {
						currentIndex: index
					})
				}
			}
		}
	}
</script>

<style scoped>
	.segmented-control {
		/* #ifndef APP-NVUE */
		/* display: flex; */
		/* box-sizing: border-box; */
		padding:36rpx 32rpx 11rpx 32rpx;
		/* #endif */
		flex-direction: row;
		height:50rpx;
		overflow: hidden;
	}

	.segmented-control__item {
		/* #ifndef APP-NVUE */
		display: inline-flex;
		box-sizing: border-box;
		border: #FC9A04 solid 1px;
		border-radius: 28rpx;
		width:104rpx;
		height:50rpx;
		font-size: 28rpx;
		/* #endif */
		position: relative;
		flex: 1;
		justify-content: center;
		align-items: center;
		margin-right:16rpx;
	}

	.segmented-control__item--button {
		
	}

	.segmented-control__item--button--first {
		
		
	}

	.segmented-control__item--button--last {
	
	}

	.segmented-control__item--text {
		
		
	}

	.segmented-control__text {
		font-size: 28rpx;
		line-height: 40rpx;
		text-align: center;
		
	}
</style>