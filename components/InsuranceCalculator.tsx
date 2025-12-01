'use client';

import { useState } from 'react';
import { FormData } from '@/types';
import { insuranceTypes, categories } from '@/data/insuranceTypes';
import StepIndicator from './StepIndicator';
import CategorySelection from './CategorySelection';
import InsuranceSelection from './InsuranceSelection';
import QuestionForm from './QuestionForm';
import PersonalInfoForm from './PersonalInfoForm';
import Summary from './Summary';
import styles from './InsuranceCalculator.module.css';

const STEPS = [
  { id: 'categories', title: 'Categorieën' },
  { id: 'insurances', title: 'Verzekeringen' },
  { id: 'questions', title: 'Details' },
  { id: 'personal', title: 'Persoonlijke gegevens' },
  { id: 'summary', title: 'Overzicht' },
];

export default function InsuranceCalculator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormData>({
    selectedInsurances: [],
    answers: {},
    personalInfo: {},
  });

  const handleCategorySelect = (categories: string[]) => {
    setSelectedCategories(categories);
    // Filter insurances based on selected categories
    const relevantInsurances = insuranceTypes.filter(ins =>
      categories.includes(ins.category)
    );
    setFormData(prev => ({
      ...prev,
      selectedInsurances: relevantInsurances.map(ins => ins.id),
    }));
  };

  const handleInsuranceToggle = (insuranceId: string) => {
    setFormData(prev => {
      const isSelected = prev.selectedInsurances.includes(insuranceId);
      return {
        ...prev,
        selectedInsurances: isSelected
          ? prev.selectedInsurances.filter(id => id !== insuranceId)
          : [...prev.selectedInsurances, insuranceId],
      };
    });
  };

  const handleAnswerChange = (insuranceId: string, questionId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [insuranceId]: {
          ...prev.answers[insuranceId],
          [questionId]: value,
        },
      },
    }));
  };

  const handlePersonalInfoChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return selectedCategories.length > 0;
      case 1:
        return formData.selectedInsurances.length > 0;
      case 2:
        // Check if all required questions are answered
        const selectedInsurances = insuranceTypes.filter(ins =>
          formData.selectedInsurances.includes(ins.id)
        );
        return selectedInsurances.every(insurance => {
          return insurance.questions
            .filter(q => q.required)
            .every(q => {
              const answer = formData.answers[insurance.id]?.[q.id];
              return answer !== undefined && answer !== '' && answer !== null;
            });
        });
      case 3:
        return (
          formData.personalInfo.naam &&
          formData.personalInfo.email &&
          formData.personalInfo.postcode &&
          formData.personalInfo.huisnummer
        );
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <CategorySelection
            categories={categories}
            selectedCategories={selectedCategories}
            onSelect={handleCategorySelect}
          />
        );
      case 1:
        return (
          <InsuranceSelection
            insurances={insuranceTypes.filter(ins =>
              selectedCategories.includes(ins.category)
            )}
            selectedInsurances={formData.selectedInsurances}
            onToggle={handleInsuranceToggle}
          />
        );
      case 2:
        return (
          <QuestionForm
            insurances={insuranceTypes.filter(ins =>
              formData.selectedInsurances.includes(ins.id)
            )}
            answers={formData.answers}
            onChange={handleAnswerChange}
          />
        );
      case 3:
        return (
          <PersonalInfoForm
            data={formData.personalInfo}
            onChange={handlePersonalInfoChange}
          />
        );
      case 4:
        return (
          <Summary
            formData={formData}
            insuranceTypes={insuranceTypes}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.calculator}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Verzekering Calculator</h1>
          <p className={styles.subtitle}>
            Stel stap voor stap uw verzekeringspakket samen
          </p>
        </div>

        <StepIndicator steps={STEPS} currentStep={currentStep} />

        <div className={styles.content}>
          {renderStep()}
        </div>

        <div className={styles.navigation}>
          {currentStep > 0 && (
            <button
              className={styles.buttonSecondary}
              onClick={handleBack}
            >
              ← Vorige
            </button>
          )}
          {currentStep < STEPS.length - 1 && (
            <button
              className={`${styles.buttonPrimary} ${!canProceed() ? styles.buttonDisabled : ''}`}
              onClick={handleNext}
              disabled={!canProceed()}
            >
              Volgende →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

