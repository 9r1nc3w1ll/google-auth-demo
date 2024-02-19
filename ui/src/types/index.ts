export interface Otp {
  code: string;
  expires_at: string;
};

export interface User {
  id: number;
  name: string;
}

export interface ValidateOtpResponse {
  valid: boolean;
  expired: boolean;
}