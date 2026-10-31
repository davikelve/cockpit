# N. Monólito modular em NestJS

- Status: Aceita
- Data: 2026-10-31

## Contexto

documento 1, Arquitetura do backend → Estilo: monólito modular — produto de uma pessoa, deploy simples, domínios distintos (tarefas, foco, pessoas, decisões)

## Decisão

um deploy só, dividido em módulos Nest com fronteiras: cada módulo é dono das suas tabelas, dependência explícita no imports, controller fino

## Consequências

as três regras de fronteira do documento 1 viram regra de revisão de PR; ciclo entre módulos é defeito de desenho; um módulo poderia virar serviço depois, mas hoje não há rede entre eles
