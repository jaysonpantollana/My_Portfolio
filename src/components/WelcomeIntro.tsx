import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Terminal, User, Github, Globe } from "lucide-react";

type Phase = "loading" | "reveal" | "settle" | "exit";

interface WelcomeIntroProps {
  /** Called when the site content should be mounted beneath the overlay. */
  onReveal: () => void;
  /** Called when the overlay has finished exiting and can unmount. */
  onDone: () => void;
}

/** power2.in — mirrors the reference intro's exit easing. */
const EASE_IN: [number, number, number, number] = [0.55, 0.055, 0.675, 0.19];
/** Smooth ease for the staggered part reveal. */
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const GLOW = "drop-shadow(0 0 28px rgba(251, 188, 0, 0.16))";

const filterAt = (blur: number, glow: boolean) =>
  `blur(${blur}px)${glow ? ` ${GLOW}` : ""}`;

/**
 * Decides whether the welcome intro should play on this page load.
 * Mirrors the reference site's gate: home route only, once per session,
 * never under reduced motion, forced with ?intro=play / skipped with ?intro=off.
 */
export function shouldPlayIntro(): boolean {
  if (typeof window === "undefined") return false;

  const path = window.location.pathname.replace(/\/index\.html$/, "") || "/";
  if (path !== "/") return false;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return false;
  }

  const param = new URLSearchParams(window.location.search).get("intro");
  if (param === "play" || param === "fast") return true;
  if (param === "off") return false;
  if (typeof navigator !== "undefined" && navigator.webdriver) return false;

  try {
    if (window.sessionStorage.getItem("intro-seen")) return false;
  } catch {
    // Storage unavailable (private mode) — play anyway.
  }
  return true;
}

