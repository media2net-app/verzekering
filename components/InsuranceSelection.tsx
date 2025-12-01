'use client';

import { InsuranceType } from '@/data/insuranceTypes';
import styles from './InsuranceSelection.module.css';
import { CarIcon, HomeIcon, UserIcon } from './Icons';

interface InsuranceSelectionProps {
  insurances: InsuranceType[];
  selectedInsurances: string[];
  onToggle: (insuranceId: string) => void;
}

export default function InsuranceSelection({
  insurances,
  selectedInsurances,
  onToggle,
}: InsuranceSelectionProps) {
  const groupedInsurances = insurances.reduce((acc, insurance) => {
    if (!acc[insurance.category]) {
      acc[insurance.category] = [];
    }
    acc[insurance.category].push(insurance);
    return acc;
  }, {} as Record<string, InsuranceType[]>);

  return (
    <div className={styles.insuranceSelection}>
      <h2 className={styles.title}>Selecteer uw verzekeringen</h2>
      <p className={styles.description}>
        Kies de verzekeringen die u nodig heeft
      </p>
      <div className={styles.insurances}>
        {Object.entries(groupedInsurances).map(([category, categoryInsurances]) => (
          <div key={category} className={styles.categoryGroup}>
            <h3 className={styles.categoryTitle}>
              <span className={styles.categoryIcon}>
                {category === 'auto' && <CarIcon size={20} />}
                {category === 'huis' && <HomeIcon size={20} />}
                {category === 'persoonlijk' && <UserIcon size={20} />}
              </span>
              {category === 'auto' && 'Auto en vervoer'}
              {category === 'huis' && 'Huis'}
              {category === 'persoonlijk' && 'Persoonlijk'}
            </h3>
            <div className={styles.insuranceList}>
              {categoryInsurances.map(insurance => (
                <div
                  key={insurance.id}
                  className={`${styles.insuranceCard} ${
                    selectedInsurances.includes(insurance.id) ? styles.selected : ''
                  }`}
                  onClick={() => onToggle(insurance.id)}
                >
                  <input
                    type="checkbox"
                    checked={selectedInsurances.includes(insurance.id)}
                    onChange={() => onToggle(insurance.id)}
                    className={styles.checkbox}
                  />
                  <div className={styles.insuranceInfo}>
                    <div className={styles.insuranceName}>{insurance.name}</div>
                    <div className={styles.insuranceDescription}>
                      {insurance.description}
                    </div>
                    <div className={styles.insurancePrice}>
                      Vanaf €{insurance.basePrice.toFixed(2)}/maand
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

