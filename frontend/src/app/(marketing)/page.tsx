"use client";

import { forwardRef, useRef } from "react";
import Link from "next/link";
import { ReactLenis } from "lenis/react";
import {
    motion,
    useScroll,
    useTransform,
    useMotionValue,
    useSpring,
    useMotionTemplate,
    type Variants,
} from "motion/react";
import {
    GlobeIcon,
    ArrowUpRightIcon,
    ArrowUpIcon,
    ArrowDownIcon,
    SearchIcon,
    LayoutDashboardIcon,
    FolderOpenIcon,
    NetworkIcon,
    BellIcon,
    ZapIcon,
    SparklesIcon,
    ShieldCheckIcon,
    UserIcon,
    Building2Icon,
    CreditCardIcon,
    FileTextIcon,
    CheckIcon,
    AlertTriangleIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Marquee } from "@/components/ui/marquee";
import { DotPattern } from "@/components/ui/dot-pattern";
import { AnimatedBeam } from "@/components/ui/animated-beam";

/*
 * Palette — "Ink & Ivory"
 *   ink     #0b0b0d  (warm near-black, dark bands)
 *   ivory   #f4f2ec  (warm off-white, light bands)
 *   accent  amber-400/500 (gold — the single brand spark)
 *   risk viz keeps functional rose / amber / emerald
 */
const navLinks = [
    { label: "Platform", href: "#platform" },
    { label: "Detection", href: "#detection" },
    { label: "Analytics", href: "#analytics" },
    { label: "Pricing", href: "#pricing" },
];

const ease = [0.16, 1, 0.3, 1] as const; // easeOutExpo

export default function LandingPage() {
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const sx = useSpring(mx, { stiffness: 120, damping: 30 });
    const sy = useSpring(my, { stiffness: 120, damping: 30 });
    const spotlight = useMotionTemplate`radial-gradient(600px circle at ${sx}px ${sy}px, rgba(245,158,11,0.10), transparent 60%)`;

    const handleMouseMove = (e: React.MouseEvent) => {
        mx.set(e.clientX);
        my.set(e.clientY);
    };

    return (
        <ReactLenis root options={{ lerp: 0.09, smoothWheel: true }}>
            <div
                onMouseMove={handleMouseMove}
                className="relative min-h-screen bg-[#f4f2ec] text-stone-900"
            >
                {/* Mouse spotlight */}
                <motion.div
                    aria-hidden
                    className="pointer-events-none fixed inset-0 z-[1]"
                    style={{ background: spotlight }}
                />

                <Hero />
                <Showcase />
                <LiveStats />
                <Features />
                <FinalCta />
                <SiteFooter />
            </div>
        </ReactLenis>
    );
}

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */

function Logo({ light = false }: { light?: boolean }) {
    return (
        <Link href="/" className="flex items-center gap-2">
            <motion.div
                whileHover={{ rotate: 8, scale: 1.08 }}
                transition={{ type: "spring", stiffness: 300, damping: 12 }}
                className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-300 to-amber-500 text-sm font-bold text-stone-900 shadow-[0_4px_14px_-2px_rgba(245,158,11,0.5)]"
            >
                F
            </motion.div>
            <span
                className={cn(
                    "text-lg font-semibold tracking-tight",
                    light ? "text-white" : "text-stone-900"
                )}
            >
                FraudEx
            </span>
        </Link>
    );
}

function LaunchButton({
    big = false,
    light = false,
}: {
    big?: boolean;
    light?: boolean;
}) {
    return (
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
                href="/dashboard"
                className={cn(
                    "group relative inline-flex items-center gap-2 overflow-hidden rounded-full font-semibold shadow-sm",
                    light
                        ? "bg-amber-400 text-stone-950 shadow-[0_8px_24px_-6px_rgba(245,158,11,0.6)]"
                        : "bg-stone-950 text-white",
                    big ? "px-7 py-3.5 text-base" : "py-2 pl-2 pr-4 text-sm"
                )}
            >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                {!big && (
                    <span
                        className={cn(
                            "flex size-6 items-center justify-center rounded-full",
                            light ? "bg-stone-900/10" : "bg-white/15"
                        )}
                    >
                        <ArrowUpRightIcon className="size-3.5 transition-transform duration-300 group-hover:rotate-45" />
                    </span>
                )}
                Launch app
                {big && (
                    <ArrowUpRightIcon className="size-4 transition-transform duration-300 group-hover:rotate-45" />
                )}
            </Link>
        </motion.div>
    );
}

