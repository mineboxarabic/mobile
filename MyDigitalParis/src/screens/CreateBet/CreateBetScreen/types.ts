import { Category, MarketType } from '../../../types/entities';

export interface CreateBetFormData {
  question: string;
  category: Category;
  type: MarketType;
  endDate: Date;
  options: string[];
}

export interface FormErrors {
  question?: string;
  category?: string;
  endDate?: string;
  options?: string[];
}

export interface CreateBetScreenProps {
  // Navigation props can be added here when navigation is implemented
}

export interface CategoryOption {
  value: Category;
  label: string;
  icon?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: FormErrors;
}
