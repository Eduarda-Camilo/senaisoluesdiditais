"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { capabilities } from '@/content/capabilities';
import type { Case } from '@/content/types';
import { cardLayers } from './card-layers';
import { animateLayers, entryTransform } from './card-motion';
import styles from './AnimatedCaseCard.module.css';

export function AnimatedCaseCard({ c }: { c: Case }) {
  const root = useRef<HTMLAnchorElement>(null);
  const layers = cardLayers[c.slug];

  useEffect(() => {
    const element = root.current;
    if (!element || !layers) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    const touch = matchMedia('(hover: none)');
    const mobile = matchMedia('(max-width: 600px)');
    let hovered = false;
    let focused = false;
    let inView = false;
    let active = false;
    const update = (force = false) => {
      const show = hovered || focused || (touch.matches && inView);
      if (!force && show === active) return;
      active = show;
      animateLayers(element, layers, c.slug, show, reduce.matches);
    };
    const enter = (event: PointerEvent) => { if (event.pointerType !== 'touch') { hovered = true; update(); } };
    const leave = () => { hovered = false; update(); };
    const focus = () => { focused = element.matches(':focus-visible'); update(); };
    const blur = () => { focused = false; update(); };
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { hovered = false; focused = false; update(); element.blur(); }
    };
    const preference = () => update(true);
    const resize = () => {
      const width = element.getBoundingClientRect().width;
      element.style.setProperty('--art-scale', String(mobile.matches ? Math.min(.72, width / 470) : Math.min(1, width / 996)));
    };
    const sizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    }, { threshold: .15 });
    sizeObserver.observe(element);
    visibilityObserver.observe(element);
    resize();
    element.addEventListener('pointerenter', enter);
    element.addEventListener('pointerleave', leave);
    element.addEventListener('focus', focus);
    element.addEventListener('blur', blur);
    element.addEventListener('keydown', escape);
    reduce.addEventListener('change', preference);
    touch.addEventListener('change', preference);
    mobile.addEventListener('change', resize);
    return () => {
      sizeObserver.disconnect();
      visibilityObserver.disconnect();
      element.removeEventListener('pointerenter', enter);
      element.removeEventListener('pointerleave', leave);
      element.removeEventListener('focus', focus);
      element.removeEventListener('blur', blur);
      element.removeEventListener('keydown', escape);
      reduce.removeEventListener('change', preference);
      touch.removeEventListener('change', preference);
      mobile.removeEventListener('change', resize);
      element.querySelectorAll('[data-card-layer]').forEach(layer => layer.getAnimations().forEach(animation => animation.cancel()));
    };
  }, [c.slug, layers]);

  return (
    <li>
      <Link ref={root} href={`/cases/${c.slug}`} className={styles.card} data-case-slug={c.slug}>
        <span className={styles.copy}>
          <span className="font-display font-extrabold text-[2rem] leading-[0.9] text-fg">{c.name}</span>
          <span className="text-base leading-6 text-fg-body">{c.tagline}</span>
          {c.metrics && (
            <span className="flex flex-wrap gap-x-6 gap-y-1 text-sm leading-5">
              {c.metrics.slice(0, 3).map(m => (
                <span key={m.label} className="flex gap-[0.3125rem]">
                  <span className="font-display font-semibold text-fg whitespace-nowrap">{m.value}</span>
                  <span className="text-fg-body">{m.label}</span>
                </span>
              ))}
            </span>
          )}
          <span className="flex flex-wrap gap-2">
            {c.capabilities.map(slug => capabilities.find(capability => capability.slug === slug)?.name).filter(Boolean).map(name => (
              <span key={name} className="rounded-xs border border-fg px-1.5 py-1 text-xs leading-4 text-fg-body">{name}</span>
            ))}
          </span>
        </span>
        <span className={styles.art} aria-hidden="true">
          {layers?.map((layer, index) => (
            <span key={layer.src} data-card-layer={index} className={styles.layer} style={{
              left: layer.x, top: layer.y, width: layer.width, height: layer.height,
              zIndex: layer.zIndex ?? index + 1, transform: entryTransform(layer, index, c.slug),
            }}>
              <Image src={`/cases/animated/${encodeURIComponent(layer.src)}`} alt="" draggable={false}
                fill
                sizes={`${Math.ceil(layer.width)}px`} unoptimized className={styles.image} />
            </span>
          ))}
        </span>
      </Link>
    </li>
  );
}
