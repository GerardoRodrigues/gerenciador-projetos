export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "member"
}

export interface Project {
  id: string
  name: string
  description: string
}

export interface Task {
  id: string
  projectId: string
  title: string
  description: string
  status: "todo" | "in_progress" | "done"
  assigneeId?: string
}

export interface AuditLog {
  id: string
  action: string
  userId: string
  timestamp: string
}

export const db = {
  users: [
    { id: "u1", name: "Felipe", email: "felipe@example.com", role: "admin" },
    { id: "u2", name: "Ana", email: "ana@example.com", role: "member" },
  ] as User[],
  projects: [
    {
      id: "p1",
      name: "Plataforma de Ensino",
      description: "Novo LMS focado em rotas e sinais",
    },
    {
      id: "p2",
      name: "App Mobile",
      description: "Versão React Native do LMS",
    },
    {
      id: "p3",
      name: "Design System",
      description: "Biblioteca de componentes Angular",
    },
  ] as Project[],
  tasks: [
    {
      id: "t1",
      projectId: "p1",
      title: "Criar roteamento",
      description: "Setup inicial das rotas lazy loaded",
      status: "done",
      assigneeId: "u1",
    },
    {
      id: "t2",
      projectId: "p1",
      title: "Testes unitários",
      description: "Testar guards e resolvers com Vitest",
      status: "in_progress",
      assigneeId: "u2",
    },
    {
      id: "t3",
      projectId: "p1",
      title: "Deploy",
      description: "Configurar a pipeline de CI/CD e fazer deploy na Vercel",
      status: "todo",
    },
    {
      id: "t4",
      projectId: "p2",
      title: "Setup Expo",
      description: "Inicializar projeto Expo com TypeScript",
      status: "done",
      assigneeId: "u2",
    },
    {
      id: "t5",
      projectId: "p2",
      title: "Telas iniciais",
      description: "Criar telas de login e dashboard no app",
      status: "in_progress",
      assigneeId: "u2",
    },
    {
      id: "t6",
      projectId: "p1",
      title: "Autenticação Mocks",
      description: "Implementar simulação de login no Express",
      status: "done",
      assigneeId: "u1",
    },
    {
      id: "t7",
      projectId: "p1",
      title: "Kanban Board",
      description: "Desenvolver a UI do board com drag and drop",
      status: "todo",
      assigneeId: "u1",
    },
    {
      id: "t8",
      projectId: "p3",
      title: "Componente de Botão",
      description: "Criar botão base e variações",
      status: "done",
      assigneeId: "u2",
    },
    {
      id: "t9",
      projectId: "p3",
      title: "Documentação do Design",
      description: "Escrever README do Design System",
      status: "todo",
    },
    {
      id: "t10",
      projectId: "p3",
      title: "Testes de Acessibilidade",
      description: "Garantir que todos os componentes sejam acessíveis",
      status: "in_progress",
      assigneeId: "u1",
    },
    // Additional tasks for testing for p3
    {
      id: "t11",
      projectId: "p3",
      title: "Grid System",
      description: "Implementar sistema de grid responsivo",
      status: "done",
      assigneeId: "u2",
    },
    {
      id: "t12",
      projectId: "p3",
      title: "Color Palette",
      description: "Definir paleta de cores do design system",
      status: "in_progress",
      assigneeId: "u2",
    },
    {
      id: "t13",
      projectId: "p3",
      title: "Typography",
      description: "Definir tipografia e estilos de texto",
      status: "todo",
    },
    {
      id: "t14",
      projectId: "p3",
      title: "Iconography",
      description: "Criar conjunto de ícones para o design system",
      status: "done",
      assigneeId: "u1",
    },
    {
      id: "t15",
      projectId: "p3",
      title: "Button Variants",
      description: "Criar variantes de botões (primary, secondary, etc.)",
      status: "in_progress",
      assigneeId: "u2",
    },
    {
      id: "t16",
      projectId: "p3",
      title: "Form Components",
      description:
        "Desenvolver componentes de formulário (input, select, checkbox)",
      status: "todo",
    },
    {
      id: "t17",
      projectId: "p3",
      title: "Modal Component",
      description: "Criar componente de modal reutilizável",
      status: "done",
      assigneeId: "u1",
    },
    {
      id: "t18",
      projectId: "p3",
      title: "Notification System",
      description: "Implementar sistema de notificações",
      status: "in_progress",
      assigneeId: "u1",
    },
    {
      id: "t19",
      projectId: "p3",
      title: "Theme Switcher",
      description: "Adicionar funcionalidade de troca de tema (claro/escuro)",
      status: "todo",
    },
    {
      id: "t20",
      projectId: "p3",
      title: "Accessibility Testing",
      description: "Realizar testes de acessibilidade em todos os componentes",
      status: "done",
      assigneeId: "u2",
    },
  ] as Task[],
  auditLogs: [
    {
      id: "al1",
      action: "CREATE_WORKSPACE",
      userId: "u1",
      timestamp: new Date(Date.now() - 100000).toISOString(),
    },
    {
      id: "al2",
      action: "INVITE_USER",
      userId: "u1",
      timestamp: new Date(Date.now() - 80000).toISOString(),
    },
    {
      id: "al3",
      action: "CREATE_PROJECT",
      userId: "u1",
      timestamp: new Date(Date.now() - 50000).toISOString(),
    },
    {
      id: "al4",
      action: "INVITE_USER",
      userId: "u1",
      timestamp: new Date(Date.now() - 30000).toISOString(),
    },
    {
      id: "al5",
      action: "CREATE_PROJECT",
      userId: "u1",
      timestamp: new Date(Date.now() - 15000).toISOString(),
    },
    {
      id: "al6",
      action: "DELETE_TASK",
      userId: "u1",
      timestamp: new Date(Date.now() - 5000).toISOString(),
    },
  ] as AuditLog[],
}
