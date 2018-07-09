const RES_CONFIG = require('../config/res_config');
var Response = require('../utils/Response');
var smsUtils = require('../utils/smsUtils');
var uuidUtils = require('../utils/uuidUtils');
var SmsMessageDao = require('../dao/smsMessageDao');
var CustomerDao = require('../dao/customerDao');
var smsMessageDao = new SmsMessageDao();
var customerDao = new CustomerDao();

/**
 *向短信平台 发送手机号 平台向用户手机发送验证码
 */
async function sendMsgToPlatform(req, res) {
	var mobile = req.body.mobile;
	console.log("smsRoute:")
	console.log(mobile)
	if(!!mobile) {
		//根据手机号查看用户是否已注册
		var customer = await customerDao.getCustomerByMobile(mobile);
		if(!!customer) {
			return res.json(new Response(RES_CONFIG.fail, "", "手机号已注册"));
		}

		var data = await smsUtils.getSmsPlatformResponseData(mobile);
//		var data={
//			code:'200',
//			obj:'123456'
//		}
		if(!!data) {
			if(data.code == '200') {
				var uuid = uuidUtils.generateUUID();
				var sendMsg = {
					id: uuid,
					sendid: data.msg, //短信id
					telephone: mobile,
					code: data.obj, //平台向用户手机发送的验证码
					verifyTime: Math.floor((new Date()).getTime() / 1000)
				};
//				var sendMsgTest = {
//					id:uuid,
//					sendid:'1',
//					telephone:mobile,
//					code:dataTest.obj,
//					verifyTime:Math.floor((new Date()).getTime() / 1000)
//				}
				//记录手机和验证码  todo
				var result = await smsMessageDao.save(sendMsg);
//				var resultTest = await smsMessageDao.save(sendMsgTest);
				if(!!result) {
					console.log("向短信平台发送成功");
					return res.json(new Response(RES_CONFIG.success, "", "已發送，等待驗證碼"))
				} else {
					return res.json(new Response(RES_CONFIG.fail, "", "获取验证码失败"))
				}
			}
			return res.json(new Response(RES_CONFIG.fail, "", "获取验证码失败"));
		} else {
			return res.json(new Response(RES_CONFIG.fail, "", "获取验证码失败"));
		}

	}
	return res.json(new Response(RES_CONFIG.fail, "", "请输入手机号"));
}
/**
 * 校验验证码并注册用户
 */
async function checkCodeAndRegister(req, res) {
	var telephone = req.body.telephone;//與數據庫一致
	var verifyCode = req.body.verifyCode;
	var wxOpenId = req.body.wxOpenId;
	var name = req.body.name;
	var sex = req.body.sex;
	var birthday = req.body.birthday;
	var cardNumber = req.body.cardNumber;
	var wxOpenId = req.body.wxOpenid;
	
	if(!wxOpenId || !name || !sex || !birthday || !cardNumber){
		return res.json(new Response(RES_CONFIG.fail,"","請填寫完整"));
	}
	
	var customer = {
		id: uuidUtils.generateUUID(),
		name: name,
		sex:sex,
		birthday:birthday,
		cardNumber:cardNumber,
		telephone: telephone,
		wxOpenid: wxOpenId
	};

	if(!!telephone && !!verifyCode) {
		//10分钟内的发送记录
		var result = await smsMessageDao.getMessageByMobile(telephone);
		if(!!result) {
			if(result.length > 1) {
				return res.json(new Response(RES_CONFIG.fail, "", "请不要频繁验证"));
			}
			if(result.length == 1) {
				var code = result[0].code;
				if(verifyCode == code) {
					var result = customerDao.register(customer);
					if(!!result) {
						return res.json(new Response(RES_CONFIG.success, "", "注册成功"));
					}
					return res.json(new Response(RES_CONFIG.fail, "", "注册失败"));
				}
				return res.json(new Response(RES_CONFIG.fail, "", "验证码不正确"));
			}
		}
		return res.json(new Response(RES_CONFIG.fail, "", "已超过五分钟，请重新验证"));
	}
	return res.json(new Response(RES_CONFIG.fail, "", "手机号或验证码填寫不正确"));
}

module.exports = {
	sendMsgToPlatform: sendMsgToPlatform,
	checkCodeAndRegister: checkCodeAndRegister
}