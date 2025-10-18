import type { PlaceHolderImages } from './placeholder-images';

export type UserRole = 'Admin' | 'Supervisor' | 'HOD' | 'TPO' | 'Club' | 'Management';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: 'CSE' | 'CSE-AIML' | 'CSD' | 'IT' | 'ECE' | 'EEE';
  club?: 'E-Cell' | 'NSS' | 'NCC';
  avatar: string;
};

export type Hall = {
  id: string;
  name: string;
  capacity: number;
  status: 'Available' | 'Booked' | 'Maintenance';
  imageId: (typeof PlaceHolderImages)[number]['id'];
};

export type Booking = {
  id: string;
  hallId: string;
  userId: string;
  eventName: string;
  eventDescription: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Resolved';
};
