/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

import { Filter } from './components/Filter';
import { ProductsTable } from './components/ProductsTable';

export const App = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(
    categoriesFromServer.map(category => ({
      id: category.id,
      isSelected: true,
    })),
  );
  const [sorting, setSorting] = useState({ type: 'ID', orderASC: true });

  let products = productsFromServer.map(product => {
    const category = categoriesFromServer.find(
      cat => cat.id === product.categoryId,
    );
    const user = usersFromServer.find(person => person.id === category.ownerId);

    return { ...product, category, user };
  });

  if (selectedUser) {
    products = products.filter(item => item.user.name === selectedUser);
  }

  if (selectedProduct) {
    products = products.filter(item =>
      item.name.toLowerCase().includes(selectedProduct.toLowerCase()),
    );
  }

  if (
    selectedCategories.reduce(
      (count, category) => (category.isSelected ? count + 1 : count),
      0,
    ) !== categoriesFromServer.length
  ) {
    products = products.filter(item =>
      selectedCategories.some(
        category => category.id === item.category.id && category.isSelected,
      ),
    );
  }

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <Filter
            users={usersFromServer}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            categoryList={categoriesFromServer}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>

        <div className="box table-container">
          <ProductsTable
            itemArray={products}
            sort={sorting}
            setSort={setSorting}
          />
        </div>
      </div>
    </div>
  );
};
