/**
 * @description
 * Access token available 1h
 * Refresh token available 24h
 */

export interface AdminUser {
  _id: string; // Type string
  displayName: string; // Type string name
  userName: string; // Type string, max 15
  email: string; // Type gmail
  phone: string; // Type phone, min 8, max 11 characters
  password: string; // Type string, min 6, max 20 characters
  confirmPassword: string; // Type string, min 6, max 20 characters
  refreshToken?: string; // refresh token from jwt
}

/**
 * @example
 */
const adminUser: AdminUser = {
  _id: "123456",
  displayName: "An Nguyen Binh",
  userName: "username",
  email: "username@gmail.com",
  phone: "0987654321",
  password: "$2a$10$miEFnNIv29QKJHs3q6pgl.Pdg.aF7LTB9RvVFOI/fgKcwyKJLun/i",
  confirmPassword:
    "$2a$10$miEFnNIv29QKJHs3q6pgl.Pdg.aF7LTB9RvVFOI/fgKcwyKJLun/i",
  refreshToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDA2NzE1NDI4NjQwMCwiX2lkIjoiMTIzNDU2IiwiZGlzcGxheU5hbWUiOiJBbiBOZ3V5ZW4gQmluaCIsInVzZXJOYW1lIjoidXNlcm5hbWUiLCJlbWFpbCI6InVzZXJuYW1lQGdtYWlsLmNvbSIsInBob25lIjoiMDk4NzY1NDMyMSIsImlhdCI6MTYwMDY3MTU0Mn0.-aYhqGgkjcbFDSJla-TchaDGSqbJ7KqvV6YHWXgdeuw",
};
