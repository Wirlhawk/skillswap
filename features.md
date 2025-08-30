# SkillSwap Features Overview

This document outlines the major features and their sub-features within the SkillSwap application, based on the current project structure.

## 1. Authentication & User Management

*   **Login:**
    *   User authentication via login forms.
    *   Utilizes `src/components/auth/login-card.tsx` and `src/components/auth/auth-card-wrapper.tsx`.
*   **Registration:**
    *   New user registration process.
    *   Utilizes `src/components/auth/register-card.tsx` and `src/components/auth/auth-card-wrapper.tsx`.
*   **Session Management:**
    *   Handles user sessions using `src/hooks/use-auth-session.ts` and `src/lib/auth.ts`.
*   **User Profiles:**
    *   View and edit user profile information.
    *   Components: `src/components/profile/edit-profile-form.tsx`, `src/components/profile/edit-profile-picture-form.tsx`, `src/components/profile/form-edit-user.tsx`, `src/components/profile/profile-info-card.tsx`.

## 2. Landing Page

*   **Hero Section:**
    *   Prominent introductory section for the application.
    *   Component: `src/components/landing-page/hero.tsx`.
*   **Features Section:**
    *   Highlights key functionalities of SkillSwap.
    *   Component: `src/components/landing-page/features.tsx`.
*   **Testimonial Section:**
    *   Displays client testimonials.
    *   Component: `src/components/landing-page/testimonial.tsx`.
*   **Footer:**
    *   Standard application footer with navigation and information.
    *   Component: `src/components/landing-page/footer.tsx`.

## 3. Service & Portfolio Management

*   **Service Creation:**
    *   Form for sellers to create new services.
    *   Component: `src/components/service/create-service-form.tsx`.
*   **Service Details:**
    *   Displays comprehensive information about a specific service.
    *   Component: `src/components/service/service-detail.tsx`.
*   **Service Cards:**
    *   Reusable component for displaying service summaries.
    *   Component: `src/components/service/service-card.tsx`.
*   **Portfolio Creation:**
    *   Form for users to create and manage their portfolios.
    *   Component: `src/components/portfolio/create-portfolio-form.tsx`.
*   **Portfolio Display:**
    *   Displays individual portfolio items.
    *   Component: `src/components/portfolio/portfolio-card.tsx`.
*   **Portfolio Preview:**
    *   Dialog for previewing portfolio items.
    *   Component: `src/components/portfolio/portfolio-preview-dialog.tsx`.
*   **Portfolio Showcase:**
    *   Aggregated view of various portfolios.
    *   Component: `src/components/portfolio/portfolio-showcase.tsx`.
*   **Example Portfolio (Demonstration):**
    *   Includes various components for a sample portfolio: `src/components/ex-portfolio/about.tsx`, `src/components/ex-portfolio/contact.tsx`, `src/components/ex-portfolio/hero.tsx`, `src/components/ex-portfolio/media-preview.tsx`, `src/components/ex-portfolio/portfolio.tsx`, `src/components/ex-portfolio/profile-works.tsx`, `src/components/ex-portfolio/upload-form.tsx`.

## 4. Order Management

*   **Order Creation:**
    *   Process for clients to place orders for services.
    *   Component: `src/components/service/order-form.tsx`.
*   **Order Overview:**
    *   Displays a summary of an order.
    *   Component: `src/components/orders/order-overview.tsx`.
*   **Order View:**
    *   Detailed view of a specific order, including messages, attachments, and milestones.
    *   Component: `src/components/orders/order-view.tsx`.
*   **Order Actions:**
    *   Buttons and functionalities related to order management (e.g., cancel, approve, complete).
    *   Component: `src/components/orders/order-actions.tsx`.
*   **Order Messaging:**
    *   Real-time chat functionality within an order.
    *   Component: `src/components/orders/order-messages.tsx`.
*   **Order Attachments:**
    *   Management and display of files attached to an order.
    *   Component: `src/components/orders/order-attachments.tsx`.
*   **Order Reviews:**
    *   Dialog for clients to leave reviews for completed orders.
    *   Component: `src/components/orders/order-reviews-dialog.tsx`.
*   **Order Sidebar:**
    *   Sidebar displaying seller and payment information for an order.
    *   Component: `src/components/orders/order-sidebar.tsx`.
*   **Delivery Management:**
    *   **Delivery Options:** `src/components/orders/delivery/order-delivery-options.tsx`
    *   **Delivery Summary:** `src/components/orders/delivery/order-delivery-summary.tsx`
    *   **Delivery Upload:** `src/components/orders/delivery/order-delivery-upload.tsx`
*   **Milestone Management:**
    *   **Milestone List:** `src/components/orders/milestone/milestone-list.tsx`
    *   **Milestone View:** `src/components/orders/milestone/milestone-view.tsx`