/* ------------------------------------------------------------------ */
/* Hero — DARK band                                                    */
/* ------------------------------------------------------------------ */

const lineContainer: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.028, delayChildren: 0.15 } },
};
const charVar: Variants = {
    hidden: { y: "115%", opacity: 0 },
    show: { y: "0%", opacity: 1, transition: { duration: 0.75, ease } },
};

function RevealLine({ text, className }: { text: string; className?: string }) {
    return (
        <span className={cn("inline-flex overflow-hidden pb-[0.12em]", className)}>
            {text.split("").map((c, i) => (
                <motion.span key={i} variants={charVar} className="inline-block whitespace-pre">
                    {c}
                </motion.span>
            ))}
        </span>
    );
}

function Hero() {
    return (
        <section className="relative z-10 overflow-hidden bg-[#0b0b0d] pb-40 text-white md:pb-52">
            {/* warm glow + subtle grid */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(90% 60% at 80% -10%, rgba(245,158,11,0.16), transparent 60%), radial-gradient(70% 50% at 0% 10%, rgba(255,255,255,0.05), transparent 60%)",
                }}
            />
            <motion.div
                aria-hidden
                className="pointer-events-none absolute -right-40 top-0 size-[560px] rounded-full bg-amber-500/15 blur-[130px]"
                animate={{ x: [0, -40, 0], y: [0, 40, 0], scale: [1, 1.12, 1] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
            <DotPattern
                width={26}
                height={26}
                className="text-white/[0.06] [mask-image:radial-gradient(90%_60%_at_50%_0%,white,transparent)]"
            />

            {/* Nav */}
            <motion.header
                initial={{ y: -24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease }}
                className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10"
            >
                <Logo light />
                <nav className="hidden items-center gap-8 md:flex">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="group relative text-sm font-medium uppercase tracking-wide text-white/60 transition-colors hover:text-white"
                        >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 h-px w-0 bg-amber-400 transition-all duration-300 group-hover:w-full" />
                        </a>
                    ))}
                </nav>
                <div className="flex items-center gap-4">
                    <button className="hidden items-center gap-1.5 text-sm font-medium text-white/60 transition-colors hover:text-white sm:flex">
                        <GlobeIcon className="size-4" />
                        English
                    </button>
                    <LaunchButton light />
                </div>
            </motion.header>

            {/* Hero content */}
            <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 pt-10 md:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-10">
                <div className="text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease }}
                        className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 backdrop-blur lg:mx-0"
                    >
                        <motion.span
                            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                            transition={{ duration: 1.8, repeat: Infinity }}
                            className="size-1.5 rounded-full bg-amber-400"
                        />
                        Live fraud intelligence
                    </motion.div>

                    <motion.h1
                        variants={lineContainer}
                        initial="hidden"
                        animate="show"
                        className="mt-6 flex flex-col text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl xl:text-7xl"
                    >
                        <RevealLine text="Detect fraud" />
                        <RevealLine
                            text="before it moves."
                            className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent"
                        />
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.6, ease }}
                        className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg lg:mx-0"
                    >
                        FraudEx scores every transaction, document, and entity the instant it
                        lands — and shows your team exactly why, in real time.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.72, ease }}
                        className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
                    >
                        <LaunchButton big light />
                        <motion.a
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            href="#platform"
                            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-base font-semibold text-white/90 backdrop-blur transition-colors hover:bg-white/10"
                        >
                            See how it works
                        </motion.a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.9 }}
                        className="mt-10 flex items-center justify-center gap-6 lg:justify-start"
                    >
                        <div className="text-left">
                            <div className="text-2xl font-semibold tracking-tight text-white">
                                <NumberTicker value={99.2} decimalPlaces={1} className="text-white" />
                                <span className="text-amber-400">%</span>
                            </div>
                            <p className="text-xs text-white/45">Detection precision</p>
                        </div>
                        <div className="h-8 w-px bg-white/15" />
                        <div className="text-left">
                            <div className="text-2xl font-semibold tracking-tight text-white">
                                <NumberTicker value={40} className="text-white" />
                                <span className="text-amber-400">ms</span>
                            </div>
                            <p className="text-xs text-white/45">Median scoring</p>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.94, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.35, ease }}
                >
                    <NetworkVisual />
                </motion.div>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/* Live detection network (AnimatedBeam)                               */
/* ------------------------------------------------------------------ */

const Node = forwardRef<
    HTMLDivElement,
    { children: React.ReactNode; className?: string; size?: "sm" | "lg" }
