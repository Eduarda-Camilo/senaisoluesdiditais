#!/usr/bin/env bash
# Copia os assets selecionados da pasta de materiais para public/.
# Fonte de verdade: "Hackathon Duda e Lucas/Páginas dos projetos - produtos" e "Logo SENAI Soluções Digitais".
# Reexecutável: sobrescreve os arquivos existentes.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/../Páginas dos projetos - produtos"
LOGOS="$ROOT/../Logo SENAI Soluções Digitais"
PUB="$ROOT/public"

cp_() { # cp_ <origem relativa a SRC> <destino relativo a PUB>
  mkdir -p "$PUB/$(dirname "$2")"
  cp "$SRC/$1" "$PUB/$2"
}

# ---- Marca ----
mkdir -p "$PUB/brand"
cp "$LOGOS/Cor=Branca, Tipo=Horizontal.svg"    "$PUB/brand/sd-horizontal-branco.svg"
cp "$LOGOS/Cor=Principal, Tipo=Horizontal.svg" "$PUB/brand/sd-horizontal-principal.svg"
cp "$LOGOS/Cor=Branca, Tipo=Logo.svg"          "$PUB/brand/sd-simbolo-branco.svg"
cp "$LOGOS/Cor=Principal, Tipo=Logo.svg"       "$PUB/brand/sd-simbolo-principal.svg"
cp "$LOGOS/Cor=Branca, Tipo=Vertical.svg"      "$PUB/brand/sd-vertical-branco.svg"

# ---- Cases: <slug>/cover.png + galeria + logo ----
G="elementos-graficos-revista"

cp_ "01-audioxp/$G/elementos-decorativos/tela-audioxp-ouvido-ondas-sonoras.png"        cases/audioxp/cover.png
cp_ "01-audioxp/$G/elementos-decorativos/tela-audioxp-anatomia-ouvido-menu.png"        cases/audioxp/g1.png
cp_ "01-audioxp/$G/elementos-decorativos/tela-audioxp-ouvido-aparelho-auditivo.png"    cases/audioxp/g2.png
cp_ "01-audioxp/$G/elementos-decorativos/tela-audioxp-ouvido-exposicao-ruido.png"      cases/audioxp/g3.png
cp_ "01-audioxp/$G/logo/logo-audioxp-verde.svg"                                        cases/audioxp/logo.svg

cp_ "02-ava-senai/$G/telas-ou-mockups/mosaico-telas-ava-senai.png"                     cases/ava-senai/cover.png
cp_ "02-ava-senai/$G/telas-ou-mockups/mockups-celulares-ava-senai.png"                 cases/ava-senai/g1.png
cp_ "02-ava-senai/$G/telas-ou-mockups/tela-meus-cursos.png"                            cases/ava-senai/g2.png
cp_ "02-ava-senai/$G/logo/logo-ava-senai-branco.svg"                                   cases/ava-senai/logo.svg

cp_ "03-crm/$G/telas-ou-mockups/mockups-telas-crm.png"                                 cases/crm/cover.png
cp_ "03-crm/$G/logo/logo-crm-branco.svg"                                               cases/crm/logo.svg

cp_ "04-devstart/$G/telas-ou-mockups/mosaico-telas-devstart.png"                       cases/devstart/cover.png
cp_ "04-devstart/$G/telas-ou-mockups/tela-pre-cadastro-devstart.png"                   cases/devstart/g1.png
cp_ "04-devstart/$G/telas-ou-mockups/tela-teste-de-nivelamento.png"                    cases/devstart/g2.png
cp_ "04-devstart/$G/logo/logo-devstart-degrade.svg"                                    cases/devstart/logo.svg

cp_ "05-dw/$G/elementos-decorativos/diagrama-arquitetura-plataforma-de-dados.svg"      cases/dw/cover.svg
cp_ "05-dw/$G/logo/logo-dw-branco.svg"                                                 cases/dw/logo.svg

cp_ "06-e-commerce/$G/telas-ou-mockups/mockup-catalogo-cursos-inclinado-esquerda.png"  cases/e-commerce/cover.png
cp_ "06-e-commerce/$G/telas-ou-mockups/mockup-tela-entrar-ou-criar-conta.png"          cases/e-commerce/g1.png
cp_ "06-e-commerce/$G/telas-ou-mockups/mockup-curso-manutencao-de-computadores.png"    cases/e-commerce/g2.png
cp_ "06-e-commerce/$G/telas-ou-mockups/mockup-pagina-inicial-promocao-inclinado-esquerda.png" cases/e-commerce/g3.png

cp_ "07-eleva/$G/telas-ou-mockups/mosaico-telas-eleva.png"                             cases/eleva/cover.png
cp_ "07-eleva/$G/telas-ou-mockups/mockups-celulares-eleva.png"                         cases/eleva/g1.png
cp_ "07-eleva/$G/logo/logo-eleva-educacao-corporativa-branco.svg"                      cases/eleva/logo.svg

