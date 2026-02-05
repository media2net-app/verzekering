'use client';

import styles from './Basispakket.module.css';
import { CheckIcon } from './Icons';

interface BasispakketProps {
  selectedOptions: string[];
  onToggle: (option: string) => void;
}

const BASISPAKKET_OPTIES = [
  { id: 'woonhuis', name: 'Woonhuis', description: 'Verzekering voor uw woning' },
  { id: 'inboedel', name: 'Inboedel', description: 'Verzekering voor uw inboedel' },
  { id: 'avp', name: 'AVP', description: 'Aansprakelijkheidsverzekering' },
  { id: 'rechtsbijstand', name: 'Rechtsbijstand', description: 'Rechtsbijstandverzekering' },
  { id: 'reisverzekering', name: 'Reisverzekering', description: 'Verzekering voor uw reizen' },
  { id: 'auto', name: 'Auto', description: 'Autoverzekering' },
  { id: 'motor', name: 'Motor', description: 'Motorverzekering' },
  { id: 'caravan', name: 'Caravan', description: 'Caravanverzekering' },
];

// Mapping van basispakket opties naar verzekering IDs
export const BASISPAKKET_TO_INSURANCE: Record<string, string> = {
  woonhuis: 'woonverzekering',
  inboedel: 'inboedelverzekering',
  avp: 'aansprakelijkheidsverzekering',
  rechtsbijstand: 'rechtsbijstandverzekering',
  reisverzekering: 'reisverzekering',
  auto: 'autoverzekering',
  motor: 'motorverzekering',
  caravan: 'caravanverzekering',
};

export default function Basispakket({
  selectedOptions,
  onToggle,
}: BasispakketProps) {
  return (
    <div className={styles.basispakket}>
      <h2 className={styles.title}>Basispakket</h2>
      <p className={styles.description}>
        Selecteer de verzekeringen die u nodig heeft
      </p>
      <div className={styles.options}>
        {BASISPAKKET_OPTIES.map(option => (
          <button
            key={option.id}
            className={`${styles.optionCard} ${
              selectedOptions.includes(option.id) ? styles.selected : ''
            }`}
            onClick={() => onToggle(option.id)}
          >
            <div className={styles.optionInfo}>
              <div className={styles.optionName}>{option.name}</div>
              {option.description && (
                <div className={styles.optionDescription}>{option.description}</div>
              )}
            </div>
            {selectedOptions.includes(option.id) && (
              <div className={styles.checkmark}>
                <CheckIcon size={24} />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
