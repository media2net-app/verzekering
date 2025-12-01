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
}

export default function QuestionForm({
  insurances,
  answers,
  onChange,
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
    return insurance.questions
      .filter(q => q.required)
      .every(q => {
        const answer = answers[insurance.id]?.[q.id];
        return answer !== undefined && answer !== '' && answer !== null;
      });
  };

  return (
    <div className={styles.questionForm}>
      <h2 className={styles.title}>Vul de details in</h2>
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
                {insurance.questions.map(question => (
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
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

