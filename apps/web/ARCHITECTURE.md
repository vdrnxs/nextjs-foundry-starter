# Arquitectura del Proyecto - Principios SOLID y DRY

Esta aplicación está diseñada siguiendo principios SOLID y DRY para mantener el código mantenible, escalable y reutilizable.

## 📁 Estructura de Componentes

```
apps/web/
├── components/
│   ├── ui/              ← Componentes base de shadcn (editables)
│   ├── layout/          ← Componentes de layout reutilizables
│   │   ├── Sidebar.jsx
│   │   └── PageLayout.jsx
│   └── sections/        ← Componentes de sección reutilizables
│       └── Section.jsx
```

## 🎯 Principios Aplicados

### 1. **Single Responsibility Principle (SRP)**

Cada componente tiene una sola razón para cambiar:

- `Sidebar.Item` → Solo renderiza un item del sidebar
- `PageHeader` → Solo maneja el header de páginas
- `Section` → Solo organiza contenido con título/descripción

### 2. **Open/Closed Principle (OCP)**

Los componentes están abiertos a extensión pero cerrados a modificación:

```jsx
// ✅ Extensible mediante children y props
<Sidebar header={<CustomHeader />}>
  <Sidebar.Section title="Mi Sección">
    <Sidebar.Item {...} />
  </Sidebar.Section>
</Sidebar>

// ❌ No necesitas modificar el código interno
```

### 3. **Liskov Substitution Principle (LSP)**

Los componentes derivados pueden sustituir a sus padres:

```jsx
// Section es el padre
<Section title="..." description="...">
  {children}
</Section>

// GridSection puede reemplazar a Section manteniendo el contrato
<GridSection title="..." description="...">
  {children}
</GridSection>
```

### 4. **Dependency Inversion Principle (DIP)**

Los componentes dependen de abstracciones (children, props) no de implementaciones concretas:

```jsx
// PageLayout no sabe QUÉ sidebar recibe, solo que recibe uno
<PageLayout sidebar={<AnySidebar />}>
  <AnyContent />
</PageLayout>
```

### 5. **DRY (Don't Repeat Yourself)**

Código reutilizable en toda la aplicación:

```jsx
// ❌ Sin DRY - Repitiendo estilos
<div className="space-y-4">
  <h2 className="text-2xl font-bold">Título 1</h2>
  {/* contenido */}
</div>
<div className="space-y-4">
  <h2 className="text-2xl font-bold">Título 2</h2>
  {/* contenido */}
</div>

// ✅ Con DRY - Componente reutilizable
<Section title="Título 1">{/* contenido */}</Section>
<Section title="Título 2">{/* contenido */}</Section>
```

## 🧩 Componentes de Layout

### **1. PageLayout**

Estructura base de toda página con sidebar opcional.

```jsx
import { PageLayout, PageHeader, PageContent } from "@/components/layout/PageLayout";

<PageLayout sidebar={<Sidebar />}>
  <PageHeader title="Mi Página" description="Descripción" />
  <PageContent>
    {/* Tu contenido aquí */}
  </PageContent>
</PageLayout>
```

**Props:**
- `sidebar` (opcional) - Componente sidebar
- `children` - Contenido principal
- `className` - Clases adicionales

### **2. Sidebar**

Sidebar composable con header, footer y secciones.

```jsx
import { Sidebar } from "@/components/layout/Sidebar";

<Sidebar
  header={<div>Logo y título</div>}
  footer={<div>Usuario actual</div>}
>
  <Sidebar.Section title="Navegación">
    <Sidebar.Item icon={Home} label="Inicio" isActive onClick={...} />
    <Sidebar.Item icon={Settings} label="Config" onClick={...} />
  </Sidebar.Section>
</Sidebar>
```

**Props:**
- `header` - Contenido del header
- `footer` - Contenido del footer
- `children` - Secciones e items
- `className` - Clases adicionales

**Subcomponentes:**
- `Sidebar.Section` - Agrupa items relacionados
- `Sidebar.Item` - Item individual del menú

### **3. PageHeader**

Header consistente para todas las páginas.

```jsx
<PageHeader
  title="Dashboard"
  description="Bienvenido"
  actions={<Button>Nueva Acción</Button>}
/>
```

**Props:**
- `title` - Título de la página
- `description` - Descripción/subtítulo
- `actions` - Botones o acciones
- `className` - Clases adicionales

### **4. PageContent**

Contenedor estándar para contenido de página.

```jsx
<PageContent>
  <Section title="Mi Sección">
    {/* contenido */}
  </Section>
</PageContent>
```

## 📦 Componentes de Sección

### **1. Section**

Sección genérica con título y descripción.

```jsx
import { Section } from "@/components/sections/Section";

// Variante default
<Section title="Título" description="Descripción">
  {children}
</Section>

// Variante card
<Section title="Título" variant="card">
  {children}
</Section>
```

