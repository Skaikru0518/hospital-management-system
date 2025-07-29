import { Header } from '@/components/layouts/header';
import AdminDataTalbe from '@/components/tables/admin-data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/auth-context';

import { Calendar, FileText, Stethoscope, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState<number>(0);
  const [doctorCount, setDoctorCount] = useState<number>(0);
  const { getUserCount, getDoctorCount } = useAuth();

  useEffect(() => {
    getUserCount().then(setUserCount);
    getDoctorCount().then(setDoctorCount);
  }, []);

  return (
    <>
      <Header />
      <div className="space-y-6 container mx-auto">
        <div className="flex flex-col space-y-2 p-4">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage users, medications and system settings
          </p>
        </div>
        <Button>Test</Button>

        {/* INFO CARDS */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userCount}</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Doctors</CardTitle>
              <Stethoscope className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{doctorCount}</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Appointments
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">573</div>
              <p className="text-xs text-muted-foreground">
                +18% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reports</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-3"></div>
                  <div className="flex-1">
                    <p className="text-sm">New user registration: John Doe</p>
                    <p className="text-xs text-muted-foreground">
                      2 minutes ago
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mr-3"></div>
                  <div className="flex-1">
                    <p className="text-sm">New appointment scheduled</p>
                    <p className="text-xs text-muted-foreground">
                      15 minutes ago
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-purple-500 mr-3"></div>
                  <div className="flex-1">
                    <p className="text-sm">Medication updated: Amoxicillin</p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">Server Uptime</span>
                  <span className="text-sm font-medium">99.9%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Database Status</span>
                  <span className="text-sm font-medium text-green-500">
                    Healthy
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Backup Status</span>
                  <span className="text-sm font-medium text-green-500">
                    Completed
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Security Updates</span>
                  <span className="text-sm font-medium">Up to date</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <AdminDataTalbe />
      </div>
    </>
  );
};

export default AdminDashboard;
