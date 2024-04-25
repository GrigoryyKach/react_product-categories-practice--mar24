import { useState } from 'react';
import { SearchBar } from '../SearchBar';

export const Filter = ({
  users,
  selectedUser,
  setSelectedUser,
  selectedProduct,
  setSelectedProduct,
  categoryList,
  selectedCategories,
  setSelectedCategories,
}) => {
  const initialSelectedCategories = categoryList.map(category => ({
    ...category,
    isSelected: true,
  }));
  const [allCategoriesSelected, setAllCategoriesSelected] = useState(
    selectedCategories.length === 0,
  );

  const handleUser = v => {
    setSelectedUser(v);
  };

  const handleInput = v => {
    setSelectedProduct(v);
  };

  const handleAllCategoriesClick = () => {
    setSelectedCategories(initialSelectedCategories);
    setAllCategoriesSelected(true);
  };

  const handleCategoryChange = categoryId => {
    setSelectedCategories(prevSelectedCategories =>
      prevSelectedCategories.map(selectedCategory =>
        selectedCategory.id !== categoryId
          ? selectedCategory
          : { ...selectedCategory, isSelected: !selectedCategory.isSelected },
      ),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs has-text-weight-bold">
        <a
          data-cy="FilterAllUsers"
          href="#/"
          className={!selectedUser ? 'is-active' : ''}
          onClick={() => {
            setSelectedUser(null);
          }}
        >
          All
        </a>

        {users.map(user => (
          <a
            data-cy="FilterUser"
            href="#/"
            className={selectedUser === user.name ? 'is-active' : ''}
            onClick={() => {
              handleUser(user.name);
            }}
            key={user.id}
          >
            {user.name}
          </a>
        ))}
      </p>

      <SearchBar
        handleInput={handleInput}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
      />

      <div className="panel-block is-flex-wrap-wrap">
        <a
          href="#/"
          data-cy="AllCategories"
          className={`button mr-6 is-outlined ${allCategoriesSelected ? 'is-success' : ''}`}
          onClick={handleAllCategoriesClick}
        >
          All
        </a>

        {categoryList.map(allCategories => (
          <a
            data-cy="Category"
            className={`button mr-2 my-1 ${
              selectedCategories.find(
                selCategory => selCategory.id === allCategories.id,
              ).isSelected
                ? 'is-info'
                : ''
            }`}
            href="#/"
            onClick={() => {
              handleCategoryChange(allCategories.id);
            }}
            key={allCategories.id}
          >
            {allCategories.title}
          </a>
        ))}
      </div>

      <div className="panel-block">
        <a
          data-cy="ResetAllButton"
          href="#/"
          className="button is-link is-outlined is-fullwidth"
          onClick={() => {
            setSelectedUser(null);
            setSelectedProduct('');
            setSelectedCategories(
              categoryList.map(category => ({
                id: category.id,
                isSelected: true,
              })),
            );
            handleAllCategoriesClick();
          }}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
