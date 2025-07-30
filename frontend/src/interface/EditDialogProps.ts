export interface EditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  item: any;
  type: 'users' | 'doctors' | 'patients' | 'medications';
}
