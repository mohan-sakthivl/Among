// Core User & Profile Types
export type UserRole = 'USER' | 'BUSINESS' | 'MODERATOR' | 'ADMIN';

export type UserStatus = 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'BANNED';

export type VerificationLevel = 'NEW' | 'ESTABLISHED' | 'TRUSTED' | 'VERIFIED';

export interface User {
  id: string;
  phoneNumber: string;
  phoneVerifiedAt: string | null;
  status: UserStatus;
  role: UserRole;
  dateOfBirth: string | null;
  createdAt: string;
  updatedAt: string;
  lastActiveAt: string | null;
}

export interface Profile {
  id: string;
  userId: string;
  displayName: string;
  bio: string | null;
  avatarUrl: string | null;
  city: string;
  visibility: 'PUBLIC' | 'CONNECTIONS_ONLY' | 'PRIVATE';
  verificationStatus: VerificationLevel;
}

// Activity Types
export type ActivityStatus =
  | 'DRAFT'
  | 'PUBLISHED'
  | 'FULL'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'ARCHIVED';

export type ActivityVisibility = 'PUBLIC' | 'CIRCLE' | 'CONNECTIONS' | 'PRIVATE';

export type ParticipantState = 'REQUESTED' | 'JOINED' | 'WAITLISTED' | 'CANCELLED';

export type AttendanceState = 'PENDING' | 'ATTENDED' | 'NO_SHOW';

// API Response envelopes
export interface ApiSuccessResponse<T> {
  data: T;
  meta: {
    requestId: string;
  };
}

export interface ApiPaginatedResponse<T> {
  data: T[];
  meta: {
    requestId: string;
    nextCursor?: string;
    hasMore: boolean;
  };
}

export interface ApiErrorResponse {
  error: {
    code: string;
    message: string;
    requestId: string;
  };
}
