import { cn } from "@/lib/utils";

/**
 * PageLayout - Layout principal de la aplicación
 * Principio: Dependency Inversion - Depende de abstracciones (children) no de implementaciones
 */
export function PageLayout({ sidebar, children, className }) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar (opcional) */}
      {sidebar}

      {/* Contenido principal */}
      <main className={cn("flex-1 overflow-auto", className)}>
        {children}
      </main>
    </div>
  );
}

/**
 * PageHeader - Header reutilizable para páginas
 * Principio: Single Responsibility
 */
export function PageHeader({ title, description, actions, className }) {
  return (
    <div className={cn("border-b bg-background", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between py-6">
        <div className="space-y-1">
          {title && <h1 className="text-3xl font-bold tracking-tight">{title}</h1>}
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
        {actions && <div className="flex gap-2">{actions}</div>}
      </div>
    </div>
  );
}

/**
 * PageContent - Contenedor para el contenido de la página
 * Principio: DRY - Evita repetir estilos de contenedor
 */
export function PageContent({ children, className }) {
  return (
    <div className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6", className)}>
      {children}
    </div>
  );
}