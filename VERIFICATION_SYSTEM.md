# Seller Verification System

This document describes the seller verification system implemented for SkillSwap, allowing students to become verified sellers.

## Overview

The verification system allows students (clients) to apply to become sellers by submitting:

- Student ID image
- Major selection (from majors table)
- School name

## Role System

### User Roles

- **BUYER** (default): New users start as buyers who can purchase services
- **STUDENT**: Users who have applied for seller verification (role changes when they submit verification)
- **TEACHER**: Verified sellers who can offer services AND review student verification requests

## Database Schema

### Tables

#### `seller_verification`

- `id`: Primary key
- `user_id`: Reference to user table
- `student_id_image`: URL/path to uploaded student ID image
- `major_id`: Reference to major table
- `school_name`: Name of the student's school
- `status`: Verification status (PENDING, APPROVED, REJECTED)
- `rejection_reason`: Reason for rejection if applicable
- `verified_at`: Timestamp when verification was completed
- `verified_by`: Teacher who verified the request
- `created_at`: Timestamp when request was created
- `updated_at`: Timestamp when request was last updated

#### `verification_status` Enum

- `PENDING`: Request submitted, awaiting review
- `APPROVED`: Request approved, user is now a seller
- `REJECTED`: Request rejected, user remains a student

## Components

### 1. SellerVerificationForm

- File upload for student ID image
- Dropdown for major selection
- Text input for school name
- Form validation and submission

### 2. VerificationStatus

- Displays current verification status
- Shows appropriate actions based on status
- Links to verification form if needed

## Pages

### `/become-seller`

- Main verification application page
- Contains the verification form
- Explains the verification process

## Server Actions

### `submitSellerVerification`

- Handles form submission
- Creates verification record
- **Updates user role from BUYER to STUDENT**
- Prevents duplicate submissions

### `getSellerVerificationStatus`

- Fetches verification status for a user
- Used in profile pages and status components

### `getAllVerifications`

- Fetches all verification requests with user and major information
- Used in admin dashboard
- Includes JOINs with user and major tables

### `updateVerificationStatus`

- Updates verification status (TEACHER only)
- Handles approval/rejection with reasons
- **When approved, user role should be updated to TEACHER**

## User Flow

1. **BUYER Registration**: New users are registered as buyers by default
2. **Verification Request**: Buyer fills out verification form → role changes to STUDENT
3. **TEACHER Review**: Teachers review the submission
4. **Status Update**: Teacher approves or rejects with reason
5. **Role Change**: If approved, user role changes to TEACHER (can now sell services AND review other verifications)

## Security Considerations

- Only authenticated users can submit verification requests
- Only TEACHER role can review and approve/reject verifications
- Image upload validation (file type, size)
- Audit trail for all verification actions

## Future Enhancements

- Image upload to cloud storage (AWS S3, Cloudinary)
- Email notifications for status changes
- Automated verification for certain criteria
- Bulk verification processing
- Verification expiry and renewal
- Role update to TEACHER when verification is approved

## Database Migration

Run the migration to create the verification table:

```bash
# If using Drizzle migrations
npm run db:migrate

# Or manually run the SQL
psql -d your_database -f drizzle/migrations/001_add_seller_verification.sql
```

## Usage

### For Students (BUYER → STUDENT)

1. Navigate to `/become-seller`
2. Fill out the verification form
3. Submit and wait for review (role changes to STUDENT)
4. Check status on profile page

### For Teachers (Reviewers)

1. Access verification management (to be implemented)
2. Review pending requests from STUDENT users
3. Approve or reject with reasons
4. Monitor verification statistics

## Dependencies

- Next.js 14+ with App Router
- Drizzle ORM for database operations
- Better-auth for authentication
- Shadcn/ui components for UI
- Lucide React for icons
- Sonner for toast notifications
