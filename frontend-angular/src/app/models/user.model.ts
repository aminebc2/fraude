export interface User {
  userId: string;
  username: string;
  password: string;
  email: string;
  role: 'ADMIN' | 'ANALYST' | 'SUPERVISOR';
}
