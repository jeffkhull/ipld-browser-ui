export function getCsrfToken(): string {
  return localStorage.getItem('csrf_token') || ''
}
