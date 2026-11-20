import { AlertTriangle, Scale, ShieldAlert } from 'lucide-react';
import { Category } from '../data/questions';

interface CategoryIconProps {
  category: Category;
  className?: string;
}

export function CategoryIcon({ category, className = 'w-4 h-4' }: CategoryIconProps) {
  switch (category) {
    case 'Konflik':
      return <Scale className={className} aria-hidden="true" />;
    case 'Kekerasan':
      return <AlertTriangle className={className} aria-hidden="true" />;
    case 'Perundungan':
      return <ShieldAlert className={className} aria-hidden="true" />;
  }
}
