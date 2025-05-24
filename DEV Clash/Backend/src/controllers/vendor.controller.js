import Vendor from '../models/vendor.model.js';




export const getAllVendors = async(req, res,next) => {
    try{
        const vendor = await Vendor.find()
       
    if(!vendor) {
        const error = new Error("No vendors found");
        error.statusCode = 404;
        return next(error);
    }
    res.status(200).json({
        success: true,
        message: "Vendors fetched successfully",
        data: vendor
    });
    }catch(err){
        next(err);
    }
    
}