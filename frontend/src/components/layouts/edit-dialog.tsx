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
import { axiosInstance } from '@/lib/axios';
import { apiPaths } from '@/lib/api-paths';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { MedicalFields } from '@/enums/MedicalFields';
import { SurgicalField } from '@/enums/SurgicalFields';

function EditDialog({ isOpen, onClose, item, type }: EditDialogProps) {
  const [form, setForm] = useState<any>({});

  const getEnumOptions = (enumObj: Record<string, string>) =>
    Object.values(enumObj);

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
          {
            key: 'role',
            label: 'Role',
            options: ['admin', 'doctor', 'patient', 'receptionist'],
          },
        ];
      case 'doctors':
        return [
          { key: 'room', label: 'Room' },
          { key: 'phone', label: 'Phone' },
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          {
            key: 'field',
            label: 'Field',
            options: getEnumOptions(MedicalFields),
          },
          {
            key: 'surgery',
            label: 'Surgery',
            options: getEnumOptions(SurgicalField),
          },
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newData = { ...form, updated_at: new Date().toISOString() };
    let patchFn;

    switch (type) {
      case 'users':
        patchFn = () =>
          axiosInstance.patch(apiPaths.user.updateUser(form.id), newData);
        break;
      case 'doctors':
        patchFn = () =>
          axiosInstance.patch(apiPaths.doctor.updateDoctor(form.id), newData);
        break;
      case 'patients':
        patchFn = () =>
          axiosInstance.patch(apiPaths.patient.updatePatient(form.id), newData);
        break;
      case 'medications':
        patchFn = () =>
          axiosInstance.patch(
            apiPaths.medications.updateMedication(form.id),
            newData,
          );
        break;
      default:
        toast.error('Unknown type');
        return;
    }
    try {
      await patchFn();
      toast.success('Updated');
      onClose();
    } catch (error) {
      console.log(error);
      toast.error('Could not be updated');
    }
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
              {field.options ? (
                <Select
                  value={form[field.key] ?? ''}
                  onValueChange={(value) => handleChange(field.key, value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={`Select ${field.label}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options.map((option: string) => (
                      <SelectItem key={option} value={option}>
                        {option
                          .replace(/_/g, ' ')
                          .replace(/\b\w/g, (c) => c.toUpperCase())}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  id={field.key}
                  value={form[field.key] ?? ''}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  disabled={
                    type === 'patients' && ['name', 'email'].includes(field.key)
                  }
                />
              )}
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
