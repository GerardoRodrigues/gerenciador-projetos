# Compartilhamento de Dados entre Resolvers (Hierarquia Pai ➔ Filho)

Uma dúvida comum e fundamental ao trabalhar com `Resolvers` no Angular Router é:
> **Se para pegar as tarefas de um projeto (`projectTasksResolver`) eu precisar de dados do projeto que foi buscado na rota pai (`projectResolver`), é possível capturar a resposta desse primeiro resolver dentro do segundo?**

**Sim! É perfeitamente possível e é uma excelente prática arquitetural!** 

Isso funciona de forma nativa e limpa graças à estruturação em **hierarquia de rotas (Pai ➔ Filho)**.

---

## 1. Como o Angular Router executa Resolvers hierárquicos?

No roteador do Angular, a ordem de execução dos `resolvers` obedece rigorosamente a árvore de rotas:
> **Os Resolvers da rota PAI são executados e concluídos 100% ANTES que os Resolvers das rotas FILHAS comecem a rodar.**

Observe a estrutura do nosso arquivo `project.routes.ts`:

```typescript
export const PROJECT_ROUTES: Routes = [
  {
    path: '',
    resolve: { project: projectResolver }, // 1º PAREI AQUI: Resolve o Projeto (ROTA PAI)
    children: [
      {
        path: 'board',
        resolve: { tasks: projectTasksResolver }, // 2º SÓ RODA DEPOIS: Resolve as Tasks (ROTA FILHA)
        loadComponent: () => import('./board/board.component').then((m) => m.BoardComponent),
      }
    ]
  }
];
```

### O Fluxo de Navegação Passo a Passo (`/project/p1/board`):
1. **Início da Rota Pai:** O usuário entra em `/project/p1/board`. O roteador identifica a rota pai (`path: ''`) e executa o `projectResolver`.
2. **Armazenamento no Estado da Rota:** Assim que a API responde com os dados do projeto, o Angular armazena o retorno diretamente no objeto `data` da rota Pai:
   $$\text{route.parent.data} = \{ \text{project}: \{ \text{id}: \text{"p1"}, \text{name}: \text{"Plataforma de Ensino"}, \dots \} \}$$
3. **Acionamento da Rota Filha:** Somente após a conclusão bem-sucedida do passo anterior é que o Angular aciona o `projectTasksResolver` da rota filha (`board`).

---

## 2. Como capturar a resposta dentro de `projectTasksResolver`?

Como o projeto já foi resolvido e guardado na rota Pai, dentro do `projectTasksResolver` (que roda na rota filha) nós podemos acessar o objeto do projeto utilizando **`route.parent.data['project']`**:

```typescript
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Task, Project } from '../models';
import { ProjectService } from '../services/project.service';

export const projectTasksResolver: ResolveFn<Task[]> = (route) => {
  const projectService = inject(ProjectService);

  // 1. Acessamos o 'data' da Rota Pai, onde o projectResolver guardou o resultado!
  const resolvedProject: Project = route.parent?.data['project'];

  // 2. Usamos o ID (ou qualquer outro dado que veio do projeto) para buscar as tarefas:
  return projectService.getTasks(resolvedProject.id);
};
```

---

## 3. Alerta Arquitetural: O que NÃO funcionaria? ⚠️

Se tentássemos colocar **os dois resolutores no mesmo nível de rota (irmãos)** em vez de organizá-los como Pai e Filho, assim:

```typescript
{
  path: 'board',
  resolve: {
    project: projectResolver,
    tasks: projectTasksResolver // ❌ ERRO se tasks depender da conclusão de project
  }
}
```

**Isso falharia!** Quando dois ou mais resolvers são declarados dentro do mesmo objeto `resolve: { ... }`, o Angular aciona todos **simultaneamente em paralelo (`concorrência / Promise.all`)**. 
Ou seja, o `projectTasksResolver` começaria a rodar exatamente no mesmo milissegundo que o `projectResolver`, encontrando o `project` ainda vazio/indefinido.

### 📋 Resumo das Boas Práticas:
* **Resolvers no mesmo nível (Irmãos):** Rodam em paralelo (concorrentes). Use quando as requisições forem 100% independentes uma da outra.
* **Resolvers em níveis diferentes (Pai ➔ Filho):** Rodam sequencialmente (Pai termina primeiro, Filho depois). **Use sempre que o resolver filho precisar dos dados retornados pelo resolver pai!**
