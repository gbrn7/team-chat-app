import { Server } from '@prisma/client';
import {create } from 'zustand'
//this code like react redux state management state
export type ModalType = "createServer" | "invite" | "editServer" | "members" |  "createChannel" | "leaveServer";

interface ModalData {
  server?: Server
}

//this bellow code modal store statement
interface ModalStore {
  type: ModalType | null,
  data: ModalData,
  isOpen: boolean,
  onOpen: (type: ModalType, data?:ModalData) => void
  onClose: () => void
}

//this bellow code is initial value for modal
export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({isOpen: true, type, data}),
  onClose: () => set({type: null, isOpen: false})
}))