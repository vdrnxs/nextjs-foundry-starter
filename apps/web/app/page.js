"use client";

import { useState } from "react";
import { Home, FileText, Settings, Users, BarChart3, Bell } from "lucide-react";
import { PageLayout, PageHeader, PageContent } from "@/components/layout/PageLayout";
import { Sidebar } from "@/components/layout/Sidebar";
import { Section, GridSection, SplitSection } from "@/components/sections/Section";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("dashboard");

  // Datos de ejemplo (normalmente vendrían de una API)
  const stats = [
    { label: "Total Usuarios", value: "2,543", change: "+12%" },
    { label: "Ingresos", value: "$45,231", change: "+8%" },
    { label: "Conversión", value: "3.24%", change: "-2%" },
    { label: "Proyectos Activos", value: "12", change: "+3" },
  ];

  return (
    <PageLayout
      sidebar={
        <Sidebar
          header={
            <div className="space-y-1">
              <h2 className="text-xl font-bold">Mi App</h2>
              <p className="text-xs text-muted-foreground">v1.0.0</p>
            </div>
          }
          footer={
            <div className="space-y-2">
              <div className="flex items-center gap-3 px-2">
                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xs font-semibold">JD</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">John Doe</p>
                  <p className="text-xs text-muted-foreground truncate">john@example.com</p>
                </div>
              </div>
            </div>
          }
        >
          <Sidebar.Section title="Principal">
            <Sidebar.Item
              icon={Home}
              label="Dashboard"
              isActive={activeSection === "dashboard"}
              onClick={() => setActiveSection("dashboard")}
            />
            <Sidebar.Item
              icon={BarChart3}
              label="Analíticas"
              isActive={activeSection === "analytics"}
              onClick={() => setActiveSection("analytics")}
            />
            <Sidebar.Item
              icon={Users}
              label="Usuarios"
              isActive={activeSection === "users"}
              onClick={() => setActiveSection("users")}
            />
          </Sidebar.Section>

          <Sidebar.Section title="Gestión">
            <Sidebar.Item
              icon={FileText}
              label="Documentos"
              isActive={activeSection === "documents"}
              onClick={() => setActiveSection("documents")}
            />
            <Sidebar.Item
              icon={Settings}
              label="Configuración"
              isActive={activeSection === "settings"}
              onClick={() => setActiveSection("settings")}
            />
          </Sidebar.Section>
        </Sidebar>
      }
    >
      <PageHeader
        title="Dashboard"
        description="Bienvenido a tu panel de control"
        actions={
          <>
            <Button variant="outline" size="icon">
              <Bell className="size-4" />
            </Button>
            <Button>Nueva Acción</Button>
          </>
        }
      />

      <PageContent>
        <div className="space-y-8">
          {/* Sección de Estadísticas - Grid */}
          <GridSection
            title="Resumen"
            description="Métricas principales de tu negocio"
            cols={{ default: 1, sm: 2, lg: 4 }}
          >
            {stats.map((stat, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardDescription>{stat.label}</CardDescription>
                  <CardTitle className="text-3xl">{stat.value}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge variant={stat.change.startsWith("+") ? "default" : "secondary"}>
                    {stat.change}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </GridSection>

          {/* Sección Dividida - Formulario y Preview */}
          <SplitSection
            title="Configuración Rápida"
            description="Actualiza tu información básica"
            ratio="1:1"
            left={
              <Card>
                <CardHeader>
                  <CardTitle>Formulario</CardTitle>
                  <CardDescription>Edita tus datos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input id="name" placeholder="Tu nombre" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="tu@email.com" />
                  </div>
                  <Button className="w-full">Guardar Cambios</Button>
                </CardContent>
              </Card>
            }
            right={
              <Card>
                <CardHeader>
                  <CardTitle>Vista Previa</CardTitle>
                  <CardDescription>Así se verá tu perfil</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="size-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600" />
                      <div>
                        <p className="font-semibold">John Doe</p>
                        <p className="text-sm text-muted-foreground">john@example.com</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Los cambios se aplicarán inmediatamente después de guardar.
                    </p>
                  </div>
                </CardContent>
              </Card>
            }
          />

          {/* Sección Simple - Actividad Reciente */}
          <Section
            title="Actividad Reciente"
            description="Últimas acciones en tu cuenta"
            variant="card"
          >
            <div className="space-y-4">
              {[
                { action: "Nuevo usuario registrado", time: "Hace 5 min" },
                { action: "Documento actualizado", time: "Hace 1 hora" },
                { action: "Configuración modificada", time: "Hace 3 horas" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm">{item.action}</span>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* Sección de Grid con Cards personalizadas */}
          <GridSection
            title="Proyectos Destacados"
            description="Tus proyectos más importantes"
            cols={{ default: 1, md: 2, lg: 3 }}
          >
            {["Proyecto Alpha", "Proyecto Beta", "Proyecto Gamma"].map((project, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle>{project}</CardTitle>
                  <CardDescription>Estado: En progreso</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Progreso</span>
                      <span>{(i + 1) * 30}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${(i + 1) * 30}%` }}
                      />
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Ver Detalles
                  </Button>
                </CardContent>
              </Card>
            ))}
          </GridSection>
        </div>
      </PageContent>
    </PageLayout>
  );
}