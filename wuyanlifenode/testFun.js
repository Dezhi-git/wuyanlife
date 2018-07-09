var knex = require('./config/knex');
moment = require('moment');
var weiXinRoute = require('./routes/weiXinRoute');
var uuidUtils = require('./utils/uuidUtils');
var AppointmentDao = require('./dao/appointmentDao');
var SmsMessageDao = require('./dao/smsMessageDao');
var appointmentDao = new AppointmentDao();
var smsMessageDao = new SmsMessageDao();
var CustomerDao = require('./dao/customerDao');
var customerDao = new CustomerDao();

async function updateTest() {
	//	var uuid =uuidUtils.generateUUID();
	//	var appointment = {id:uuid,area:"1",totalNumber:'3',submitStatus:"0",appointmentDate:'2018-09-12',customerId:'06e03bc07e8c11e89ec8e91819a78e92'};
	// 	var result = await knex("wy_appointment").insert(appointment);
	// 	console.log(result.length);
	//	var result =await appointmentDao.getAppointmentById('ad312aa07e8911e8b95e7f2dfa04e48d');
	//	console.log(result);
//	var time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
	var time = Math.floor((new Date()).getTime()/1000);
	var uuid = uuidUtils.generateUUID();
	var customer = {
		id: 1,
		name:'z',
		password:"12",
		telephone: '124',
		wxOpenId: '1'
	};
	console.log(time);
	var message = {
		id: uuid,
		telephone: '180',
		code: '123456',
		verifyTime: time
	};
	
	var appointment = {
		id:uuid,
		customerId:'4',
		type:1,
		appointmentDate:new Date(),
		totalNumber:2
	}

	//	let id = await knex('wx_message').returning('id').insert(message);//array
	//	var result = await smsMessageDao.save(message);
//		var result2 = await knex('wx_customer').insert(customer);

	// var result = await appointmentDao.findListByOpenid('1');
	//var result = await knex.select('*').from('wx_customer as c ').leftJoin('wy_appointment as a ', 'c.id', 'a.customerId').where("c.openId","=",'1');
//	var result = await customerDao.register(customer);
//		var result = await smsMessageDao.save(message);
//		var result = await smsMessageDao.getCodeByMobile('158');
//		var result = await smsMessageDao.deleteByMobile('158');
//	let result = await knex('wx_message').where({
//		telephone: '156'
//	}).select('code');
	//	console.log(!!id);
//	var result = await customerDao.getCustomerByMobile('873');
//	var result = await smsMessageDao.deleteMessageByMobile('156');
//	var result1 = await smsMessageDao.save(message);
//	var result = await smsMessageDao.getMessageByMobile('180');
//var result2 = await smsMessageDao.getMessageByMobile("123");
//var result = await appointmentDao.save(appointment);
//var result = await appointmentDao.findListByWxOpenIdAndType("1","0");
//	var result = await appointmentDao.getAppointmentById('10f852507f5411e88f4b57430862be26');
//var result = await knex('wy_appointment').where({id:'3'}).del();
//var result = await appointmentDao.findListByWxOpenIdAndType('2', '0');
//var result = await customerDao.getCustomerByWxOpenId('2');
//var result =await customerDao.getCustomerByWxOpenId('1');
//var result = await appointmentDao.getAppointmentById('a95e4f7081a411e88259d9dc9622478c');
//var result = await knex.select('*').from('wx_customer as c ').innerJoin('wy_appointment as a ', 'c.id', 'a.customerId').where({"a.id":'a95e4f7081a411e88259d9dc9622478c'});
//var sendMsgTest = {
//					id:'1',
//					sendid:'1',
//					telephone:'17512052246',
//					code:'123456'
//			} 
//var result = await smsMessageDao.save(sendMsgTest);
//let result = await knex('wx_message').insert(sendMsgTest)
//var result = await smsMessageDao.getMessageByMobile('11111111111');
//	var result = await appointmentDao.save(appointment);
	var _today = new Date( new Date().setHours(0,0,0,0));//今日零點
	var _tomorrow = new Date(_today.getTime() + 86400000);//明日零點
		var result = await knex('wy_appointment').whereBetween('appointmentDate',[_today,_tomorrow]).andWhere({type:'0'}).groupBy('type').sum('totalNumber as allNumber');
var appointmentDate = new Date();
var result = await appointmentDao.getAppointmentNumber('1',appointmentDate);

	console.log(result);
//	console.log(result2);
}
//test();
updateTest();
// testArguments(12,null,2);