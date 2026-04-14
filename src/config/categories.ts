import { CategoryConfig } from '../types';

export const CATEGORIES: Record<string, CategoryConfig> = {
  servicios: {
    label: 'Servicios',
    icon: '⚡',
    bgClass: 'bg-blue-50',
    textClass: 'text-blue-700',
    borderClass: 'border-blue-200',
    hoverClass: 'hover:bg-blue-100',
  },
  expensas: {
    label: 'Expensas',
    icon: '🏢',
    bgClass: 'bg-green-50',
    textClass: 'text-green-700',
    borderClass: 'border-green-200',
    hoverClass: 'hover:bg-green-100',
  },
  honorarios: {
    label: 'Honorarios',
    icon: '💼',
    bgClass: 'bg-orange-50',
    textClass: 'text-orange-700',
    borderClass: 'border-orange-200',
    hoverClass: 'hover:bg-orange-100',
  },
  impuestos: {
    label: 'Impuestos',
    icon: '📋',
    bgClass: 'bg-purple-50',
    textClass: 'text-purple-700',
    borderClass: 'border-purple-200',
    hoverClass: 'hover:bg-purple-100',
  },
  tramites: {
    label: 'Trámites',
    icon: '📄',
    bgClass: 'bg-yellow-50',
    textClass: 'text-yellow-700',
    borderClass: 'border-yellow-200',
    hoverClass: 'hover:bg-yellow-100',
  },
  otros: {
    label: 'Otros',
    icon: '📌',
    bgClass: 'bg-gray-100',
    textClass: 'text-gray-700',
    borderClass: 'border-gray-300',
    hoverClass: 'hover:bg-gray-200',
  },
} as const;

export const RESPONSIBLES = [
  'Spirit Mariscal',
  'Nora',
  'Orestes',
  'Abraham',
] as const;

export const RECURRENCE_OPTIONS = [
  { value: 'none', label: 'No se repite' },
  { value: 'daily', label: 'Diario' },
  { value: 'weekly', label: 'Semanal' },
  { value: 'monthly', label: 'Mensual' },
  { value: 'yearly', label: 'Anual' },
] as const;