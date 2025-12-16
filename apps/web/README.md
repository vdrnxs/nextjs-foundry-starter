# Proyecto Web - Estructura SOLID + DRY

Aplicación Next.js con arquitectura basada en componentes reutilizables siguiendo principios SOLID y DRY.

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
pnpm install

# Ejecutar en desarrollo
pnpm dev

# Build para producción
pnpm build
```

Abre [http://localhost:3000](http://localhost:3000) para ver la aplicación.

## 📚 Documentación

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Arquitectura completa del proyecto, principios SOLID, patrones de uso
- **[SHADCN_GUIDE.md](./SHADCN_GUIDE.md)** - Guía completa de shadcn/ui, personalización de componentes

## 📁 Estructura del Proyecto

```
apps/web/
├── app/                    # Next.js App Router
│   ├── page.js            # Página principal (ejemplo completo)
│   ├── layout.js          # Layout raíz
│   └── globals.css        # Estilos globales + variables de tema
├── components/
│   ├── ui/                # Componentes shadcn (EDITABLES)
│   │   ├── button.jsx
│   │   ├── card.jsx
│   │   ├── input.jsx
│   │   ├── badge.jsx
│   │   ├── label.jsx
│   │   ├── separator.jsx
│   │   ├── scroll-area.jsx
│   │   └── avatar.jsx
│   ├── layout/            # Componentes de layout
│   │   ├── Sidebar.jsx    # Sidebar reutilizable + composable
│   │   ├── PageLayout.jsx # Layout principal de página
│   │   └── index.js       # Exports
│   └── sections/          # Componentes de sección
│       ├── Section.jsx    # Section, GridSection, SplitSection
│       └── index.js       # Exports
├── lib/
│   └── utils.js           # Utilidades (función cn)
└── components.json        # Configuración de shadcn
```

## 🎯 Componentes Principales

### Layout Components

- **`PageLayout`** - Estructura base con sidebar opcional
- **`PageHeader`** - Header consistente para páginas
- **`PageContent`** - Contenedor de contenido
- **`Sidebar`** - Sidebar composable con secciones
- **`Sidebar.Section`** - Agrupa items del sidebar
- **`Sidebar.Item`** - Item individual del menú

### Section Components

- **`Section`** - Sección genérica con título/descripción
- **`GridSection`** - Sección con grid responsive
- **`SplitSection`** - Sección dividida en 2 columnas

### UI Components (shadcn)

Todos editables en `components/ui/`:
- Button, Card, Input, Label, Badge
- Separator, ScrollArea, Avatar

## 💡 Ejemplo Rápido

```jsx
import { PageLayout, PageHeader, PageContent } from "@/components/layout";
import { Section, GridSection } from "@/components/sections";
import { Card, Button } from "@/components/ui";

export default function MyPage() {
  return (
    <PageLayout sidebar={<MySidebar />}>
      <PageHeader title="Mi Página" />
      <PageContent>
        <GridSection
          title="Mis Items"
          cols={{ default: 1, md: 2, lg: 3 }}
        >
          {items.map(item => (
            <Card key={item.id}>
              {/* contenido */}
            </Card>
          ))}
        </GridSection>
      </PageContent>
    </PageLayout>
  );
}
```

## 🎨 Personalización

### Cambiar Colores

Edita las variables CSS en `app/globals.css`:

```css
:root {
  --primary: oklch(0.5 0.2 250);  /* Azul */
  --destructive: oklch(0.577 0.245 27.325);  /* Rojo */
}
```

Usa [oklch.com](https://oklch.com) para generar colores.

### Modificar Componentes

Los componentes de shadcn están en tu código, modifícalos directamente:

```jsx
// components/ui/button.jsx
const buttonVariants = cva(
  "...",
  {
    variants: {
      variant: {
        default: "...",
        // Agrega tu variante aquí
        custom: "bg-gradient-to-r from-purple-500 to-pink-500",
      }
    }
  }
)
```

### Agregar Componentes de shadcn

```bash
# Ver disponibles
npx shadcn@latest add

# Agregar componentes
npx shadcn@latest add dialog select checkbox
```

## 🏗️ Principios de Diseño

Esta aplicación sigue:

- ✅ **SOLID** - Single Responsibility, Open/Closed, Liskov Substitution, etc.
- ✅ **DRY** - Don't Repeat Yourself
- ✅ **Composición** - Componentes pequeños y componibles
- ✅ **Consistencia** - UI uniforme en toda la app

Ver [ARCHITECTURE.md](./ARCHITECTURE.md) para detalles completos.

## 📖 Recursos

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Docs](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)

## 🔥 Features Incluidos

- ✅ Sidebar responsive y composable
- ✅ Layout de página consistente
- ✅ Componentes de sección reutilizables
- ✅ Grid responsive automático
- ✅ Split sections (columnas configurables)
- ✅ Tema dark/light configurado
- ✅ Componentes shadcn editables
- ✅ Iconos Lucide incluidos
