export interface Customer {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Measurement {
  id: string;
  customerId: string;
  type: 'shirt' | 'pants' | 'suit' | 'blouse' | 'dress' | 'custom';
  
  // Basic Measurements
  chest?: number;
  waist?: number;
  hips?: number;
  shoulderWidth?: number;
  armLength?: number;
  backLength?: number;
  frontLength?: number;
  
  // Shirt Specific
  neck?: number;
  sleeveLength?: number;
  bicep?: number;
  wrist?: number;
  shirtLength?: number;
  
  // Pants Specific
  inseam?: number;
  outseam?: number;
  thigh?: number;
  knee?: number;
  ankle?: number;
  rise?: number;
  
  // Additional Notes
  notes?: string;
  date: Date;
  
  // Status
  status: 'draft' | 'confirmed' | 'completed';
}