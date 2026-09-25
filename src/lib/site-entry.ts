/**
 * "O visitante já entrou no site nesta visita?"
 *
 * A abertura do Hero (contador de 0 a 100% e o símbolo crescendo até o lugar) é
 * a porta de entrada do site: toca só no primeiro carregamento da página. Quando
 * o visitante volta à home por um link interno (navegação do Next, sem recarregar),
 * o Hero já nasce pronto — pedido de 25/09.
 *
 * Fica em memória, no módulo: vale até a página ser recarregada. `SiteEntry`
 * marca a entrada depois da primeira hidratação, de qualquer rota — quem entra
 * por /cases e depois vai para a home também não vê a abertura.
 */
let entered = false;

export function markSiteEntered() {
  entered = true;
}

export function hasEnteredSite() {
  return entered;
}
