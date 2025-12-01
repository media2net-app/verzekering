'use client';

import { Car, Home, User, Check, ChevronDown, ChevronRight, Info } from 'lucide-react';

interface IconProps {
  size?: number;
  className?: string;
}

export function CarIcon({ size = 24, className }: IconProps) {
  return <Car size={size} className={className} />;
}

export function HomeIcon({ size = 24, className }: IconProps) {
  return <Home size={size} className={className} />;
}

export function UserIcon({ size = 24, className }: IconProps) {
  return <User size={size} className={className} />;
}

export function CheckIcon({ size = 24, className }: IconProps) {
  return <Check size={size} className={className} />;
}

export function ChevronDownIcon({ size = 24, className }: IconProps) {
  return <ChevronDown size={size} className={className} />;
}

export function ChevronRightIcon({ size = 24, className }: IconProps) {
  return <ChevronRight size={size} className={className} />;
}

export function InfoIcon({ size = 24, className }: IconProps) {
  return <Info size={size} className={className} />;
}

