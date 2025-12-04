/**
 * Validation Messages for Entity Decorators
 * 
 * These are exported as constants so they can be used in class-validator decorators
 * which require string literals at compile time.
 */

export const ValidationMessages = {
  emailInvalid: "이메일 주소가 잘못되었습니다.",
  emailRequired: "이메일 주소는 비워둘 수 없습니다.",
  usernameMinLength: "사용자 이름은 3자 이상이어야 합니다.",
  passwordMinLength: "비밀번호는 6자리 이상이어야 합니다.",
} as const;

