import { useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
export const CategoryMenu = ({
  selector,
}: {
  selector: Dispatch<SetStateAction<string>>;
}) => {
  const [active, setActive] = useState('');
  const filters = ['📋 All', '📝 Todo', '✅ Done'];
  const handleClick: React.MouseEventHandler<HTMLLIElement> = (e) => {
    const current = e.currentTarget.textContent || '';
    // if()
    selector(current);
    setActive(current);
  };
  return (
    <>
      <ul className="category-list">
        {filters.map((li) => (
          <li
            key={li}
            className={`category-item ${li === active ? 'active' : ''}`}
            onClick={handleClick}
          >
            {li}
          </li>
        ))}
      </ul>
    </>
  );
};
