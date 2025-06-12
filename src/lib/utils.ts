import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Date utilities
export function formatDate(date: Date): string {
  return date.toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Language utilities
export function getTranslation(key: string, language: string): string {
  // This would normally connect to a translation service
  // For now, return the key as fallback
  return key;
}

// Validation utilities
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Image utilities
export function getOptimizedImageUrl(url: string, width?: number, height?: number): string {
  if (url.includes('unsplash.com')) {
    const params = new URLSearchParams();
    if (width) params.append('w', width.toString());
    if (height) params.append('h', height.toString());
    params.append('fit', 'crop');
    params.append('crop', 'center');
    
    return `${url}?${params.toString()}`;
  }
  return url;
}

// Currency formatting
export function formatCurrency(amount: number, currency = 'PLN'): string {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: currency
  }).format(amount);
}

// Booking utilities
export function calculateNights(checkIn: Date, checkOut: Date): number {
  const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function isDateAvailable(date: Date, unavailableDates: Date[]): boolean {
  return !unavailableDates.some(unavailableDate => 
    date.toDateString() === unavailableDate.toDateString()
  );
}

// Local storage utilities
export function getFromLocalStorage(key: string): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key);
  }
  return null;
}

export function setToLocalStorage(key: string, value: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, value);
  }
}

// SEO utilities
export function generateMetaDescription(content: string, maxLength = 155): string {
  if (content.length <= maxLength) return content;
  return content.substring(0, maxLength - 3) + '...';
}

// Analytics utilities
export function trackEvent(eventName: string, properties?: Record<string, any>): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties);
  }
}