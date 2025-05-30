import menuItem from '../models/menuItem.model.js';


import MenuItem from '../models/menuItem.model.js';

export const getVendorMenu = async (req, res, next) => {
  try {
    const vendorId = req.params.id;

    // Validate vendorId presence and format (optional)
    

    // Find menu items belonging to this vendor
    const menuItems = await MenuItem.find({ vendor: vendorId });

    if (!menuItems || menuItems.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No menu items found for this vendor'
      });
    }

    res.status(200).json({
      success: true,
      data: menuItems
    });
  } catch (err) {
    next(err);
  }
};



export const addMenuItem = async (req, res, next) => {
  try {
    const vendorId = req.user.vendorId || req.user._id; // Assuming vendor ID is linked in req.user

    const { name, description, price, category, image, isAvailable } = req.body;

    if (!name || !price) {
      const error = new Error("Name and price are required");
      error.statusCode = 400;
      throw error;
    }

    const newMenuItem = new MenuItem({
      vendor: vendorId,
      name,
      description,
      price,
      category,
      image,
      isAvailable: isAvailable !== undefined ? isAvailable : true
    });

    await newMenuItem.save();
    console.log("Menu item added successfully:", newMenuItem);
    res.status(201).json({
      success: true,
      message: "Menu item added successfully",
      data: newMenuItem
    });

  } catch (err) {
    next(err);
  }
};



export const updateMenuItem = async (req, res, next) => {
  try {
    const vendorId = req.user._id; // from auth middleware
    const { menuItemId } = req.params;
    const updateData = req.body;

    // Find the menu item and check ownership
    const menuItem = await MenuItem.findById(menuItemId);

    if (!menuItem) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }

    

    // Update allowed fields
    Object.assign(menuItem, updateData);

    await menuItem.save();

    res.status(200).json({
      success: true,
      message: 'Menu item updated successfully',
      data: menuItem
    });
  } catch (err) {
    next(err);
  }
};




export const deleteMenuItem = async (req, res, next) => {
  try {
    const vendorId = req.user._id; // from auth middleware
    const { menuItemId } = req.params;

    const menuItem = await MenuItem.findById(menuItemId);

    if (!menuItem) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }

    

    await menuItem.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Menu item deleted successfully'
    });
  } catch (err) {
    next(err);
  }
};
