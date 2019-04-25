module.exports=function(app,transactionsdb){

    //get all transactions
    app.get('/api/transactions',(req,res)=>{
        transactionsdb.all().then(arr=>{
            res.json(arr)
        }).catch(err=>{
            console.log(err)
        })
    });

    //get transactions based on driver ID
    app.get('/api/transactions/driverID/:driverID',(req,res)=>{
        transactionsdb.findByDriverPlate(req.params.driverID).then(doc=>[
            res.json(doc)
        ])
    })
    
    app.post('/api/transactions',(req,res)=>{
        transactionsdb.addTransaction(req.body).then(doc=>{
            res.send("Added")
        })
    })
}