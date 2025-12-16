# Guía de shadcn/ui - Control Total

## 🎯 Conceptos Clave

**shadcn/ui NO es una librería NPM** - es un sistema que **copia el código a tu proyecto**. Tienes control absoluto.

## 📁 Estructura de Archivos

```
apps/web/
├── components/
│   └── ui/              ← Componentes de shadcn (EDITABLES)
│       ├── button.jsx   ← Código del botón
│       ├── card.jsx     ← Código de las tarjetas
│       ├── input.jsx    ← Código de inputs
│       ├── badge.jsx    ← Código de badges
│       └── label.jsx    ← Código de labels
├── lib/
│   └── utils.js         ← Función cn() para combinar clases
├── app/
│   └── globals.css      ← Variables CSS del tema
└── components.json      ← Configuración de shadcn
```

## 🎨 Cómo Personalizar

### 1. **Cambiar Colores del Tema**

Edita `apps/web/app/globals.css`:

```css
:root {
  --primary: oklch(0.205 0 0);  /* Cambia este valor */
  --destructive: oklch(0.577 0.245 27.325);
  /* etc... */
}
```

**Tip:** Usa [oklch.com](https://oklch.com) para generar colores OKLCH.

### 2. **Modificar un Componente**

Ejemplo: Agregar una variante personalizada al Button

```jsx
// apps/web/components/ui/button.jsx
const buttonVariants = cva(
  "inline-flex items-center...",
  {
    variants: {
      variant: {
        default: "bg-primary...",
        destructive: "bg-destructive...",
        // 👇 AGREGA TU VARIANTE AQUÍ
        custom: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
      },
      // ...
    }
  }
)
```

Luego úsala:
```jsx
<Button variant="custom">Mi botón personalizado</Button>
```

### 3. **Cambiar Estilos Globales de un Componente**

```jsx
// Ejemplo: apps/web/components/ui/card.jsx (línea 13)
function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        // 👆 Modifica estas clases como quieras
        className
      )}
      {...props}
    />
  );
}
```

## 🔧 Comandos Útiles

```bash
# Ver componentes disponibles
npx shadcn@latest add

# Agregar un componente
npx shadcn@latest add dialog

# Agregar múltiples componentes
npx shadcn@latest add select checkbox switch

# Ver diferencias si actualizas
npx shadcn@latest diff button
```

## 💡 Ejemplos Prácticos

### Crear una Variante de Color Personalizada

1. **Define el color en globals.css:**
```css
:root {
  --success: oklch(0.6 0.15 145);  /* Verde personalizado */
  --success-foreground: oklch(1 0 0);
}
```

2. **Mapea el color en @theme:**
```css
@theme inline {
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
}
```

3. **Úsalo en tus componentes:**
```jsx
<Button className="bg-success text-success-foreground">
  ¡Éxito!
</Button>
```

### Modificar el Radio de las Esquinas

```css
/* apps/web/app/globals.css */
:root {
  --radius: 0.625rem;  /* Cambia a 0 para cuadrado, 999px para redondeado */
}
```

## 🎯 Flujo de Trabajo Recomendado

1. **Instalar componente:**
   ```bash
   npx shadcn@latest add button
   ```

2. **Revisar el código generado:**
   - Abre `apps/web/components/ui/button.jsx`
   - Lee y entiende qué hace

3. **Personalizar si es necesario:**
   - Edita directamente el archivo
   - No hay restricciones

4. **Usar en tu app:**
   ```jsx
   import { Button } from "@/components/ui/button"

   <Button>Mi botón</Button>
   ```

## ⚡ Ventajas de Este Sistema

- ✅ **Control total** - El código está en tu proyecto
- ✅ **Sin sorpresas** - Ves exactamente qué hace
- ✅ **Personalizable** - Modifica lo que quieras
- ✅ **Sin dependencias** - No hay breaking changes
- ✅ **TypeScript/JSX** - Funciona con ambos
- ✅ **Tree-shaking** - Solo usas lo que importas

## 📚 Componentes Comunes

```bash
# UI Básica
npx shadcn@latest add button card input label badge

# Formularios
npx shadcn@latest add form select checkbox radio-group switch

# Navegación
npx shadcn@latest add tabs navigation-menu dropdown-menu

# Feedback
npx shadcn@latest add alert toast dialog sheet

# Layout
npx shadcn@latest add separator scroll-area aspect-ratio
```

## 🔍 Recursos

- Documentación oficial: https://ui.shadcn.com
- Explorador de componentes: https://ui.shadcn.com/docs/components
- Temas: https://ui.shadcn.com/themes
- Ejemplos: https://ui.shadcn.com/examples