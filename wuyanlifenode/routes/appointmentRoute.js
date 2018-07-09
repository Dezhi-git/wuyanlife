var RES_CONFIG = require('../config/res_config');
const formidable = require('formidable');
var Response = require('../utils/Response');
var AppointmentDao = require('../dao/appointmentDao');
var CustomerDao = require('../dao/customerDao');
var appointmentType = require('../config/appointmentType_config');
var multiparty = require('multiparty');
var uuidUtils = require('../utils/uuidUtils');

var appointmentDao = new AppointmentDao();
var customerDao = new CustomerDao();

async function loadArtMuseumAppointmentList(req, res) {
	var type = appointmentType.artMuseumAppointment; // 艺术馆type 0  细胞存储1
	var wxOpenId = req.body.wxOpenId;

	if(!wxOpenId) {
		return res.json(new Response(RES_CONFIG.fail, "", "查询参数错误"));
	}

	var result = await appointmentDao.findListByWxOpenIdAndType(wxOpenId, type);
	if(!!result) {
		return res.json(new Response(RES_CONFIG.success, result, ""));
	}

	return res.json(new Response(RES_CONFIG.fail, "", "没有预约记录"));
}

async function loadCellStorageAppointmentList(req, res) {
	var wxOpenId = req.body.wxOpenId;
	var type = appointmentType.cellStorageAppoinment;

	if(!wxOpenId) {
		return res.json(new Response(RES_CONFIG.fail, "", "查询参数错误"));
	}

	var result = await appointmentDao.findListByWxOpenIdAndType(wxOpenId, type);
	if(!!result) {
		return res.json(new Response(RES_CONFIG.success, result, ""));
	}
	return res.json(new Response(RES_CONFIG.fail, "", "没有预约记录"));
}

async function addArtMuseumAppointment(req, res) {
	var appointmentDate = new Date();
	var type = '0';
	var result = await appointmentDao.getAppointmentNumber(type, appointmentDate);

	if(!!result) {
		var allNumber = result.length == 0 ? 0 : result[0].allNumber;
		if(allNumber < 20) {
			//預約未滿
			var form = new multiparty.Form();
			form.parse(req, async function(err, fields, files) {
				var appointment = {
					type: 0,
					submitStatus: '审批中',
					appointmentDate: appointmentDate
				}
				for(key in fields) {
					if(key == "wxOpenId") {
						var wxOpenId = fields['wxOpenId'][0];
						var customer = await customerDao.getCustomerByWxOpenId(wxOpenId);
						if(!!customer) {
							appointment['customerId'] = customer.id;
						} else {
							return res.json(new Response(RES_CONFIG.fail, "", "預約失敗"));
						}
					} else {
						appointment[key] = fields[key][0];
					}
				}

				appointment.id = uuidUtils.generateUUID();
				var result = appointmentDao.save(appointment);
				if(!!result) {
					return res.json(new Response(RES_CONFIG.success, "", ""));
				} else {
					return res.json(new Response(RES_CONFIG.fail, "", "預約失敗"));
				}
			});
		} else {
			return res.json(new Response(RES_CONFIG.fail, '', "今天预约已满，无法预约"))
		}
	} else {
		return res.json(new Response(RES_CONFIG.fail, "", "预约出错，请稍后预约"));
	}

}
async function addCellStorageAppointment(req, res) {
//	let _hour = new Date().getHours();
//	var appointmentDate = new Date(new Date().setHours(_hour+8),0,0,0);
	var appointmentDate = new Date();
	var type = '1';
	var result = await appointmentDao.getAppointmentNumber(type, appointmentDate);

	if(!!result) {
		var allNumber = result.length == 0 ? 0 : result[0].allNumber;
		if(allNumber < 20) {
			//預約未滿
			var form = new multiparty.Form();
			form.parse(req, async function(err, fields, files) {
				var appointment = {
					type: type,
					submitStatus: '审批中',
					appointmentDate: appointmentDate
				}
				for(key in fields) {
//					if(key == 'visitDate'){
//						let visitDate = fields[key][0];
//						console.log(typeof visitDate);
//						console.log( new Date(visitDate) )
//						let visit_hour = visitDate.getHours();
//						visitDate.setHours(visit_hour+8,0,0,0);
//						appointment[key] = visitDate;
//					}
					if(key == "wxOpenId") {
						var wxOpenId = fields['wxOpenId'][0];
						
						var customer = await customerDao.getCustomerByWxOpenId(wxOpenId);
						
						if(!!customer) {
							appointment['customerId'] = customer.id;
						} else {
							return res.json(new Response(RES_CONFIG.fail, "", "預約失敗"));
						}
					} else {
						appointment[key] = fields[key][0];
					}
				}

				appointment.id = uuidUtils.generateUUID();
				var result = appointmentDao.save(appointment);
				
				if(!!result) {
					return res.json(new Response(RES_CONFIG.success, "", ""));
				} else {
					return res.json(new Response(RES_CONFIG.fail, "", "預約失敗"));
				}
			});
		} else {
			return res.json(new Response(RES_CONFIG.fail, '', "今天预约已满，无法预约"))
		}
	} else {
		return res.json(new Response(RES_CONFIG.fail, "", "预约出错，请稍后预约"));
	}

}

async function getAppointment(req, res) {
	var id = req.body.id;

	if(!id) {
		return res.json(new Response(RES_CONFIG.fail, "", "查询参数出错"));
	}

	var appointment = await appointmentDao.getAppointmentById(id);
	if(!!appointment) {
		let _time = new Date(appointment.visitDate).getHours();
		appointment.visitDate = getRealTime(appointment.visitDate);
		appointment.appointmentDate = getRealTime(appointment.appointmentDate);
		console.log(appointment.visitDate)
		return res.json(new Response(RES_CONFIG.success, appointment, ""));
	} else {

		return res.json(new Response(RES_CONFIG.fail, "", "预约记录未查到"));
	}
}
function getRealTime(dateObj){
	let _date = new Date(dateObj);
	let _hour = _date.getHours();
	let realDate = new Date(_date.setHours(_hour+8,0,0,0));
	let result = realDate.getFullYear() + '-' + (realDate.getMonth()+1) + '-' + realDate.getDate();
	return result;
	
}
async function deleteAppointment(req, res) {
	var id = req.body.id;
	if(!id) {
		return res.json(new Response(RES_CONFIG.fail, "", "出错了"));
	}

	var result = await appointmentDao.deleteById(id);
	if(!!result) {
		return res.json(new Response(RES_CONFIG.success, "", ""));
	} else {
		return res.json(new Response(RES_CONFIG.fail, "", "取消预约失败"));
	}
}

module.exports = {
	loadArtMuseumAppointmentList: loadArtMuseumAppointmentList,
	loadCellStorageAppointmentList: loadCellStorageAppointmentList,
	addArtMuseumAppointment: addArtMuseumAppointment,
	addCellStorageAppointment:addCellStorageAppointment,
	getAppointment: getAppointment,
	deleteAppointment: deleteAppointment
}