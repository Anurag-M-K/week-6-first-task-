const mongoose =require('mongoose');
module.exports.connect=function (done){
    const url = 'mongodb://0.0.0.0:27017/user' //collection name
    mongoose.connect(url,{
        useNewUrlParser:true,
        useUnifiedTopology:true
        

    })
    done();
}
