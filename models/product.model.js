import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    KN_item : {type : String, required : true, unique : true},
    KN_images : {type : Array, required : true},
    KN_brand : {type : String, required : true},
    KN_description : {type : String, required : true},
    KN_shoeType : {type : String, required : true},
    KN_price : {type : Number, required : true},
    KN_stock : {type : Number, required : true}
})

const KnProducts = mongoose.model('kn_products', productSchema)

export default KnProducts