>(({ children, className, size = "sm" }, ref) => (
    <div
        ref={ref}
        className={cn(
            "z-10 flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)] backdrop-blur",
            size === "lg" ? "size-20" : "size-12",
            className
        )}
    >
        {children}
    </div>
));
Node.displayName = "Node";

function NetworkVisual() {
    const container = useRef<HTMLDivElement>(null);
    const s1 = useRef<HTMLDivElement>(null);
    const s2 = useRef<HTMLDivElement>(null);
    const s3 = useRef<HTMLDivElement>(null);
    const core = useRef<HTMLDivElement>(null);
    const flagged = useRef<HTMLDivElement>(null);
    const cleared = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={container}
            className="relative mx-auto flex h-[440px] w-full max-w-lg items-center justify-between rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm"
        >
            <DotPattern
                width={22}
                height={22}
                className="text-white/[0.07] [mask-image:radial-gradient(280px_circle_at_center,white,transparent)]"
            />

            {/* Sources */}
            <div className="relative z-10 flex flex-col justify-center gap-7">
                <Node ref={s1}>
                    <UserIcon className="size-5 text-white/70" />
                </Node>
                <Node ref={s2}>
                    <CreditCardIcon className="size-5 text-white/70" />
                </Node>
                <Node ref={s3}>
                    <Building2Icon className="size-5 text-white/70" />
                </Node>
            </div>

            {/* Core engine */}
            <div className="relative z-10 flex flex-col items-center justify-center">
                <motion.span
                    className="absolute -inset-3 rounded-3xl bg-amber-400/25 blur-xl"
                    animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.08, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <Node
                    ref={core}
                    size="lg"
                    className="border-none bg-gradient-to-br from-amber-300 to-amber-500 shadow-[0_10px_40px_-8px_rgba(245,158,11,0.6)]"
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                        <ShieldCheckIcon className="size-8 text-stone-900" />
                    </motion.div>
                </Node>
                <span className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-white/50">
                    FraudEx core
                </span>
            </div>

            {/* Outcomes */}
            <div className="relative z-10 flex flex-col justify-center gap-10">
                <div className="relative">
                    <Node ref={flagged} className="border-rose-400/40 bg-rose-500/10">
                        <FileTextIcon className="size-5 text-rose-300" />
                    </Node>
                    <motion.span
                        className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-rose-500 text-white"
                        animate={{ scale: [1, 1.25, 1] }}
                        transition={{ duration: 1.4, repeat: Infinity }}
                    >
                        <AlertTriangleIcon className="size-2.5" />
                    </motion.span>
                    <motion.div
                        initial={{ opacity: 0, x: 10, y: 6 }}
                        animate={{ opacity: [0, 1, 1, 0], x: [10, 0, 0, 10] }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            times: [0, 0.15, 0.8, 1],
                            ease,
                        }}
                        className="absolute left-full top-1/2 ml-3 hidden -translate-y-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-stone-900 px-3 py-2 shadow-xl sm:block"
                    >
                        <p className="text-[11px] font-semibold text-rose-400">Fraud flagged</p>
                        <p className="text-[10px] text-white/40">Risk score 94 · CS-4821</p>
                    </motion.div>
                </div>
                <Node ref={cleared} className="border-emerald-400/40 bg-emerald-500/10">
                    <CheckIcon className="size-5 text-emerald-300" />
                </Node>
            </div>

            {/* Beams: sources -> core (amber) */}
            <AnimatedBeam containerRef={container} fromRef={s1} toRef={core} curvature={40} duration={4} pathColor="#ffffff" pathOpacity={0.08} gradientStartColor="#f59e0b" gradientStopColor="#fcd34d" />
            <AnimatedBeam containerRef={container} fromRef={s2} toRef={core} duration={4} delay={0.6} pathColor="#ffffff" pathOpacity={0.08} gradientStartColor="#f59e0b" gradientStopColor="#fcd34d" />
            <AnimatedBeam containerRef={container} fromRef={s3} toRef={core} curvature={-40} duration={4} delay={1.2} pathColor="#ffffff" pathOpacity={0.08} gradientStartColor="#f59e0b" gradientStopColor="#fcd34d" />
            {/* Beams: core -> outcomes (semantic) */}
            <AnimatedBeam containerRef={container} fromRef={core} toRef={flagged} curvature={-30} duration={3.5} delay={0.3} pathColor="#ffffff" pathOpacity={0.08} gradientStartColor="#f43f5e" gradientStopColor="#fb7185" />
            <AnimatedBeam containerRef={container} fromRef={core} toRef={cleared} curvature={30} duration={3.5} delay={0.9} pathColor="#ffffff" pathOpacity={0.08} gradientStartColor="#10b981" gradientStopColor="#34d399" />
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Showcase — LIGHT band (preview floats up over the dark hero)        */
/* ------------------------------------------------------------------ */

