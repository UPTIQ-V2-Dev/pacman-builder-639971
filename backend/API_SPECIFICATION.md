# API Specification

## Database Models

```prisma
model User {
  id              Int         @id @default(autoincrement())
  email           String      @unique
  name            String?
  password        String
  role            String      @default("USER")
  isEmailVerified Boolean     @default(false)
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
  tokens          Token[]
  highScores      HighScore[]
  gameStats       GameStats?
}

model Token {
  id          Int       @id @default(autoincrement())
  token       String
  type        String
  expires     DateTime
  blacklisted Boolean   @default(false)
  createdAt   DateTime  @default(now())
  user        User      @relation(fields: [userId], references: [id])
  userId      Int
}

model HighScore {
  id         String   @id @default(cuid())
  playerName String
  score      Int
  level      Int
  date       DateTime @default(now())
  user       User?    @relation(fields: [userId], references: [id])
  userId     Int?
}

model GameStats {
  id                 Int  @id @default(autoincrement())
  gamesPlayed        Int  @default(0)
  totalScore         Int  @default(0)
  highestLevel       Int  @default(0)
  totalPelletsEaten  Int  @default(0)
  totalGhostsEaten   Int  @default(0)
  averageScore       Int  @default(0)
  user               User @relation(fields: [userId], references: [id])
  userId             Int  @unique
}
```

---

## Authentication Endpoints

EP: POST /auth/register
DESC: Register a new user account.
IN: body:{name:str!, email:str!, password:str!}
OUT: 201:{user:{id:int, email:str, name:str, role:str, isEmailVerified:bool, createdAt:str, updatedAt:str}, tokens:{access:{token:str, expires:str}, refresh:{token:str, expires:str}}}
ERR: {"400":"Invalid input or email already exists", "422":"Validation failed", "500":"Internal server error"}
EX_REQ: curl -X POST /auth/register -H "Content-Type: application/json" -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
EX_RES_201: {"user":{"id":1,"email":"john@example.com","name":"John Doe","role":"USER","isEmailVerified":false,"createdAt":"2025-10-28T12:00:00Z","updatedAt":"2025-10-28T12:00:00Z"},"tokens":{"access":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...","expires":"2025-10-28T12:15:00Z"},"refresh":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...","expires":"2025-11-04T12:00:00Z"}}}

---

EP: POST /auth/login
DESC: Login with email and password.
IN: body:{email:str!, password:str!}
OUT: 200:{user:{id:int, email:str, name:str, role:str, isEmailVerified:bool, createdAt:str, updatedAt:str}, tokens:{access:{token:str, expires:str}, refresh:{token:str, expires:str}}}
ERR: {"400":"Invalid input", "401":"Invalid email or password", "500":"Internal server error"}
EX_REQ: curl -X POST /auth/login -H "Content-Type: application/json" -d '{"email":"john@example.com","password":"password123"}'
EX_RES_200: {"user":{"id":1,"email":"john@example.com","name":"John Doe","role":"USER","isEmailVerified":true,"createdAt":"2025-10-28T12:00:00Z","updatedAt":"2025-10-28T12:00:00Z"},"tokens":{"access":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...","expires":"2025-10-28T12:15:00Z"},"refresh":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...","expires":"2025-11-04T12:00:00Z"}}}

---

EP: POST /auth/logout
DESC: Logout and invalidate refresh token.
IN: body:{refreshToken:str!}
OUT: 204:{}
ERR: {"400":"Invalid input", "404":"Refresh token not found", "500":"Internal server error"}
EX_REQ: curl -X POST /auth/logout -H "Content-Type: application/json" -d '{"refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}'
EX_RES_204: {}

---

EP: POST /auth/refresh-tokens
DESC: Refresh access and refresh tokens.
IN: body:{refreshToken:str!}
OUT: 200:{access:{token:str, expires:str}, refresh:{token:str, expires:str}}
ERR: {"400":"Invalid input", "401":"Invalid refresh token", "500":"Internal server error"}
EX_REQ: curl -X POST /auth/refresh-tokens -H "Content-Type: application/json" -d '{"refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}'
EX_RES_200: {"access":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...","expires":"2025-10-28T12:15:00Z"},"refresh":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...","expires":"2025-11-04T12:00:00Z"}}

