import Vendor from '../models/vendor.model.js';

import MenuItem from '../models/menuItem.model.js';


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

export const listVendorMenu = async (req, res, next) => {
  try {
    const vendorId = req.params.id;

    // Optional: Validate vendorId format (MongoDB ObjectId)
    if (!vendorId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: 'Invalid vendor ID' });
    }

    // Find menu items for the vendor
    const menuItems = await MenuItem.find({ vendor: vendorId });

    if (!menuItems.length) {
      return res.status(404).json({ success: false, message: 'No menu items found for this vendor' });
    }

    res.status(200).json({ success: true, data: menuItems });
  } catch (error) {
    next(error);
  }
};