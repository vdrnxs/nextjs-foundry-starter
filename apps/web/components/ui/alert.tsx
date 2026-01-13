import { cn } from '@/lib/utils';

interface AlertProps {
  variant?: 'error' | 'warning' | 'success' | 'info';
  title: string;
  description?: string;
  className?: string;
}

const variantStyles = {
  error: 'bg-destructive/10 border-destructive/20 text-destructive',
  warning: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-700 dark:text-yellow-500',
  success: 'bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-500',
  info: 'bg-primary/10 border-primary/20 text-primary',
};

export function Alert({ variant = 'info', title, description, className }: AlertProps) {
  return (
    <div className={cn('p-3 rounded-lg border', variantStyles[variant], className)}>
      <p className="text-sm font-medium">{title}</p>
      {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
    </div>
  );
}