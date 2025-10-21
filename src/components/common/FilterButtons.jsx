const FilterButtons = ({ categories, activeFilter, onFilterChange, className = "filter-buttons" }) => {
  return (
    <div className={className}>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onFilterChange(category.id)}
          className={`filter-btn ${activeFilter === category.id ? "active" : ""}`}
        >
          <span className="filter-icon">{category.icon}</span>
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
