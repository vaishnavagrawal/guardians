import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import HospitalsObj from '../db/api';
import { defaultOnboardingData, OnboardingData } from '../schemas/form';

export const hospitalAtom = atom(HospitalsObj);

export const hosStrAtom = atom<string>('');
export const cityStrAtom = atom<string>('');

export const selectedHospitalAtom = atom(0);

export const profileAtom = atomWithStorage<OnboardingData>(
  'profileAtom',
  defaultOnboardingData
);
