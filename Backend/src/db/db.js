// file to write the connection funtionality
const dns=require('dns')
const mongoose=require('mongoose')

dns.setServers(['8.8.8.8','8.8.4.4'])

async function Connectdb(){
  await mongoose.connect(`${process.env.dbkey}/post`)
  console.log("DB sucessfully connected")
}

module.exports=Connectdb