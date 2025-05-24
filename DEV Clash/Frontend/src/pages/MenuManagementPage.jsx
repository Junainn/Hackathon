import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import Input from '../components/Input';
import LoadingSpinner from '../components/LoadingSpinner';
import vendorService from '../services/vendorService';
import studentService from '../services/studentService'; // To fetch current vendor's menu
import { useAuth } from '../hooks/useAuth.jsx'; // Get current vendor ID

const MenuManagementPage = () => {
  const { user } = useAuth();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ id: null, name: '', description: '', price: '', imageUrl: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  // Fetch initial menu items for the vendor
  useEffect(() => {
    const fetchMenu = async () => {
      if (!user?._id) return;
      setLoading(true);
      setError('');
      try {
        // In a real app, vendorService would have a getMyMenu()
        // For mock, we'll use studentService to get the mock menu by vendor ID
        const data = await studentService.getVendorMenu(user._id);
        setMenuItems(data);
      } catch (err) {
        setError(err.message || 'Failed to load menu items.');
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, [user]);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdateItem = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);

    if (!form.name || !form.price || !form.description) {
      setFormError('Name, description, and price are required.');
      setFormLoading(false);
      return;
    }
    if (isNaN(form.price) || parseFloat(form.price) <= 0) {
      setFormError('Price must be a positive number.');
      setFormLoading(false);
      return;
    }

    try {
      let result;
      if (isEditing) {
        result = await vendorService.updateMenuItem(form.id, {
          name: form.name,
          description: form.description,
          price: parseFloat(form.price),
          imageUrl: form.imageUrl,
        });
        setMenuItems(menuItems.map(item => item.id === form.id ? result.item : item));
      } else {
        result = await vendorService.addMenuItem({
          name: form.name,
          description: form.description,
          price: parseFloat(form.price),
          imageUrl: form.imageUrl,
        });
        setMenuItems([...menuItems, result.item]);
      }
      setForm({ id: null, name: '', description: '', price: '', imageUrl: '' });
      setIsEditing(false);
    } catch (err) {
      setFormError(err.message || 'Operation failed.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditClick = (item) => {
    setForm({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price.toString(), // Convert to string for input value
      imageUrl: item.imageUrl || '',
    });
    setIsEditing(true);
  };

  const handleDeleteItem = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setLoading(true); // Re-use loading for overall list operation
      try {
        await vendorService.deleteMenuItem(itemId);
        setMenuItems(menuItems.filter(item => item.id !== itemId));
      } catch (err) {
        setError(err.message || 'Failed to delete item.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto p-4 py-8">
        <h1 className="text-4xl font-bold text-green-800 mb-6 text-center">Menu Management</h1>

        {/* Menu Item Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">{isEditing ? 'Edit Menu Item' : 'Add New Menu Item'}</h2>
          <form onSubmit={handleAddOrUpdateItem}>
            <Input
              label="Item Name"
              name="name"
              value={form.name}
              onChange={handleFormChange}
              placeholder="e.g., Chicken Sandwich"
              required
            />
            <Input
              label="Description"
              name="description"
              value={form.description}
              onChange={handleFormChange}
              placeholder="A delicious sandwich with grilled chicken"
              required
            />
            <Input
              label="Price (BDT)"
              name="price"
              type="number"
              value={form.price}
              onChange={handleFormChange}
              placeholder="e.g., 120"
              required
            />
            <Input
              label="Image URL (Optional)"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleFormChange}
              placeholder="https://example.com/image.jpg"
            />
            {formError && <p className="text-red-500 text-sm mb-4">{formError}</p>}
            <div className="flex space-x-2">
              <Button type="submit" variant="primary" disabled={formLoading}>
                {formLoading ? (isEditing ? 'Updating...' : 'Adding...') : (isEditing ? 'Update Item' : 'Add Item')}
              </Button>
              {isEditing && (
                <Button variant="secondary" onClick={() => { setIsEditing(false); setForm({ id: null, name: '', description: '', price: '', imageUrl: '' }); setFormError(''); }}>
                  Cancel Edit
                </Button>
              )}
            </div>
          </form>
        </div>

        {/* Current Menu Items List */}
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your Current Menu</h2>
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-red-500 text-center mt-8 p-4 bg-red-100 rounded-md border border-red-300">{error}</div>
        ) : menuItems.length === 0 ? (
          <p className="text-gray-600 text-center text-lg mt-8">No menu items added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                <img src={item.imageUrl || 'https://via.placeholder.com/150'} alt={item.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                  <p className="text-blue-700 font-bold mt-2">BDT {item.price}</p>
                  <div className="flex space-x-2 mt-4">
                    <Button variant="secondary" onClick={() => handleEditClick(item)} className="text-sm px-3 py-1">Edit</Button>
                    <Button variant="danger" onClick={() => handleDeleteItem(item.id)} className="text-sm px-3 py-1">Delete</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default MenuManagementPage;
