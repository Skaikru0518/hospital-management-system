export interface EditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  item: any;
  type: 'users' | 'doctors' | 'patients' | 'medications';
}
