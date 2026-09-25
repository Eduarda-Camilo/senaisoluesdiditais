"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
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
  const { scrollYProgress } = useScroll({ target: section, offset: ["start 64px", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 0.25, 1], [0, 103, 103]);
  const markLayer = useRef<HTMLDivElement>(null);
  // O símbolo fica numa camada fixa, por baixo da seção de cases: some enquanto a
  // base do Hero sobe de 150px abaixo da tela até 15% acima da base dela, para já
  // estar quase invisível quando o topo dos cases passa por cima — senão a borda
  // da seção o cortaria ao meio. Medido em px da base do Hero (não em % da tela):
  // em telas altas o Hero sobra menos que 25% da tela, e o símbolo nasceria
  // meio apagado.
  const { scrollY } = useScroll();
  const markOpacity = useTransform(scrollY, () => {
    const el = section.current;
    if (!el) return 1;
    const vh = window.innerHeight;
    const below = el.getBoundingClientRect().bottom - vh;
    return Math.min(1, Math.max(0, (below + vh * 0.15) / (150 + vh * 0.15)));
  });

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
      <motion.div className={styles.copy} style={{ y: reduce ? 0 : copyY }}>
        <h1 id="hero-title" className="font-display font-extrabold">
          <span className={styles.senai}>SENAI</span>
          <span className={styles.solutions}>Soluções<br />Digitais</span>
        </h1>
        <p className={styles.tagline}>
          <span className="sr-only">Produtos digitais que transformam a indústria, a educação e negócios.</span>
          <span aria-hidden="true">Produtos digitais que<br />transformam <TypedWords active={entered} /></span>
        </p>
      </motion.div>
      <motion.div ref={markLayer} className={styles.markScroll} style={{ opacity: reduce ? 1 : markOpacity }}>
        <div className={styles.mark}><div className={styles.markVisual}><LogoMark3D intro={currentPhase === "loading"} /></div></div>
      </motion.div>
      </div>
    </section>
  );
}
