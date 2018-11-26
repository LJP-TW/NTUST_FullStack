export interface ResetPwdPost {
  email: string;
  token: string;
  password: string;
  confirm_password: string;
}
