export default {
    onShareAppMessage(res) { //发送给朋友
        return {
			title: "想定，想定就定，定你所想",
			imageUrl:'https://x-design.oss-cn-hangzhou.aliyuncs.com/home/banner1.png'
		}
    },
    onShareTimeline(res) {//分享到朋友圈
        return {
        	title: "想定，想定就定，定你所想",
			imageUrl:'https://x-design.oss-cn-hangzhou.aliyuncs.com/home/banner1.png'
        }
    },
}