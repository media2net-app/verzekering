'use client';

import { useState } from 'react';
import { FormData } from '@/types';
import { insuranceTypes } from '@/data/insuranceTypes';
import StepIndicator from './StepIndicator';
import Basispakket, { BASISPAKKET_TO_INSURANCE } from './Basispakket';
import QuestionForm from './QuestionForm';
import PersonalInfoForm from './PersonalInfoForm';
import Summary from './Summary';
import styles from './InsuranceCalculator.module.css';

const STEPS = [
  { id: 'basispakket', title: 'Basispakket' },
  { id: 'personal', title: 'Persoonlijke gegevens' },
  { id: 'questions', title: 'Details' },
  { id: 'summary', title: 'Overzicht' },
];

export default function InsuranceCalculator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedBasispakketOptions, setSelectedBasispakketOptions] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormData>({
    selectedInsurances: [],
    answers: {},
    personalInfo: {},
  });

  const handleBasispakketToggle = (option: string) => {
    const newSelected = selectedBasispakketOptions.includes(option)
      ? selectedBasispakketOptions.filter(id => id !== option)
      : [...selectedBasispakketOptions, option];
    
    setSelectedBasispakketOptions(newSelected);
    
    // Map basispakket options to insurance IDs
    const insuranceIds = newSelected
      .map(opt => BASISPAKKET_TO_INSURANCE[opt])
      .filter(Boolean);
    
    setFormData(prev => ({
      ...prev,
      selectedInsurances: insuranceIds,
    }));
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

  const handlePersonalInfoChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  const handlePolisUpload = (file: File, url: string, fileName: string) => {
    setFormData(prev => ({
      ...prev,
      uploadedPolis: {
        file,
        url,
        fileName,
      },
    }));
  };

  const handleAlgemeneVraagChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      algemeneVragen: {
        ...prev.algemeneVragen,
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
        return selectedBasispakketOptions.length > 0;
      case 1:
        const hasPartner = formData.personalInfo.gezinssituatie === 'stel' || 
                          formData.personalInfo.gezinssituatie === 'gezin';
        const hasChildren = formData.personalInfo.gezinssituatie === 'gezin' || 
                           formData.personalInfo.gezinssituatie === 'stel' || 
                           formData.personalInfo.gezinssituatie === 'alleenstaand_met_kinderen';
        const hasPartnerDate = !hasPartner || formData.personalInfo.geboortedatumPartner;
        const hasChildrenDates = !hasChildren || 
                                 (formData.personalInfo.kinderen && 
                                  formData.personalInfo.kinderen.length > 0 &&
                                  formData.personalInfo.kinderen.every(k => k && k !== ''));
        
        return (
          formData.personalInfo.naam &&
          formData.personalInfo.postcode &&
          formData.personalInfo.huisnummer &&
          formData.personalInfo.geboortedatum &&
          formData.personalInfo.geslacht &&
          formData.personalInfo.gezinssituatie &&
          formData.personalInfo.email &&
          formData.personalInfo.telefoonnummer &&
          hasPartnerDate &&
          hasChildrenDates
        );
      case 2:
        // Check if all required questions are answered
        const selectedInsurances = insuranceTypes.filter(ins =>
          formData.selectedInsurances.includes(ins.id)
        );
        return selectedInsurances.every(insurance => {
          if (insurance.id === 'woonverzekering') {
            // For woonverzekering, only eigen_risico is required
            return formData.answers[insurance.id]?.['eigen_risico'] !== undefined && 
                   formData.answers[insurance.id]?.['eigen_risico'] !== '';
          }
          if (insurance.id === 'inboedelverzekering') {
            // For inboedelverzekering, only eigen_risico is required
            return formData.answers[insurance.id]?.['eigen_risico'] !== undefined && 
                   formData.answers[insurance.id]?.['eigen_risico'] !== '';
          }
          if (insurance.id === 'aansprakelijkheidsverzekering') {
            // For aansprakelijkheidsverzekering, verzekerd_bedrag and eigen_risico are required
            return formData.answers[insurance.id]?.['verzekerd_bedrag'] !== undefined && 
                   formData.answers[insurance.id]?.['verzekerd_bedrag'] !== '' &&
                   formData.answers[insurance.id]?.['eigen_risico'] !== undefined && 
                   formData.answers[insurance.id]?.['eigen_risico'] !== '';
          }
          if (insurance.id === 'rechtsbijstandverzekering') {
            // For rechtsbijstandverzekering, hoedanigheid, dekkingen and eigen_risico are required
            return formData.answers[insurance.id]?.['hoedanigheid'] !== undefined && 
                   formData.answers[insurance.id]?.['hoedanigheid'] !== '' &&
                   formData.answers[insurance.id]?.['dekkingen'] !== undefined && 
                   formData.answers[insurance.id]?.['dekkingen'] !== '' &&
                   formData.answers[insurance.id]?.['eigen_risico'] !== undefined && 
                   formData.answers[insurance.id]?.['eigen_risico'] !== '';
          }
          if (insurance.id === 'reisverzekering') {
            // For reisverzekering, dekkingsgebied, eigen_risico and annuleringsverzekering are required
            return formData.answers[insurance.id]?.['dekkingsgebied'] !== undefined && 
                   formData.answers[insurance.id]?.['dekkingsgebied'] !== '' &&
                   formData.answers[insurance.id]?.['eigen_risico'] !== undefined && 
                   formData.answers[insurance.id]?.['eigen_risico'] !== '' &&
                   formData.answers[insurance.id]?.['annuleringsverzekering'] !== undefined && 
                   formData.answers[insurance.id]?.['annuleringsverzekering'] !== '';
          }
          if (insurance.id === 'autoverzekering') {
            // For autoverzekering, all fields are required
            return formData.answers[insurance.id]?.['kenteken'] !== undefined && 
                   formData.answers[insurance.id]?.['kenteken'] !== '' &&
                   formData.answers[insurance.id]?.['meldcode'] !== undefined && 
                   formData.answers[insurance.id]?.['meldcode'] !== '' &&
                   formData.answers[insurance.id]?.['aanschafdatum'] !== undefined && 
                   formData.answers[insurance.id]?.['aanschafdatum'] !== '' &&
                   formData.answers[insurance.id]?.['dagwaarde'] !== undefined && 
                   formData.answers[insurance.id]?.['dagwaarde'] !== '' &&
                   formData.answers[insurance.id]?.['schadevrije_jaren'] !== undefined && 
                   formData.answers[insurance.id]?.['schadevrije_jaren'] !== '' &&
                   formData.answers[insurance.id]?.['km_stand'] !== undefined && 
                   formData.answers[insurance.id]?.['km_stand'] !== '' &&
                   formData.answers[insurance.id]?.['dekking'] !== undefined && 
                   formData.answers[insurance.id]?.['dekking'] !== '' &&
                   formData.answers[insurance.id]?.['eigen_risico'] !== undefined && 
                   formData.answers[insurance.id]?.['eigen_risico'] !== '';
          }
          if (insurance.id === 'motorverzekering') {
            // For motorverzekering, all fields are required (same as autoverzekering)
            return formData.answers[insurance.id]?.['kenteken'] !== undefined && 
                   formData.answers[insurance.id]?.['kenteken'] !== '' &&
                   formData.answers[insurance.id]?.['meldcode'] !== undefined && 
                   formData.answers[insurance.id]?.['meldcode'] !== '' &&
                   formData.answers[insurance.id]?.['aanschafdatum'] !== undefined && 
                   formData.answers[insurance.id]?.['aanschafdatum'] !== '' &&
                   formData.answers[insurance.id]?.['dagwaarde'] !== undefined && 
                   formData.answers[insurance.id]?.['dagwaarde'] !== '' &&
                   formData.answers[insurance.id]?.['schadevrije_jaren'] !== undefined && 
                   formData.answers[insurance.id]?.['schadevrije_jaren'] !== '' &&
                   formData.answers[insurance.id]?.['km_stand'] !== undefined && 
                   formData.answers[insurance.id]?.['km_stand'] !== '' &&
                   formData.answers[insurance.id]?.['dekking'] !== undefined && 
                   formData.answers[insurance.id]?.['dekking'] !== '' &&
                   formData.answers[insurance.id]?.['eigen_risico'] !== undefined && 
                   formData.answers[insurance.id]?.['eigen_risico'] !== '';
          }
          if (insurance.id === 'caravanverzekering') {
            // For caravanverzekering, kenteken, bouwlengte, type, aanschafdatum, dagwaarde and dekking are required
            return formData.answers[insurance.id]?.['kenteken'] !== undefined && 
                   formData.answers[insurance.id]?.['kenteken'] !== '' &&
                   formData.answers[insurance.id]?.['bouwlengte'] !== undefined && 
                   formData.answers[insurance.id]?.['bouwlengte'] !== '' &&
                   formData.answers[insurance.id]?.['type'] !== undefined && 
                   formData.answers[insurance.id]?.['type'] !== '' &&
                   formData.answers[insurance.id]?.['aanschafdatum'] !== undefined && 
                   formData.answers[insurance.id]?.['aanschafdatum'] !== '' &&
                   formData.answers[insurance.id]?.['dagwaarde'] !== undefined && 
                   formData.answers[insurance.id]?.['dagwaarde'] !== '' &&
                   formData.answers[insurance.id]?.['dekking'] !== undefined && 
                   formData.answers[insurance.id]?.['dekking'] !== '';
          }
          return insurance.questions
            .filter(q => q.required)
            .every(q => {
              const answer = formData.answers[insurance.id]?.[q.id];
              return answer !== undefined && answer !== '' && answer !== null;
            });
        });
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <Basispakket
            selectedOptions={selectedBasispakketOptions}
            onToggle={handleBasispakketToggle}
          />
        );
      case 1:
        return (
          <PersonalInfoForm
            data={formData.personalInfo}
            onChange={handlePersonalInfoChange}
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
            onPolisUpload={handlePolisUpload}
            uploadedPolis={formData.uploadedPolis}
            algemeneVragen={formData.algemeneVragen}
            onAlgemeneVraagChange={handleAlgemeneVraagChange}
          />
        );
      case 3:
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

