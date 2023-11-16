import { useEffect, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';

export const CategoryMenu = ({
  setSelected,
  selected,
}: {
  selector: Dispatch<SetStateAction<string>>;
}) => {
  const [active, setActive] = useState('📝 Todo');

  const filters = ['📋 All', '📝 Todo', '✅ Done'];

  const handleClick: React.MouseEventHandler<HTMLLIElement> = (e) => {
    const current = e.currentTarget.textContent || '';
    setSelected(current);
    setActive(current);
  };

  useEffect(() => {
    setSelected(selected);
    setActive(active);
  }, [active, selected, setSelected, setActive]);

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