export default function WelcomeIntro({ onReveal, onDone }: WelcomeIntroProps) {
  const reduced = useReducedMotion();
  const [fast] = useState(
    () => new URLSearchParams(window.location.search).get("intro") === "fast",
  );

  const [phase, setPhase] = useState<Phase>("loading");
  const [progress, setProgress] = useState(0);
  const [loaderDone, setLoaderDone] = useState(false);
  const [settled, setSettled] = useState(false);
  const [skipping, setSkipping] = useState(false);

  const timersRef = useRef<number[]>([]);
  const rafRef = useRef(0);
  const startedRef = useRef(false);
  const finishedRef = useRef(false);
  const onRevealRef = useRef(onReveal);
  const onDoneRef = useRef(onDone);

  // Keep the latest callbacks without re-running the timeline.
  useEffect(() => {
    onRevealRef.current = onReveal;
    onDoneRef.current = onDone;
  });

  const skip = useCallback(() => {
    if (finishedRef.current) return;
    timersRef.current.forEach((id) => clearTimeout(id));
    timersRef.current = [];
    cancelAnimationFrame(rafRef.current);

    setSkipping(true);
    setLoaderDone(true);
    setProgress(100);
    setPhase("exit");

    document.body.style.overflow = "";
    onRevealRef.current();

    window.setTimeout(() => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      onDoneRef.current();
    }, 700);
  }, []);

  // Escape key skips, matching the reference intro.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") skip();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [skip]);

  useEffect(() => {
    if (reduced) {
      onRevealRef.current();
      onDoneRef.current();
      return;
    }

    startedRef.current = false;
    const timers: number[] = [];
    timersRef.current = timers;
    let raf = 0;
    let cancelled = false;

    const at = (ms: number, fn: () => void) => {
      timers.push(window.setTimeout(fn, ms));
    };

    try {
      window.sessionStorage.setItem("intro-seen", "1");
    } catch {
      // Ignore storage failures.
    }
    document.body.style.overflow = "hidden";

    // Preload the hero image the page will use when it is revealed.
    const preload = new Image();
    preload.src = "/home/profile.png";

    let assetsDone = false;
    const markAssets = () => {
      assetsDone = true;
    };
    Promise.all([
      (document as Document & { fonts?: FontFaceSet }).fonts?.ready ??
        Promise.resolve(),
      new Promise<void>((resolve) => {
        preload.onload = () => resolve();
        preload.onerror = () => resolve();
      }),
    ]).then(markAssets, markAssets);
    at(4000, markAssets);

    const duration = fast ? 550 : 1500;
    const start = performance.now();

    const beginSequence = () => {
      if (startedRef.current || cancelled) return;
      startedRef.current = true;

      const scale = fast ? 0.45 : 1;
      const holdReveal = 1400 * scale;
      const holdSettle = 1400 * scale;

      setLoaderDone(true);
      at(300, () => setPhase("reveal"));
      at(300 + holdReveal, () => setSettled(true));
      at(300 + holdReveal + holdSettle, () => setPhase("exit"));
      at(300 + holdReveal + holdSettle + 600, () => {
        document.body.style.overflow = "";
        onRevealRef.current();
      });
      at(300 + holdReveal + holdSettle + 1150, () => {
        if (finishedRef.current) return;
        finishedRef.current = true;
        onDoneRef.current();
      });
    };

    const tick = (now: number) => {
      if (cancelled) return;
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const cap = assetsDone ? 100 : 95;
      const next = Math.min(Math.round(eased * 100), cap);
      setProgress((p) => (p === next ? p : next));
      if (next >= 100) {
        beginSequence();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    rafRef.current = raf;

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      timers.forEach((id) => clearTimeout(id));
      if (document.body.style.overflow === "hidden") {
        document.body.style.overflow = "";
      }
    };
  }, [reduced, fast]);

  const showParts = phase !== "loading";
  const exiting = phase === "exit";

  const partAnim = (glow: boolean, exitRotate: number) =>
    exiting
      ? {
          opacity: 0,
          y: 52,
          rotate: exitRotate,
          filter: filterAt(4, glow),
        }
      : showParts
        ? { opacity: 1, y: 0, rotate: 0, filter: filterAt(0, glow) }
        : { opacity: 0, y: 44, rotate: 0, filter: filterAt(6, glow) };

  const partTransition = (revealDelay: number, exitDelay: number) =>
    exiting
      ? { duration: 0.6, delay: exitDelay, ease: EASE_IN }
      : { duration: 0.7, delay: showParts ? revealDelay : 0, ease: EASE_OUT };

  return (
    <motion.div
      id="intro-overlay"
      role="region"
      aria-label="Welcome intro"
      className={skipping ? "is-skipping" : undefined}
      initial={false}
      animate={{
        backgroundColor: exiting ? "rgba(19, 19, 19, 0)" : "rgba(19, 19, 19, 1)",
      }}
      transition={{
        duration: skipping ? 0.4 : 0.6,
        delay: exiting && !skipping ? 0.5 : 0,
        ease: "easeInOut",
      }}
    >
      <motion.div
        className="intro-stage"
        aria-hidden="true"
        initial={false}
        animate={exiting ? { y: "4%", opacity: 0 } : { y: "0%", opacity: 1 }}
        transition={
          exiting
            ? { duration: 0.8, delay: 0.3, ease: EASE_IN }
            : { duration: 0.3 }
        }
      >
        <div className="stage-glow" />
        <div className="stage-grid" />
      </motion.div>

      <div
        className={`intro-loader${loaderDone ? " is-done" : ""}`}
        aria-hidden="true"
      >
        <div className="led-eyes">
          <div className="led-eye" />
          <div className="led-eye" />
        </div>
        <p className="loader-pct">{progress}%</p>
      </div>

      <section className="intro-hero" aria-hidden="true">
        <div className={`hero-stack${settled ? " is-settled" : ""}`}>
          <motion.div
            className="hero-part hero-icons"
            data-part="icons"
            initial={{ opacity: 0, y: 44, filter: filterAt(6, false) }}
            animate={partAnim(false, 3)}
            transition={partTransition(0, 0.16)}
          >
            <span className="hero-icon">
              <Terminal strokeWidth={1.6} />
            </span>
            <span className="hero-icon">
              <User strokeWidth={1.6} />
            </span>
            <span className="hero-icon">
              <Github strokeWidth={1.6} />
            </span>
          </motion.div>

          <motion.div
            className="hero-part hero-title"
            data-part="title"
            initial={{ opacity: 0, y: 44, filter: filterAt(6, true) }}
            animate={partAnim(true, -3)}
            transition={partTransition(0.15, 0.08)}
          >
            <span className="hero-kicker">Welcome to my</span>
            <span className="hero-name">Portfolio</span>
          </motion.div>

          <motion.p
            className="hero-part hero-url"
            data-part="url"
            initial={{ opacity: 0, y: 44, filter: filterAt(6, false) }}
            animate={partAnim(false, 3)}
            transition={partTransition(0.3, 0)}
          >
            <Globe strokeWidth={1.6} />
            <span>jayson e. pantollana · msu-iit</span>
          </motion.p>
        </div>
      </section>

      <button type="button" className="intro-skip" onClick={skip}>
        Skip intro
      </button>
    </motion.div>
  );
}
