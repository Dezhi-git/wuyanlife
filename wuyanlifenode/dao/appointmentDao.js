var knex = require('../config/knex');

var AppointmentDao = function(){}

AppointmentDao.prototype.getAppointmentById = async function(id){
	try{
//		var result = await knex('wy_appointment').where("id","=",id).select('*');
		var result = await knex.select('*').from('wx_customer as c ').innerJoin('wy_appointment as a ', 'c.id', 'a.customerId').where({"a.id":id});
		if(result.length>0){
			return result[0];
		}
	}catch(err){
		return false;
	}
	return false;
}

AppointmentDao.prototype.findListByWxOpenIdAndType = async function(wxOpenId,type){
	try{
		var result = await knex.select('*').from('wx_customer as c ').leftJoin('wy_appointment as a ', 'c.id', 'a.customerId').where({"c.wxOpenId":wxOpenId,"a.type":type});
		if(result.length>0){
			return result;
		}
	}catch(err){
		return false;
	}
	return false;
}


AppointmentDao.prototype.save = async function(appointment){
	try{
		var result = await knex('wy_appointment').insert(appointment);//array [0]
		return result;
	}catch(err){
		return false;
	}
	return false;
}

AppointmentDao.prototype.deleteById = async function(id){
	try{
		var result = await knex('wy_appointment').where({id:id}).del();
		if(result >0){
			return result;
		}
	}catch(err){
		return false;
	}
	return false;
}

AppointmentDao.prototype.getAppointmentNumber = async function(type,appointmentDate){
	var _today = new Date( appointmentDate.setHours(0,0,0,0));//appointmentDate日零點
	var _tomorrow = new Date(_today.getTime() + 86400000);//明日零點
	try{
		var result = await knex('wy_appointment').whereBetween('appointmentDate',[_today,_tomorrow]).andWhere({type:type}).groupBy('type').sum('totalNumber as allNumber');//[ { allNumber: 2 } ] []
		if(!!result){
			return result;
		}
	}catch(err){
		return false;
	}
	return false;
}
module.exports = AppointmentDao