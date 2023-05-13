import {create} from 'zustand';
import {persist} from 'zustand/middleware';

export interface IValueStorage {
  value: number,
  setValue: (value: number) => void
}

export const useValueStorage = create(
  persist<IValueStorage>(
    (set) => ({
    // initial state
      value: 0,
      // methods for manipulating state
      setValue: (value: number) => {
        set((state) => ({
          value: state.value = value
        }));
      }
    }),
    {
      name: 'SELECT_VALUE'
    }
  )
);
