# Especificação Funcional — Integração com Redes Sociais (Exclusivo Plano Plus)

**Produto:** Cardápio Digital CONEXUS — Plano Plus (R$ 89,90/mês)  
**Diferencial comercial:** Recurso exclusivo do Plano Plus (não disponível no Plano Essencial).  
**Status:** Especificação funcional de referência para futuras implementações do Plano Plus.

---

## 1. Objetivo

Oferecer aos estabelecimentos contratantes do **Plano Plus** uma vitrine integrada de ícones clicáveis para acesso direto aos perfis oficiais das redes sociais do negócio diretamente a partir do cardápio digital, fortalecendo o relacionamento com clientes sem confundir com o botão funcional de envio de pedidos pelo WhatsApp.

## 2. Requisitos Funcionais

1. **Cadastro configurável no projeto:** Permitir inclusão, edição e remoção dos links oficiais das redes sociais na configuração estruturada do cardápio digital do estabelecimento.
2. **Sem limite artificial:** Não impor limite artificial à quantidade de redes sociais cadastradas.
3. **Renderização condicional:** Exibir apenas os ícones correspondentes às redes sociais efetivamente cadastradas e preenchidas (evitando ícones vazios ou quebrados).
4. **Plataformas suportadas:** Compatibilidade nativa com ícones dedicados para:
   - Instagram
   - Facebook
   - TikTok
   - YouTube
   - LinkedIn
   - Pinterest
   - Snapchat
   - X (Twitter)
   - Outras plataformas sociais mediante configuração de link e ícone correspondente.
5. **Abertura direta e segura:** Ao clicar ou tocar no ícone, abrir o perfil oficial em nova aba utilizando obrigatoriamente `target="_blank"` e `rel="noopener noreferrer"`.
6. **Separação clara de canais:** Manter a vitrine de redes sociais visualmente distinta do fluxo transacional de carrinho e envio de pedidos via WhatsApp.

## 3. Requisitos Não-Funcionais (UX, Acessibilidade e Performance)

- **Responsividade:** Layout adaptável em smartphones, tablets e desktops, com área de toque confortável (mínimo recomendado de 44×44 px).
- **Temas Light / Dark Mode:** Contraste adequado e consistente tanto no modo claro quanto no modo escuro.
- **Acessibilidade (WCAG):** Todos os links devem incluir `aria-label` descritivo (ex.: *"Acessar Instagram oficial de [Estabelecimento]"*) e SVGs decorativos com `aria-hidden="true"`.
- **Performance:** Ícones vetoriais SVG inline leves, sem dependência de bibliotecas externas pesadas.

## 4. Diferenciação Comercial entre Planos

| Recurso | Plano Essencial (R$ 49,90/mês) | Plano Plus (R$ 89,90/mês) |
| :--- | :---: | :---: |
| Carrinho interativo e pedidos via WhatsApp | ✓ Incluso | ✓ Incluso |
| Vitrine de redes sociais (ícones clicáveis) | Não disponível | ✓ Exclusivo Plus (sem limite de redes) |
