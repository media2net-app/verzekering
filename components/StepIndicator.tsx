'use client';

import styles from './StepIndicator.module.css';
import { CheckIcon } from './Icons';

interface Step {
  id: string;
  title: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className={styles.stepIndicator}>
      {steps.map((step, index) => (
        <div
          key={step.id}
          className={`${styles.step} ${index <= currentStep ? styles.active : ''} ${index === currentStep ? styles.current : ''}`}
        >
          <div className={styles.stepNumber}>
            {index < currentStep ? (
              <CheckIcon size={20} />
            ) : (
              index + 1
            )}
          </div>
          <div className={styles.stepTitle}>{step.title}</div>
          {index < steps.length - 1 && (
            <div className={`${styles.stepLine} ${index < currentStep ? styles.completed : ''}`} />
          )}
        </div>
      ))}
    </div>
  );
}

