"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

/**
 * SidebarItem - Componente para items individuales del sidebar
 * Principio: Single Responsibility - Solo maneja la UI de un item
 */
function SidebarItem({ icon: Icon, label, isActive, onClick, className }) {
  return (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      className={cn(
        "w-full justify-start gap-3",
        isActive && "bg-secondary",
        className
      )}
      onClick={onClick}
    >
      {Icon && <Icon className="size-4" />}
      <span>{label}</span>
    </Button>
  );
}

/**
 * SidebarSection - Agrupa items relacionados con un título
 * Principio: Single Responsibility - Solo organiza secciones
 */
function SidebarSection({ title, children }) {
  return (
    <div className="space-y-2">
      {title && (
        <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {title}
        </h3>
      )}
      <div className="space-y-1">{children}</div>
    </div>
  );
}

/**
 * Sidebar - Componente principal del sidebar
 * Principio: Open/Closed - Abierto a extensión (children), cerrado a modificación
 */
export function Sidebar({ header, footer, children, className }) {
  return (
    <aside
      className={cn(
        "flex h-screen w-64 flex-col border-r bg-background",
        className
      )}
    >
      {/* Header del sidebar */}
      {header && (
        <>
          <div className="p-6">{header}</div>
          <Separator />
        </>
      )}

      {/* Contenido scrolleable */}
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-6">{children}</div>
      </ScrollArea>

      {/* Footer del sidebar */}
      {footer && (
        <>
          <Separator />
          <div className="p-4">{footer}</div>
        </>
      )}
    </aside>
  );
}

// Exportar subcomponentes para composición
Sidebar.Item = SidebarItem;
Sidebar.Section = SidebarSection;