import type { CardLayer } from './card-layers';

export const finalTransform = 'translate(0px, 0px) rotate(0deg) scale(1)';

export function entryTransform(layer: CardLayer, index: number, slug: string) {
  if (slug === 'ava-senai') {
    const distance = Math.max(340, 300 - layer.y);
    return `translate(${distance / Math.sqrt(3)}px, ${distance}px) rotate(0deg) scale(1)`;
  }
  if (slug === 'espaco-do-estudante') {
    return index === 0
      ? 'translate(330px, 0px) rotate(0deg) scale(1)'
      : 'translate(130px, 170px) rotate(6deg) scale(.94)';
  }
  const left = layer.x + layer.width / 2 < 720;
  return `translate(${left ? -96 : 104}px, ${index === 0 ? 56 : 86 + index * 10}px) rotate(${left ? -12 : 13}deg) scale(.78)`;
}

export function animateLayers(root: HTMLElement, layers: CardLayer[], slug: string, show: boolean, reduce: boolean) {
  const directional = slug === 'ava-senai' || slug === 'espaco-do-estudante';
  root.querySelectorAll<HTMLElement>('[data-card-layer]').forEach((element, index) => {
    const layer = layers[index];
    const computed = getComputedStyle(element);
    const entry = entryTransform(layer, index, slug);
    const current = { opacity: Number(computed.opacity), transform: computed.transform === 'none' ? entry : computed.transform };
    element.getAnimations().forEach(animation => animation.cancel());
    element.style.opacity = show ? '1' : '0';
    element.style.transform = show ? finalTransform : entry;
    if (reduce) return;
    const end = { opacity: 1, transform: finalTransform };
    const frames: Keyframe[] = show && directional ? [
      { ...current, easing: 'cubic-bezier(.22,.68,.24,1)' }, end,
    ] : show ? [
      { ...current, offset: 0, easing: 'cubic-bezier(.18,.75,.25,1)' },
      { opacity: 1, transform: `translate(${index % 2 ? -6 : 7}px, -7px) rotate(${index % 2 ? -2 : 2}deg) scale(1.025)`, offset: .76, easing: 'cubic-bezier(.3,0,.2,1)' },
      { ...end, offset: 1 },
    ] : [current, { opacity: 0, transform: entry }];
    element.animate(frames, {
      duration: show ? (directional ? 760 : index === 0 ? 650 : 540) : 190,
      delay: show ? (layer.order ?? index) * 70 : 0,
      fill: 'both',
    });
  });
}
