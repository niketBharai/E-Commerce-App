import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  rating: number;
  reviews: number;
}

interface ProductContextType {
  products: Product[];
  categories: string[];
  getProduct: (id: string) => Product | undefined;
  searchProducts: (query: string) => Product[];
  filterByCategory: (category: string) => Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const demoProducts: Product[] = [
      {
        id: '1',
        name: 'Wireless Bluetooth Headphones',
        description: 'Premium quality wireless headphones with noise cancellation and 30-hour battery life.',
        price: 199.99,
        category: 'Electronics',
        image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
        stock: 25,
        rating: 4.8,
        reviews: 234
      },
      {
        id: '2',
        name: 'Organic Cotton T-Shirt',
        description: 'Comfortable and sustainable organic cotton t-shirt available in multiple colors.',
        price: 29.99,
        category: 'Clothing',
        image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=500',
        stock: 50,
        rating: 4.5,
        reviews: 89
      },
      {
        id: '3',
        name: 'Water Bottle',
        description: 'Insulated stainless steel water bottle that keeps drinks cold for 24 hours.',
        price: 24.99,
        category: 'Sports',
        image: 'https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&w=500',
        stock: 35,
        rating: 4.7,
        reviews: 156
      },
      {
        id: '4',
        name: 'Smart Fitness Watch',
        description: 'Advanced fitness tracking with heart rate monitoring and GPS.',
        price: 299.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1461141346587-763ab02bced9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D',
        stock: 15,
        rating: 4.6,
        reviews: 342
      },
      {
        id: '5',
        name: 'Leather Laptop Bag',
        description: 'Professional leather laptop bag with multiple compartments and shoulder strap.',
        price: 89.99,
        category: 'Accessories',
        image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=500',
        stock: 20,
        rating: 4.4,
        reviews: 78
      },
      {
        id: '6',
        name: 'Yoga Mat',
        description: 'Non-slip yoga mat made from eco-friendly materials with carrying strap.',
        price: 39.99,
        category: 'Sports',
        image: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=500',
        stock: 40,
        rating: 4.3,
        reviews: 67
      }
    ];
    setProducts(demoProducts);
  }, []);

  const categories = [...new Set(products.map(p => p.category))];

  const getProduct = (id: string) => products.find(p => p.id === id);

  const searchProducts = (query: string) => {
    return products.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filterByCategory = (category: string) => {
    return products.filter(p => p.category === category);
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: Date.now().toString() };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <ProductContext.Provider value={{
      products,
      categories,
      getProduct,
      searchProducts,
      filterByCategory,
      addProduct,
      updateProduct,
      deleteProduct
    }}>
      {children}
    </ProductContext.Provider>
  );
};