cp_ "08-espaco-do-estudante/$G/telas-ou-mockups/mosaico-telas-espaco-do-estudante.png" cases/espaco-do-estudante/cover.png
cp_ "08-espaco-do-estudante/$G/telas-ou-mockups/mockup-tela-login-espaco-do-estudante.png" cases/espaco-do-estudante/g1.png
cp_ "08-espaco-do-estudante/$G/telas-ou-mockups/mockups-celulares-agenda-e-notas.png"  cases/espaco-do-estudante/g2.png
cp_ "08-espaco-do-estudante/$G/logo/logo-espaco-do-estudante-branco.svg"               cases/espaco-do-estudante/logo.svg

cp_ "09-itinerarios-nacionais/$G/telas-ou-mockups/mosaico-telas-itinerarios-nacionais.png" cases/itinerarios-nacionais/cover.png
cp_ "09-itinerarios-nacionais/$G/telas-ou-mockups/mockup-painel-graficos-e-tabela-02.png"  cases/itinerarios-nacionais/g1.png
cp_ "09-itinerarios-nacionais/$G/logo/logo-itinerarios-nacionais-colorido.svg"         cases/itinerarios-nacionais/logo.svg

cp_ "10-lab-digital/$G/telas-ou-mockups/011/mockup-tablet-simulador-bancada-eletrica.png" cases/lab-digital/cover.png
cp_ "10-lab-digital/$G/telas-ou-mockups/mockup-tela-painel-de-atividades.png"          cases/lab-digital/g1.png
cp_ "10-lab-digital/$G/telas-ou-mockups/mockup-tela-login-laboratorio-digital.png"     cases/lab-digital/g2.png

cp_ "11-nr-10-sesi/$G/elementos-decorativos/tela-simulador-subestacao-eletrica.png"    cases/nr-10/cover.png
cp_ "11-nr-10-sesi/$G/elementos-decorativos/tela-simulador-transformador-eletrico.png" cases/nr-10/g1.png
cp_ "11-nr-10-sesi/$G/elementos-decorativos/tela-simulador-selecao-equipamentos-exterior.png" cases/nr-10/g2.png
cp_ "11-nr-10-sesi/$G/elementos-decorativos/modelo-3d-painel-eletrico-baixa-tensao.png" cases/nr-10/g3.png

cp_ "12-orbie/$G/elementos-decorativos/conjunto-mockups-celulares-orbie.png"           cases/orbie/cover.png
cp_ "12-orbie/$G/elementos-decorativos/mockup-celular-perfil-e-conquistas.png"         cases/orbie/g1.png
cp_ "12-orbie/$G/elementos-decorativos/mockup-celular-classificacao-jogadores.png"     cases/orbie/g2.png
cp_ "12-orbie/$G/logo/logo-orbie-colorido.svg"                                         cases/orbie/logo.svg

cp_ "13-plataforma-habilita/$G/telas-ou-mockups/mockup-tela-listagem-empresas.png"     cases/habilita/cover.png
cp_ "13-plataforma-habilita/$G/telas-ou-mockups/mockup-tela-geracao-de-cartas.png"     cases/habilita/g1.png
cp_ "13-plataforma-habilita/$G/telas-ou-mockups/mockup-tela-opcoes-geracao-de-trilhas.png" cases/habilita/g2.png
cp_ "13-plataforma-habilita/$G/logo/logo-plataforma-habilita-branco-azul.svg"          cases/habilita/logo.svg

cp_ "14-saep-ia/$G/telas-ou-mockups/conjunto-mockups-telas-saep-ia.png"                cases/saep-ia/cover.png
cp_ "14-saep-ia/$G/telas-ou-mockups/mockup-tela-gerador-de-itens.png"                  cases/saep-ia/g1.png
cp_ "14-saep-ia/$G/telas-ou-mockups/mockup-tela-revisao-tecnica-assistida-por-ia.png"  cases/saep-ia/g2.png
cp_ "14-saep-ia/$G/telas-ou-mockups/mockup-tela-selecao-questoes-para-revisao.png"     cases/saep-ia/g3.png
cp_ "14-saep-ia/$G/logo/logo-saep-ia-branco-vermelho.svg"                              cases/saep-ia/logo.svg

cp_ "15-seif/$G/telas-ou-mockups/mockups-celulares-apresentacao-e-login-seif.png"      cases/seif/cover.png
cp_ "15-seif/$G/telas-ou-mockups/tela-painel-indicadores-trabalhadores.png"            cases/seif/g1.png
cp_ "15-seif/$G/logo/logo-seif-branco.svg"                                             cases/seif/logo.svg

cp_ "16-senai-space/$G/telas-ou-mockups/mockup-celular-senai-space-com-cartoes-flutuantes.png" cases/senai-space/cover.png
cp_ "16-senai-space/$G/telas-ou-mockups/mockup-celular-carro-realidade-aumentada.png"  cases/senai-space/g1.png
cp_ "16-senai-space/$G/elementos-decorativos/mosaico-cartoes-modelos-3d.png"           cases/senai-space/g2.png

echo "Assets copiados para $PUB"
du -sh "$PUB/cases" "$PUB/brand"
