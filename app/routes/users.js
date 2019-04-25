module.exports=function(app,usersDb){
    app.post('/api/create',(req,res)=>{
        usersDb.addUser(req.body).then(doc=>{
            res.send("Added")
        })
    })
}
