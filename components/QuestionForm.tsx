'use client';

import { useState } from 'react';
import { InsuranceType } from '@/data/insuranceTypes';
import styles from './QuestionForm.module.css';
import { CheckIcon, ChevronDownIcon, ChevronRightIcon } from './Icons';
import Tooltip from './Tooltip';

interface QuestionFormProps {
  insurances: InsuranceType[];
  answers: Record<string, Record<string, any>>;
  onChange: (insuranceId: string, questionId: string, value: any) => void;
  onPolisUpload?: (file: File, url: string, fileName: string) => void;
  uploadedPolis?: {
    file: File;
    url: string;
    fileName: string;
  };
  algemeneVragen?: {
    schade_laatste_5_jaar?: boolean;
    aantal_schades?: number;
    laatste_schade_datum?: string;
    justitie_laatste_8_jaar?: boolean;
    verzekering_geweigerd?: boolean;
    beslag_gelegd?: boolean;
    failliet_schuldsanering?: boolean;
  };
  onAlgemeneVraagChange?: (field: string, value: any) => void;
}

export default function QuestionForm({
  insurances,
  answers,
  onChange,
  onPolisUpload,
  uploadedPolis,
  algemeneVragen,
  onAlgemeneVraagChange,
}: QuestionFormProps) {
  const [expandedInsurance, setExpandedInsurance] = useState<string>(
    insurances[0]?.id || ''
  );

  const handleAnswerChange = (
    insuranceId: string,
    questionId: string,
    value: any
  ) => {
    onChange(insuranceId, questionId, value);
  };

  const isInsuranceComplete = (insurance: InsuranceType) => {
    if (insurance.id === 'woonverzekering') {
      // For woonverzekering, only eigen_risico is required
      return answers[insurance.id]?.['eigen_risico'] !== undefined && 
             answers[insurance.id]?.['eigen_risico'] !== '';
    }
    if (insurance.id === 'inboedelverzekering') {
      // For inboedelverzekering, only eigen_risico is required
      return answers[insurance.id]?.['eigen_risico'] !== undefined && 
             answers[insurance.id]?.['eigen_risico'] !== '';
    }
    if (insurance.id === 'aansprakelijkheidsverzekering') {
      // For aansprakelijkheidsverzekering, verzekerd_bedrag and eigen_risico are required
      return answers[insurance.id]?.['verzekerd_bedrag'] !== undefined && 
             answers[insurance.id]?.['verzekerd_bedrag'] !== '' &&
             answers[insurance.id]?.['eigen_risico'] !== undefined && 
             answers[insurance.id]?.['eigen_risico'] !== '';
    }
    if (insurance.id === 'rechtsbijstandverzekering') {
      // For rechtsbijstandverzekering, hoedanigheid, dekkingen and eigen_risico are required
      return answers[insurance.id]?.['hoedanigheid'] !== undefined && 
             answers[insurance.id]?.['hoedanigheid'] !== '' &&
             answers[insurance.id]?.['dekkingen'] !== undefined && 
             answers[insurance.id]?.['dekkingen'] !== '' &&
             answers[insurance.id]?.['eigen_risico'] !== undefined && 
             answers[insurance.id]?.['eigen_risico'] !== '';
    }
    if (insurance.id === 'reisverzekering') {
      // For reisverzekering, dekkingsgebied, eigen_risico and annuleringsverzekering are required
      return answers[insurance.id]?.['dekkingsgebied'] !== undefined && 
             answers[insurance.id]?.['dekkingsgebied'] !== '' &&
             answers[insurance.id]?.['eigen_risico'] !== undefined && 
             answers[insurance.id]?.['eigen_risico'] !== '' &&
             answers[insurance.id]?.['annuleringsverzekering'] !== undefined && 
             answers[insurance.id]?.['annuleringsverzekering'] !== '';
    }
    if (insurance.id === 'autoverzekering') {
      // For autoverzekering, all fields are required
      return answers[insurance.id]?.['kenteken'] !== undefined && 
             answers[insurance.id]?.['kenteken'] !== '' &&
             answers[insurance.id]?.['meldcode'] !== undefined && 
             answers[insurance.id]?.['meldcode'] !== '' &&
             answers[insurance.id]?.['aanschafdatum'] !== undefined && 
             answers[insurance.id]?.['aanschafdatum'] !== '' &&
             answers[insurance.id]?.['dagwaarde'] !== undefined && 
             answers[insurance.id]?.['dagwaarde'] !== '' &&
             answers[insurance.id]?.['schadevrije_jaren'] !== undefined && 
             answers[insurance.id]?.['schadevrije_jaren'] !== '' &&
             answers[insurance.id]?.['km_stand'] !== undefined && 
             answers[insurance.id]?.['km_stand'] !== '' &&
             answers[insurance.id]?.['dekking'] !== undefined && 
             answers[insurance.id]?.['dekking'] !== '' &&
             answers[insurance.id]?.['eigen_risico'] !== undefined && 
             answers[insurance.id]?.['eigen_risico'] !== '';
    }
    if (insurance.id === 'motorverzekering') {
      // For motorverzekering, all fields are required (same as autoverzekering)
      return answers[insurance.id]?.['kenteken'] !== undefined && 
             answers[insurance.id]?.['kenteken'] !== '' &&
             answers[insurance.id]?.['meldcode'] !== undefined && 
             answers[insurance.id]?.['meldcode'] !== '' &&
             answers[insurance.id]?.['aanschafdatum'] !== undefined && 
             answers[insurance.id]?.['aanschafdatum'] !== '' &&
             answers[insurance.id]?.['dagwaarde'] !== undefined && 
             answers[insurance.id]?.['dagwaarde'] !== '' &&
             answers[insurance.id]?.['schadevrije_jaren'] !== undefined && 
             answers[insurance.id]?.['schadevrije_jaren'] !== '' &&
             answers[insurance.id]?.['km_stand'] !== undefined && 
             answers[insurance.id]?.['km_stand'] !== '' &&
             answers[insurance.id]?.['dekking'] !== undefined && 
             answers[insurance.id]?.['dekking'] !== '' &&
             answers[insurance.id]?.['eigen_risico'] !== undefined && 
             answers[insurance.id]?.['eigen_risico'] !== '';
    }
    if (insurance.id === 'caravanverzekering') {
      // For caravanverzekering, kenteken, bouwlengte, type, aanschafdatum, dagwaarde and dekking are required
      return answers[insurance.id]?.['kenteken'] !== undefined && 
             answers[insurance.id]?.['kenteken'] !== '' &&
             answers[insurance.id]?.['bouwlengte'] !== undefined && 
             answers[insurance.id]?.['bouwlengte'] !== '' &&
             answers[insurance.id]?.['type'] !== undefined && 
             answers[insurance.id]?.['type'] !== '' &&
             answers[insurance.id]?.['aanschafdatum'] !== undefined && 
             answers[insurance.id]?.['aanschafdatum'] !== '' &&
             answers[insurance.id]?.['dagwaarde'] !== undefined && 
             answers[insurance.id]?.['dagwaarde'] !== '' &&
             answers[insurance.id]?.['dekking'] !== undefined && 
             answers[insurance.id]?.['dekking'] !== '';
    }
    return insurance.questions
      .filter(q => q.required)
      .every(q => {
        const answer = answers[insurance.id]?.[q.id];
        return answer !== undefined && answer !== '' && answer !== null;
      });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf' && onPolisUpload) {
      const url = URL.createObjectURL(file);
      onPolisUpload(file, url, file.name);
    }
  };

  return (
    <div className={styles.questionForm}>
      <h2 className={styles.title}>Details</h2>
      <p className={styles.description}>
        Beantwoord de vragen voor uw geselecteerde verzekeringen
      </p>

      <div className={styles.insurances}>
        {insurances.map(insurance => (
          <div key={insurance.id} className={styles.insuranceSection}>
            <button
              className={`${styles.insuranceHeader} ${
                expandedInsurance === insurance.id ? styles.expanded : ''
              } ${isInsuranceComplete(insurance) ? styles.complete : ''}`}
              onClick={() =>
                setExpandedInsurance(
                  expandedInsurance === insurance.id ? '' : insurance.id
                )
              }
            >
              <div className={styles.headerLeft}>
                <span className={styles.insuranceName}>{insurance.name}</span>
                {isInsuranceComplete(insurance) && (
                  <span className={styles.completeBadge}>
                    <CheckIcon size={14} />
                    Compleet
                  </span>
                )}
              </div>
              <span className={styles.expandIcon}>
                {expandedInsurance === insurance.id ? (
                  <ChevronDownIcon size={20} />
                ) : (
                  <ChevronRightIcon size={20} />
                )}
              </span>
            </button>
            {expandedInsurance === insurance.id && (
              <div className={styles.questions}>
                {insurance.id === 'woonverzekering' ? (
                  <>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Glas meeverzekeren
                      </label>
                      <div className={styles.toggleSwitch}>
                          <input
                            type="checkbox"
                            id={`${insurance.id}_glas`}
                            className={styles.toggleInput}
                            checked={answers[insurance.id]?.['glas_meeverzekeren'] === true}
                            onChange={e =>
                              handleAnswerChange(insurance.id, 'glas_meeverzekeren', e.target.checked)
                            }
                          />
                          <label htmlFor={`${insurance.id}_glas`} className={styles.toggleLabel}>
                            <span className={styles.toggleSlider}></span>
                          </label>
                        </div>
                    </div>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Zonnepanelen meeverzekeren
                      </label>
                      <div className={styles.toggleSwitch}>
                          <input
                            type="checkbox"
                            id={`${insurance.id}_zonnepanelen`}
                            className={styles.toggleInput}
                            checked={answers[insurance.id]?.['zonnepanelen_meeverzekeren'] === true}
                            onChange={e =>
                              handleAnswerChange(insurance.id, 'zonnepanelen_meeverzekeren', e.target.checked)
                            }
                          />
                          <label htmlFor={`${insurance.id}_zonnepanelen`} className={styles.toggleLabel}>
                            <span className={styles.toggleSlider}></span>
                          </label>
                        </div>
                    </div>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Eigen risico <span className={styles.required}>*</span>
                      </label>
                      <select
                        className={styles.select}
                        value={answers[insurance.id]?.['eigen_risico'] || ''}
                        onChange={e =>
                          handleAnswerChange(insurance.id, 'eigen_risico', e.target.value)
                        }
                      >
                        <option value="">Selecteer...</option>
                        <option value="geen">Geen eigen risico of zo laag mogelijk</option>
                        <option value="laag">Met eigen risico zo laag mogelijk</option>
                        <option value="hoog">Met eigen risico zo hoog mogelijk</option>
                      </select>
                    </div>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Eigen risico storm afkopen
                      </label>
                      <div className={styles.toggleSwitch}>
                          <input
                            type="checkbox"
                            id={`${insurance.id}_storm`}
                            className={styles.toggleInput}
                            checked={answers[insurance.id]?.['eigen_risico_storm'] === true}
                            onChange={e =>
                              handleAnswerChange(insurance.id, 'eigen_risico_storm', e.target.checked)
                            }
                          />
                          <label htmlFor={`${insurance.id}_storm`} className={styles.toggleLabel}>
                            <span className={styles.toggleSlider}></span>
                          </label>
                        </div>
                    </div>
                  </>
                ) : insurance.id === 'inboedelverzekering' ? (
                  <>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Mobiele elektronica meeverzekeren
                      </label>
                      <div className={styles.toggleSwitch}>
                          <input
                            type="checkbox"
                            id={`${insurance.id}_mobiele_elektronica`}
                            className={styles.toggleInput}
                            checked={answers[insurance.id]?.['mobiele_elektronica'] === true}
                            onChange={e =>
                              handleAnswerChange(insurance.id, 'mobiele_elektronica', e.target.checked)
                            }
                          />
                          <label htmlFor={`${insurance.id}_mobiele_elektronica`} className={styles.toggleLabel}>
                            <span className={styles.toggleSlider}></span>
                          </label>
                        </div>
                    </div>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Mobiele electronicadekking
                      </label>
                      <div className={styles.toggleSwitch}>
                          <input
                            type="checkbox"
                            id={`${insurance.id}_mobiele_electronicadekking`}
                            className={styles.toggleInput}
                            checked={answers[insurance.id]?.['mobiele_electronicadekking'] === true}
                            onChange={e =>
                              handleAnswerChange(insurance.id, 'mobiele_electronicadekking', e.target.checked)
                            }
                          />
                          <label htmlFor={`${insurance.id}_mobiele_electronicadekking`} className={styles.toggleLabel}>
                            <span className={styles.toggleSlider}></span>
                          </label>
                        </div>
                    </div>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Buitenshuisdekking meeverzekeren
                      </label>
                      <div className={styles.toggleSwitch}>
                          <input
                            type="checkbox"
                            id={`${insurance.id}_buitenshuisdekking`}
                            className={styles.toggleInput}
                            checked={answers[insurance.id]?.['buitenshuisdekking'] === true}
                            onChange={e =>
                              handleAnswerChange(insurance.id, 'buitenshuisdekking', e.target.checked)
                            }
                          />
                          <label htmlFor={`${insurance.id}_buitenshuisdekking`} className={styles.toggleLabel}>
                            <span className={styles.toggleSlider}></span>
                          </label>
                        </div>
                    </div>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Zakelijke inventaris meeverzekeren
                      </label>
                      <div className={styles.toggleSwitch}>
                          <input
                            type="checkbox"
                            id={`${insurance.id}_zakelijke_inventaris`}
                            className={styles.toggleInput}
                            checked={answers[insurance.id]?.['zakelijke_inventaris'] === true}
                            onChange={e =>
                              handleAnswerChange(insurance.id, 'zakelijke_inventaris', e.target.checked)
                            }
                          />
                          <label htmlFor={`${insurance.id}_zakelijke_inventaris`} className={styles.toggleLabel}>
                            <span className={styles.toggleSlider}></span>
                          </label>
                        </div>
                    </div>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Lijfsieraden boven de 6000 euro
                      </label>
                      <div className={styles.toggleSwitch}>
                          <input
                            type="checkbox"
                            id={`${insurance.id}_lijfsieraden`}
                            className={styles.toggleInput}
                            checked={answers[insurance.id]?.['lijfsieraden'] === true}
                            onChange={e =>
                              handleAnswerChange(insurance.id, 'lijfsieraden', e.target.checked)
                            }
                          />
                          <label htmlFor={`${insurance.id}_lijfsieraden`} className={styles.toggleLabel}>
                            <span className={styles.toggleSlider}></span>
                          </label>
                        </div>
                    </div>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Bijzondere bezittingen boven de 15000 euro meeverzekeren
                      </label>
                      <div className={styles.toggleSwitch}>
                          <input
                            type="checkbox"
                            id={`${insurance.id}_bijzondere_bezittingen`}
                            className={styles.toggleInput}
                            checked={answers[insurance.id]?.['bijzondere_bezittingen'] === true}
                            onChange={e =>
                              handleAnswerChange(insurance.id, 'bijzondere_bezittingen', e.target.checked)
                            }
                          />
                          <label htmlFor={`${insurance.id}_bijzondere_bezittingen`} className={styles.toggleLabel}>
                            <span className={styles.toggleSlider}></span>
                          </label>
                        </div>
                    </div>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Eigen risico <span className={styles.required}>*</span>
                      </label>
                      <select
                        className={styles.select}
                        value={answers[insurance.id]?.['eigen_risico'] || ''}
                        onChange={e =>
                          handleAnswerChange(insurance.id, 'eigen_risico', e.target.value)
                        }
                      >
                        <option value="">Selecteer...</option>
                        <option value="geen">Geen eigen risico of zo laag mogelijk</option>
                        <option value="laag">Met eigen risico zo laag mogelijk</option>
                        <option value="hoog">Met eigen risico zo hoog mogelijk</option>
                      </select>
                    </div>
                  </>
                ) : insurance.id === 'aansprakelijkheidsverzekering' ? (
                  <>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Verzekerd bedrag <span className={styles.required}>*</span>
                      </label>
                      <select
                        className={styles.select}
                        value={answers[insurance.id]?.['verzekerd_bedrag'] || ''}
                        onChange={e =>
                          handleAnswerChange(insurance.id, 'verzekerd_bedrag', e.target.value)
                        }
                      >
                        <option value="">Selecteer...</option>
                        <option value="1000000">€1.000.000</option>
                        <option value="2500000">€2.500.000</option>
                      </select>
                    </div>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Jagersrisico meeverzekeren
                      </label>
                      <div className={styles.toggleSwitch}>
                          <input
                            type="checkbox"
                            id={`${insurance.id}_jagersrisico`}
                            className={styles.toggleInput}
                            checked={answers[insurance.id]?.['jagersrisico'] === true}
                            onChange={e =>
                              handleAnswerChange(insurance.id, 'jagersrisico', e.target.checked)
                            }
                          />
                          <label htmlFor={`${insurance.id}_jagersrisico`} className={styles.toggleLabel}>
                            <span className={styles.toggleSlider}></span>
                          </label>
                        </div>
                    </div>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Schade door drones meeverzekeren
                      </label>
                      <div className={styles.toggleSwitch}>
                          <input
                            type="checkbox"
                            id={`${insurance.id}_drones`}
                            className={styles.toggleInput}
                            checked={answers[insurance.id]?.['drones'] === true}
                            onChange={e =>
                              handleAnswerChange(insurance.id, 'drones', e.target.checked)
                            }
                          />
                          <label htmlFor={`${insurance.id}_drones`} className={styles.toggleLabel}>
                            <span className={styles.toggleSlider}></span>
                          </label>
                        </div>
                    </div>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Verhuur 2e woning
                      </label>
                      <div className={styles.toggleSwitch}>
                          <input
                            type="checkbox"
                            id={`${insurance.id}_verhuur`}
                            className={styles.toggleInput}
                            checked={answers[insurance.id]?.['verhuur'] === true}
                            onChange={e =>
                              handleAnswerChange(insurance.id, 'verhuur', e.target.checked)
                            }
                          />
                          <label htmlFor={`${insurance.id}_verhuur`} className={styles.toggleLabel}>
                            <span className={styles.toggleSlider}></span>
                          </label>
                        </div>
                    </div>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Eigen risico <span className={styles.required}>*</span>
                      </label>
                      <select
                        className={styles.select}
                        value={answers[insurance.id]?.['eigen_risico'] || ''}
                        onChange={e =>
                          handleAnswerChange(insurance.id, 'eigen_risico', e.target.value)
                        }
                      >
                        <option value="">Selecteer...</option>
                        <option value="geen">Geen eigen risico of zo laag mogelijk</option>
                        <option value="laag">Met eigen risico zo laag mogelijk</option>
                        <option value="hoog">Met eigen risico zo hoog mogelijk</option>
                      </select>
                    </div>
                  </>
                ) : insurance.id === 'rechtsbijstandverzekering' ? (
                  <>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Hoedanigheid bewoner <span className={styles.required}>*</span>
                      </label>
                      <select
                        className={styles.select}
                        value={answers[insurance.id]?.['hoedanigheid'] || ''}
                        onChange={e =>
                          handleAnswerChange(insurance.id, 'hoedanigheid', e.target.value)
                        }
                      >
                        <option value="">Selecteer...</option>
                        <option value="huiseigenaar">Huiseigenaar</option>
                        <option value="huurder">Huurder</option>
                      </select>
                    </div>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Dekkingen <span className={styles.required}>*</span>
                      </label>
                      <select
                        className={styles.select}
                        value={answers[insurance.id]?.['dekkingen'] || ''}
                        onChange={e =>
                          handleAnswerChange(insurance.id, 'dekkingen', e.target.value)
                        }
                      >
                        <option value="">Selecteer...</option>
                        <option value="verkeer">Verkeersrechtsbijstand</option>
                        <option value="verkeer_consument_wonen">Verkeer, consument en wonen</option>
                        <option value="verkeer_consument_wonen_werk">Verkeer, consument en wonen, werk en inkomen</option>
                      </select>
                    </div>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Eigen risico <span className={styles.required}>*</span>
                      </label>
                      <select
                        className={styles.select}
                        value={answers[insurance.id]?.['eigen_risico'] || ''}
                        onChange={e =>
                          handleAnswerChange(insurance.id, 'eigen_risico', e.target.value)
                        }
                      >
                        <option value="">Selecteer...</option>
                        <option value="geen">Geen eigen risico of zo laag mogelijk</option>
                        <option value="laag">Met eigen risico zo laag mogelijk</option>
                        <option value="hoog">Met eigen risico zo hoog mogelijk</option>
                      </select>
                    </div>
                  </>
                ) : insurance.id === 'reisverzekering' ? (
                  <>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Dekkingsgebied <span className={styles.required}>*</span>
                      </label>
                      <select
                        className={styles.select}
                        value={answers[insurance.id]?.['dekkingsgebied'] || ''}
                        onChange={e =>
                          handleAnswerChange(insurance.id, 'dekkingsgebied', e.target.value)
                        }
                      >
                        <option value="">Selecteer...</option>
                        <option value="europa">Europa</option>
                        <option value="wereld">Wereld</option>
                      </select>
                    </div>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Dekkingen
                      </label>
                      <div className={styles.checkboxGroup}>
                        {[
                          'Autohulp',
                          'Bagage zonder geld',
                          'Gevaarlijke sporten',
                          'Medische kosten',
                          'Persoonlijke hulp',
                          'Sportuitrusting',
                          'Vervangend verblijf',
                          'Wintersport',
                          'Bagage met geld',
                          'Calamiteiten / aansprakelijkheid',
                          'Reisduur verlengen',
                          'Ongevallen',
                          'Rechtsbijstand',
                          'Vervangend vervoer',
                          'Zakelijk reis'
                        ].map(dekking => {
                          const dekkingKey = dekking.toLowerCase().replace(/\s+\/\s+/g, '_').replace(/\s+/g, '_');
                          const selectedDekkingen = answers[insurance.id]?.['dekkingen'] || [];
                          const isChecked = Array.isArray(selectedDekkingen) && selectedDekkingen.includes(dekkingKey);
                          
                          return (
                            <label key={dekking} className={styles.checkboxLabel}>
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={e => {
                                  const currentDekkingen = answers[insurance.id]?.['dekkingen'] || [];
                                  let newDekkingen;
                                  if (e.target.checked) {
                                    newDekkingen = [...(Array.isArray(currentDekkingen) ? currentDekkingen : []), dekkingKey];
                                  } else {
                                    newDekkingen = Array.isArray(currentDekkingen) 
                                      ? currentDekkingen.filter(d => d !== dekkingKey)
                                      : [];
                                  }
                                  handleAnswerChange(insurance.id, 'dekkingen', newDekkingen);
                                }}
                                className={styles.checkbox}
                              />
                              <span>{dekking}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Eigen risico <span className={styles.required}>*</span>
                      </label>
                      <select
                        className={styles.select}
                        value={answers[insurance.id]?.['eigen_risico'] || ''}
                        onChange={e =>
                          handleAnswerChange(insurance.id, 'eigen_risico', e.target.value)
                        }
                      >
                        <option value="">Selecteer...</option>
                        <option value="geen">Geen eigen risico of zo laag mogelijk</option>
                        <option value="laag">Met eigen risico zo laag mogelijk</option>
                        <option value="hoog">Met eigen risico zo hoog mogelijk</option>
                      </select>
                    </div>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Annuleringsverzekering <span className={styles.required}>*</span>
                      </label>
                      <select
                        className={styles.select}
                        value={answers[insurance.id]?.['annuleringsverzekering'] || ''}
                        onChange={e =>
                          handleAnswerChange(insurance.id, 'annuleringsverzekering', e.target.value)
                        }
                      >
                        <option value="">Selecteer...</option>
                        <option value="geen">Geen</option>
                        <option value="standaard">Standaard</option>
                        <option value="hoog">Hoge verzekerde bedragen</option>
                      </select>
                    </div>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Garantie annulering
                      </label>
                      <div className={styles.toggleSwitch}>
                          <input
                            type="checkbox"
                            id={`${insurance.id}_garantie_annulering`}
                            className={styles.toggleInput}
                            checked={answers[insurance.id]?.['garantie_annulering'] === true}
                            onChange={e =>
                              handleAnswerChange(insurance.id, 'garantie_annulering', e.target.checked)
                            }
                          />
                          <label htmlFor={`${insurance.id}_garantie_annulering`} className={styles.toggleLabel}>
                            <span className={styles.toggleSlider}></span>
                          </label>
                        </div>
                    </div>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Zaakwaarnemer
                      </label>
                      <div className={styles.toggleSwitch}>
                          <input
                            type="checkbox"
                            id={`${insurance.id}_zaakwaarnemer`}
                            className={styles.toggleInput}
                            checked={answers[insurance.id]?.['zaakwaarnemer'] === true}
                            onChange={e =>
                              handleAnswerChange(insurance.id, 'zaakwaarnemer', e.target.checked)
                            }
                          />
                          <label htmlFor={`${insurance.id}_zaakwaarnemer`} className={styles.toggleLabel}>
                            <span className={styles.toggleSlider}></span>
                          </label>
                        </div>
                    </div>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Huisdieren
                      </label>
                      <div className={styles.toggleSwitch}>
                          <input
                            type="checkbox"
                            id={`${insurance.id}_huisdieren`}
                            className={styles.toggleInput}
                            checked={answers[insurance.id]?.['huisdieren'] === true}
                            onChange={e =>
                              handleAnswerChange(insurance.id, 'huisdieren', e.target.checked)
                            }
                          />
                          <label htmlFor={`${insurance.id}_huisdieren`} className={styles.toggleLabel}>
                            <span className={styles.toggleSlider}></span>
                          </label>
                        </div>
                    </div>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Extra annuleringsredenen
                      </label>
                      <div className={styles.toggleSwitch}>
                          <input
                            type="checkbox"
                            id={`${insurance.id}_extra_annuleringsredenen`}
                            className={styles.toggleInput}
                            checked={answers[insurance.id]?.['extra_annuleringsredenen'] === true}
                            onChange={e =>
                              handleAnswerChange(insurance.id, 'extra_annuleringsredenen', e.target.checked)
                            }
                          />
                          <label htmlFor={`${insurance.id}_extra_annuleringsredenen`} className={styles.toggleLabel}>
                            <span className={styles.toggleSlider}></span>
                          </label>
                        </div>
                    </div>
                  </>
                ) : insurance.id === 'autoverzekering' ? (
                  <>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Kenteken <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="text"
                        className={styles.input}
                        placeholder="Bijv. 12-ABC-3"
                        value={answers[insurance.id]?.['kenteken'] || ''}
                        onChange={e =>
                          handleAnswerChange(insurance.id, 'kenteken', e.target.value)
                        }
                      />
                    </div>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Meldcode <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="text"
                        className={styles.input}
                        placeholder="Bijv. 123456"
                        value={answers[insurance.id]?.['meldcode'] || ''}
                        onChange={e =>
                          handleAnswerChange(insurance.id, 'meldcode', e.target.value)
                        }
                      />
                    </div>
                    <div className={styles.formRow}>
                      <div className={styles.question}>
                        <label className={styles.label}>
                          Aanschafdatum <span className={styles.required}>*</span>
                        </label>
                        <input
                          type="date"
                          className={styles.input}
                          value={answers[insurance.id]?.['aanschafdatum'] || ''}
                          onChange={e =>
                            handleAnswerChange(insurance.id, 'aanschafdatum', e.target.value)
                          }
                        />
                      </div>
                      <div className={styles.question}>
                        <label className={styles.label}>
                          Dagwaarde (€) <span className={styles.required}>*</span>
                        </label>
                        <input
                          type="number"
                          className={styles.input}
                          placeholder="Bijv. 15000"
                          value={answers[insurance.id]?.['dagwaarde'] || ''}
                          onChange={e =>
                            handleAnswerChange(insurance.id, 'dagwaarde', e.target.value ? Number(e.target.value) : '')
                          }
                        />
                      </div>
                    </div>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Aantal schadevrije jaren <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="number"
                        className={styles.input}
                        placeholder="Bijv. 5"
                        value={answers[insurance.id]?.['schadevrije_jaren'] || ''}
                        onChange={e =>
                          handleAnswerChange(insurance.id, 'schadevrije_jaren', e.target.value ? Number(e.target.value) : '')
                        }
                      />
                    </div>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        KM stand <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="number"
                        className={styles.input}
                        placeholder="Bijv. 50000"
                        value={answers[insurance.id]?.['km_stand'] || ''}
                        onChange={e =>
                          handleAnswerChange(insurance.id, 'km_stand', e.target.value ? Number(e.target.value) : '')
                        }
                      />
                    </div>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Dekking <span className={styles.required}>*</span>
                      </label>
                      <select
                        className={styles.select}
                        value={answers[insurance.id]?.['dekking'] || ''}
                        onChange={e =>
                          handleAnswerChange(insurance.id, 'dekking', e.target.value)
                        }
                      >
                        <option value="">Selecteer...</option>
                        <option value="wa">WA</option>
                        <option value="wa_beperkt">WA + beperkt casco</option>
                        <option value="wa_volledig">WA + Volledig casco</option>
                      </select>
                    </div>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Eigen risico <span className={styles.required}>*</span>
                      </label>
                      <select
                        className={styles.select}
                        value={answers[insurance.id]?.['eigen_risico'] || ''}
                        onChange={e =>
                          handleAnswerChange(insurance.id, 'eigen_risico', e.target.value)
                        }
                      >
                        <option value="">Selecteer...</option>
                        <option value="geen">Geen eigen risico of zo laag mogelijk</option>
                        <option value="laag">Met eigen risico zo laag mogelijk</option>
                        <option value="hoog">Met eigen risico zo hoog mogelijk</option>
                      </select>
                    </div>
                  </>
                ) : insurance.id === 'motorverzekering' ? (
                  <>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Kenteken <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="text"
                        className={styles.input}
                        placeholder="Bijv. 12-ABC-3"
                        value={answers[insurance.id]?.['kenteken'] || ''}
                        onChange={e =>
                          handleAnswerChange(insurance.id, 'kenteken', e.target.value)
                        }
                      />
                    </div>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Meldcode <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="text"
                        className={styles.input}
                        placeholder="Bijv. 123456"
                        value={answers[insurance.id]?.['meldcode'] || ''}
                        onChange={e =>
                          handleAnswerChange(insurance.id, 'meldcode', e.target.value)
                        }
                      />
                    </div>
                    <div className={styles.formRow}>
                      <div className={styles.question}>
                        <label className={styles.label}>
                          Aanschafdatum <span className={styles.required}>*</span>
                        </label>
                        <input
                          type="date"
                          className={styles.input}
                          value={answers[insurance.id]?.['aanschafdatum'] || ''}
                          onChange={e =>
                            handleAnswerChange(insurance.id, 'aanschafdatum', e.target.value)
                          }
                        />
                      </div>
                      <div className={styles.question}>
                        <label className={styles.label}>
                          Dagwaarde (€) <span className={styles.required}>*</span>
                        </label>
                        <input
                          type="number"
                          className={styles.input}
                          placeholder="Bijv. 15000"
                          value={answers[insurance.id]?.['dagwaarde'] || ''}
                          onChange={e =>
                            handleAnswerChange(insurance.id, 'dagwaarde', e.target.value ? Number(e.target.value) : '')
                          }
                        />
                      </div>
                    </div>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Aantal schadevrije jaren <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="number"
                        className={styles.input}
                        placeholder="Bijv. 5"
                        value={answers[insurance.id]?.['schadevrije_jaren'] || ''}
                        onChange={e =>
                          handleAnswerChange(insurance.id, 'schadevrije_jaren', e.target.value ? Number(e.target.value) : '')
                        }
                      />
                    </div>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        KM stand <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="number"
                        className={styles.input}
                        placeholder="Bijv. 50000"
                        value={answers[insurance.id]?.['km_stand'] || ''}
                        onChange={e =>
                          handleAnswerChange(insurance.id, 'km_stand', e.target.value ? Number(e.target.value) : '')
                        }
                      />
                    </div>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Dekking <span className={styles.required}>*</span>
                      </label>
                      <select
                        className={styles.select}
                        value={answers[insurance.id]?.['dekking'] || ''}
                        onChange={e =>
                          handleAnswerChange(insurance.id, 'dekking', e.target.value)
                        }
                      >
                        <option value="">Selecteer...</option>
                        <option value="wa">WA</option>
                        <option value="wa_beperkt">WA + beperkt casco</option>
                        <option value="wa_volledig">WA + Volledig casco</option>
                      </select>
                    </div>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Eigen risico <span className={styles.required}>*</span>
                      </label>
                      <select
                        className={styles.select}
                        value={answers[insurance.id]?.['eigen_risico'] || ''}
                        onChange={e =>
                          handleAnswerChange(insurance.id, 'eigen_risico', e.target.value)
                        }
                      >
                        <option value="">Selecteer...</option>
                        <option value="geen">Geen eigen risico of zo laag mogelijk</option>
                        <option value="laag">Met eigen risico zo laag mogelijk</option>
                        <option value="hoog">Met eigen risico zo hoog mogelijk</option>
                      </select>
                    </div>
                  </>
                ) : insurance.id === 'caravanverzekering' ? (
                  <>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Kenteken <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="text"
                        className={styles.input}
                        placeholder="Bijv. 12-ABC-3"
                        value={answers[insurance.id]?.['kenteken'] || ''}
                        onChange={e =>
                          handleAnswerChange(insurance.id, 'kenteken', e.target.value)
                        }
                      />
                    </div>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Totale Opbouwlengte (in cm) <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="number"
                        className={styles.input}
                        placeholder="Bijv. 750"
                        value={answers[insurance.id]?.['bouwlengte'] || ''}
                        onChange={e =>
                          handleAnswerChange(insurance.id, 'bouwlengte', e.target.value ? Number(e.target.value) : '')
                        }
                      />
                    </div>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Type <span className={styles.required}>*</span>
                      </label>
                      <select
                        className={styles.select}
                        value={answers[insurance.id]?.['type'] || ''}
                        onChange={e =>
                          handleAnswerChange(insurance.id, 'type', e.target.value)
                        }
                      >
                        <option value="">Selecteer...</option>
                        <option value="toercaravan">Toercaravan</option>
                        <option value="vouw_bagage">Vouw en bagage</option>
                      </select>
                    </div>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Gebruik als stacaravan
                      </label>
                      <div className={styles.toggleSwitch}>
                          <input
                            type="checkbox"
                            id={`${insurance.id}_stacaravan`}
                            className={styles.toggleInput}
                            checked={answers[insurance.id]?.['stacaravan'] === true}
                            onChange={e =>
                              handleAnswerChange(insurance.id, 'stacaravan', e.target.checked)
                            }
                          />
                          <label htmlFor={`${insurance.id}_stacaravan`} className={styles.toggleLabel}>
                            <span className={styles.toggleSlider}></span>
                          </label>
                        </div>
                    </div>
                    <div className={styles.formRow}>
                      <div className={styles.question}>
                        <label className={styles.label}>
                          Aanschafdatum <span className={styles.required}>*</span>
                        </label>
                        <input
                          type="date"
                          className={styles.input}
                          value={answers[insurance.id]?.['aanschafdatum'] || ''}
                          onChange={e =>
                            handleAnswerChange(insurance.id, 'aanschafdatum', e.target.value)
                          }
                        />
                      </div>
                      <div className={styles.question}>
                        <label className={styles.label}>
                          Dagwaarde (€) <span className={styles.required}>*</span>
                        </label>
                        <input
                          type="number"
                          className={styles.input}
                          placeholder="Bijv. 15000"
                          value={answers[insurance.id]?.['dagwaarde'] || ''}
                          onChange={e =>
                            handleAnswerChange(insurance.id, 'dagwaarde', e.target.value ? Number(e.target.value) : '')
                          }
                        />
                      </div>
                    </div>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Inventaris waarde (€)
                      </label>
                      <input
                        type="number"
                        className={styles.input}
                        placeholder="Bijv. 5000"
                        value={answers[insurance.id]?.['inventaris_waarde'] || ''}
                        onChange={e =>
                          handleAnswerChange(insurance.id, 'inventaris_waarde', e.target.value ? Number(e.target.value) : '')
                        }
                      />
                    </div>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Accessoires (€)
                      </label>
                      <input
                        type="number"
                        className={styles.input}
                        placeholder="Bijv. 2000"
                        value={answers[insurance.id]?.['accessoires'] || ''}
                        onChange={e =>
                          handleAnswerChange(insurance.id, 'accessoires', e.target.value ? Number(e.target.value) : '')
                        }
                      />
                    </div>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Voortent/luifel (€)
                      </label>
                      <input
                        type="number"
                        className={styles.input}
                        placeholder="Bijv. 1500"
                        value={answers[insurance.id]?.['voortent_luifel'] || ''}
                        onChange={e =>
                          handleAnswerChange(insurance.id, 'voortent_luifel', e.target.value ? Number(e.target.value) : '')
                        }
                      />
                    </div>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Mover
                      </label>
                      <div className={styles.toggleSwitch}>
                          <input
                            type="checkbox"
                            id={`${insurance.id}_mover`}
                            className={styles.toggleInput}
                            checked={answers[insurance.id]?.['mover'] === true}
                            onChange={e =>
                              handleAnswerChange(insurance.id, 'mover', e.target.checked)
                            }
                          />
                          <label htmlFor={`${insurance.id}_mover`} className={styles.toggleLabel}>
                            <span className={styles.toggleSlider}></span>
                          </label>
                        </div>
                    </div>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Chassisnummer
                      </label>
                      <input
                        type="text"
                        className={styles.input}
                        placeholder="Bijv. ABC123456789"
                        value={answers[insurance.id]?.['chassisnummer'] || ''}
                        onChange={e =>
                          handleAnswerChange(insurance.id, 'chassisnummer', e.target.value)
                        }
                      />
                    </div>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Dekking <span className={styles.required}>*</span>
                      </label>
                      <select
                        className={styles.select}
                        value={answers[insurance.id]?.['dekking'] || ''}
                        onChange={e =>
                          handleAnswerChange(insurance.id, 'dekking', e.target.value)
                        }
                      >
                        <option value="">Selecteer...</option>
                        <option value="beperkt_casco">Beperkt casco</option>
                        <option value="volledig_casco">Volledig Casco</option>
                      </select>
                    </div>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Aanvullende dekking
                      </label>
                      <div className={styles.checkboxGroup}>
                        {[
                          'Hagel- en stormschade',
                          'Vervangend vervoer',
                          'Hagelbestendig dak'
                        ].map(dekking => {
                          const dekkingKey = dekking.toLowerCase().replace(/\s+/g, '_').replace(/-/g, '_');
                          const selectedDekkingen = answers[insurance.id]?.['aanvullende_dekking'] || [];
                          const isChecked = Array.isArray(selectedDekkingen) && selectedDekkingen.includes(dekkingKey);
                          
                          return (
                            <label key={dekking} className={styles.checkboxLabel}>
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={e => {
                                  const currentDekkingen = answers[insurance.id]?.['aanvullende_dekking'] || [];
                                  let newDekkingen;
                                  if (e.target.checked) {
                                    newDekkingen = [...(Array.isArray(currentDekkingen) ? currentDekkingen : []), dekkingKey];
                                  } else {
                                    newDekkingen = Array.isArray(currentDekkingen) 
                                      ? currentDekkingen.filter(d => d !== dekkingKey)
                                      : [];
                                  }
                                  handleAnswerChange(insurance.id, 'aanvullende_dekking', newDekkingen);
                                }}
                                className={styles.checkbox}
                              />
                              <span>{dekking}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                    <div className={styles.question}>
                      <label className={styles.label}>
                        Aanschafwaarderegeling
                      </label>
                      <div className={styles.toggleSwitch}>
                          <input
                            type="checkbox"
                            id={`${insurance.id}_aanschafwaarderegeling`}
                            className={styles.toggleInput}
                            checked={answers[insurance.id]?.['aanschafwaarderegeling'] === true}
                            onChange={e =>
                              handleAnswerChange(insurance.id, 'aanschafwaarderegeling', e.target.checked)
                            }
                          />
                          <label htmlFor={`${insurance.id}_aanschafwaarderegeling`} className={styles.toggleLabel}>
                            <span className={styles.toggleSlider}></span>
                          </label>
                        </div>
                    </div>
                  </>
                ) : (
                  insurance.questions.map(question => (
                    <div key={question.id} className={styles.question}>
                      <label className={styles.label}>
                        {question.label}
                        {question.required && (
                          <span className={styles.required}> *</span>
                        )}
                        {question.tooltip && (
                          <Tooltip content={question.tooltip} position="top" />
                        )}
                      </label>
                      {question.type === 'text' && (
                        <input
                          type="text"
                          className={styles.input}
                          placeholder={question.placeholder}
                          value={answers[insurance.id]?.[question.id] || ''}
                          onChange={e =>
                            handleAnswerChange(insurance.id, question.id, e.target.value)
                          }
                        />
                      )}
                      {question.type === 'number' && (
                        <input
                          type="number"
                          className={styles.input}
                          placeholder={question.placeholder}
                          value={answers[insurance.id]?.[question.id] || ''}
                          onChange={e =>
                            handleAnswerChange(
                              insurance.id,
                              question.id,
                              e.target.value ? Number(e.target.value) : ''
                            )
                          }
                        />
                      )}
                      {question.type === 'select' && (
                        <select
                          className={styles.select}
                          value={answers[insurance.id]?.[question.id] || ''}
                          onChange={e =>
                            handleAnswerChange(insurance.id, question.id, e.target.value)
                          }
                        >
                          <option value="">Selecteer...</option>
                          {question.options?.map(option => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      )}
                      {question.type === 'boolean' && (
                        <div className={styles.booleanGroup}>
                          <button
                            type="button"
                            className={`${styles.booleanButton} ${
                              answers[insurance.id]?.[question.id] === true
                                ? styles.active
                                : ''
                            }`}
                            onClick={() =>
                              handleAnswerChange(insurance.id, question.id, true)
                            }
                          >
                            Ja
                          </button>
                          <button
                            type="button"
                            className={`${styles.booleanButton} ${
                              answers[insurance.id]?.[question.id] === false
                                ? styles.active
                                : ''
                            }`}
                            onClick={() =>
                              handleAnswerChange(insurance.id, question.id, false)
                            }
                          >
                            Nee
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.polisUpload}>
        <label className={styles.uploadLabel}>
          <span className={styles.uploadText}>Upload bestaande polis (PDF)</span>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileUpload}
            className={styles.fileInput}
          />
          <span className={styles.uploadButton}>Bestand kiezen</span>
        </label>
        {uploadedPolis && (
          <div className={styles.uploadedFile}>
            <span className={styles.fileName}>✓ {uploadedPolis.fileName}</span>
            <a 
              href={uploadedPolis.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.viewLink}
            >
              Bekijken
            </a>
          </div>
        )}
      </div>

      <div className={styles.algemeneVragen}>
        <h3 className={styles.algemeneVragenTitle}>Aanvullende vragen</h3>
        
        <div className={styles.question}>
          <label className={styles.label}>
            Heeft u, of een andere belanghebbende (bijv. de regelmatige bestuurder) bij deze verzekering, de laatste 5 jaar schade geleden/toegebracht verband houdende met de aangevraagde verzekeringen?
            <span className={styles.required}> *</span>
          </label>
          <div className={styles.booleanGroup}>
            <button
              type="button"
              className={`${styles.booleanButton} ${
                algemeneVragen?.schade_laatste_5_jaar === true ? styles.active : ''
              }`}
              onClick={() => onAlgemeneVraagChange?.('schade_laatste_5_jaar', true)}
            >
              Ja
            </button>
            <button
              type="button"
              className={`${styles.booleanButton} ${
                algemeneVragen?.schade_laatste_5_jaar === false ? styles.active : ''
              }`}
              onClick={() => onAlgemeneVraagChange?.('schade_laatste_5_jaar', false)}
            >
              Nee
            </button>
          </div>
          {algemeneVragen?.schade_laatste_5_jaar === true && (
            <div className={styles.subQuestions}>
              <div className={styles.question}>
                <label className={styles.label}>
                  Aantal schades:
                </label>
                <input
                  type="number"
                  className={styles.input}
                  placeholder="Bijv. 2"
                  value={algemeneVragen?.aantal_schades || ''}
                  onChange={e =>
                    onAlgemeneVraagChange?.('aantal_schades', e.target.value ? Number(e.target.value) : '')
                  }
                />
              </div>
              <div className={styles.question}>
                <label className={styles.label}>
                  Wanneer was de laatste schade:
                </label>
                <input
                  type="date"
                  className={styles.input}
                  value={algemeneVragen?.laatste_schade_datum || ''}
                  onChange={e =>
                    onAlgemeneVraagChange?.('laatste_schade_datum', e.target.value)
                  }
                />
              </div>
            </div>
          )}
        </div>

        <div className={styles.question}>
          <label className={styles.label}>
            Bent u of een andere belanghebbende bij deze verzekering, in de laatste 8 jaar als verdachte of ter uitvoering van een opgelegde (straf)maatregel, in aanraking geweest met politie of justitie in verband met:
            <ul className={styles.bulletList}>
              <li>wederrechtelijk verkregen of te verkrijgen voordeel, zoals diefstal, verduistering, bedrog, oplichting, valsheid in geschrifte of poging(en) daartoe;</li>
              <li>wederrechtelijke benadeling van anderen, zoals vernieling of beschadiging, mishandeling, afpersing en afdreiging of enig misdrijf gericht tegen de persoonlijke vrijheid of tegen het leven of poging(en) daartoe;</li>
              <li>overtreding van de Wet wapens en munitie, de opiumwet of de wet economische delicten?</li>
            </ul>
            <span className={styles.required}> *</span>
          </label>
          <div className={styles.booleanGroup}>
            <button
              type="button"
              className={`${styles.booleanButton} ${
                algemeneVragen?.justitie_laatste_8_jaar === true ? styles.active : ''
              }`}
              onClick={() => onAlgemeneVraagChange?.('justitie_laatste_8_jaar', true)}
            >
              Ja
            </button>
            <button
              type="button"
              className={`${styles.booleanButton} ${
                algemeneVragen?.justitie_laatste_8_jaar === false ? styles.active : ''
              }`}
              onClick={() => onAlgemeneVraagChange?.('justitie_laatste_8_jaar', false)}
            >
              Nee
            </button>
          </div>
        </div>

        <div className={styles.question}>
          <label className={styles.label}>
            Heeft enige maatschappij u ooit een verzekering geweigerd, opgezegd of bijzondere voorwaarden aan u gesteld?
            <span className={styles.required}> *</span>
          </label>
          <div className={styles.booleanGroup}>
            <button
              type="button"
              className={`${styles.booleanButton} ${
                algemeneVragen?.verzekering_geweigerd === true ? styles.active : ''
              }`}
              onClick={() => onAlgemeneVraagChange?.('verzekering_geweigerd', true)}
            >
              Ja
            </button>
            <button
              type="button"
              className={`${styles.booleanButton} ${
                algemeneVragen?.verzekering_geweigerd === false ? styles.active : ''
              }`}
              onClick={() => onAlgemeneVraagChange?.('verzekering_geweigerd', false)}
            >
              Nee
            </button>
          </div>
        </div>

        <div className={styles.question}>
          <label className={styles.label}>
            Heeft de deurwaarder op dit moment beslag gelegd op inkomsten of bezittingen van u of één van de personen die u wilt meeverzekeren, zoals (mede)eigenaar, kentekenhouder en regelmatige bestuurder van het voertuig, gezinsleden, huisgenoten of uw partner?
            <span className={styles.required}> *</span>
          </label>
          <div className={styles.booleanGroup}>
            <button
              type="button"
              className={`${styles.booleanButton} ${
                algemeneVragen?.beslag_gelegd === true ? styles.active : ''
              }`}
              onClick={() => onAlgemeneVraagChange?.('beslag_gelegd', true)}
            >
              Ja
            </button>
            <button
              type="button"
              className={`${styles.booleanButton} ${
                algemeneVragen?.beslag_gelegd === false ? styles.active : ''
              }`}
              onClick={() => onAlgemeneVraagChange?.('beslag_gelegd', false)}
            >
              Nee
            </button>
          </div>
        </div>

        <div className={styles.question}>
          <label className={styles.label}>
            Bent u, of één van de personen die u wilt meeverzekeren, zoals (mede)eigenaar, kentekenhouder en regelmatige bestuurder van het voertuig gezinsleden, huisgenoten of uw partner, in de afgelopen 5 jaar failliet verklaard, in een schuldsanering betrokken of is de rechter akkoord gegaan met een surseance (uitstel) van betaling?
            <span className={styles.required}> *</span>
          </label>
          <div className={styles.booleanGroup}>
            <button
              type="button"
              className={`${styles.booleanButton} ${
                algemeneVragen?.failliet_schuldsanering === true ? styles.active : ''
              }`}
              onClick={() => onAlgemeneVraagChange?.('failliet_schuldsanering', true)}
            >
              Ja
            </button>
            <button
              type="button"
              className={`${styles.booleanButton} ${
                algemeneVragen?.failliet_schuldsanering === false ? styles.active : ''
              }`}
              onClick={() => onAlgemeneVraagChange?.('failliet_schuldsanering', false)}
            >
              Nee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