**Props:**
- `title` - Título de la sección
- `description` - Descripción
- `variant` - `"default"` o `"card"`
- `children` - Contenido
- `className` - Clases adicionales

### **2. GridSection**

Sección con grid responsive automático.

```jsx
import { GridSection } from "@/components/sections/Section";

<GridSection
  title="Proyectos"
  cols={{ default: 1, sm: 2, md: 3, lg: 4 }}
>
  {items.map(item => <Card key={item.id}>...</Card>)}
</GridSection>
```

**Props:**
- `title`, `description`, `className` (igual que Section)
- `cols` - Configuración de columnas por breakpoint
  ```js
  { default: 1, sm: 2, md: 3, lg: 4 }
  ```

### **3. SplitSection**

Sección dividida en 2 columnas con ratios configurables.

```jsx
import { SplitSection } from "@/components/sections/Section";

<SplitSection
  title="Configuración"
  ratio="1:2"
  left={<Form />}
  right={<Preview />}
/>
```

**Props:**
- `title`, `description`, `className` (igual que Section)
- `ratio` - `"1:1"`, `"1:2"`, o `"2:1"`
- `left` - Contenido columna izquierda
- `right` - Contenido columna derecha

## 🎨 Patrones de Uso

### **Patrón 1: Página Simple**

```jsx
export default function SimplePage() {
  return (
    <PageLayout sidebar={<MySidebar />}>
      <PageHeader title="Página Simple" />
      <PageContent>
        <Section title="Contenido">
          <p>Tu contenido aquí</p>
        </Section>
      </PageContent>
    </PageLayout>
  );
}
```

### **Patrón 2: Página con Grid**

```jsx
export default function GridPage() {
  const items = [/* tus items */];

  return (
    <PageLayout sidebar={<MySidebar />}>
      <PageHeader title="Grid" />
      <PageContent>
        <GridSection
          title="Items"
          cols={{ default: 1, md: 2, lg: 3 }}
        >
          {items.map(item => (
            <Card key={item.id}>
              {/* render item */}
            </Card>
          ))}
        </GridSection>
      </PageContent>
    </PageLayout>
  );
}
```

### **Patrón 3: Página con Formulario y Preview**

```jsx
export default function FormPage() {
  return (
    <PageLayout sidebar={<MySidebar />}>
      <PageHeader title="Editar" />
      <PageContent>
        <SplitSection
          title="Editor"
          ratio="1:1"
          left={<MyForm />}
          right={<MyPreview />}
        />
      </PageContent>
    </PageLayout>
  );
}
```

### **Patrón 4: Dashboard Completo**

```jsx
export default function Dashboard() {
  return (
    <PageLayout sidebar={<MySidebar />}>
      <PageHeader
        title="Dashboard"
        actions={<Button>Acción</Button>}
      />
      <PageContent>
        <div className="space-y-8">
          {/* Stats */}
          <GridSection
            title="Estadísticas"
            cols={{ default: 1, sm: 2, lg: 4 }}
          >
            {stats.map(stat => <StatCard {...stat} />)}
          </GridSection>

          {/* Split section */}
          <SplitSection
            title="Análisis"
            left={<Chart />}
            right={<Details />}
          />

          {/* Simple section */}
          <Section title="Actividad" variant="card">
            <ActivityList />
          </Section>
        </div>
      </PageContent>
    </PageLayout>
  );
}
```

## 🔧 Extensibilidad

### Crear Nuevos Tipos de Sección

Sigue el patrón existente:

```jsx
// components/sections/CustomSection.jsx
import { Section } from "./Section";
import { cn } from "@/lib/utils";

export function TimelineSection({ title, description, events, className }) {
  return (
    <Section title={title} description={description} className={className}>
      <div className="space-y-4">
        {events.map((event, i) => (
          <div key={i} className="flex gap-4">
            <div className="w-2 bg-primary rounded" />
            <div>{event.content}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
```

### Personalizar Sidebar

```jsx
// components/layout/MySidebar.jsx
import { Sidebar } from "@/components/layout/Sidebar";

export function MySidebar({ activeSection, onNavigate }) {
  return (
    <Sidebar
      header={<MyHeader />}
      footer={<MyFooter />}
    >
      {/* Tus secciones */}
    </Sidebar>
  );
}
```

## ✅ Beneficios de esta Arquitectura

1. **Mantenible** - Código organizado y predecible
2. **Reutilizable** - Componentes que funcionan en cualquier contexto
3. **Testeable** - Componentes pequeños y con responsabilidad única
4. **Escalable** - Fácil agregar nuevos features sin romper existentes
5. **Consistente** - UI uniforme en toda la aplicación
6. **Type-safe** - Fácil agregar TypeScript si lo necesitas

## 🚀 Próximos Pasos

1. Agrega más variantes a los componentes según necesites
2. Crea componentes de sección específicos (Timeline, Calendar, etc.)
3. Implementa routing entre secciones del sidebar
4. Agrega animaciones con Framer Motion
5. Implementa autenticación y estados de carga