## 5. Seller Dashboard

*   **Dashboard Overview:**
    *   Key Performance Indicator (KPI) cards: `src/components/seller-dashboard/kpi-card.tsx`.
    *   Stats Grid: `src/components/seller-dashboard/stats-grid.tsx`.
    *   Revenue Chart: `src/components/seller-dashboard/revenue-chart.tsx`.
    *   Top Services List: `src/components/seller-dashboard/top-services-list.tsx`.
*   **Services Table:**
    *   Displays a list of services offered by the seller.
    *   Components: `src/components/seller-dashboard/services-table.tsx`, `src/components/seller-dashboard/services-columns.tsx`.
*   **Orders Table:**
    *   Displays a list of orders received by the seller.
    *   Component: `src/components/seller-dashboard/orders-table.tsx`.
*   **Service Management (within Dashboard):**
    *   Create Service Dialog: `src/components/seller-dashboard/create-service-dialog.tsx`.
    *   Edit Service Dialog: `src/components/seller-dashboard/edit-service-dialog.tsx`.
    *   Delete Service Action: `src/components/seller-dashboard/delete-service-action.tsx`.
    *   Service Form: `src/components/seller-dashboard/service-form.tsx`.
*   **Order Status Update:**
    *   Action to update the status of an order.
    *   Component: `src/components/seller-dashboard/update-order-status-action.tsx`.
*   **Data Table (Generic):**
    *   Reusable component for displaying tabular data with filtering and sorting.
    *   Component: `src/components/seller-dashboard/data-table.tsx`.

## 6. Chat UI

*   **Chat Widget:**
    *   Embeddable chat interface for communication.
    *   Components: `src/components/chatui/chat-ui.tsx`, `src/components/chatui/chat-widget.tsx`.

## 7. Leaderboard

*   **Rising Star Leaderboard:**
    *   Displays rising talent on the platform.
    *   Component: `src/components/leaderboard/rising-star-leaderboard.tsx`.
*   **Top 10 Leaderboard:**
    *   Highlights top-performing users.
    *   Component: `src/components/leaderboard/top-10.tsx`.

## 8. Shared UI Components & Forms

*   **Filter Bars:**
    *   Reusable filtering interface.
    *   Component: `src/components/filter-bars.tsx`.
*   **Tabs:**
    *   Tabbed navigation component.
    *   Component: `src/components/tabs-03.tsx`.
*   **Form Elements:**
    *   Feature List: `src/components/form/feature-list.tsx`.
    *   Image Upload: `src/components/form/image-upload.tsx`.
    *   Tag Input: `src/components/form/tag-input.tsx`.
    *   Form Input (generic): `src/components/forms/form-input.tsx`.
*   **UI Primitives:**
    *   A collection of basic UI components (buttons, inputs, avatars, cards, dialogs, etc.) located in `src/components/ui`.

## 9. API Endpoints (Server-side Logic)

*   **Authentication API:**
    *   Handles authentication-related requests.
    *   Located in `src/app/api/auth`.
*   **Data APIs:**
    *   Server-side functions for managing various data entities:
        *   `src/server/category.ts`
        *   `src/server/dashboard.ts`
        *   `src/server/image.ts`
        *   `src/server/order.ts`
        *   `src/server/portfolio.ts`
        *   `src/server/review.ts`
        *   `src/server/service.ts`
        *   `src/server/user.ts`
        *   `src/server/actions/` (additional server actions)
        *   `src/server/utils/` (server-side utilities)

## 10. Hooks

*   **`use-auth-session.ts`:** Manages user authentication sessions.
*   **`use-delivery-actions.ts`:** Provides actions for order delivery.
*   **`use-file-upload.ts`:** Handles file upload logic.
*   **`use-milestone-actions.ts`:** Provides actions for order milestones.
*   **`use-order-actions.ts`:** Provides general actions for order management.
*   **`use-toast.ts`:** Manages toast notifications.

## 11. Database & Schema

*   **Drizzle ORM Configuration:** `src/db/drizzle.ts`.
*   **Database Schema:** `src/db/schema.ts` and individual schema files in `src/db/schema/`.

## 12. Utilities & Libraries

*   **Authentication Utilities:** `src/lib/auth-client.ts`, `src/lib/auth.ts`.
*   **Constants:** `src/lib/constants.ts`.
*   **Dummy Data:** `src/lib/dummy-data.ts`.
*   **Order Transformers:** `src/lib/order-transformers.ts` (transforms order data for different views).
*   **Order Utilities:** `src/lib/order-utils.ts`.
*   **General Utilities:** `src/lib/utils.ts`.
*   **Currency Formatting:** `src/utils/format-rupiah.ts`.
