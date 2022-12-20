import {atom}  from 'jotai'
import { atomWithStorage } from 'jotai/utils';
import Hospitals from '../db/api';



// export const hospitalAtom = atomWithStorage('hospitals', Hospitals);
export const hospitalAtom = atom( Hospitals);


export const hosStrAtom = atom<string>('')
export const cityStrAtom = atom<string>('')

export const selectedHospitalAtom = atom('0')