---

EP: POST /auth/forgot-password
DESC: Send password reset email.
IN: body:{email:str!}
OUT: 204:{}
ERR: {"400":"Invalid input", "404":"Email not found", "500":"Internal server error"}
EX_REQ: curl -X POST /auth/forgot-password -H "Content-Type: application/json" -d '{"email":"john@example.com"}'
EX_RES_204: {}

---

EP: POST /auth/reset-password
DESC: Reset password using reset token.
IN: query:{token:str!} body:{password:str!}
OUT: 204:{}
ERR: {"400":"Invalid input", "401":"Invalid or expired token", "500":"Internal server error"}
EX_REQ: curl -X POST "/auth/reset-password?token=resetToken123" -H "Content-Type: application/json" -d '{"password":"newPassword123"}'
EX_RES_204: {}

---

EP: POST /auth/verify-email
DESC: Verify email address using verification token.
IN: query:{token:str!}
OUT: 204:{}
ERR: {"400":"Invalid input", "401":"Invalid or expired token", "500":"Internal server error"}
EX_REQ: curl -X POST "/auth/verify-email?token=verifyToken123"
EX_RES_204: {}

---

EP: POST /auth/send-verification-email
DESC: Send email verification email to authenticated user.
IN: headers:{Authorization:str!}
OUT: 204:{}
ERR: {"401":"Unauthorized", "500":"Internal server error"}
EX_REQ: curl -X POST /auth/send-verification-email -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
EX_RES_204: {}

---

## User Management Endpoints

EP: POST /users
DESC: Create a new user (admin only).
IN: headers:{Authorization:str!} body:{name:str!, email:str!, password:str!, role:str!}
OUT: 201:{id:int, email:str, name:str, role:str, isEmailVerified:bool, createdAt:str, updatedAt:str}
ERR: {"400":"Invalid input or email already exists", "401":"Unauthorized", "403":"Forbidden", "500":"Internal server error"}
EX_REQ: curl -X POST /users -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." -H "Content-Type: application/json" -d '{"name":"Jane Doe","email":"jane@example.com","password":"password123","role":"USER"}'
EX_RES_201: {"id":2,"email":"jane@example.com","name":"Jane Doe","role":"USER","isEmailVerified":false,"createdAt":"2025-10-28T12:00:00Z","updatedAt":"2025-10-28T12:00:00Z"}

---

EP: GET /users
DESC: Get paginated list of users with optional filters.
IN: headers:{Authorization:str!} query:{name:str, role:str, sortBy:str, limit:int, page:int}
OUT: 200:{results:arr[{id:int, email:str, name:str, role:str, isEmailVerified:bool, createdAt:str, updatedAt:str}], page:int, limit:int, totalPages:int, totalResults:int}
ERR: {"401":"Unauthorized", "403":"Forbidden", "500":"Internal server error"}
EX_REQ: curl -X GET "/users?page=1&limit=10&role=USER" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
EX_RES_200: {"results":[{"id":1,"email":"john@example.com","name":"John Doe","role":"USER","isEmailVerified":true,"createdAt":"2025-10-28T12:00:00Z","updatedAt":"2025-10-28T12:00:00Z"}],"page":1,"limit":10,"totalPages":1,"totalResults":1}

---

EP: GET /users/:userId
DESC: Get user by ID.
IN: headers:{Authorization:str!} params:{userId:int!}
OUT: 200:{id:int, email:str, name:str, role:str, isEmailVerified:bool, createdAt:str, updatedAt:str}
ERR: {"401":"Unauthorized", "403":"Forbidden", "404":"User not found", "500":"Internal server error"}
EX_REQ: curl -X GET /users/1 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
EX_RES_200: {"id":1,"email":"john@example.com","name":"John Doe","role":"USER","isEmailVerified":true,"createdAt":"2025-10-28T12:00:00Z","updatedAt":"2025-10-28T12:00:00Z"}

