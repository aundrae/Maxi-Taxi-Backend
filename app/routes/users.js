module.exports=function(app,usersdb){
    app.post('/api/create',(req,res)=>{
        transactionsdb.addUser(req.body).then(doc=>{
            res.send("Added")
        })
    })
}
