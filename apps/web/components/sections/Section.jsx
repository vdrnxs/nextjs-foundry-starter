import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * Section - Sección genérica y reutilizable
 * Principio: DRY - Componente base para todas las secciones
 * Principio: Open/Closed - Extensible mediante children y props
 */
export function Section({ title, description, children, className, variant = "default" }) {
  const isCard = variant === "card";

  if (isCard) {
    return (
      <Card className={className}>
        {(title || description) && (
          <CardHeader>
            {title && <CardTitle>{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
        )}
        <CardContent>{children}</CardContent>
      </Card>
    );
  }

  return (
    <section className={cn("space-y-4", className)}>
      {(title || description) && (
        <div className="space-y-1">
          {title && <h2 className="text-2xl font-bold tracking-tight">{title}</h2>}
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      )}
      <div>{children}</div>
    </section>
  );
}

/**
 * GridSection - Sección con grid layout
 * Principio: Liskov Substitution - Puede reemplazar a Section manteniendo el contrato
 */
export function GridSection({
  title,
  description,
  children,
  className,
  cols = { default: 1, sm: 2, md: 3, lg: 4 }
}) {
  const gridClasses = cn(
    "grid gap-4",
    cols.default && `grid-cols-${cols.default}`,
    cols.sm && `sm:grid-cols-${cols.sm}`,
    cols.md && `md:grid-cols-${cols.md}`,
    cols.lg && `lg:grid-cols-${cols.lg}`
  );

  return (
    <Section title={title} description={description} className={className}>
      <div className={gridClasses}>{children}</div>
    </Section>
  );
}

/**
 * SplitSection - Sección dividida en dos columnas
 * Principio: Single Responsibility - Solo maneja layout de 2 columnas
 */
export function SplitSection({
  title,
  description,
  left,
  right,
  className,
  ratio = "1:1" // "1:1", "1:2", "2:1"
}) {
  const ratioClasses = {
    "1:1": "md:grid-cols-2",
    "1:2": "md:grid-cols-[1fr_2fr]",
    "2:1": "md:grid-cols-[2fr_1fr]",
  };

  return (
    <Section title={title} description={description} className={className}>
      <div className={cn("grid gap-6", ratioClasses[ratio])}>
        <div>{left}</div>
        <div>{right}</div>
      </div>
    </Section>
  );
}