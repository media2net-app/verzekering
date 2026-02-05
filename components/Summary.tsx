'use client';

import { FormData } from '@/types';
import { InsuranceType } from '@/data/insuranceTypes';
import { BASISPAKKET_TO_INSURANCE } from './Basispakket';
import styles from './Summary.module.css';

interface SummaryProps {
  formData: FormData;
  insuranceTypes: InsuranceType[];
}

const formatAnswer = (key: string, value: any): string => {
  if (value === null || value === undefined || value === '') {
    return '-';
  }
  
  if (typeof value === 'boolean') {
    return value ? 'Ja' : 'Nee';
  }
  
  if (Array.isArray(value)) {
    if (value.length === 0) return '-';
    // Format array values
    return value.map(v => {
      if (typeof v === 'string') {
        // Convert snake_case to readable text
        return v.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      }
      return v;
    }).join(', ');
  }
  
  if (typeof value === 'string') {
    // Format common values
    const formatted = value
      .replace(/_/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
    
    // Special formatting for specific values
    if (key === 'eigen_risico') {
      if (value === 'geen') return 'Geen eigen risico of zo laag mogelijk';
      if (value === 'laag') return 'Met eigen risico zo laag mogelijk';
      if (value === 'hoog') return 'Met eigen risico zo hoog mogelijk';
    }
    
    if (key === 'dekking') {
      if (value === 'wa') return 'WA';
      if (value === 'wa_beperkt') return 'WA + beperkt casco';
      if (value === 'wa_volledig') return 'WA + Volledig casco';
      if (value === 'beperkt_casco') return 'Beperkt casco';
      if (value === 'volledig_casco') return 'Volledig Casco';
    }
    
    if (key === 'dekkingsgebied') {
      if (value === 'europa') return 'Europa';
      if (value === 'wereld') return 'Wereld';
    }
    
    if (key === 'annuleringsverzekering') {
      if (value === 'geen') return 'Geen';
      if (value === 'standaard') return 'Standaard';
      if (value === 'hoog') return 'Hoge verzekerde bedragen';
    }
    
    if (key === 'verzekerd_bedrag') {
      return `€${parseInt(value).toLocaleString('nl-NL')}`;
    }
    
    if (key === 'hoedanigheid') {
      if (value === 'huiseigenaar') return 'Huiseigenaar';
      if (value === 'huurder') return 'Huurder';
    }
    
    if (key === 'dekkingen') {
      if (value === 'verkeer') return 'Verkeersrechtsbijstand';
      if (value === 'verkeer_consument_wonen') return 'Verkeer, consument en wonen';
      if (value === 'verkeer_consument_wonen_werk') return 'Verkeer, consument en wonen, werk en inkomen';
    }
    
    if (key === 'type') {
      if (value === 'toercaravan') return 'Toercaravan';
      if (value === 'vouw_bagage') return 'Vouw en bagage';
    }
    
    if (key === 'geslacht') {
      if (value === 'man') return 'Man';
      if (value === 'vrouw') return 'Vrouw';
      if (value === 'anders') return 'Anders';
    }
    
    if (key === 'gezinssituatie') {
      if (value === 'alleenstaand') return 'Alleenstaand';
      if (value === 'alleenstaand_met_kinderen') return 'Alleenstaand met kinderen';
      if (value === 'stel') return 'Stel';
      if (value === 'gezin') return 'Gezin met kinderen';
    }
    
    return formatted;
  }
  
  if (typeof value === 'number') {
    // Format numbers with currency if needed
    if (key.includes('waarde') || key.includes('bedrag') || key === 'dagwaarde' || key === 'inventaris_waarde' || key === 'accessoires' || key === 'voortent_luifel') {
      return `€${value.toLocaleString('nl-NL')}`;
    }
    if (key.includes('lengte') || key === 'bouwlengte') {
      return `${value} cm`;
    }
    if (key === 'km_stand') {
      return `${value.toLocaleString('nl-NL')} km`;
    }
    return value.toString();
  }
  
  return String(value);
};

const getAnswerLabel = (insuranceId: string, key: string): string => {
  const labelMap: Record<string, Record<string, string>> = {
    woonverzekering: {
      glas_meeverzekeren: 'Glas meeverzekeren',
      zonnepanelen_meeverzekeren: 'Zonnepanelen meeverzekeren',
      eigen_risico: 'Eigen risico',
      eigen_risico_storm: 'Eigen risico storm afkopen',
    },
    inboedelverzekering: {
      mobiele_elektronica: 'Mobiele elektronica meeverzekeren',
      mobiele_electronicadekking: 'Mobiele electronicadekking',
      buitenshuisdekking: 'Buitenshuisdekking meeverzekeren',
      zakelijke_inventaris: 'Zakelijke inventaris meeverzekeren',
      lijfsieraden: 'Lijfsieraden boven de 6000 euro',
      bijzondere_bezittingen: 'Bijzondere bezittingen boven de 15000 euro meeverzekeren',
      eigen_risico: 'Eigen risico',
    },
    aansprakelijkheidsverzekering: {
      verzekerd_bedrag: 'Verzekerd bedrag',
      jagersrisico: 'Jagersrisico meeverzekeren',
      drones: 'Schade door drones meeverzekeren',
      verhuur: 'Verhuur 2e woning',
      eigen_risico: 'Eigen risico',
    },
    rechtsbijstandverzekering: {
      hoedanigheid: 'Hoedanigheid bewoner',
      dekkingen: 'Dekkingen',
      eigen_risico: 'Eigen risico',
    },
    reisverzekering: {
      dekkingsgebied: 'Dekkingsgebied',
      dekkingen: 'Dekkingen',
      eigen_risico: 'Eigen risico',
      annuleringsverzekering: 'Annuleringsverzekering',
      garantie_annulering: 'Garantie annulering',
      zaakwaarnemer: 'Zaakwaarnemer',
      huisdieren: 'Huisdieren',
      extra_annuleringsredenen: 'Extra annuleringsredenen',
    },
    autoverzekering: {
      kenteken: 'Kenteken',
      meldcode: 'Meldcode',
      aanschafdatum: 'Aanschafdatum',
      dagwaarde: 'Dagwaarde',
      schadevrije_jaren: 'Aantal schadevrije jaren',
      km_stand: 'KM stand',
      dekking: 'Dekking',
      eigen_risico: 'Eigen risico',
    },
    motorverzekering: {
      kenteken: 'Kenteken',
      meldcode: 'Meldcode',
      aanschafdatum: 'Aanschafdatum',
      dagwaarde: 'Dagwaarde',
      schadevrije_jaren: 'Aantal schadevrije jaren',
      km_stand: 'KM stand',
      dekking: 'Dekking',
      eigen_risico: 'Eigen risico',
    },
    caravanverzekering: {
      kenteken: 'Kenteken',
      bouwlengte: 'Totale Opbouwlengte',
      type: 'Type',
      stacaravan: 'Gebruik als stacaravan',
      aanschafdatum: 'Aanschafdatum',
      dagwaarde: 'Dagwaarde',
      inventaris_waarde: 'Inventaris waarde',
      accessoires: 'Accessoires',
      voortent_luifel: 'Voortent/luifel',
      mover: 'Mover',
      chassisnummer: 'Chassisnummer',
      dekking: 'Dekking',
      aanvullende_dekking: 'Aanvullende dekking',
      aanschafwaarderegeling: 'Aanschafwaarderegeling',
    },
  };
  
  return labelMap[insuranceId]?.[key] || key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

export default function Summary({ formData, insuranceTypes }: SummaryProps) {
  const selectedInsurances = insuranceTypes.filter(ins =>
    formData.selectedInsurances.includes(ins.id)
  );

  const formatDekkingen = (dekkingen: string[]): string => {
    const dekkingMap: Record<string, string> = {
      autohulp: 'Autohulp',
      bagage_zonder_geld: 'Bagage zonder geld',
      gevaarlijke_sporten: 'Gevaarlijke sporten',
      medische_kosten: 'Medische kosten',
      persoonlijke_hulp: 'Persoonlijke hulp',
      sportuitrusting: 'Sportuitrusting',
      vervangend_verblijf: 'Vervangend verblijf',
      wintersport: 'Wintersport',
      bagage_met_geld: 'Bagage met geld',
      calamiteiten_aansprakelijkheid: 'Calamiteiten / aansprakelijkheid',
      reisduur_verlengen: 'Reisduur verlengen',
      ongevallen: 'Ongevallen',
      rechtsbijstand: 'Rechtsbijstand',
      vervangend_vervoer: 'Vervangend vervoer',
      zakelijk_reis: 'Zakelijk reis',
      hagel_en_stormschade: 'Hagel- en stormschade',
      vervangend_vervoer_caravan: 'Vervangend vervoer',
      hagelbestendig_dak: 'Hagelbestendig dak',
    };
    
    return dekkingen.map(d => dekkingMap[d] || d.replace(/_/g, ' ')).join(', ');
  };

  return (
    <div className={styles.summary}>
      <h2 className={styles.title}>Overzicht</h2>
      <p className={styles.description}>
        Controleer alle ingevulde gegevens
      </p>

      <div className={styles.content}>
        <div className={styles.insurancesList}>
          <h3 className={styles.sectionTitle}>Geselecteerde verzekeringen</h3>
          {selectedInsurances.map(insurance => {
            const answers = formData.answers[insurance.id] || {};
            return (
              <div key={insurance.id} className={styles.insuranceItem}>
                <div className={styles.insuranceHeader}>
                  <h4 className={styles.insuranceName}>{insurance.name}</h4>
                </div>
                <div className={styles.insuranceAnswers}>
                  {Object.entries(answers).map(([key, value]) => {
                    if (key === 'dekkingen' || key === 'aanvullende_dekking') {
                      const dekkingen = Array.isArray(value) ? value : [];
                      if (dekkingen.length === 0) return null;
                      return (
                        <div key={key} className={styles.answerRow}>
                          <span className={styles.answerLabel}>{getAnswerLabel(insurance.id, key)}:</span>
                          <span className={styles.answerValue}>{formatDekkingen(dekkingen)}</span>
                        </div>
                      );
                    }
                    return (
                      <div key={key} className={styles.answerRow}>
                        <span className={styles.answerLabel}>{getAnswerLabel(insurance.id, key)}:</span>
                        <span className={styles.answerValue}>{formatAnswer(key, value)}</span>
                      </div>
                    );
                  })}
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
              <span className={styles.infoValue}>{formData.personalInfo.naam || '-'}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Postcode:</span>
              <span className={styles.infoValue}>{formData.personalInfo.postcode || '-'}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Huisnummer:</span>
              <span className={styles.infoValue}>{formData.personalInfo.huisnummer || '-'}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Geboortedatum:</span>
              <span className={styles.infoValue}>
                {formData.personalInfo.geboortedatum ? new Date(formData.personalInfo.geboortedatum).toLocaleDateString('nl-NL') : '-'}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Geslacht:</span>
              <span className={styles.infoValue}>{formatAnswer('geslacht', formData.personalInfo.geslacht)}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Gezinssituatie:</span>
              <span className={styles.infoValue}>{formatAnswer('gezinssituatie', formData.personalInfo.gezinssituatie)}</span>
            </div>
            {formData.personalInfo.geboortedatumPartner && (
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Geboortedatum partner:</span>
                <span className={styles.infoValue}>
                  {new Date(formData.personalInfo.geboortedatumPartner).toLocaleDateString('nl-NL')}
                </span>
              </div>
            )}
            {formData.personalInfo.kinderen && formData.personalInfo.kinderen.length > 0 && (
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Geboortedatum kinderen:</span>
                <span className={styles.infoValue}>
                  {formData.personalInfo.kinderen.map((kind, idx) => 
                    kind ? new Date(kind).toLocaleDateString('nl-NL') : '-'
                  ).join(', ')}
                </span>
              </div>
            )}
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>E-mail:</span>
              <span className={styles.infoValue}>{formData.personalInfo.email || '-'}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Telefoonnummer:</span>
              <span className={styles.infoValue}>{formData.personalInfo.telefoonnummer || '-'}</span>
            </div>
          </div>
        </div>

        {formData.uploadedPolis && (
          <div className={styles.polisSection}>
            <h3 className={styles.sectionTitle}>Geüploade polis</h3>
            <div className={styles.polisInfo}>
              <div className={styles.polisFile}>
                <span className={styles.polisFileName}>📄 {formData.uploadedPolis.fileName}</span>
                <a 
                  href={formData.uploadedPolis.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.polisLink}
                >
                  Bekijk PDF
                </a>
              </div>
              <iframe
                src={formData.uploadedPolis.url}
                className={styles.pdfViewer}
                title="Polis PDF"
              />
            </div>
          </div>
        )}

        {formData.algemeneVragen && (
          <div className={styles.algemeneVragenSection}>
            <h3 className={styles.sectionTitle}>Aanvullende vragen</h3>
            <div className={styles.algemeneVragenList}>
              <div className={styles.answerItem}>
                <span className={styles.answerLabel}>
                  Schade in laatste 5 jaar:
                </span>
                <span className={styles.answerValue}>
                  {formData.algemeneVragen.schade_laatste_5_jaar === true ? 'Ja' : 
                   formData.algemeneVragen.schade_laatste_5_jaar === false ? 'Nee' : '-'}
                </span>
              </div>
              {formData.algemeneVragen.schade_laatste_5_jaar === true && (
                <>
                  {formData.algemeneVragen.aantal_schades && (
                    <div className={styles.answerItem}>
                      <span className={styles.answerLabel}>Aantal schades:</span>
                      <span className={styles.answerValue}>
                        {formData.algemeneVragen.aantal_schades}
                      </span>
                    </div>
                  )}
                  {formData.algemeneVragen.laatste_schade_datum && (
                    <div className={styles.answerItem}>
                      <span className={styles.answerLabel}>Laatste schade datum:</span>
                      <span className={styles.answerValue}>
                        {new Date(formData.algemeneVragen.laatste_schade_datum).toLocaleDateString('nl-NL')}
                      </span>
                    </div>
                  )}
                </>
              )}
              <div className={styles.answerItem}>
                <span className={styles.answerLabel}>
                  Justitie in laatste 8 jaar:
                </span>
                <span className={styles.answerValue}>
                  {formData.algemeneVragen.justitie_laatste_8_jaar === true ? 'Ja' : 
                   formData.algemeneVragen.justitie_laatste_8_jaar === false ? 'Nee' : '-'}
                </span>
              </div>
              <div className={styles.answerItem}>
                <span className={styles.answerLabel}>
                  Verzekering geweigerd/opgezegd:
                </span>
                <span className={styles.answerValue}>
                  {formData.algemeneVragen.verzekering_geweigerd === true ? 'Ja' : 
                   formData.algemeneVragen.verzekering_geweigerd === false ? 'Nee' : '-'}
                </span>
              </div>
              <div className={styles.answerItem}>
                <span className={styles.answerLabel}>
                  Beslag gelegd:
                </span>
                <span className={styles.answerValue}>
                  {formData.algemeneVragen.beslag_gelegd === true ? 'Ja' : 
                   formData.algemeneVragen.beslag_gelegd === false ? 'Nee' : '-'}
                </span>
              </div>
              <div className={styles.answerItem}>
                <span className={styles.answerLabel}>
                  Failliet/schuldsanering:
                </span>
                <span className={styles.answerValue}>
                  {formData.algemeneVragen.failliet_schuldsanering === true ? 'Ja' : 
                   formData.algemeneVragen.failliet_schuldsanering === false ? 'Nee' : '-'}
                </span>
              </div>
            </div>
          </div>
        )}
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
