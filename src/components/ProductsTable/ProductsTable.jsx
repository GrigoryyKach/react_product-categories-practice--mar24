export const ProductsTable = ({ itemArray, sort, setSort }) => {
  const columns = ['ID', 'Product', 'Category', 'User'];

  const sortProducts = (products, type, orderASC) => {
    switch (type) {
      case 'ID':
        return products.sort((a, b) => (orderASC ? a.id - b.id : b.id - a.id));

      case 'Product':
        return products.sort((a, b) =>
          orderASC
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name),
        );

      case 'Category':
        return products.sort((a, b) =>
          orderASC
            ? a.category.title.localeCompare(b.category.title)
            : b.category.title.localeCompare(a.category.title),
        );

      case 'User':
        return products.sort((a, b) =>
          orderASC
            ? a.user.name.localeCompare(b.user.name)
            : b.user.name.localeCompare(a.user.name),
        );

      default:
        return products;
    }
  };

  const handleSorting = (type, orderASC) => {
    setSort({ ...sort, type, orderASC });
  };

  const sortedProducts = sortProducts(itemArray, sort.type, sort.orderASC);

  return itemArray.length === 0 ? (
    <p data-cy="NoMatchingMessage">No products matching selected criteria</p>
  ) : (
    <table
      data-cy="ProductTable"
      className="table is-striped is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {columns.map(column => {
            let icon = '';

            if (sort.type === column) {
              if (sort.orderASC) {
                icon = '-down';
              } else {
                icon = '-up';
              }
            }

            return (
              <th key={column}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {column}
                  <a
                    href="#/"
                    onClick={() => handleSorting(column, !sort.orderASC)}
                  >
                    <span className="icon">
                      <i data-cy="SortIcon" className={`fas fa-sort${icon}`} />
                    </span>
                  </a>
                </span>
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {sortedProducts.map(item => (
          <tr data-cy="Product" key={item.id}>
            <td className="has-text-weight-bold" data-cy="ProductId">
              {item.id}
            </td>

            <td data-cy="ProductName">{item.name}</td>
            <td data-cy="ProductCategory">
              {item.category.icon} - {item.category.title}
            </td>

            <td
              data-cy="ProductUser"
              className={`${item.user.sex === 'm' ? 'has-text-link' : 'has-text-danger'}`}
            >
              {item.user.name}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
