// types/verification-admin.ts
import { VerificationRequest } from './verification'

export interface AdminVerificationRequest extends VerificationRequest {
  user: {
    full_name: string;
    email: string;
    avatar_url?: string | null;
  };
  document_type: 'id' | 'passport'
  document_urls: string[];
  document_number: string;
  document_expiry: string;
  verification_status: 'pending' | 'approved' | 'rejected';
  admin_notes: string | null;
  rejection_reason: string | null;
  verified_by: string | null;
  created_at: string;
  updated_at: string;
  verified_at: string | null;
  verifier?: {
    id: string;
    full_name: string;
    avatar_url?: string | null;
  } | null;
}

export interface VerificationFilters {
  status?: 'pending' | 'approved' | 'rejected' | 'all';
  documentType?: 'id' | 'passport' | 'all';
  dateRange?: {
    from: Date;
    to: Date;
  };
}

export interface VerificationSort {
  field: 'created_at' | 'updated_at' | 'verified_at';
  direction: 'asc' | 'desc';
}

export interface VerificationActionResponse {
  success: boolean;
  message: string;
  error?: string;
}

export interface VerificationStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  todaySubmissions: number;
}