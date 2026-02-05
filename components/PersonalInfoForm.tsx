'use client';

import { useState } from 'react';
import styles from './PersonalInfoForm.module.css';
import { PlusIcon } from './Icons';

interface PersonalInfoFormProps {
  data: {
    naam?: string;
    postcode?: string;
    huisnummer?: string;
    geboortedatum?: string;
    geslacht?: string;
    gezinssituatie?: string;
    email?: string;
    telefoonnummer?: string;
    geboortedatumPartner?: string;
    kinderen?: string[];
  };
  onChange: (field: string, value: string | string[]) => void;
}

export default function PersonalInfoForm({
  data,
  onChange,
}: PersonalInfoFormProps) {
  const kinderen = data.kinderen || [];
  const hasChildren = data.gezinssituatie === 'gezin' || 
                      data.gezinssituatie === 'stel' || 
                      data.gezinssituatie === 'alleenstaand_met_kinderen';
  const showPartner = data.gezinssituatie === 'stel' || data.gezinssituatie === 'gezin';

  const handleAddChild = () => {
    onChange('kinderen', [...kinderen, '']);
  };

  const handleChildChange = (index: number, value: string) => {
    const newKinderen = [...kinderen];
    newKinderen[index] = value;
    onChange('kinderen', newKinderen);
  };

  return (
    <div className={styles.personalInfoForm}>
      <h2 className={styles.title}>Persoonlijke gegevens</h2>
      <p className={styles.description}>
        Vul uw gegevens in om uw offerte te ontvangen
      </p>
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Naam <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            className={styles.input}
            placeholder="Bijv. Jan Jansen"
            value={data.naam || ''}
            onChange={e => onChange('naam', e.target.value)}
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
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Geboortedatum <span className={styles.required}>*</span>
          </label>
          <input
            type="date"
            className={styles.input}
            value={data.geboortedatum || ''}
            onChange={e => onChange('geboortedatum', e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Geslacht <span className={styles.required}>*</span>
          </label>
          <select
            className={styles.input}
            value={data.geslacht || ''}
            onChange={e => onChange('geslacht', e.target.value)}
          >
            <option value="">Selecteer geslacht</option>
            <option value="man">Man</option>
            <option value="vrouw">Vrouw</option>
            <option value="anders">Anders</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Gezinssituatie <span className={styles.required}>*</span>
          </label>
          <select
            className={styles.input}
            value={data.gezinssituatie || ''}
            onChange={e => {
              onChange('gezinssituatie', e.target.value);
              // Reset kinderen and partner when gezinssituatie changes
              if (e.target.value !== 'stel' && e.target.value !== 'gezin' && e.target.value !== 'alleenstaand_met_kinderen') {
                onChange('kinderen', []);
                onChange('geboortedatumPartner', '');
              }
            }}
          >
            <option value="">Selecteer gezinssituatie</option>
            <option value="alleenstaand">Alleenstaand</option>
            <option value="alleenstaand_met_kinderen">Alleenstaand met kinderen</option>
            <option value="stel">Stel</option>
            <option value="gezin">Gezin met kinderen</option>
          </select>
        </div>
        {showPartner && (
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Geboortedatum partner <span className={styles.required}>*</span>
            </label>
            <input
              type="date"
              className={styles.input}
              value={data.geboortedatumPartner || ''}
              onChange={e => onChange('geboortedatumPartner', e.target.value)}
            />
          </div>
        )}
        {hasChildren && (
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Geboortedatum kinderen <span className={styles.required}>*</span>
            </label>
            {kinderen.map((kind, index) => (
              <div key={index} className={styles.childRow}>
                <input
                  type="date"
                  className={styles.input}
                  value={kind || ''}
                  onChange={e => handleChildChange(index, e.target.value)}
                  placeholder="Geboortedatum kind"
                />
              </div>
            ))}
            <button
              type="button"
              className={styles.addButton}
              onClick={handleAddChild}
            >
              <PlusIcon size={20} />
              Kind toevoegen
            </button>
          </div>
        )}
        <div className={styles.formGroup}>
          <label className={styles.label}>
            E-mail <span className={styles.required}>*</span>
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
          <label className={styles.label}>
            Telefoonnummer <span className={styles.required}>*</span>
          </label>
          <input
            type="tel"
            className={styles.input}
            placeholder="Bijv. 0612345678"
            value={data.telefoonnummer || ''}
            onChange={e => onChange('telefoonnummer', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

