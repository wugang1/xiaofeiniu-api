/*
  菜品相关路由
*/
const express = require('express');
const pool = require('../../pool');
var router = express.Router();
module.exports = router;
/*
  API：get /admin/dish
  获取所有的菜品（按类别进行分类）
  返回数据：
  [
  {cid:1,cname:'肉类',dishList:[{},{},...]}
  {cid:2,cname:'菜类',dishList:[{},{},...]}

  ]
*/
router.get('/',(req,res)=>{
  // 查询所有菜品的类别
  pool.query('SELECT cid,cname FROM xfn_category',(err,result)=>{
    if(err) throw err;
    var categoryList=result
    var count=0
    for(var c of categoryList){
      // 循环查询每个类别下有哪些菜品
      pool.query('SELECT * FROM xfn_dish WHERE categpryId=?',c.cid,(err,result)=>{
        if(err) throw err;
        c.dishLish=result
        count++
        if(count==categoryList.length){
          res.send(categoryList)
        }
      })
    }
  })
})