var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var weiXinRoute = require('./routes/weixinRoute');
var smsRoute = require('./routes/smsRoute');
var appointmentRoute = require('./routes/appointmentRoute');

var app = express();

app.use(bodyParser.urlencoded({extended:false})); //post
app.use(bodyParser.json());                       //ajax post 
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
});

/** 接入验证 */
app.get('/auth',weiXinRoute.auth);

app.get('/authRedirect',weiXinRoute.authRedirect);

app.get('/test',weiXinRoute.test);

app.post('/getWxOpenId',weiXinRoute.getWxOpenId);

app.post('/getVerifyCode',smsRoute.sendMsgToPlatform);

app.post('/register',smsRoute.checkCodeAndRegister);

app.post('/loadArtMuseumAppointmentList',appointmentRoute.loadArtMuseumAppointmentList);

app.post('/loadCellStorageAppointmentList',appointmentRoute.loadCellStorageAppointmentList);

//app.post('/artMuseumAppointmentAdd',appointmentRoute.addArtMuseumAppointment);

app.post('/getAppointment',appointmentRoute.getAppointment);

app.post('/deleteAppointment',appointmentRoute.deleteAppointment);

app.post('/addArtMuseumAppointment',appointmentRoute.addArtMuseumAppointment);

app.post('/addCellStorageAppointment',appointmentRoute.addCellStorageAppointment);

app.get('*',(req,res) =>{
      res.end('not found');
})

app.listen('8081',function(){
      console.log('8081');
})

