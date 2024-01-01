import {create } from 'zustand'
//this code like react redux state management state
export type ModalType = "createServer" 

interface ModalStore {
  type: ModalType | null,
  isOpen: boolean,
  onOpen: (type: ModalType) => void
  onClose: () => void
}

//this bellow code is initial value for modal
export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  onOpen: (type) => set({isOpen: true, type}),
  onClose: () => set({type: null, isOpen: false})
}))