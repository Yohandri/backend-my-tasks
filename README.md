# Todo App Backend

Backend API for the Todo Application built with Express, TypeScript, and Firebase.

## Features

- 🔐 JWT Authentication
- 📝 Task CRUD Operations
- 👤 User Management
- 🔥 Firebase Firestore Integration
- ☁️ Cloud Functions Ready
- ✅ Input Validation
- 🛡️ CORS Configuration

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** Firebase Firestore
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** express-validator

## Project Structure

```
backend/
├── src/
│   ├── api/
│   │   ├── controllers/       # Request handlers
│   │   ├── middlewares/       # Express middlewares
│   │   ├── routes/           # Route definitions
│   │   └── validators/        # Input validation
│   ├── config/               # Configuration files
│   ├── core/
│   │   ├── entities/         # Domain entities
│   │   ├── repositories/     # Repository interfaces
│   │   └── services/         # Service interfaces
│   ├── infrastructure/
│   │   ├── firebase/         # Firebase implementations
│   │   ├── jwt/             # JWT utilities
│   │   └── services/        # Service implementations
│   ├── app.ts               # Express app setup
│   └── server.ts            # Server entry point
├── functions/               # Firebase Cloud Functions
├── tests/                   # Test files
├── .env                     # Environment variables
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase Project with Firestore enabled

### Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create environment file:
   ```bash
   cp .env.example .env
   ```

5. Configure environment variables in `.env`:
   ```env
   PORT=3000
   NODE_ENV=development
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRATION=24h
   FIREBASE_PROJECT_ID=your-firebase-project-id
   FIREBASE_CLIENT_EMAIL=your-client-email
   FIREBASE_PRIVATE_KEY="your-private-key"
   FRONTEND_URL=http://localhost:4200
   ```

6. Set up Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Firestore Database
   - Generate a service account key:
     1. Go to Project Settings > Service Accounts
     2. Click "Generate new private key"
     3. Copy the contents to `src/config/service-account.json`

### Development

Start the development server:
```bash
npm run dev
```

The server will start at `http://localhost:3000`

### Production Build

Build the project:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

### Testing

Run unit tests:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login or create user |
| GET | `/api/auth/verify` | Verify JWT token |
| GET | `/api/auth/me` | Get current user profile |

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create a new task |
| GET | `/api/tasks/:id` | Get a single task |
| PUT | `/api/tasks/:id` | Update a task |
| PATCH | `/api/tasks/:id/toggle` | Toggle task completion |
| DELETE | `/api/tasks/:id` | Delete a task |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check endpoint |
| GET | `/api` | API information |

## API Examples

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com"}'
```

Response:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": "24h"
  },
  "message": "User created successfully"
}
```

### Create Task

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"title": "Buy groceries", "description": "Milk, Eggs, Bread"}'
```

### Get Tasks

```bash
curl -X GET http://localhost:3000/api/tasks \
  -H "Authorization: Bearer <token>"
```

## Firebase Cloud Functions

### Deployment

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase Functions:
   ```bash
   firebase init functions
   ```

4. Deploy functions:
   ```bash
   firebase deploy --only functions
   ```

### Callable Functions

When using Cloud Functions, you can use the callable functions:

```javascript
import { https } from 'firebase-functions';
import { httpsClient } from 'firebase/firestore';

// Login
const loginFunction = https.onCall(async (data, context) => {
  const { email } = data;
  // Implementation
});
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| PORT | Server port | No (default: 3000) |
| NODE_ENV | Environment mode | No (default: development) |
| JWT_SECRET | JWT signing secret | Yes |
| JWT_EXPIRATION | Token expiration time | No (default: 24h) |
| FIREBASE_PROJECT_ID | Firebase project ID | Yes |
| FIREBASE_CLIENT_EMAIL | Firebase service account email | Yes |
| FIREBASE_PRIVATE_KEY | Firebase private key | Yes |
| FRONTEND_URL | Frontend URL for CORS | No |

## Security

- All routes except `/health` and `/api` require authentication
- JWT tokens are verified on each request
- Input validation using express-validator
- CORS configured to allow specific origins
- Environment variables for sensitive data

## Testing

### Unit Tests

The project uses Jest for unit testing. Tests are located in the `tests/` directory.

Example test:
```typescript
describe('UserService', () => {
    it('should login or create user', async () => {
        const userService = new UserService(mockUserRepository);
        const user = await userService.loginOrCreate('test@example.com');
        expect(user.email).toBe('test@example.com');
    });
});
```

## License

MIT License - see LICENSE file for details.
