// src/utils/constants.js
export const API_ENDPOINTS = {
    LOGIN: '/auth/signin',
    REGISTER: '/auth/signup',
    SIGNOUT: '/auth/signout',
    // Removed: GET_PROFILE: '/auth/profile', // No longer needed
    
    GET_VENDORS: '/vendors',
    GET_VENDOR_MENU: (vendorId) => `/vendors/${vendorId}/menu`,

    ADD_MENU_ITEM: '/menu-items',
    UPDATE_MENU_ITEM: (itemId) => `/menu-items/${itemId}`,
    DELETE_MENU_ITEM: (itemId) => `/menu-items/${itemId}`,

    PLACE_ORDER: '/orders',
    GET_ORDER_HISTORY: '/orders/history',
    GET_VENDOR_ORDERS: '/vendor/orders',
    UPDATE_ORDER_STATUS: (orderId) => `/vendor/orders/${orderId}/status`,
};

export const USER_ROLES = {
    STUDENT: 'student',
    VENDOR: 'vendor',
};

// --- Mock Data for Frontend Testing (KEEP FOR REFERENCE, NOT USED BY REAL API CALLS) ---
export const MOCK_MENUS = {
    'v1': [ // CUET Canteen
        { id: 'm1', name: 'Chicken Biriyani', price: 120, description: 'Flavorful rice with chicken', imageUrl: 'https://placehold.co/150x150/FF5733/FFFFFF?text=Biriyani' },
        { id: 'm2', name: 'Vegetable Khichuri', price: 80, description: 'Hearty lentil and rice dish', imageUrl: 'https://placehold.co/150x150/33FF57/FFFFFF?text=Khichuri' },
        { id: 'm3', name: 'Dal Puri (2 pcs)', price: 30, description: 'Fried flatbread with lentil filling', imageUrl: 'https://placehold.co/150x150/3357FF/FFFFFF?text=DalPuri' },
        { id: 'm4', name: 'Tea', price: 10, description: 'Standard tea', imageUrl: 'https://placehold.co/150x150/F0F0F0/000000?text=Tea' },
    ],
    'v2': [ // Campus Cafe
        { id: 'm5', name: 'Coffee (Hot/Cold)', price: 50, description: 'Freshly brewed coffee', imageUrl: 'https://placehold.co/150x150/FF33A1/FFFFFF?text=Coffee' },
        { id: 'm6', name: 'Sandwich (Chicken)', price: 70, description: 'Grilled chicken sandwich', imageUrl: 'https://placehold.co/150x150/A133FF/FFFFFF?text=Sandwich' },
        { id: 'm7', name: 'Chocolate Muffin', price: 40, description: 'Delicious chocolate muffin', imageUrl: 'https://placehold.co/150x150/33FFA1/FFFFFF?text=Muffin' },
    ],
    'v3': [ // Juice Bar
        { id: 'm8', name: 'Mango Juice', price: 60, description: 'Fresh mango juice', imageUrl: 'https://placehold.co/150x150/FFBD33/FFFFFF?text=MangoJuice' },
        { id: 'm9', name: 'Orange Juice', price: 60, description: 'Fresh orange juice', imageUrl: 'https://placehold.co/150x150/33FFBD/FFFFFF?text=OrangeJuice' },
    ],
};

export const MOCK_ORDERS = [
    {
        _id: 'order1',
        user: { _id: 'student123', name: 'Student User' },
        vendor: { _id: 'v1', name: 'CUET Canteen', ownerId: 'vendor123' }, // Added ownerId for mock vendor
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
        vendor: { _id: 'v2', name: 'Campus Cafe', ownerId: 'vendorOther' },
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
        vendor: { _id: 'v1', name: 'CUET Canteen', ownerId: 'vendor123' },
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
        vendor: { _id: 'v3', name: 'Juice Bar', ownerId: 'vendor123' },
        items: [
            { item: { id: 'm8', name: 'Mango Juice', price: 60 }, quantity: 2 },
        ],
        totalPrice: 120,
        status: 'Shipped',
        createdAt: '2025-05-21T09:00:00Z',
    },
];

export const ORDER_STATUSES = ['Pending', 'Preparing', 'Ready', 'Shipped'];

