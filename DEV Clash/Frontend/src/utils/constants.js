// src/utils/constants.js
export const API_ENDPOINTS = {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    GET_VENDORS: '/vendors',
    GET_VENDOR_MENU: (vendorId) => `/vendors/${vendorId}/menu`,
    PLACE_ORDER: '/orders',
    GET_ORDER_HISTORY: '/orders/history',
    GET_VENDOR_ORDERS: '/vendor/orders',
    ADD_MENU_ITEM: '/vendor/menu/add',
    UPDATE_MENU_ITEM: (itemId) => `/vendor/menu/${itemId}`,
    DELETE_MENU_ITEM: (itemId) => `/vendor/menu/${itemId}`,
    UPDATE_ORDER_STATUS: (orderId) => `/vendor/orders/${orderId}/status`,
};

export const USER_ROLES = {
    STUDENT: 'student',
    VENDOR: 'vendor',
};

// --- Mock Data for Frontend Testing ---
export const MOCK_MENUS = {
    'v1': [ // CUET Canteen
        { id: 'm1', name: 'Chicken Biriyani', price: 120, description: 'Flavorful rice with chicken', imageUrl: 'https://via.placeholder.com/150/FF5733/FFFFFF?text=Biriyani' },
        { id: 'm2', name: 'Vegetable Khichuri', price: 80, description: 'Hearty lentil and rice dish', imageUrl: 'https://via.placeholder.com/150/33FF57/FFFFFF?text=Khichuri' },
        { id: 'm3', name: 'Dal Puri (2 pcs)', price: 30, description: 'Fried flatbread with lentil filling', imageUrl: 'https://via.placeholder.com/150/3357FF/FFFFFF?text=DalPuri' },
        { id: 'm4', name: 'Tea', price: 10, description: 'Standard tea', imageUrl: 'https://via.placeholder.com/150/F0F0F0/000000?text=Tea' },
    ],
    'v2': [ // Campus Cafe
        { id: 'm5', name: 'Coffee (Hot/Cold)', price: 50, description: 'Freshly brewed coffee', imageUrl: 'https://via.placeholder.com/150/FF33A1/FFFFFF?text=Coffee' },
        { id: 'm6', name: 'Sandwich (Chicken)', price: 70, description: 'Grilled chicken sandwich', imageUrl: 'https://via.placeholder.com/150/A133FF/FFFFFF?text=Sandwich' },
        { id: 'm7', name: 'Chocolate Muffin', price: 40, description: 'Delicious chocolate muffin', imageUrl: 'https://via.placeholder.com/150/33FFA1/FFFFFF?text=Muffin' },
    ],
    'v3': [ // Juice Bar
        { id: 'm8', name: 'Mango Juice', price: 60, description: 'Fresh mango juice', imageUrl: 'https://via.placeholder.com/150/FFBD33/FFFFFF?text=MangoJuice' },
        { id: 'm9', name: 'Orange Juice', price: 60, description: 'Fresh orange juice', imageUrl: 'https://via.placeholder.com/150/33FFBD/FFFFFF?text=OrangeJuice' },
    ],
};

export const MOCK_ORDERS = [
    {
        _id: 'order1',
        user: { _id: 'student123', name: 'Student User' },
        vendor: { _id: 'v1', name: 'CUET Canteen' },
        items: [
            { item: { id: 'm1', name: 'Chicken Biriyani', price: 120 }, quantity: 1 },
            { item: { id: 'm4', name: 'Tea', price: 10 }, quantity: 2 },
        ],
        totalPrice: 140,
        status: 'Pending',
        createdAt: '2025-05-24T10:00:00Z',
    },
    {
        _id: 'order2',
        user: { _id: 'student123', name: 'Student User' },
        vendor: { _id: 'v2', name: 'Campus Cafe' },
        items: [
            { item: { id: 'm5', name: 'Coffee (Hot/Cold)', price: 50 }, quantity: 1 },
            { item: { id: 'm7', name: 'Chocolate Muffin', price: 40 }, quantity: 1 },
        ],
        totalPrice: 90,
        status: 'Preparing',
        createdAt: '2025-05-23T15:30:00Z',
    },
    {
        _id: 'order3',
        user: { _id: 'otherStudent', name: 'Another Student' },
        vendor: { _id: 'v1', name: 'CUET Canteen' },
        items: [
            { item: { id: 'm2', name: 'Vegetable Khichuri', price: 80 }, quantity: 2 },
        ],
        totalPrice: 160,
        status: 'Ready',
        createdAt: '2025-05-22T11:00:00Z',
    },
    {
        _id: 'order4',
        user: { _id: 'student123', name: 'Student User' },
        vendor: { _id: 'v3', name: 'Juice Bar' },
        items: [
            { item: { id: 'm8', name: 'Mango Juice', price: 60 }, quantity: 2 },
        ],
        totalPrice: 120,
        status: 'Shipped',
        createdAt: '2025-05-21T09:00:00Z',
    },
];

export const ORDER_STATUSES = ['Pending', 'Preparing', 'Ready', 'Shipped'];

