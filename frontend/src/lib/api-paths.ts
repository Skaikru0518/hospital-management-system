//Auth API
export const apiPaths = {
  auth: {
    login: 'auth/login',
  },
  user: {
    getUsers: '/user',
    createUser: '/user',
    getUserById: (id: number | string) => `/user/${id}`,
    updateUser: (id: number | string) => `/user/${id}`,
    deleteUser: (id: number | string) => `/user/${id}`,
  },
  appointment: {
    createAppointment: '/appointment',
    getAppointment: '/appointment',
    getAppointmentById: (id: number | string) => `/appointment/${id}`,
    updateAppointment: (id: number | string) => `/appointment/${id}`,
    deleteAppointment: (id: number | string) => `/appointment/${id}`,
  },
  doctor: {
    createDoctor: '/doctor',
    getDoctor: '/doctor',
    getDoctorById: (id: number | string) => `/doctor/${id}`,
    updateDoctor: (id: number | string) => `/doctor/${id}`,
    deleteDoctor: (id: number | string) => `/doctor/${id}`,
  },
  medicalRecord: {
    createMedicalRecord: '/medical-record',
    getMedicalRecord: '/medical-record',
    getMedicalRecordById: (id: number | string) => `/medical-record/${id}`,
    updateMedicalRecord: (id: number | string) => `/medical-record/${id}`,
    deleteMedicalRecord: (id: number | string) => `/medical-record/${id}`,
  },
  patient: {
    createPatient: '/patient',
    getPatient: '/patient',
    getPatientById: (id: number | string) => `/patient/${id}`,
    updatePatient: (id: number | string) => `/patient/${id}`,
    deletePatient: (id: number | string) => `/patient/${id}`,
  },
  diseases: {
    getDiseases: (params?: {
      search?: string;
      page?: number;
      limit?: number;
    }) => {
      let url = '/diseases';
      const query: string[] = [];
      if (params?.search)
        query.push(`search=${encodeURIComponent(params.search)}`);
      if (params?.page) query.push(`page=${params.page}`);
      if (params?.limit) query.push(`limit=${params.limit}`);
      if (query.length) url += `?${query.join('&')}`;
      return url;
    },
    getDiseaseById: (id: number | string) => `/diseases/${id}`,
  },
  medications: {
    createMedication: '/medications',
    getMedications: (params?: {
      search?: string;
      page?: number;
      limit?: number;
    }) => {
      let url = '/medications';
      const query: string[] = [];
      if (params?.search)
        query.push(`search=${encodeURIComponent(params.search)}`);
      if (params?.page) query.push(`page=${params.page}`);
      if (params?.limit) query.push(`limit=${params.limit}`);
      if (query.length) url += `?${query.join('&')}`;
      return url;
    },
    getMedicationById: (id: number | string) => `/medication/${id}`,
    updateMedication: (id: number | string) => `/medication/${id}`,
    deleteMedication: (id: number | string) => `/medication/${id}`,
  },
};
