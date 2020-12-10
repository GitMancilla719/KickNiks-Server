import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    KN_email : {type : String, required : true, unique : true},
    KN_password : {type : String, required : true, minlength : 8},
    KN_username : {type : String, required : true},
    KN_cart : {type : Array},
    KN_orders : {type : Array},
    KN_isAdmin : {type : Boolean, default : false}
})

const KnUser = mongoose.model('KN_users', userSchema)

export default KnUser