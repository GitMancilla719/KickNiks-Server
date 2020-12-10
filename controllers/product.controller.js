import KnProducts from '../models/product.model.js'
import mongoose from 'mongoose'

export const getProducts = async (req,res) => {
    try {
        const getAllProducts = await KnProducts.find()
        res.json(getAllProducts)
    } catch (error) {
        res.status(500).json({error : err.message})
    }
}

export const searchProducts = async (req,res) => {
    const toSearch = req.query.search
    const searchQuery = new RegExp(toSearch, 'i')
    try {
        const findProduct = await KnProducts.find({KN_item : searchQuery})
        if(!findProduct.length) return res.status(400).json({msg : 'Item not found.'})
        res.json(findProduct)
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}

export const addProducts = async (req,res) => {
    try {
        const { KN_item, KN_images, KN_brand, KN_description, KN_shoeType, KN_price, KN_stock } = req.body
        
        if( !KN_item || !KN_images || !KN_brand || !KN_description || !KN_shoeType || !KN_price || !KN_stock) 
            return res.status(400).json({msg : 'All fields are required.'})
        const checkItem = await KnProducts.findOne({KN_item : KN_item})
        if(checkItem) return res.status(400).json({msg : 'An item with this name already exists.'})

        const newProduct = new KnProducts(req.body)
        const addSuccessful = await newProduct.save()
        if(!addSuccessful) return res.status(400).json({msg : 'Failed to add the item'})
        res.json(addSuccessful)
    } catch (error) {
        res.status(500).json({error : error.message})
    }
    
}

export const updateProducts = async (req,res) => {
    try {
        const itemID = req.params.id
        const updateItem = req.body

        if(!mongoose.Types.ObjectId.isValid(itemID)) 
            return res.status(400).json({msg : 'the item is either deleted or does not exist'})

        const fetchItemToUpdate = await KnProducts.findByIdAndUpdate(itemID, updateItem)
        if(!fetchItemToUpdate)
            return res.status(400).json({msg : 'The item is either deleted already or does not exist.'})
            
        res.json(fetchItemToUpdate) //slow refresh update
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}

export const deleteProducts = async (req,res) => {
    try {
        const itemID = req.params.id
        if(!mongoose.Types.ObjectId.isValid(itemID)) 
            return res.status(400).json({msg : 'The item is either deleted already or does not exist.'})

        const fetchItemToDelete = await KnProducts.findByIdAndDelete(itemID)
        if(!fetchItemToDelete)
            return res.status(400).json({msg : 'The item is either deleted already or does not exist.'})
        
        res.json(fetchItemToDelete)
        
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}