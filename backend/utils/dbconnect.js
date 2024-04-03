const mongoose=require("mongoose");
async function main() {
  (await mongoose.connect('mongodb://127.0.0.1:27017/mydata'));
}
module.exports=function connect(){
    main().then(()=>{
        console.log("connected to db");
    }).catch((e)=>console.log(e)); 
}