import type { Hall, User, Booking } from './types';

export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Admin User',
    email: 'admin@hallway.com',
    role: 'Admin',
    avatar: 'https://i.pravatar.cc/150?u=admin@hallway.com'
  },
];

export const mockHalls: Hall[] = [
  {
    id: 'hall-1',
    name: 'CV Raman Hall',
    capacity: 250,
    status: 'Available',
    imageId: 'seminar-hall-1',
  },
  {
    id: 'hall-2',
    name: 'Newton Hall',
    capacity: 150,
    status: 'Booked',
    imageId: 'seminar-hall-2',
  },
  {
    id: 'hall-3',
    name: 'APJ Abdul Kalam Hall',
    capacity: 300,
    status: 'Available',
    imageId: 'seminar-hall-3',
  },
  {
    id: 'hall-4',
    name: 'Visvesvaraya Hall',
    capacity: 100,
    status: 'Maintenance',
    imageId: 'seminar-hall-4',
  },
];

export const mockBookings: Booking[] = [
  {
    id: 'booking-1',
    hallId: 'hall-2',
    userId: 'user-1',
    eventName: 'Campus Placement Drive',
    eventDescription: 'Annual placement drive for final year students.',
    date: new Date(),
    startTime: '09:00',
    endTime: '17:00',
    status: 'Approved',
  },
    {
    id: 'booking-2',
    hallId: 'hall-1',
    userId: 'user-1',
    eventName: 'Department Meeting',
    eventDescription: 'Quarterly review meeting for the CSE department.',
    date: new Date(),
    startTime: '10:00',
    endTime: '11:00',
    status: 'Pending',
  }
];