---

EP: PATCH /users/:userId
DESC: Update user information.
IN: headers:{Authorization:str!} params:{userId:int!} body:{name:str, email:str, password:str}
OUT: 200:{id:int, email:str, name:str, role:str, isEmailVerified:bool, createdAt:str, updatedAt:str}
ERR: {"400":"Invalid input or email already exists", "401":"Unauthorized", "403":"Forbidden", "404":"User not found", "500":"Internal server error"}
EX_REQ: curl -X PATCH /users/1 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." -H "Content-Type: application/json" -d '{"name":"John Smith"}'
EX_RES_200: {"id":1,"email":"john@example.com","name":"John Smith","role":"USER","isEmailVerified":true,"createdAt":"2025-10-28T12:00:00Z","updatedAt":"2025-10-28T12:05:00Z"}

---

EP: DELETE /users/:userId
DESC: Delete user account.
IN: headers:{Authorization:str!} params:{userId:int!}
OUT: 200:{}
ERR: {"401":"Unauthorized", "403":"Forbidden", "404":"User not found", "500":"Internal server error"}
EX_REQ: curl -X DELETE /users/1 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
EX_RES_200: {}

---

## Game Endpoints

EP: GET /api/highscores
DESC: Get high scores leaderboard.
IN: query:{limit:int, page:int}
OUT: 200:arr[{id:str, playerName:str, score:int, level:int, date:str}]
ERR: {"500":"Internal server error"}
EX_REQ: curl -X GET "/api/highscores?limit=10"
EX_RES_200: [{"id":"1","playerName":"PACMASTER","score":125430,"level":8,"date":"2025-01-15T10:30:00Z"},{"id":"2","playerName":"GHOSTHUNTER","score":98760,"level":6,"date":"2025-01-14T15:45:00Z"}]

---

EP: POST /api/scores
DESC: Submit a new game score.
IN: headers:{Authorization:str} body:{score:int!, playerName:str!, level:int!, date:str!}
OUT: 201:{id:str, playerName:str, score:int, level:int, date:str}
ERR: {"400":"Invalid input", "500":"Internal server error"}
EX_REQ: curl -X POST /api/scores -H "Content-Type: application/json" -d '{"score":15000,"playerName":"NEWPLAYER","level":3,"date":"2025-10-28T12:00:00Z"}'
EX_RES_201: {"id":"9","playerName":"NEWPLAYER","score":15000,"level":3,"date":"2025-10-28T12:00:00Z"}

---

EP: GET /api/player-stats
DESC: Get player game statistics.
IN: headers:{Authorization:str!}
OUT: 200:{gamesPlayed:int, totalScore:int, highestLevel:int, totalPelletsEaten:int, totalGhostsEaten:int, averageScore:int}
ERR: {"401":"Unauthorized", "404":"Stats not found", "500":"Internal server error"}
EX_REQ: curl -X GET /api/player-stats -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
EX_RES_200: {"gamesPlayed":47,"totalScore":234560,"highestLevel":6,"totalPelletsEaten":1893,"totalGhostsEaten":124,"averageScore":4990}

---

EP: PUT /api/game-stats
DESC: Update player game statistics.
IN: headers:{Authorization:str!} body:{gamesPlayed:int, totalScore:int, highestLevel:int, totalPelletsEaten:int, totalGhostsEaten:int, averageScore:int}
OUT: 200:{gamesPlayed:int, totalScore:int, highestLevel:int, totalPelletsEaten:int, totalGhostsEaten:int, averageScore:int}
ERR: {"400":"Invalid input", "401":"Unauthorized", "500":"Internal server error"}
EX_REQ: curl -X PUT /api/game-stats -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." -H "Content-Type: application/json" -d '{"gamesPlayed":48,"totalScore":250000,"highestLevel":7,"totalPelletsEaten":1950,"totalGhostsEaten":130,"averageScore":5208}'
EX_RES_200: {"gamesPlayed":48,"totalScore":250000,"highestLevel":7,"totalPelletsEaten":1950,"totalGhostsEaten":130,"averageScore":5208}