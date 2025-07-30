import { Header } from '@/components/layouts/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, FileText, Stethoscope } from 'lucide-react';
import React from 'react';

function PatientDashboard() {
  return (
    <>
      <Header />
      <div className="space-y-6 container mx-auto">
        <div className="space-y-2 mt-2">
          <h1 className="text-3xl font-bold">Patient dashboard</h1>
          <p className="text-muted-foreground">
            Manage your appointments and health information
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* appointments */}
          <Card className="">
            <CardHeader className="flex flex-1 flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">
                Appointments
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                Next: Tomorrow at 10:00 AM
              </p>
            </CardContent>
          </Card>

          {/* med records */}
          <Card>
            <CardHeader className="flex flex-1 flex-row items-center justify-between">
              <CardTitle className="text-lg font-medium">
                Medical Records
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                Last updated: Today
              </p>
            </CardContent>
          </Card>

          {/* doctors */}
          <Card>
            <CardHeader className="flex flex-1 flex-row items-center justify-between">
              <CardTitle className="text-lg font-medium">Doctors</CardTitle>
              <Stethoscope className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">Dr Smith</p>
            </CardContent>
          </Card>

          {/* wait time */}
          <Card>
            <CardHeader className="flex flex-1 flex-row items-center justify-between">
              <CardTitle className="text-lg font-medium">Wait Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-2xl font-bold">15 min</div>
              <p className="text-xs text-muted-foreground">Average wait time</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

export default PatientDashboard;