function Showcase() {
    return (
        <section id="detection" className="relative z-10 bg-[#f4f2ec]">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
                <TiltPreview />

                <p className="mt-20 text-center text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
                    Everything your fraud team needs, in one workspace
                </p>
                <div className="relative mt-6 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
                    <Marquee pauseOnHover className="[--duration:32s]">
                        {marqueeItems.map((item) => (
                            <div
                                key={item}
                                className="mx-1 flex items-center gap-2 rounded-full border border-stone-200 bg-white px-5 py-2 text-sm font-medium text-stone-700 shadow-sm"
                            >
                                <SparklesIcon className="size-3.5 text-amber-500" />
                                {item}
                            </div>
                        ))}
                    </Marquee>
                </div>
            </div>
        </section>
    );
}

function TiltPreview() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

    const rotateX = useTransform(p, [0, 0.45], [22, 0]);
    const scale = useTransform(p, [0, 0.45], [0.9, 1]);
    const y = useTransform(p, [0, 1], [0, -40]);

    return (
        <div
            ref={ref}
            className="relative z-30 -mt-28 md:-mt-40"
            style={{ perspective: 1400 }}
        >
            <motion.div
                style={{ rotateX, scale, y, transformStyle: "preserve-3d" }}
                className="mx-auto overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-[0_50px_140px_-40px_rgba(11,11,13,0.55)] transform-gpu"
            >
                <DashboardPreview />
            </motion.div>
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-10 -bottom-6 -z-10 h-24 rounded-full bg-amber-500/20 blur-3xl"
            />
        </div>
    );
}

