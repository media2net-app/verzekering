'use client';

import styles from './CategorySelection.module.css';
import { CarIcon, HomeIcon, UserIcon, CheckIcon } from './Icons';

interface Category {
  name: string;
  icon: string;
}

interface Categories {
  [key: string]: Category;
}

interface CategorySelectionProps {
  categories: Categories;
  selectedCategories: string[];
  onSelect: (categories: string[]) => void;
}

export default function CategorySelection({
  categories,
  selectedCategories,
  onSelect,
}: CategorySelectionProps) {
  const handleToggle = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      onSelect(selectedCategories.filter(id => id !== categoryId));
    } else {
      onSelect([...selectedCategories, categoryId]);
    }
  };

  return (
    <div className={styles.categorySelection}>
      <h2 className={styles.title}>Selecteer uw categorieën</h2>
      <p className={styles.description}>
        Kies een of meer categorieën om te beginnen
      </p>
      <div className={styles.categories}>
        {Object.entries(categories).map(([id, category]) => (
          <button
            key={id}
            className={`${styles.categoryCard} ${
              selectedCategories.includes(id) ? styles.selected : ''
            }`}
            onClick={() => handleToggle(id)}
          >
            <div className={styles.icon}>
              {category.icon === 'car' && <CarIcon size={48} />}
              {category.icon === 'home' && <HomeIcon size={48} />}
              {category.icon === 'user' && <UserIcon size={48} />}
            </div>
            <div className={styles.name}>{category.name}</div>
            {selectedCategories.includes(id) && (
              <div className={styles.checkmark}>
                <CheckIcon size={20} />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

