const http = {
	post: function(params){
		let baseUrl = params.baseUrl || 'http://localhost:3000/api';
		let url = baseUrl + params.url || '';
		let data = params.data || {};
		let timeout = params.timeout || 3000;
		let header = params.header || {
		'content-type': 'application/json;charset=UTF-8'
		};
		const token = uni.getStorageSync('token');
		if(token){
			header['authorization'] = "Bearer " + token;
		}
		let dataType = params.dataType || 'json';
		let responseType = params.responseType || 'text';
		let sslVerify = params.sslVerify || false;
		let withCredentials = params.withCredentials || false;
		
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
	get: function(params){
		let baseUrl = params.baseUrl || 'http://localhost:3000/api';
		let url = baseUrl + params.url || '';
		let data = params.data || {};
		let timeout = params.timeout || 3000;
		let header = params.header || {};
		const token = uni.getStorageSync('token');
		if(token){
			header['authorization'] = "Bearer " + token;
		}
		console.log(header.authorization);
		let dataType = params.dataType || 'json';
		let responseType = params.responseType || 'text';
		let sslVerify = params.sslVerify || false;
		let withCredentials = params.withCredentials || false;
		
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