function DashboardPreview() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr]">
            <aside className="hidden flex-col gap-1 bg-[#0b0b0d] p-4 text-stone-300 md:flex">
                <div className="flex items-center gap-2 px-1 pb-4">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-300 to-amber-500 text-sm font-bold text-stone-900">
                        F
                    </div>
                    <div className="leading-tight">
                        <p className="text-sm font-semibold text-white">FraudEx</p>
                        <p className="text-[11px] text-stone-500">Intelligence Platform</p>
                    </div>
                </div>

                <div className="mb-3 flex items-center gap-2 rounded-md bg-white/5 px-2.5 py-2 text-xs text-stone-400">
                    <SearchIcon className="size-3.5" />
                    Search
                    <span className="ml-auto text-[10px] text-stone-600">⌘F</span>
                </div>

                {[
                    { icon: LayoutDashboardIcon, label: "Dashboard", active: true },
                    { icon: FolderOpenIcon, label: "Cases" },
                    { icon: NetworkIcon, label: "Entity Graph" },
                    { icon: BellIcon, label: "Alerts", badge: "4" },
                ].map((item) => (
                    <div
                        key={item.label}
                        className={cn(
                            "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm",
                            item.active ? "bg-amber-400/10 font-medium text-amber-300" : "text-stone-400"
                        )}
                    >
                        <item.icon className="size-4" />
                        {item.label}
                        {item.badge && (
                            <span className="ml-auto rounded bg-rose-500/20 px-1.5 text-[11px] font-medium text-rose-300">
                                {item.badge}
                            </span>
                        )}
                    </div>
                ))}
            </aside>

            <div className="bg-white p-6 sm:p-8">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-stone-400">
                    <ZapIcon className="size-3.5 text-amber-500" />
                    Total exposure monitored
                </div>

                <div className="mt-3 flex flex-wrap items-end gap-4">
                    <h2 className="text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
                        $<NumberTicker value={12480905} className="text-stone-900" />
                    </h2>
                    <span className="mb-1.5 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                        <ArrowUpIcon className="size-3" />
                        8.9% flagged
                    </span>
                    <span className="mb-1.5 text-xs text-stone-400">
                        vs previous period · $11.4M
                    </span>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                    {[
                        { label: "High risk cases", value: 142, dp: 0, tone: "rose", dir: "up" },
                        { label: "Avg risk score", value: 63.4, dp: 1, tone: "amber", dir: "down" },
                        { label: "Analyzed today", value: 1208, dp: 0, tone: "emerald", dir: "up" },
                    ].map((s) => (
                        <div key={s.label} className="rounded-xl border border-stone-100 bg-stone-50/70 p-3">
                            <p className="truncate text-[11px] font-medium uppercase tracking-wide text-stone-400">
                                {s.label}
                            </p>
                            <div className="mt-1 flex items-baseline gap-1.5">
                                <span className="text-xl font-semibold text-stone-900">
                                    <NumberTicker value={s.value} decimalPlaces={s.dp} className="text-stone-900" />
                                </span>
                                <span
                                    className={cn(
                                        "inline-flex items-center text-[11px] font-semibold",
                                        s.tone === "rose" && "text-rose-500",
                                        s.tone === "amber" && "text-amber-500",
                                        s.tone === "emerald" && "text-emerald-500"
                                    )}
                                >
                                    {s.dir === "up" ? (
                                        <ArrowUpIcon className="size-3" />
                                    ) : (
                                        <ArrowDownIcon className="size-3" />
                                    )}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 rounded-xl border border-stone-100 p-4">
                    <div className="mb-3 flex items-center justify-between">
                        <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">
                            Risk signals · last 30 days
                        </p>
                        <div className="flex items-center gap-2 text-[11px] font-medium text-stone-500">
                            <span className="flex items-center gap-1">
                                <span className="size-2 rounded-full bg-stone-900" />
                                Flagged
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="size-2 rounded-full bg-stone-300" />
                                Cleared
                            </span>
                        </div>
                    </div>
                    <motion.div
                        className="flex h-28 items-end gap-1.5"
                        variants={{ show: { transition: { staggerChildren: 0.025 } } }}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-60px" }}
                    >
                        {barHeights.map((h, i) => (
                            <div key={i} className="flex flex-1 flex-col justify-end gap-1">
                                <motion.div
                                    className="w-full origin-bottom rounded-sm bg-stone-900"
                                    style={{ height: `${h}%` }}
                                    variants={{
                                        hidden: { scaleY: 0, opacity: 0 },
                                        show: { scaleY: 1, opacity: 1, transition: { duration: 0.5, ease } },
                                    }}
                                />
                                <motion.div
                                    className="w-full origin-bottom rounded-sm bg-stone-200"
                                    style={{ height: `${Math.max(8, 60 - h)}%` }}
                                    variants={{
                                        hidden: { scaleY: 0, opacity: 0 },
                                        show: { scaleY: 1, opacity: 1, transition: { duration: 0.5, ease } },
                                    }}
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>

                <div className="mt-6 space-y-2">
                    {recentCases.map((c, i) => (
                        <motion.div
                            key={c.id}
                            initial={{ opacity: 0, x: -16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.1 * i, ease }}
                            className="flex items-center justify-between rounded-lg border border-stone-100 px-3 py-2.5"
                        >
                            <div className="flex items-center gap-3">
                                <span className="font-mono text-xs text-stone-400">{c.id}</span>
                                <span className="text-sm font-medium text-stone-700">{c.entity}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-sm tabular-nums text-stone-500">{c.amount}</span>
                                <span
                                    className={cn(
                                        "rounded-full px-2 py-0.5 text-[11px] font-semibold",
                                        c.risk === "High" && "bg-rose-50 text-rose-600",
                                        c.risk === "Medium" && "bg-amber-50 text-amber-600",
                                        c.risk === "Low" && "bg-emerald-50 text-emerald-600"
                                    )}
                                >
                                    {c.risk}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Live stats — DARK band                                              */
/* ------------------------------------------------------------------ */

const marqueeItems = [
    "Real-time scoring",
    "Explainable signals",
    "Entity resolution",
    "Anomaly models",
    "Document analysis",
    "Case management",
    "Vendor risk",
    "Alert routing",
];

const stats = [
    { value: 99.2, dp: 1, suffix: "%", label: "Detection precision" },
    { value: 40, dp: 0, suffix: "ms", label: "Median scoring latency" },
    { value: 2.4, dp: 1, suffix: "M", label: "Transactions / day" },
    { value: 63, dp: 0, suffix: "%", label: "Fewer false positives" },
];

function LiveStats() {
    return (
        <section id="analytics" className="relative z-10 mt-24 md:mt-32">
            <div className="relative overflow-hidden bg-[#0b0b0d] py-16 text-white md:py-20">
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(60% 80% at 50% 0%, rgba(245,158,11,0.12), transparent 60%)",
                    }}
                />
                <DotPattern
                    glow
                    className="text-white/10 [mask-image:radial-gradient(600px_circle_at_50%_50%,white,transparent)]"
                />
                <div className="relative mx-auto grid max-w-7xl gap-8 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
                    {stats.map((s, i) => (
                        <motion.div
                            key={s.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.08, ease }}
                            className="text-center sm:text-left"
                        >
                            <div className="text-4xl font-semibold tracking-tight md:text-5xl">
                                <NumberTicker value={s.value} decimalPlaces={s.dp} className="text-white" />
                                <span className="text-amber-400">{s.suffix}</span>
                            </div>
                            <p className="mt-2 text-sm text-white/45">{s.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/* Features — LIGHT band                                               */
/* ------------------------------------------------------------------ */

const features = [
    {
        icon: ZapIcon,
        title: "Real-time detection",
        body: "Score every transaction and document the moment it lands, before losses compound.",
    },
    {
        icon: ShieldCheckIcon,
        title: "Explainable AI",
        body: "Every risk flag comes with the signals behind it — no black boxes for your analysts.",
    },
    {
        icon: NetworkIcon,
        title: "Entity graphs",
        body: "Trace relationships across vendors, accounts, and cases to uncover coordinated fraud.",
    },
    {
        icon: BellIcon,
        title: "Smart alerts",
        body: "Rules and anomaly models route the cases that matter to the right investigator.",
    },
];

function Features() {
    return (
        <section id="platform" className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:py-32 lg:px-10">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
                className="mx-auto max-w-2xl text-center text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl"
            >
                Built for teams that can&apos;t afford to miss fraud
            </motion.h2>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {features.map((f, i) => (
                    <motion.div
                        key={f.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.5, delay: i * 0.1, ease }}
                        whileHover={{ y: -6 }}
                        className="group rounded-2xl border border-stone-200 bg-white p-6 transition-shadow hover:shadow-[0_24px_60px_-24px_rgba(11,11,13,0.35)]"
                    >
                        <motion.div
                            whileHover={{ rotate: -8, scale: 1.08 }}
                            transition={{ type: "spring", stiffness: 300, damping: 12 }}
                            className="flex size-11 items-center justify-center rounded-xl bg-stone-900 text-amber-300"
                        >
                            <f.icon className="size-5" />
                        </motion.div>
                        <h3 className="mt-4 text-base font-semibold text-stone-900">{f.title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-stone-500">{f.body}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/* Final CTA + Footer — DARK band                                      */
/* ------------------------------------------------------------------ */

function FinalCta() {
    return (
        <section
            id="pricing"
            className="relative z-10 overflow-hidden bg-[#0b0b0d] px-6 py-20 text-center text-white md:py-28"
        >
            <motion.div
                aria-hidden
                className="pointer-events-none absolute -top-20 left-1/2 size-80 -translate-x-1/2 rounded-full bg-amber-500/20 blur-3xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <DotPattern className="text-white/[0.05] [mask-image:radial-gradient(500px_circle_at_50%_40%,white,transparent)]" />
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
                className="relative mx-auto max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl"
            >
                Stop fraud before it costs you
            </motion.h2>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease }}
                className="relative mx-auto mt-4 max-w-xl text-white/55"
            >
                Launch the FraudEx workspace and watch risk light up in real time.
            </motion.p>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2, ease }}
                className="relative mt-8 flex justify-center"
            >
                <LaunchButton big light />
            </motion.div>
        </section>
    );
}

function SiteFooter() {
    return (
        <footer className="relative z-10 bg-[#0b0b0d] px-6 pb-10 text-white lg:px-10">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
                <div className="flex items-center gap-2 text-sm text-white/50">
                    <div className="flex size-6 items-center justify-center rounded-md bg-gradient-to-br from-amber-300 to-amber-500 text-[11px] font-bold text-stone-900">
                        F
                    </div>
                    FraudEx · Intelligence Platform
                </div>
                <p className="text-sm text-white/35">
                    © {new Date().getFullYear()} FraudEx. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const barHeights = [
    30, 45, 38, 52, 60, 48, 70, 55, 42, 65, 58, 72, 50, 63, 40, 55, 68, 47, 60,
    52, 44, 66, 58, 49,
];

const recentCases = [
    { id: "CS-4821", entity: "Meridian Holdings LLC", amount: "$482,000", risk: "High" },
    { id: "CS-4820", entity: "Northwind Logistics", amount: "$96,400", risk: "Medium" },
    { id: "CS-4819", entity: "Blue Harbor Traders", amount: "$18,250", risk: "Low" },
];
