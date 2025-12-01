'use client';

import styles from './PersonalInfoForm.module.css';

interface PersonalInfoFormProps {
  data: {
    naam?: string;
    email?: string;
    telefoon?: string;
    postcode?: string;
    huisnummer?: string;
  };
  onChange: (field: string, value: string) => void;
}

export default function PersonalInfoForm({
  data,
  onChange,
}: PersonalInfoFormProps) {
  return (
    <div className={styles.personalInfoForm}>
      <h2 className={styles.title}>Persoonlijke gegevens</h2>
      <p className={styles.description}>
        Vul uw gegevens in om uw offerte te ontvangen
      </p>
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Volledige naam <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            className={styles.input}
            placeholder="Bijv. Jan Jansen"
            value={data.naam || ''}
            onChange={e => onChange('naam', e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            E-mailadres <span className={styles.required}>*</span>
          </label>
          <input
            type="email"
            className={styles.input}
            placeholder="bijv. jan@voorbeeld.nl"
            value={data.email || ''}
            onChange={e => onChange('email', e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Telefoonnummer</label>
          <input
            type="tel"
            className={styles.input}
            placeholder="Bijv. 0612345678"
            value={data.telefoon || ''}
            onChange={e => onChange('telefoon', e.target.value)}
          />
        </div>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Postcode <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              className={styles.input}
              placeholder="Bijv. 1234AB"
              value={data.postcode || ''}
              onChange={e => onChange('postcode', e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Huisnummer <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              className={styles.input}
              placeholder="Bijv. 12"
              value={data.huisnummer || ''}
              onChange={e => onChange('huisnummer', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

