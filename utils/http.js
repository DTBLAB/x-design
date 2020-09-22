const baseConfig = require('../config/index');

const http = {
	post: function(theUrl, theData, config={}){
		let baseUrl = config.baseUrl || baseConfig.serverBaseUrl;
		let url = baseUrl + theUrl|| '';
		let data = theData || {};
		let timeout = config.timeout || 3000;
		let header = config.header || {
		'content-type': 'application/json;charset=UTF-8'
		};
		const token = uni.getStorageSync('userInfo').token;
		if(token && baseUrl === baseConfig.serverBaseUrl){
			header['authorization'] = "Bearer " + token;
		}
		if(baseUrl === baseConfig.transferBaseUrl){
			header['authorization'] = theData.token;
		}
		let dataType = config.dataType || 'json';
		let responseType = config.responseType || 'text';
		let sslVerify = config.sslVerify || false;
		let withCredentials = config.withCredentials || false;
		
		return new Promise((resolve, reject) => {
		    uni.request({
		        url: url,
		        method: "POST",
		        header: header,
		        data: data,
				timeout: timeout,
				dataType:dataType,
				responseType: responseType,
				sslVerify: sslVerify,
				withCredentials: withCredentials,
		        success: res => {
		            // if (loading) {
		            //     uni.hideLoading();
		            // }
		            if (res.data.code === 401) {
		                uni.showToast({
		                    title: res.data.msg || '登陆过期，请重新登录',
		                    duration: 1500,
		                    icon: "none"
		                })
		                uni.removeStorageSync({key: 'token'});
		                setTimeout(function() {
		                    uni.reLaunch({
		                        url: '/pages/mine/mine'
		                    })
		                }, 1500);
		                return;
		            }
		            if (res.statusCode != 200) {
		                uni.showToast({
		                    title: res.data.msg || '网络异常',
		                    duration: 1500,
		                    icon: "none"
		                })
		                return;
		            }
		            resolve(res);
		        },
		        fail: err => {
		            // if (loading) {
		            //     uni.hideLoading();
		            // }
					uni.showToast({
					    title: '网络异常!',
					    duration: 1500,
					    icon: "none"
					})
		            reject(err);
		        }
		    })
		})
		
	},
	get: function(theUrl, theData={}, config={}){
		let baseUrl = config.baseUrl || baseConfig.serverBaseUrl;
		let url = baseUrl + theUrl || '';
		let data = theData || {};
		let timeout = config.timeout || 3000;
		let header = config.header || {};
		const token = uni.getStorageSync('userInfo').token;
		if(token && baseUrl === baseConfig.serverBaseUrl){
			header['authorization'] = "Bearer " + token;
		}
		if(baseUrl === baseConfig.transferBaseUrl){
			header['authorization'] = theData.token;
		}
		let dataType = config.dataType || 'json';
		let responseType = config.responseType || 'text';
		let sslVerify = config.sslVerify || false;
		let withCredentials = config.withCredentials || false;
		
		return new Promise((resolve, reject) => {
		    uni.request({
		        url: url,
		        method: "GET",
		        header: header,
		        data: data,
				timeout: timeout,
				dataType:dataType,
				responseType: responseType,
				sslVerify: sslVerify,
				withCredentials: withCredentials,
		        success: res => {
		            // if (loading) {
		            //     uni.hideLoading();
		            // }
		            if (res.statusCode === 401) {
		                uni.showToast({
		                    title: res.data.msg || '登陆过期，请重新登录',
		                    duration: 1500,
		                    icon: "none"
		                })
		                uni.removeStorageSync({key: 'token'});
		                setTimeout(function() {
		                    uni.reLaunch({
		                        url: '/pages/mine/mine'
		                    })
		                }, 1500);
		                return;
		            }
		            if (res.statusCode != 200) {
		                uni.showToast({
		                    title: res.data.msg || '网络异常',
		                    duration: 1500,
		                    icon: "none"
		                })
		                return;
		            }
		            resolve(res);
		        },
		        fail: err => {
		            // if (loading) {
		            //     uni.hideLoading();
		            // }
					uni.showToast({
					    title: '网络异常!',
					    duration: 1500,
					    icon: "none"
					})
		            reject(err);
		        }
		    })
		})
		
	}
	
	
	
}

export default http;