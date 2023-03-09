//引入express框架
const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors');
    //引入路径处理模块
const bodyParser = require('body-parser');
const mysql = require('mysql')
    //创建web服务器
const app = express();
app.use(cors());
// const md5 = require('js-md5')
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

//连接数据库
const db = mysql.createPool({
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'demo',
        timezone:'08:00',
    })
    //数据可视化的数据
//存放新增用户信息接口
app.get('/userinfo', (req, res) => {
    console.log(req.query);
    res.send(req.query)
    let objuser = req.query
    db.query('insert into userinfo (name,age,sex,birth,address) value(?,?,?,?,?)', [objuser.name, objuser.age, objuser.sex, objuser.birth, objuser.address], (err, results) => {
        if (err) return console.log(err.message);
        if (results.affectedRows === 1) { console.log('插入成功'); }
    })
})

//展示所有用户信息接口，数据库内容展示在user表格中
app.get('/showuserinfo', (req, res) => {
        // res.send('页面渲染')
        db.query('select * from user', (err, results) => {
            if (err) return console.log(err.message);
            //results为数据库的数据，发送给前端
            res.send(results)
        })
    })
    //删除用户
app.get('/deleteuser', (req, res) => {
        db.query(`delete from user where id=${req.query.id}`, (err, results) => {
            if (err) return console.log(err.message)
            if (results.affectedRows === 1) { console.log('删除成功'); }
        })
        res.send('删除成功')
            // console.log(req.query);
    })
    //修改用户
app.get('/updateuser', (req, res) => {
        res.send('修改')
        console.log(req.query);
        db.query(`update userinfo set name='${req.query.name}',age='${req.query.age}',sex='${req.query.sex}',birth='${req.query.birth}',address='${req.query.address} '
    where id=${req.query.id}`, (err, results) => {
            if (err) return console.log(err.message)
            if (results.affectedRows === 1) { console.log('修改成功'); }
        })
    })
    //查询用户
