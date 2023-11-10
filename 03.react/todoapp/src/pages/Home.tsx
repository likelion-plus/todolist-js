import 'styles/Home.css';
import { useState } from 'react';
import { CategoryMenu, MainList } from '@/component/index.tsx';
import { useNavigate } from 'react-router-dom';
export default function Home() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string>('');
  return (
    <>
      <div id="page">
        <div id="content">
          {/* 1. CATEGORY - displayCategory(ul - li) */}
          <CategoryMenu selector={setSelected} />
          {/* 2. LIST(TODO) - listContainer(class=>list-container)   */}
          <MainList selected={selected} />
          {/* 3. BTN - (class=>enrollment) */}
          <button
            className="enrollment"
            onClick={() => navigate('/regist')}
          ></button>
        </div>
      </div>
    </>
  );
}
