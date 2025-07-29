import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/auth-context';
import { Edit, Loader, Trash2 } from 'lucide-react';
import EditDialog from '@/components/layouts/edit-dialog';
import type { AdminDataTableProps } from '@/interface/AdminDataTableProps';
import { axiosInstance } from '@/lib/axios';
import { apiPaths } from '@/lib/api-paths';

type DataType = 'users' | 'doctors' | 'patients' | 'medications';

function AdminDataTalbe({ className }: AdminDataTableProps) {
  const [selectedType, setSelectedType] = useState<DataType>('users');
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);

  const { getUserCount, getDoctorCount } = useAuth();

  const fetchData = async () => {
    setLoading(true);
    try {
      switch (selectedType) {
        case 'users':
          const users = await axiosInstance.get(apiPaths.user.getUsers);
          setData(users.data); // placeholder
          break;
        case 'doctors':
          const doctors = await axiosInstance.get(apiPaths.doctor.getDoctor);
          setData(doctors.data);
          break;
        case 'patients':
          const patients = await axiosInstance.get(apiPaths.patient.getPatient);
          setData(patients.data);
          break;
        case 'medications':
          // const medications = await getMedications(); // majd implementálod
          setData([]);
          break;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedType]);

  const handleEdit = (item: any) => {
    setEditItem(item);
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete?')) {
      console.log('Delete:', id);
      fetchData();
    }
  };

  const handleSave = async (updatedItem: any) => {
    console.log('Save', updatedItem);
    setIsEditDialogOpen(false);
    fetchData();
  };

  const getColumns = () => {
    switch (selectedType) {
      case 'users':
        return ['id', 'name', 'email', 'role', 'Actions'];
      case 'doctors':
        return [
          'id',
          'room',
          'phone',
          'name',
          'email',
          'field',
          'surgery',
          'Actions',
        ];
      case 'patients':
        return [
          'id',
          'insurance_no',
          'address',
          'Birth',
          'Phone',
          'user_id',
          'Actions',
        ];
      case 'medications':
        return ['id', 'name', 'Actions'];
      default:
        return [];
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Data Management</CardTitle>
          <Select
            value={selectedType}
            onValueChange={(value: DataType) => setSelectedType(value)}
          >
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent defaultValue={'users'}>
              <SelectItem value="users">All users</SelectItem>
              <SelectItem value="doctors">Doctors</SelectItem>
              <SelectItem value="patients">Patients</SelectItem>
              <SelectItem value="medications">Medications</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center gap-2 animate-pulse">
            <Loader className="text-brand-teal" />
            Loading...
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                {getColumns().map((column) => (
                  <TableHead key={column}>{column}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={getColumns().length}
                    className="text-center py-4"
                  >
                    No data available
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item) => (
                  <TableRow key={item.id}>
                    {getColumns().map((col) =>
                      col === 'Actions' ? (
                        <TableCell key="actions">
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(item)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      ) : (
                        <TableCell key={col}>
                          {selectedType === 'doctors' && col === 'name'
                            ? item.user?.name || '-'
                            : selectedType === 'doctors' && col === 'email'
                              ? item.user?.email || '-'
                              : (item[col] ?? '-')}
                        </TableCell>
                      ),
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}

        <EditDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          onSave={handleSave}
          item={editItem}
          type={selectedType}
        />
      </CardContent>
    </Card>
  );
}

export default AdminDataTalbe;
