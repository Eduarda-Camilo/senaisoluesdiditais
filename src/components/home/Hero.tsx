"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { LogoMark3D } from "./LogoMark3D";
import { hasEnteredSite } from "@/lib/site-entry";
import styles from "./Hero.module.css";

const words = ["a indústria", "a educação", "negócios"];

function TypedWords({ active }: { active: boolean }) {
  const reduce = useReducedMotion();
  const [text, setText] = useState(words[0]);
  useEffect(() => {
    if (!active || reduce) return;
    let index = 0;
    let length = words[0].length;
    let deleting = true;
    let timer: ReturnType<typeof setTimeout>;
    function tick() {
      length += deleting ? -1 : 1;
      setText(words[index].slice(0, length));
      let delay = deleting ? 55 : 110;
      if (length === 0) {
        deleting = false;
        index = (index + 1) % words.length;
        delay = 320;
      } else if (length === words[index].length) {
        deleting = true;
        delay = 2200;
      }
      timer = setTimeout(tick, delay);
    }
    timer = setTimeout(tick, 2200);
    return () => clearTimeout(timer);
  }, [active, reduce]);
  return <span className={styles.wordSlot}><span className={styles.word}>{text}</span></span>;
}

export function Hero() {
  const section = useRef<HTMLElement>(null);
  // A abertura só toca no primeiro carregamento da visita; voltando à home por um
  // link interno, o Hero já nasce pronto (lib/site-entry.ts). Na hidratação da
  // primeira página a marca ainda é falsa, então servidor e cliente concordam.
  const [skipIntro] = useState(hasEnteredSite);
  const [progress, setProgress] = useState(skipIntro ? 100 : 0);
  const [phase, setPhase] = useState(skipIntro ? "ready" : "loading");
  const reduce = useReducedMotion();
  const entered = phase === "ready" || !!reduce;
  const currentPhase = reduce ? "ready" : phase;
  const markLayer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = section.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (markLayer.current) markLayer.current.style.visibility = entry.isIntersecting ? "visible" : "hidden";
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduce || skipIntro) return;
    const started = performance.now();
    let frame = 0;
    const update = () => {
      const elapsed = performance.now() - started;
      // Reach 100% slightly before the four-second intro ends.
      setProgress(Math.min(100, Math.floor(elapsed / 38)));
      if (elapsed < 4000) frame = requestAnimationFrame(update);
      else setPhase("growing");
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [reduce, skipIntro]);

  useEffect(() => {
    if (reduce || (phase !== "growing" && phase !== "moving")) return;
    const timer = setTimeout(() => setPhase(phase === "growing" ? "moving" : "ready"), phase === "growing" ? 700 : 650);
    return () => clearTimeout(timer);
  }, [phase, reduce]);

  return (
    <section ref={section} id="inicio" aria-labelledby="hero-title" className={styles.hero} data-entered={entered} data-phase={currentPhase}>
      <div className={styles.stage}><div className={styles.grid} aria-hidden="true" />
      <div className={styles.loadingGrid} aria-hidden="true" />
      {!entered && <span role="status" className="sr-only">Carregando experiência 3D</span>}
      {currentPhase === "loading" && <div className={styles.percentage} role="progressbar" aria-label="Carregamento" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>{progress}%</div>}
      {/* O texto fica parado enquanto o quadro está preso e sai com a seção — sem
          o deslocamento que o fazia descer e depois subir (pedido de 25/09). */}
      <div className={styles.copy}>
        <h1 id="hero-title" className="font-display font-extrabold">
          <span className={styles.senai}>SENAI</span>
          <span className={styles.solutions}>Soluções<br />Digitais</span>
        </h1>
        <p className={styles.tagline}>
          <span className="sr-only">Produtos digitais que transformam a indústria, a educação e negócios.</span>
          <span aria-hidden="true">Produtos digitais que<br />transformam <TypedWords active={entered} /></span>
        </p>
      </div>
      {/* O símbolo está no mesmo quadro do texto: fica parado junto com ele e sai
          com a seção, sem desbotar (pedido de 25/09). */}
      <div ref={markLayer} className={styles.markScroll}>
        <div className={styles.mark}><div className={styles.markVisual}><LogoMark3D intro={currentPhase === "loading"} /></div></div>
      </div>
      </div>
    </section>
  );
}