app.get('/selectuser', (req, res) => {
    // res.send(req.query)
    console.log(req.query);
    db.query(`SELECT * FROM user WHERE real_name LIKE '%${req.query.name}%'`, (err, results) => {
        if (err) {
            res.send(err.message)
            console.log(err.message)
        } else {
            console.log(results);
            res.send(results)
        }
    })
})
//查询管理员账户信息
app.get('/getroot', (req, res) => {
    // res.send(req.query)
    console.log(req.query);
    db.query(`select * from admin`, (err, results) => {
        if (err) {
            res.send(err.message)
            console.log(err.message)
        } else {
            // console.log(results);
            res.send(results)
        }
    })
})
//修改管理员信息
app.get('/updateroot', (req, res) => {
    db.query(`update admin set username='${req.query.username}',password='${req.query.password}'
    where id=${req.query.id}`, (err, results) => {
            if (err) return console.log(err.message)
            if (results.affectedRows === 1) { console.log('修改成功'); }
        })
    res.send('修改')
    console.log(req.query);
})
//获取疫苗信息
app.get('/getvacc', (req, res) => {
    // res.send(req.query)
    console.log(req.query);
    db.query(`select * from vaccine`, (err, results) => {
        if (err) {
            res.send(err.message)
            console.log(err.message)
        } else {
            // console.log(results);
            res.send(results)
        }
    })
})
//查询疫苗信息
app.get('/selectvacc', (req, res) => {
    // res.send(req.query)
    console.log(req.query);
    db.query(`select * from vaccine where name like '%${req.query.name}%'`, (err, results) => {
        if (err) {
            res.send(err.message)
            console.log(err.message)
        } else {
            // console.log(results);
            res.send(results)
        }
    })
})
//新增疫苗信息
app.get('/addvacc', (req, res) => {
    console.log(req.query);
    res.send(req.query)
    let objuser = req.query
    db.query('insert into vaccine (name,price,manufacturer,category,detail) value(?,?,?,?,?)', [objuser.name, objuser.price, objuser.manufacturer, objuser.category, objuser.detail], (err, results) => {
        if (err) return console.log(err.message);
        if (results.affectedRows === 1) { console.log('插入成功'); }
    })
})
app.get('/updatevacc', (req, res) => {
    console.log(req.query)
    db.query(`update vaccine set name='${req.query.name}',price='${req.query.price}',manufacturer='${req.query.manufacturer}',category='${req.query.category}',detail='${req.query.detail}'
    where id=${req.query.id}`, (err, results) => {
            if (err) return console.log(err.message)
            if (results.affectedRows === 1) { console.log('修改成功'); }
        })
    res.send('修改')
})
//获取地址信息
app.get('/getaddress', (req, res) => {
    db.query(`select * from inoculate_site`, (err, results) => {
        if (err) {
            res.send(err.message)
            console.log(err.message)
        } else {
            // console.log(results)
            res.send(results)
        }
               
    })
})
//查询地址
app.get('/selectaddress', (req, res) => {
    // res.send(req.query)
    console.log(req.query);
    db.query(`select * from inoculate_site where name like '%${req.query.name}%'`, (err, results) => {
        if (err) {
            res.send(err.message)
            console.log(err.message)
        } else {
            // console.log(results);
            res.send(results)
        }
    })
})
//获取所有省份
app.get('/province',(req,res)=>{
    db.query(`select * from district where parent=86`,(err,results)=>{
        if(err){
            res.send(err.message)
        }else {
            res.send(results)
        }
    })
})
//获取市
app.get('/city',(req,res)=>{
    db.query(`select * from district where name='${req.query['0']}'`,(err,results)=>{
        if(err){
            res.send(err.message)
        }else {
            // res.send(results)
            db.query(`select * from district where parent='${results[0].code}'`,(error,ress)=>{
                if(err){
                    res.send(err.message)
                }else {
                    res.send(ress)
                    console.log(ress)
                }
            })
        }
    })
})
app.get('/quxian',(req,res)=>{
    db.query(`select * from district where name='${req.query['0']}'`,(err,results)=>{
        if(err){
            res.send(err)
        }else {
            db.query(`select * from district where parent='${results[0].code}'`,(error,ress)=>{
                if(err){
                    res.send(err.message)
                }else {
                    res.send(ress)
                    console.log(ress)
                }
            })
        }
    })
})
app.get('/addhosp', (req, res) => {
    console.log(req.query);
    res.send(req.query)
    let objuser = req.query
    db.query('insert into inoculate_site (name,province_code,city_code,district_code,address) value(?,?,?,?,?)', [objuser.name, objuser.province_code, objuser.city_code, objuser.district_code, objuser.address], (err, results) => {
        if (err) return console.log(err.message);
        if (results.affectedRows === 1) { console.log('插入成功'); }
    })
})
app.get('/updatehosp', (req, res) => {
    console.log(req.query)
    db.query(`update inoculate_site set name='${req.query.name}',province_code='${req.query.province_code}',city_code='${req.query.city_code}',district_code='${req.query.district_code}',address='${req.query.address}'
    where id=${req.query.id}`, (err, results) => {
            if (err) return console.log(err.message)
            if (results.affectedRows === 1) { console.log('修改成功'); }
        })
    res.send('修改')
})
app.get('/doctorinfo',(req,res)=>{
    db.query(`select * from worker`,(err,results)=>{
        if(err){
            res.send(err.message)
        }else {
            let arr = []
            for(let i=0;i<results.length;i++){
                db.query(`select name from inoculate_site where id='${results[i].inoculate_site_id}'`,(error,ress)=>{
                    arr.push(i)
                    results[i].name = ress[0].name
                    if(arr.length==results.length){
                        res.send(results)
                    }
                })
            }
        }
    })
})
//查询医护人员信息
app.get('/selectdoctor', (req, res) => {
    // res.send(req.query)
    console.log(req.query);
    db.query(`select * from worker where real_name like '%${req.query.name}%'`, (err, results) => {
        if (err) {
            res.send(err.message)
            console.log(err.message)
        } else {
        let arr = []
            for(let i=0;i<results.length;i++){
                db.query(`select name from inoculate_site where id='${results[i].inoculate_site_id}'`,(error,ress)=>{
                    arr.push(i)
                    results[i].name = ress[0].name
                    if(arr.length==results.length){
                        res.send(results)
                    }
                })
            }
        }
    })
})
//新增医护人员信息
app.get('/adddoctor', (req, res) => {
    console.log(req.query);
    res.send(req.query)
    let objuser = req.query
    db.query('insert into worker (username,password,real_name,card_id,phone,inoculate_site_id) value(?,?,?,?,?,?)', [objuser.username, objuser.password, objuser.real_name, objuser.card_id, objuser.phone, objuser.inoculate_site_id], (err, results) => {
        if (err) return console.log(err.message);
        if (results.affectedRows === 1) { console.log('插入成功'); }
    })
})
//修改医护人员信息
app.get('/updatedoctor', (req, res) => {
    console.log(req.query)
    db.query(`update worker set username='${req.query.username}',password='${req.query.password}',real_name='${req.query.real_name}',card_id='${req.query.card_id}',phone='${req.query.phone}',inoculate_site_id='${req.query.inoculate_site_id}'
    where id=${req.query.id}`, (err, results) => {
            if (err) return console.log(err.message)
            if (results.affectedRows === 1) { console.log('修改成功'); }
        })
    res.send('修改')
})
//获取预约信息
app.get('/planinfo', (req, res) => {
    db.query(`select * from plan `, (err, results) => {
        if (err) {
            res.send(err.message)
        } else {
            let arr=[]
            for(let i=0;i<results.length;i++){
                db.query(`select * from vaccine where id='${results[i].vaccine_id}'`,(error,a)=>{
                    if(!error){
                        results[i].vaccine_name= a[0].name
                        db.query(`select * from inoculate_site where id='${results[i].inoculate_site_id}'`,(error,b)=>{
                            if(!error){
                                results[i].inco_name= b[0].name
                                arr.push(i)
                                if(arr.length==results.length){
                                    res.send(results)
                                }
                            }
                        })
                    }
                })
            }
        }
    })
})
app.get('/plansea',(req,res)=>{
    let post = []
    db.query(`select id from vaccine where name like '%${req.query.name}%'`,(err,results)=>{
        for(let i=0;i<results.length;i++){
            db.query(`select * from plan where vaccine_id='${results[i].id}%'`,(err,result)=>{
                post = post.concat([...result])
                if(i==results.length-1){
                    let arr=[]
                    for(let j=0;j<post.length;j++){
                        db.query(`select * from vaccine where id='${post[j].vaccine_id}'`,(error,a)=>{
                            if(!error){
                                post[j].vaccine_name= a[0].name
                                db.query(`select * from inoculate_site where id='${post[j].inoculate_site_id}'`,(error,b)=>{
                                    if(!error){
                                        post[j].inco_name= b[0].name
                                        arr.push(j)
                                        if(arr.length==post.length){
                                            res.send(post)
                                        }
                                    }
                                })
                            }
                        })
                    }
                }
            })
        }
    })
})
//修改计划信息
app.get('/updateplan', (req, res) => {
    console.log(req.query)
    db.query(`update plan set start_date='${req.query.start_date}',
    end_date='${req.query.end_date}',
    start_time_morning='${req.query.start_time_morning}',
    end_time_morning='${req.query.end_time_morning}',
    start_time_afternoon='${req.query.start_time_afternoon}',
    end_time_afternoon='${req.query.end_time_afternoon}',
    amount='${req.query.amount}',
    start_time_evening='${req.query.start_time_evening}',
    end_time_evening='${req.query. end_time_evening}',
    morning_limit='${req.query. morning_limit}',
    afternoon_limit='${req.query. afternoon_limit}',
    evening_limit='${req.query.evening_limit}',
    vaccine_id='${req.query.vaccine_id}',
    inoculate_site_id='${req.query.inoculate_site_id}'
    where id=${req.query.id}`, (err, results) => {
        if (err) return console.log(err.message)
        if (results.affectedRows === 1) { console.log('修改成功'); }
    })
    res.send('修改')
})
//添加计划
app.get('/addplan', (req, res) => {
    console.log(req.query);
    res.send(req.query)
    let objuser = req.query
    db.query('insert into plan (start_date,end_date,amount, start_time_morning,morning_limit, end_time_morning, start_time_afternoon,afternoon_limit,end_time_afternoon,start_time_evening,evening_limit, end_time_evening,inoculate_site_id,vaccine_id) value(?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
     [objuser.start_date,objuser.end_date,objuser.amount, objuser.start_time_morning,objuser.morning_limit, objuser.end_time_morning, objuser.start_time_afternoon,objuser.afternoon_limit,objuser.end_time_afternoon,objuser.start_time_evening,objuser.evening_limit, objuser.end_time_evening,objuser.inoculate_site_id,objuser.vaccine_id], (err, results) => {
        if (err) return console.log(err.message);
        if (results.affectedRows === 1) { console.log('插入成功'); }
    })
})
app.get('/yuyue',(req,res)=>{
    db.query(`SELECT app.*,ins.name as hosptialname,va.name as yimiaoname,us.real_name FROM appoint AS app 
    LEFT JOIN plan as pl ON app.plan_id = pl.id
    LEFT JOIN vaccine AS va ON pl.vaccine_id = va.id
    LEFT JOIN user as us on app.user_id = us.id
    LEFT JOIN inoculate_site AS ins ON pl.inoculate_site_id = ins.id`,(err,results)=>{
        res.send(results)
    })
})
app.get('/yuyuename',(req,res)=>{
    db.query(`SELECT app.*,ins.name as hosptialname,va.name as yimiaoname,us.real_name FROM appoint AS app 
    LEFT JOIN plan as pl ON app.plan_id = pl.id
    LEFT JOIN vaccine AS va ON pl.vaccine_id = va.id
    LEFT JOIN user as us on app.user_id = us.id
    LEFT JOIN inoculate_site AS ins ON pl.inoculate_site_id = ins.id where real_name like '%${req.query.name}%'`,(err,results)=>{
        res.send(results)
    })
})
app.get('/pay',(req,res)=>{
    db.query(`SELECT pay.*,us.real_name,va.name as vaccname FROM pay AS pay 
        LEFT JOIN appoint as app on pay.appoint_id = app.id
        LEFT JOIN user as us on app.user_id = us.id
        LEFT JOIN plan as pl ON app.plan_id = pl.id
        LEFT JOIN vaccine AS va ON pl.vaccine_id = va.id`,(err,results)=>{
        res.send(results)
    })
})
app.get('/payname',(req,res)=>{
    db.query(`SELECT pay.*,us.real_name,va.name as vaccname FROM pay AS pay 
    LEFT JOIN appoint as app on pay.appoint_id = app.id
    LEFT JOIN user as us on app.user_id = us.id
    LEFT JOIN plan as pl ON app.plan_id = pl.id
    LEFT JOIN vaccine AS va ON pl.vaccine_id = va.id where real_name like '%${req.query.name}%'`,(err,results)=>{
        res.send(results)
    })
})
app.get('/finish',(req,res)=>{
    console.log(req.query)
    db.query(`SELECT inoculate.id as realid,inoculate.part,inoculate.create_time,inoculate.note,wo.real_name as wo_name,appoint.plan_id,vaccine.name as va_name,inoculate_site.*,user.real_name as us_name
    FROM inoculate
    left join worker as wo on inoculate.worker_id =wo.id
    left join appoint on inoculate.appoint_id = appoint.id
    left join plan on plan.id = appoint.plan_id
    left join vaccine on vaccine.id = plan.vaccine_id
    left join inoculate_site on inoculate_site.id = plan.inoculate_site_id
    left join user on user.id = appoint.user_id`,(err,result)=>{
        if(!err){
            res.send(result)
        }
    })
})
app.get('/finishsea',(req,res)=>{
    console.log(req.query)
    db.query(`SELECT inoculate.id as realid,inoculate.part,inoculate.create_time,inoculate.note,wo.real_name as wo_name,appoint.plan_id,vaccine.name as va_name,inoculate_site.*,user.real_name as us_name
    FROM inoculate
    left join worker as wo on inoculate.worker_id =wo.id
    left join appoint on inoculate.appoint_id = appoint.id
    left join plan on plan.id = appoint.plan_id
    left join vaccine on vaccine.id = plan.vaccine_id
    left join inoculate_site on inoculate_site.id = plan.inoculate_site_id
    left join user on user.id = appoint.user_id  where user.real_name like '%${req.query.name}%'`,(err,result)=>{
        if(!err){
            res.send(result)
        }else {
            res.send(err)
        }
    })
})
//用户登录
app.post('/user/login',(req,res)=>{
    if(req.body.username == ''){
        res.send({code:-1,msg:'用户名不能为空'})
    }
    else if(req.body.password == ''){
        res.send({code:-1,msg:'密码不能为空'})
    }else {
        let code = 0
    let username = req.body.username
    //     // let password = md5(req.body.pass)
    let password = req.body.password
    let searchsql = `select *
    from user
    where username = '${username}' and password = '${password}'`
    let promise = new Promise((resolve, reject) => {
        db.query(searchsql, function(err, result) {
            if (err) {
                console.log('err' + err)
            } else {
                let user = JSON.parse(JSON.stringify(result))
                if (user.length === 0) {
                    reject(res.send({
                        code: -1,
                        msg: '用户名不存在'
                    }))
                } else {
                    let secret = 'I_LOVE_JING';
                    let token = jwt.sign(JSON.stringify(user), secret)
                        // console.log(token);
                    resolve({
                        code,
                        result,
                        token
                    })
                }
            }
        })
    }).then(data => {
        let insertsql = `update user set token='${data.token}' where username = '${data.username}' and password = '${data.password}'`
        db.query(insertsql, function(err, result) {
            if (err) {
                console.log('err' + err)
                return res.send({ code: 1, massage: '登录失败' })
            } else {
                // console.log(data)
                // res.send(data)
                return res.send({
                    code: data.code,
                    data: {
                        area: data.result[0].address,
                        token:data.token,
                        user: data.result[0],
                        userType: "user"
                    },
                    message: '登录成功'
                })
            }
        })
    })
    }
})
//用户登录
app.post('/worker/login',(req,res)=>{
    if(req.body.username == ''){
        res.send({code:-1,msg:'用户名不能为空'})
    }
    else if(req.body.password == ''){
        res.send({code:-1,msg:'密码不能为空'})
    }else{
        let code = 0
        let username = req.body.username
        let password = req.body.password
        let searchsql = `select *
        from worker
        where username = '${username}' and password = '${password}'`
        let promise = new Promise((resolve, reject) => {
            db.query(searchsql, function(err, result) {
                if (err) {
                    console.log('err' + err)
                } else {
                    let user = JSON.parse(JSON.stringify(result))
                    if (user.length === 0) {
                        reject(res.send({
                            code: -1,
                            msg: '用户名不存在'
                        }))
                    } else {
                        let secret = 'I_LOVE_JING';
                        let token = jwt.sign(JSON.stringify(user), secret)
                            // console.log(token);
                        resolve({
                            code,
                            result,
                            token
                        })
                    }
                }
            })
        }).then(data => {
            let insertsql = `update worker set token='${data.token}' where username = '${data.username}' and password = '${data.password}'`
            db.query(insertsql, function(err, result) {
                if (err) {
                    console.log('err' + err)
                    return res.send({ code: 1, massage: '登录失败' })
                } else {
                    // console.log(data)
                    db.query(`select name from inoculate_site where id=${data.result[0].inoculate_site_id}`,(cw,cg)=>{
                        console.log(cg[0].name)
                        return res.send({
                            code: data.code,
                            data: {
                                inoculateSiteName: cg[0].name,
                                token:data.token,
                                worker: data.result[0],
                                userType: "worker"
                            },
                            message: '登录成功'
                        })
                    })
                    // res.send(data)
                   
                }
            })
        })
    }
})
//登录接口
app.post('/login', function(req, res, next) {
    let state = 0
    let username = req.body.user
        // let password = md5(req.body.pass)
    let password = req.body.pass
    let searchsql = `select username,password 
    from admin 
    where username = '${username}' and password = '${password}'`
    let promise = new Promise((resolve, reject) => {
        db.query(searchsql, function(err, result) {
            if (err) {
                console.log('err' + err)
            } else {
                let user = JSON.parse(JSON.stringify(result))
                if (user.length === 0) {
                    reject(res.send({
                        state: 1,
                        message: '输入的用户名或密码错误'
                    }))
                } else {
                    let secret = 'I_LOVE_JING';
                    let token = jwt.sign(JSON.stringify(user), secret)
                        // console.log(token);
                    resolve({
                        state,
                        username,
                        password,
                        token
                    })
                }
            }
        })
    }).then(data => {
        let insertsql = `update admin set token='${data.token}' where username = '${data.username}' and password = '${data.password}'`
        db.query(insertsql, function(err, result) {
            if (err) {
                console.log('err' + err)
                return res.send({ state: 1, massage: '登录失败' })
            } else {
                return res.send({
                    state: 0,
                    username: data.username,
                    token: data.token,
                    message: '登录成功'
                })
            }
        })
    })
})
//小程序端
app.get('/plan/findInoculateSites',(req,res)=>{
    db.query(`SELECT DISTINCT inoculate_site.* 
    FROM inoculate_site,plan 
    WHERE inoculate_site.id=plan.inoculate_site_id 
    AND plan.vaccine_id = ${req.query.id}`,(err,result)=>{
        if(!err){
            res.send(result)
        }
    })
})
app.get('/plan/findPlans',(req,res)=>{
    console.log(req.query)
    db.query(`select * 
    from plan 
    where vaccine_id=${req.query.va} 
    and inoculate_site_id=${req.query.ino}`,(err,result)=>{
        if(!err){
            res.send(result)
        }
    })
})
app.post('/plan/findPlan/',(req,res)=>{
    db.query(`select * from plan where id=${req.body.planId}`,(err,result)=>{
        console.log(result[0])
        let data = {}
        data.afternoonRemain = result[0].afternoon_limit
        data.eveningRemain = result[0].evening_limit
        data.morningRemain = result[0].morning_limit
        data.plan = result[0]
        res.send(data)
    })
})
app.post('/user/appoint/ok',(req,res)=>{
    console.log(req.body)
    db.query(`select * from plan where id=${req.body.planId}`,(err,result)=>{
        if(!err){
            let temp = timeSlot=0 ? result[0].morning_limit : timeSlot=1 ? result[0].afternoon_limit : result[0].evening_limit
            if(new Date(result[0].start_date)>=new Date(req.body.appointDate)<=new Date(result[0].end_date) && temp > 0){
                res.send({code:0,count:null,data:null,msg:'可以预约'})
            }else{
                res.send({code:-1,count:null,data:null,msg:'预约失败'})
            }
        }
    })
})
app.get('/plan/findVaccine/',(req,res)=>{
    console.log(req.query)
    db.query(`select * from plan where id=${req.query.id}`,(err,result)=>{
        console.log(result[0].vaccine_id)
        db.query(`select * from vaccine where id=${result[0].vaccine_id}`,(error,results)=>{
            if(!error){
                res.send({code:0,count:null,data:results[0],msg:'查询成功'})
            }
        })
    })
})
app.post('/user/pay/save',(req,res)=>{
    let newdate = new Date();
    newdate.setMinutes(newdate.getMinutes() - newdate.getTimezoneOffset())
    newdate.toJSON().slice(0, 19).replace("T"," ");
    let objuser = req.body
    db.query('insert into appoint (user_id,appoint_date,plan_id,time_slot,create_time,status) value(?,?,?,?,?,?)', [objuser.userId, objuser.appointDate, objuser.planId, objuser.timeSlot, newdate,1], (err, results) => {
        if(!err){
            console.log(results)
            db.query(`insert into pay (cost,create_time,appoint_id) value(?,?,?)`,[objuser.cost,newdate,results.insertId],(error,resu)=>{
                if(!error){
                    res.send({code:0,count:null,data:null,mdg:'预约成功'})
                }else {
                    console.log(error)
                }
            })
        }else{
            res.send({code:0,count:null,data:null,mdg:'预约失败'})
        }
    })
})
app.get('/user/findAppoint',(req,res)=>{
    db.query(`select appoint.*,plan.vaccine_id,vaccine.name as va_name,inoculate_site.name as in_name from appoint
    left join plan on appoint.plan_id = plan.id
    left join vaccine on plan.vaccine_id = vaccine.id
    left join inoculate_site on inoculate_site.id = plan.inoculate_site_id
    where user_id = ${req.query.userId} and status=1`,(err,result)=>{
       if(!err){
            res.send({code:0,data:result})
       }
    })
})
app.put('/user/cancelAppoint',(req,res)=>{
    db.query(`update appoint set status=4 where id=${req.query.id}`,(err,result)=>{
        if(!err){
            res.send({code:'0',msg:'取消预约成功'})
        }
    })
})
app.get('/user/findPayHistories',(req,res)=>{
    db.query(`select pay.*,appoint.plan_id,plan.vaccine_id,vaccine.name as va_name from pay
    left join appoint on pay.appoint_id = appoint.id
    left join plan on plan.id = appoint.plan_id
    left join vaccine on vaccine.id = plan.vaccine_id where user_id = ${req.query.userId}`,(err,result)=>{
        if(!err){
            res.send({code:0,data:result,msg:'查询成功'})
        }
    })
})
app.get('/user/findAppointHistories',(req,res)=>{
    db.query(`select appoint.*,plan.vaccine_id,plan.inoculate_site_id,vaccine.name as va_name,inoculate_site.name as in_name from appoint
    left join plan on plan.id = appoint.plan_id
    left join vaccine on vaccine.id = plan.vaccine_id
    left join inoculate_site on inoculate_site.id = plan.inoculate_site_id where user_id = ${req.query.userId}`,(err,result)=>{
        res.send({code:0,data:result,msg:'查询成功'})
    })
})
app.get('/user/findInoculateHistories',(req,res)=>{
    db.query(`select appoint.appoint_date,appoint.status,appoint.time_slot,appoint.create_time,plan.vaccine_id,vaccine.name as va_name,inoculate_site.name as in_name,
    inoculate.part,inoculate.create_time as jztime,inoculate.note,worker.real_name as wo_name from appoint
    left join plan on plan.id = appoint.plan_id
    left join vaccine on vaccine.id = plan.vaccine_id
    left join inoculate_site on inoculate_site.id = plan.inoculate_site_id
    left join inoculate on inoculate.appoint_id = appoint.id
    left join worker on worker.id = inoculate.worker_id where status = 2 and user_id = ${req.query.userId}`,(err,result)=>{
        res.send({code:0,data:result,msg:'查询成功'})
    })
})
app.put('/user/change',(req,res)=>{
    let obj = req.body
    db.query(`update user set username='${obj.username}',password='${obj.password}',address='${obj.address}' where id=${req.body.userId}`,(err,result)=>{
        if(!err){
            res.send({code:0,msg:'修改成功'})
        }else {
            res.send(err)
        }
    })
})
app.put('/worker/change',(req,res)=>{
    let obj = req.body
    if(req.body.password==''){
        db.query(`update worker set username='${obj.username}' where id=${req.body.userId}`,(err,result)=>{
            if(!err){
                res.send({code:0,msg:'修改成功'})
            }else {
                res.send(err)
            }
        })
    }else {
        db.query(`update worker set username='${obj.username}',password='${obj.password}' where id=${req.body.userId}`,(err,result)=>{
            if(!err){
                res.send({code:0,msg:'修改成功'})
            }else {
                res.send(err)
            }
        })
    }
})
app.get('/worker/allList',(req,res)=>{
   db.query(`select appoint.id,appoint.appoint_date,appoint.status,appoint.time_slot,user.real_name as us_name,vaccine.name as va_name from appoint
   left join plan on appoint.plan_id = plan.id 
   left join user on user.id = appoint.user_id
   left join vaccine on vaccine.id = plan.vaccine_id
   where inoculate_site_id = ${req.query.id} and status=1`,(err,result)=>{
        if(!err){
            res.send(result)
        }else {
            console.log(err);
        }
   })
})
app.post('/worker/inoculate/save',(req,res)=>{
    let newdate = new Date();
    newdate.setMinutes(newdate.getMinutes() - newdate.getTimezoneOffset())
    newdate.toJSON().slice(0, 19).replace("T"," ");
    let obj = req.body
    db.query('insert into inoculate (part,worker_id,create_time,appoint_id,note) value(?,?,?,?,?)', [obj.part, obj.workid, newdate, obj.appointId, obj.note], (err, results) => {
        if(!err){
            db.query(`update appoint set status=2 where id=${req.body.appointId} `,(err,result)=>{
                if(!err){
                    res.send({code:0,msg:'接种完成'})
                }
            })
        }else {
            res.send({code:-1,msg:'接种异常'})
        }
    })
})
app.post('/worker/inoculate/nosave',(req,res)=>{
    db.query(`update appoint set status=5 where id=${req.body.appointId} `,(err,result)=>{
        if(!err){
            res.send({code:-1,msg:'接种异常'})
        }
    })
})
app.get('/worker/findInoculateHistories',(req,res)=>{
    db.query(`select inoculate.part,inoculate.create_time as jztime,inoculate.note,user.real_name as us_name,vaccine.name as va_name
    from inoculate
    left join appoint on inoculate.appoint_id = appoint.id
    left join user on user.id = appoint.user_id
    left join plan on plan.id = appoint.plan_id
    left join vaccine on vaccine.id = plan.vaccine_id where worker_id = ${req.query.id}`,(err,result)=>{
        if(!err){
            res.send({code:0,data:result})
        }
    })
})
app.post('/user/save',(req,res)=>{
    let objuser = req.body
    db.query('insert into user (username,password,real_name,card_id,phone,address) value(?,?,?,?,?,?)', [objuser.username, objuser.password, objuser.realName, objuser.cardId,objuser.phone,objuser.address], (err, results) => {
        if(!err){
            res.send({code:0,count:null,data:null,mdg:'注册成功'})
        }else{
            res.send({code:-1,count:null,data:null,mdg:'注册失败'})
        }
    })
})
//监听端口
app.listen(3000);

//控制台提示输出
console.log('服务器启动成功')