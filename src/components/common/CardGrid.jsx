import React from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

const CardGrid = ({
  items,
  renderItem,
  className = "card-grid",
  itemClassName = "card-item",
  animationDelay = 0.1
}) => {
  const itemRefs = React.useMemo(() =>
    Array.from({ length: items.length }, () => React.createRef()), [items.length]
  );

  useIntersectionObserver(itemRefs, {}, 'visible');

  return (
    <div className={className}>
      {items.map((item, index) => (
        <div
          key={item.id || index}
          ref={itemRefs[index]}
          className={itemClassName}
          style={{ '--delay': `${index * animationDelay}s` }}
        >
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
};

export default CardGrid;