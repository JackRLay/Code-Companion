const router= require('express').Router();

router.get('/',(req,res)=>{
    res.send('logged in')
})


module.exports.router = router;