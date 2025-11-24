# Elisoft Backend API Documentation

## Overview

The Elisoft Backend API provides a comprehensive roadside assistance platform with a **credit-based membership system**. Customers purchase membership plans that provide a credit balance, and services are charged against this balance based on state-specific pricing.

## Base URL

```
Development: http://localhost:5000/api
Production: https://api.elisoft.com/api
```

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Roles

- **Customer**: Can purchase memberships and request services
- **Mechanic**: Can accept and fulfill service requests
- **Admin**: Can manage plans, prices, users, and view analytics

---

## Table of Contents

1. [Authentication](#authentication-endpoints)
2. [Membership Plans](#membership-plans)
3. [User Memberships](#user-memberships)
4. [Service Requests](#service-requests)
5. [Service Prices](#service-prices-admin)
6. [Admin Endpoints](#admin-endpoints)
7. [Error Codes](#error-codes)
8. [Credit-Based Subscription Flow](#credit-based-subscription-flow)

---

## Authentication Endpoints

### Register User

**POST** `/auth/register`

Create a new user account.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "role": "Customer",
  "phoneNumber": "+2348012345678"
}
```

**Response (201 Created):**
```json
{
  "status": "success",
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "Customer"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Login

**POST** `/auth/login`

Authenticate and receive JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "Customer"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Get Current User

**GET** `/auth/me`

Get authenticated user's profile.

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "Customer",
      "phoneNumber": "+2348012345678"
    }
  }
}
```

---

## Membership Plans

Membership plans are simplified templates with only name, price, and duration. Credit equals the plan price.

### Get All Active Plans

**GET** `/memberships/plans`

Retrieve all available membership plans.

**Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "plans": [
      {
        "_id": "507f1f77bcf86cd799439012",
        "name": "Basic",
        "price": 10000,
        "durationMonths": 12,
        "description": "Entry-level roadside assistance plan",
        "isActive": true
      },
      {
        "_id": "507f1f77bcf86cd799439013",
        "name": "Standard",
        "price": 25000,
        "durationMonths": 12,
        "description": "Comprehensive roadside assistance",
        "isActive": true
      },
      {
        "_id": "507f1f77bcf86cd799439014",
        "name": "Premium",
        "price": 50000,
        "durationMonths": 12,
        "description": "Premium roadside assistance with priority support",
        "isActive": true
      }
    ]
  }
}
```

### Create Membership Plan (Admin Only)

**POST** `/admin/membership-plans`

Create a new membership plan.

**Headers:** `Authorization: Bearer <admin_token>`

**Request Body:**
```json
{
  "name": "Fleet",
  "price": 100000,
  "durationMonths": 12,
  "description": "Enterprise fleet management plan"
}
```

**Response (201 Created):**
```json
{
  "status": "success",
  "message": "Membership plan created successfully",
  "data": {
    "plan": {
      "_id": "507f1f77bcf86cd799439015",
      "name": "Fleet",
      "price": 100000,
      "durationMonths": 12,
      "description": "Enterprise fleet management plan",
      "isActive": true
    }
  }
}
```

### Update Membership Plan (Admin Only)

**PUT** `/admin/membership-plans/:id`

Update an existing membership plan.

**Headers:** `Authorization: Bearer <admin_token>`

**Request Body:**
```json
{
  "price": 12000,
  "description": "Updated entry-level plan with more value"
}
```

**Response (200 OK):**
```json
{
  "status": "success",
  "message": "Membership plan updated successfully",
  "data": {
    "plan": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Basic",
      "price": 12000,
      "durationMonths": 12,
      "description": "Updated entry-level plan with more value",
      "isActive": true
    }
  }
}
```

### Delete Membership Plan (Admin Only)

**DELETE** `/admin/membership-plans/:id`

Soft-delete a membership plan by setting isActive to false.

**Headers:** `Authorization: Bearer <admin_token>`

**Response (200 OK):**
```json
{
  "status": "success",
  "message": "Membership plan deactivated successfully"
}
```

---

## User Memberships

### Purchase Membership

**POST** `/memberships/purchase`

Purchase a membership plan. Credit balance equals plan price.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "planId": "507f1f77bcf86cd799439012",
  "paymentReference": "PAY-1234567890"
}
```

**Response (201 Created):**
```json
{
  "status": "success",
  "message": "Membership purchased successfully",
  "data": {
    "membership": {
      "_id": "507f1f77bcf86cd799439020",
      "userId": "507f1f77bcf86cd799439011",
      "planId": "507f1f77bcf86cd799439012",
      "totalCredit": 10000,
      "remainingCredit": 10000,
      "usedCredit": 0,
      "startDate": "2024-01-15T10:00:00.000Z",
      "endDate": "2025-01-15T10:00:00.000Z",
      "status": "Active"
    }
  }
}
```

### Get Current Membership

**GET** `/memberships/current`

Get the authenticated user's active membership with credit information.

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "membership": {
      "_id": "507f1f77bcf86cd799439020",
      "userId": "507f1f77bcf86cd799439011",
      "planId": {
        "_id": "507f1f77bcf86cd799439012",
        "name": "Basic",
        "price": 10000,
        "durationMonths": 12
      },
      "totalCredit": 10000,
      "remainingCredit": 4625,
      "usedCredit": 5375,
      "creditPercentageUsed": 54,
      "startDate": "2024-01-15T10:00:00.000Z",
      "endDate": "2025-01-15T10:00:00.000Z",
      "status": "Active",
      "serviceRequests": [
        "507f1f77bcf86cd799439030"
      ]
    }
  }
}
```

**Response (404 Not Found) - No Active Membership:**
```