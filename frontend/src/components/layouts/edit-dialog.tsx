import type { EditDialogProps } from '@/interface/EditDialogProps';
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

function EditDialog({ isOpen, onClose, onSave, item, type }: EditDialogProps) {
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    if (!item) return;
    if (item.user && typeof item.user === 'object') {
      setForm({
        ...item,
        name: item.user.name ?? '',
        email: item.user.email ?? '',
      });
    } else {
      setForm(item);
    }
  }, [item]);

  const getFields = () => {
    switch (type) {
      case 'users':
        return [
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'role', label: 'Role' },
        ];
      case 'doctors':
        return [
          { key: 'room', label: 'Room' },
          { key: 'phone', label: 'Phone' },
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'field', label: 'Field' },
          { key: 'surgery', label: 'Surgery' },
        ];
      case 'patients':
        return [
          { key: 'insurance_no', label: 'Insurance Number' },
          { key: 'address', label: 'Address' },
          { key: 'birth', label: 'Date of birth' },
          { key: 'phone', label: 'Phone' },
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
        ];
      case 'medications':
        return [{ key: 'name', label: 'Name' }];
      default:
        return [];
    }
  };

  const handleChange = (key: string, value: string) => {
    setForm((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  if (!item) return null;
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Edit {type.slice(0, 1).toUpperCase() + type.slice(1)}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {getFields().map((field) => (
            <div key={field.key} className="space-y-2">
              <Label htmlFor={field.key}>{field.label}</Label>
              <Input
                id={field.key}
                value={form[field.key] ?? ''}
                onChange={(e) => handleChange(field.key, e.target.value)}
              />
            </div>
          ))}
          <DialogFooter>
            <Button variant={'destructive'} type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button className="bg-teal-600" type="submit">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditDialog;
