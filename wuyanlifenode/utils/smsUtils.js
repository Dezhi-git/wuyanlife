var sha1 = require('sha1');
var SMS_CONFIG = require('../config/wangyiyun_sms');
var https = require('https');
var qs = require('querystring');
/**
 * 生成验证码：数字与字母
 */
function getVerifyCode() {
	var vcode = Math.floor(Math.random() * 999999 + 111111).toString(16).substr(0, 6);
	return vcode;
}

function getCurTime() {
	return parseInt((new Date()).getTime() / 1000) + "";
}

function getCheckSum(curTime) {
	var str1 = SMS_CONFIG.APP_SECRET + SMS_CONFIG.NONCE + curTime;
	var checkSum = sha1(str1);
	return checkSum;
}

function getSmsPlatformResponseData(mobile) {
	var post_data = {
		//templateid:SMS_CONFIG.TEMPLATEID,  
		mobile: mobile,
		//由短信平台生成验证码
		codeLen: SMS_CONFIG.CODELEN
	}
	var content = qs.stringify(post_data);
	var CurTime = getCurTime();
	var CheckSum = getCheckSum(CurTime);

	var options = {
		//hostname: "https://api.netease.im",
		hostname: 'api.netease.im',
		//port:'443',  
		path: '/sms/sendcode.action',
		method: 'POST',
		headers: {
			'AppKey': SMS_CONFIG.APP_KEY,
			'Nonce': SMS_CONFIG.NONCE,
			'CurTime': CurTime,
			'CheckSum': CheckSum,
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
		}
	};
	return new Promise((resolve, reject) => {
		var req = https.request(options, (res) => {
			res.setEncoding('utf8');
			let rawData = '';
			res.on('data', (chunk) => {
				rawData += chunk;
			});
			res.on('end', () => {
				resolve(rawData);
			});
			res.on('error', () => {
				reject(error)
			});
		});
		req.on('error', function(e) {
			console.log(e.message);
		});
		req.write(content);
		req.end();
	});
}
module.exports = {
	getVerifyCode: getVerifyCode,
	getSmsPlatformResponseData:getSmsPlatformResponseData
}