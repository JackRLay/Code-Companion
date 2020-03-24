const express = require ('express')
const app = express()

app.set('view-engine', 'ejs')

app.get('/',(req,res)=>{
    res.render('index.ejs',{name:'Jack'})
})

app.get('/login')

app.listen(9000)