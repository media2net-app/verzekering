'use client';

import { useState } from 'react';
import InsuranceCalculator from '@/components/InsuranceCalculator';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <InsuranceCalculator />
    </main>
  );
}

