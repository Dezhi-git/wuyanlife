var crypto = require('crypto');
var url = require('url');
var https = require('https');
var http = require('http');
var Response = require('../utils/Response');
var RES_CONFIG = require('../config/res_config');
var wx_config = require('../config/wx_config');
var AppointmentDao = require('../dao/appointmentDao');
var CustomerDao = require('../dao/customerDao');
var appointmentDao = new AppointmentDao();
var customerDao = new CustomerDao();
//公众号接入验证
auth = function(req, res) {
	var query = url.parse(req.url, true).query;
	var signature = query.signature;
	var timestamp = query.timestamp;
	var nonce = query.nonce;
	var echostr = query.echostr;
	/**token  */
	if(check(timestamp, nonce, signature, wx_config.token)) {
		res.end(echostr);
	} else {
		res.end("It is not from weixin");
	}
};

async function authRedirect(req, res) {
	res.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect');
}
/**
 * 获取openid，并根据openid查询用户是否已经注册。如果注册，查询用户列表数据
 */
async function getWxOpenId(req, res) {
	var code = req.body.code;
	var type = req.body.type;
	var url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=" + code + "E+&grant_type=authorization_code";

	if(!!code && (type == 0 || type == 1)) {
		//todo
		//		var data = await getResource(url);
		//		var wxOpenId = data.openid;
		var wxOpenId = "1";
		console.log("weiXinRoute"+wxOpenId);
		var resData = {};
		resData.wxOpenId = wxOpenId;
		var customer = await customerDao.getCustomerByWxOpenId(wxOpenId);
		//已注册
		if(!!customer) {
			resData.isRegistered = true;
			var appointments = await appointmentDao.findListByWxOpenIdAndType(wxOpenId, type);
			console.log(appointments);
			resData.appointments = appointments;
			return res.json(new Response(RES_CONFIG.success, resData, ""));

		} else {
			resData.isRegistered = false;
			return res.json(new Response(RES_CONFIG.success, resData, "没有注册"));
		}
	}
	return res.json(new Response(RES_CONFIG.fail, "", "查询参数不正确"));

}

function check(timestamp, nonce, signature, token) {
	var currSign, tmp;
	tmp = [token, timestamp, nonce].sort().join("");
	currSign = crypto.createHash("sha1").update(tmp).digest("hex");
	return(currSign === signature);
};

function getResource(url) {
	return new Promise((resolve, reject) => {
		https.get(url, (res) => {
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
		})
	})
}
async function test(req, res) {
	console.log("test href location");
	res.redirect("http://localhost:8080/#/?code=1&type=0");
}

module.exports = {
	auth: auth,
	test: test,
	authRedirect: authRedirect,
	getWxOpenId: getWxOpenId
}