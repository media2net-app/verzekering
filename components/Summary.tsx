'use client';

import { FormData } from '@/types';
import { InsuranceType } from '@/data/insuranceTypes';
import styles from './Summary.module.css';

interface SummaryProps {
  formData: FormData;
  insuranceTypes: InsuranceType[];
}

export default function Summary({ formData, insuranceTypes }: SummaryProps) {
  const selectedInsurances = insuranceTypes.filter(ins =>
    formData.selectedInsurances.includes(ins.id)
  );

  const calculatePrice = (insurance: InsuranceType): number => {
    let price = insurance.basePrice;
    const answers = formData.answers[insurance.id] || {};

    // Simple price adjustments based on answers
    if (insurance.id === 'autoverzekering') {
      const schadevrijeJaren = answers.schadevrije_jaren || 0;
      price = Math.max(insurance.basePrice - schadevrijeJaren * 5, insurance.basePrice * 0.5);
    }

    if (insurance.id === 'zorgverzekering') {
      const eigenRisico = answers.eigen_risico;
      if (eigenRisico?.includes('585')) price = insurance.basePrice - 5;
      if (eigenRisico?.includes('785')) price = insurance.basePrice - 10;
      if (eigenRisico?.includes('885')) price = insurance.basePrice - 15;
    }

    if (insurance.id === 'reisverzekering') {
      const reisType = answers.reis_type;
      if (reisType === 'Doorlopend') {
        price = insurance.basePrice * 12;
      } else {
        const aantalReizen = answers.aantal_reizen || 1;
        price = insurance.basePrice * aantalReizen;
      }
    }

    return price;
  };

  const totalMonthly = selectedInsurances.reduce(
    (sum, ins) => sum + calculatePrice(ins),
    0
  );

  const totalYearly = totalMonthly * 12;

  return (
    <div className={styles.summary}>
      <h2 className={styles.title}>Uw verzekeringspakket</h2>
      <p className={styles.description}>
        Controleer uw gegevens en bekijk uw totale premie
      </p>

      <div className={styles.content}>
        <div className={styles.insurancesList}>
          <h3 className={styles.sectionTitle}>Geselecteerde verzekeringen</h3>
          {selectedInsurances.map(insurance => {
            const price = calculatePrice(insurance);
            return (
              <div key={insurance.id} className={styles.insuranceItem}>
                <div className={styles.insuranceDetails}>
                  <div className={styles.insuranceName}>{insurance.name}</div>
                  <div className={styles.insuranceDescription}>
                    {insurance.description}
                  </div>
                </div>
                <div className={styles.insurancePrice}>
                  €{price.toFixed(2)}/maand
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.personalInfo}>
          <h3 className={styles.sectionTitle}>Persoonlijke gegevens</h3>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Naam:</span>
              <span className={styles.infoValue}>{formData.personalInfo.naam}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>E-mail:</span>
              <span className={styles.infoValue}>{formData.personalInfo.email}</span>
            </div>
            {formData.personalInfo.telefoon && (
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Telefoon:</span>
                <span className={styles.infoValue}>
                  {formData.personalInfo.telefoon}
                </span>
              </div>
            )}
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Adres:</span>
              <span className={styles.infoValue}>
                {formData.personalInfo.postcode} {formData.personalInfo.huisnummer}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.total}>
          <div className={styles.totalRow}>
            <span className={styles.totalLabel}>Totaal per maand:</span>
            <span className={styles.totalAmount}>
              €{totalMonthly.toFixed(2)}
            </span>
          </div>
          <div className={styles.totalRow}>
            <span className={styles.totalLabel}>Totaal per jaar:</span>
            <span className={styles.totalAmountYearly}>
              €{totalYearly.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.buttonPrimary}>
          Offerte aanvragen
        </button>
        <button className={styles.buttonSecondary}>
          PDF downloaden
        </button>
      </div>
    </div>
  );
}

