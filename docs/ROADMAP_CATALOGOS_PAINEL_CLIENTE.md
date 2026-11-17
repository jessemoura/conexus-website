# Roadmap Futuro — Painel Administrativo Isolado por Cliente (Catálogos & Cardápios Digitais)

**Status:** Planejado para fase futura (**NÃO implementado nesta etapa comercial**).  
**Objetivo:** Manter a arquitetura atual simples, estática e de baixíssimo custo operacional na entrega inicial, registrando a especificação de evolução para autogestão segura pelos clientes contratantes.

---

## 1. Escopo da Melhoria Futura

Permitir que cada cliente autenticado gerencie diretamente o conteúdo do seu próprio catálogo ou cardápio digital, incluindo:

- Criação, edição, reordenação e remoção de **produtos e serviços**;
- Atualização de **preços**, promoções e disponibilidade;
- Edição de **descrições**, categorias e especificações;
- Upload e substituição otimizada de **imagens** (com conversão automática para WebP e validação de tamanho/formato);
- Gestão de links de **redes sociais** (para clientes do Plano Plus).

## 2. Requisitos Obrigatórios de Segurança e Controle de Acesso

1. **Isolamento multi-tenant rigoroso (Tenant Ownership):** cada cliente autenticado só poderá visualizar, editar e publicar dados vinculados exclusivamente ao seu `tenant_id` / estabelecimento, nunca acessando dados de outros clientes.
2. **Autenticação segura:** login protegido (e-mail/senha com hash forte ou OAuth/Magic Link), proteção contra força bruta, expiração de sessão e renovação segura de tokens.
3. **Autorização no servidor (RBAC + Row-Level Security):** validação obrigatória no backend/banco de dados de toda requisição de leitura e escrita (`owner_id === auth.uid()`), nunca confiando apenas em filtros no front-end.
4. **Validação e sanitização de entradas:** proteção contra XSS, injeção de código e upload de arquivos maliciosos (validação de MIME type real e limites de tamanho).
5. **Auditoria básica e recuperação:** registro de data/hora das alterações e histórico simplificado para evitar perda acidental de catálogo.
6. **Baixo custo operacional:** manter entrega pública via cache/CDN estático (revalidação sob demanda ao salvar alterações) para preservar máxima performance e custo mínimo de hospedagem.
