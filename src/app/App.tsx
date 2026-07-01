import React, { useState, useEffect, useRef, ReactNode } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import avltechLogo from "@/imports/24273.jpg";
import {
  Shield, Wrench, FileText, Truck, Activity, Star,
  Menu, X, ArrowRight, Check, Clock, Award, Users,
  Zap, Lock, Headphones, Globe, ChevronRight,
  Phone, Mail, MapPin, RefreshCw, Package,
  TrendingUp, BadgeCheck, Wifi, Instagram, Linkedin,
} from "lucide-react";

/* ── WhatsApp SVG (not in lucide) ───────────────────── */
function WhatsAppIcon({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

/* ── Helpers ─────────────────────────────────────────── */

function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [threshold]);
  return scrolled;
}

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    // Keep observing indefinitely so scroll-up reverses the animation
    const obs = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

type RevealDir = "up" | "left" | "right";
function Reveal({
  children, delay = 0, className = "", dir = "up", style = {}
}: { children: ReactNode; delay?: number; className?: string; dir?: RevealDir; style?: React.CSSProperties }) {
  const { ref, inView } = useInView();
  const from = dir === "left" ? "translateX(-32px)"
             : dir === "right" ? "translateX(32px)"
             : "translateY(28px)";
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : from,
        // Enter: spring easing with stagger delay. Exit: faster, no delay
        transition: inView
          ? `opacity 0.68s cubic-bezier(.22,1,.36,1) ${delay}ms, transform 0.68s cubic-bezier(.22,1,.36,1) ${delay}ms`
          : `opacity 0.38s ease 0ms, transform 0.38s ease 0ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const JK = { fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" };

/* ── Social links data ───────────────────────────────── */

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://instagram.com/avltech",
    hoverColor: "#E1306C",
    icon: ({ size }: { size: number }) => <Instagram size={size} />,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/avltech",
    hoverColor: "#0077B5",
    icon: ({ size }: { size: number }) => <Linkedin size={size} />,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/911800123285",
    hoverColor: "#25D366",
    icon: ({ size }: { size: number }) => <WhatsAppIcon size={size} color="currentColor" />,
  },
];

/* ── Nav ─────────────────────────────────────────────── */

function Nav() {
  const [open, setOpen] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  const links = [
    { label: "Services",     id: "services"     },
    { label: "About Us",     id: "about"        },
    { label: "How It Works", id: "how-it-works" },
    { label: "Partners",     id: "partners"     },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: "#ffffff",
      boxShadow: "0 1px 0 rgba(0,0,0,0.07), 0 2px 16px rgba(0,0,0,0.04)",
    }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto", padding: "0 28px",
        display: "flex", alignItems: "center", justifyContent: "space-between", height: 84,
      }}>
        {/* Logo */}
        <button onClick={() => scrollTo("hero")}
          style={{ border: "none", background: "none", cursor: "pointer", padding: 0, lineHeight: 0, flexShrink: 0 }}>
          <ImageWithFallback
            src={avltechLogo}
            alt="AVLTECH logo"
            style={{ height: 68, width: "auto", objectFit: "contain", mixBlendMode: "multiply", display: "block" }}
          />
        </button>

        {/* Desktop — center links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <button key={l.id} onClick={() => scrollTo(l.id)}
              style={{
                border: "none", background: "none", cursor: "pointer",
                fontSize: 14, fontWeight: 500, color: "#64748B",
                padding: "8px 14px", borderRadius: 10,
                transition: "color .2s ease, background .2s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = "#2F3A45"; e.currentTarget.style.background = "#F3F6F8"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#64748B"; e.currentTarget.style.background = "transparent"; }}>
              {l.label}
            </button>
          ))}
        </div>

        {/* Desktop — right: social + divider + CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Social icons — minimal, icon-only */}
          <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {SOCIALS.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                title={s.label}
                style={{
                  width: 34, height: 34, borderRadius: 9,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: hoveredSocial === s.label ? s.hoverColor : "#94A3B8",
                  background: hoveredSocial === s.label ? `${s.hoverColor}12` : "transparent",
                  textDecoration: "none",
                  transition: "color .22s ease, background .22s ease, transform .22s cubic-bezier(.22,1,.36,1)",
                  transform: hoveredSocial === s.label ? "translateY(-2px)" : "none",
                }}
                onMouseEnter={() => setHoveredSocial(s.label)}
                onMouseLeave={() => setHoveredSocial(null)}>
                <s.icon size={16} />
              </a>
            ))}
          </div>

          {/* Thin divider */}
          <div style={{ width: 1, height: 22, background: "#E2E8F0", margin: "0 4px" }} />

          <button style={{
            fontSize: 13, fontWeight: 600, color: "#64748B",
            padding: "8px 14px", borderRadius: 10, border: "none",
            background: "transparent", cursor: "pointer",
            transition: "color .2s ease, background .2s ease",
          }}
            onMouseEnter={e => { e.currentTarget.style.color = "#2F3A45"; e.currentTarget.style.background = "#F3F6F8"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#64748B"; e.currentTarget.style.background = "transparent"; }}>
            Sign In
          </button>

          <button style={{
            fontSize: 13, fontWeight: 700, color: "#1A3A52",
            padding: "9px 20px", borderRadius: 11, border: "none", cursor: "pointer",
            background: "linear-gradient(135deg, #A9D6F5, #7EC8F0)",
            transition: "transform .22s cubic-bezier(.22,1,.36,1), box-shadow .22s ease",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(169,214,245,.45)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
            Get Protected
          </button>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden" onClick={() => setOpen(!open)}
          style={{ border: "none", background: "none", cursor: "pointer", padding: 6, color: "#2F3A45" }}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div style={{
        overflow: "hidden",
        maxHeight: open ? 480 : 0,
        transition: "max-height .38s cubic-bezier(.22,1,.36,1)",
        background: "#ffffff",
        borderTop: open ? "1px solid #F0F4F8" : "none",
      }}>
        <div style={{ padding: "12px 28px 24px", display: "flex", flexDirection: "column" }}>
          {links.map(l => (
            <button key={l.id} onClick={() => { scrollTo(l.id); setOpen(false); }}
              style={{
                border: "none", borderBottom: "1px solid #F8FAFC", background: "none",
                textAlign: "left", fontSize: 15, fontWeight: 500, color: "#64748B",
                padding: "14px 0", cursor: "pointer", transition: "color .2s ease",
              }}
              onMouseEnter={e => e.currentTarget.style.color = "#2F3A45"}
              onMouseLeave={e => e.currentTarget.style.color = "#64748B"}>
              {l.label}
            </button>
          ))}

          {/* Mobile social */}
          <div style={{ display: "flex", gap: 10, margin: "16px 0" }}>
            {SOCIALS.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                title={s.label}
                style={{
                  width: 38, height: 38, borderRadius: 10, border: `1.5px solid ${s.hoverColor}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: s.hoverColor, background: `${s.hoverColor}10`,
                  textDecoration: "none", transition: "transform .2s ease",
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
                onMouseLeave={e => e.currentTarget.style.transform = ""}>
                <s.icon size={17} />
              </a>
            ))}
          </div>

          <button style={{
            fontSize: 14, fontWeight: 700, color: "#1A3A52",
            padding: "14px 0", borderRadius: 12, border: "none", cursor: "pointer",
            background: "linear-gradient(135deg, #A9D6F5, #7EC8F0)",
          }}>
            Get Protected
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ── Hero ─────────────────────────────────────────────── */

function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-[#FCFCFD]">
      {/* Ambient glow blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[15%] left-[10%] w-[600px] h-[500px] rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, #A9D6F5 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div className="absolute top-[40%] right-[5%] w-[500px] h-[400px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #CFFAFE 0%, transparent 70%)", filter: "blur(80px)" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text side */}
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-8 border"
            style={{ background: "#A9D6F5/10", borderColor: "#A9D6F5", color: "#1A6A96",
              backgroundColor: "rgba(169,214,245,0.15)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#A9D6F5] animate-pulse" />
            Trusted Device Protection Platform
          </div>

          <h1 className="font-extrabold leading-[1.04] tracking-tight text-[#2F3A45] mb-6"
            style={{ ...JK, fontSize: "clamp(3rem, 6vw, 5rem)" }}>
            Protect.<br />
            Repair.<br />
            <span style={{ background: "linear-gradient(135deg, #A9D6F5 0%, #42A5D8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Restore.
            </span>
          </h1>

          <p className="text-lg text-[#64748B] leading-relaxed mb-10 max-w-md">
            Everything your devices need, in one trusted platform. Insurance, repairs, claims, and doorstep service — seamlessly connected.
          </p>

          <div className="flex flex-wrap gap-3 mb-12">
            <button className="flex items-center gap-2 text-[#1A3A52] text-sm font-bold px-7 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: "linear-gradient(135deg, #A9D6F5, #67B8E6)" }}>
              Get Protected Today
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-2 text-[#2F3A45] text-sm font-semibold px-7 py-4 rounded-xl border border-[#E2E8F0] hover:border-[#A9D6F5] hover:bg-[#F8FAFC] transition-all duration-200">
              File a Claim
            </button>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-5">
            <div className="flex -space-x-2.5">
              {[
                "photo-1535713875002-d1d0cf377fde",
                "photo-1494790108377-be9c29b29330",
                "photo-1472099645785-5658abf4ff4e",
                "photo-1570295999919-56ceb5ecca61",
              ].map((id, i) => (
                <img key={i} alt="Customer" className="w-9 h-9 rounded-full border-2 border-white object-cover"
                  src={`https://images.unsplash.com/${id}?w=40&h=40&fit=crop&auto=format`} />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-0.5 mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-[#64748B]">Trusted by <strong className="text-[#2F3A45]">200,000+</strong> customers across India</p>
            </div>
          </div>
        </div>

        {/* Visual side */}
        <div className="relative flex items-center justify-center min-h-[520px]">
          {/* Samsung Galaxy S24 Ultra shell */}
          <div className="relative w-[230px] h-[490px] z-10">

            {/* Volume buttons — left side */}
            <div className="absolute -left-[3px] top-[110px] w-[3px] h-8"
              style={{ background: "linear-gradient(180deg, #8A9BA8, #6B7F8C)" }} />
            <div className="absolute -left-[3px] top-[158px] w-[3px] h-8"
              style={{ background: "linear-gradient(180deg, #8A9BA8, #6B7F8C)" }} />

            {/* Power button — right side */}
            <div className="absolute -right-[3px] top-[130px] w-[3px] h-12"
              style={{ background: "linear-gradient(180deg, #8A9BA8, #6B7F8C)" }} />

            {/* Main body — flat sides, tight radius like S25 */}
            <div className="absolute inset-0 overflow-hidden shadow-2xl"
              style={{
                borderRadius: "4px",
                background: "linear-gradient(175deg, #2C3E50 0%, #1C2B38 60%, #141E27 100%)",
                boxShadow: "0 30px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)",
              }}>

              {/* Thin metal frame highlight */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ borderRadius: "4px", boxShadow: "inset 0 0 0 1.5px rgba(255,255,255,0.12)" }} />

              {/* Screen — ultra-thin bezels */}
              <div className="absolute inset-[4px] overflow-hidden bg-[#F8FAFC]"
                style={{ borderRadius: "2px" }}>

                {/* Punch-hole camera — centered, small */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full z-20"
                  style={{ background: "#0a0a0a", boxShadow: "0 0 0 1px rgba(0,0,0,0.5)" }} />

                <div className="px-4 pt-8 pb-4 h-full flex flex-col gap-2.5">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold text-[#2F3A45]" style={JK}>My Devices</span>
                    <div className="w-5 h-5 rounded-full bg-[#A9D6F5]/30 flex items-center justify-center">
                      <Bell size={10} className="text-[#1A6A96]" />
                    </div>
                  </div>
                  {/* Device card */}
                  <div className="rounded-2xl p-3 border border-[#A9D6F5]/30"
                    style={{ background: "linear-gradient(135deg, rgba(169,214,245,0.18), rgba(207,250,254,0.12))" }}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-md flex items-center justify-center"
                        style={{ background: "linear-gradient(135deg, #1428A0, #0A1E7E)" }}>
                        <span className="text-[8px] text-white font-bold">S</span>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-[#2F3A45]">Samsung Galaxy S24 Ultra</p>
                        <p className="text-[9px] text-[#64748B]">Policy #AVL-2026-4471</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="text-[10px] text-emerald-600 font-semibold">Fully Protected</span>
                    </div>
                  </div>
                  {/* Coverage grid */}
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { label: "Screen", val: "Covered", bg: "rgba(207,250,254,0.6)" },
                      { label: "Battery", val: "Covered", bg: "rgba(209,250,229,0.6)" },
                      { label: "Accidental", val: "Included", bg: "rgba(237,233,254,0.6)" },
                      { label: "Theft", val: "Protected", bg: "rgba(254,243,199,0.6)" },
                    ].map(item => (
                      <div key={item.label} className="rounded-xl p-2" style={{ background: item.bg }}>
                        <p className="text-[9px] text-[#64748B]">{item.label}</p>
                        <p className="text-[10px] font-semibold text-[#2F3A45]">{item.val}</p>
                      </div>
                    ))}
                  </div>
                  {/* Status bar */}
                  <div className="mt-auto space-y-1.5">
                    <div className="h-0.5 w-full bg-[#E2E8F0] rounded-full overflow-hidden">
                      <div className="h-full w-3/4 rounded-full"
                        style={{ background: "linear-gradient(90deg, #A9D6F5, #67B8E6)" }} />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[9px] text-[#64748B]">9 months remaining</span>
                      <span className="text-[9px] font-semibold text-[#1A6A96]">75%</span>
                    </div>
                  </div>
                  {/* CTA button */}
                  <button className="w-full rounded-xl py-2.5 text-[11px] font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #2F3A45, #1a252e)" }}>
                    File a Claim
                  </button>
                </div>
              </div>{/* end screen */}
            </div>{/* end body */}
          </div>{/* end shell */}

          {/* Floating badge – claim approved */}
          <div className="absolute left-0 top-20 bg-white rounded-2xl px-3.5 py-3 shadow-xl border border-[#F0F4F8] w-44"
            style={{ animation: "floatA 4s ease-in-out infinite" }}>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-lg bg-emerald-50 flex items-center justify-center">
                <Check className="w-3 h-3 text-emerald-500" />
              </div>
              <span className="text-[11px] font-bold text-[#2F3A45]">Claim Approved</span>
            </div>
            <p className="text-[10px] text-[#64748B] leading-snug">Repair booked for tomorrow, 10 AM</p>
          </div>

          {/* Floating badge – pickup */}
          <div className="absolute -right-2 bottom-28 bg-white rounded-2xl px-3.5 py-3 shadow-xl border border-[#F0F4F8] w-44"
            style={{ animation: "floatB 4s ease-in-out infinite" }}>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-lg bg-[#A9D6F5]/20 flex items-center justify-center">
                <Truck className="w-3 h-3 text-[#1A6A96]" />
              </div>
              <span className="text-[11px] font-bold text-[#2F3A45]">Doorstep Pickup</span>
            </div>
            <p className="text-[10px] text-[#64748B] leading-snug">Technician arriving in 12 min</p>
          </div>

          {/* Rating badge */}
          <div className="absolute -right-4 top-16 bg-white rounded-xl px-3 py-2.5 shadow-lg border border-[#F0F4F8]"
            style={{ animation: "floatA 4s ease-in-out 2s infinite" }}>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />)}
              </div>
              <span className="text-[11px] font-bold text-[#2F3A45]">4.9</span>
            </div>
            <p className="text-[9px] text-[#64748B] mt-0.5">12,400+ reviews</p>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <div className="w-5 h-8 rounded-full border-2 border-[#2F3A45] flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-[#2F3A45]" style={{ animation: "scrollDot 1.8s ease-in-out infinite" }} />
        </div>
      </div>

      <style>{`
        @keyframes floatA {
          0%, 100% { transform: translateY(0px) rotate(-1.5deg); }
          50% { transform: translateY(-12px) rotate(-1.5deg); }
        }
        @keyframes floatB {
          0%, 100% { transform: translateY(0px) rotate(1.5deg); }
          50% { transform: translateY(-9px) rotate(1.5deg); }
        }
        @keyframes scrollDot {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(7px); opacity: 0.2; }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes blobDrift {
          0%,100% { transform: translate(0,0) scale(1); }
          40%      { transform: translate(50px,-38px) scale(1.08); }
          70%      { transform: translate(-28px,22px) scale(0.94); }
        }
        @keyframes blobDrift2 {
          0%,100% { transform: translate(0,0) scale(1); }
          35%      { transform: translate(-46px,30px) scale(1.07); }
          65%      { transform: translate(22px,-22px) scale(0.96); }
        }
        @keyframes partnersScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes shimText {
          0%,100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes aboutBg {
          0%,100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes timelineDot {
          0%   { transform: scale(0); opacity: 0; }
          60%  { transform: scale(1.3); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes teamFloat {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
      `}</style>
    </section>
  );
}

// tiny Bell icon (not in lucide bundle size workaround)
function Bell({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

/* ── Metrics Bar ─────────────────────────────────────── */

const METRICS = [
  { value: "200K+", label: "Devices Protected", icon: Shield },
  { value: "98.4%", label: "Claims Resolved", icon: BadgeCheck },
  { value: "500+", label: "Service Partners", icon: Globe },
  { value: "4.9 / 5", label: "Customer Rating", icon: Star },
];

function MetricsBar() {
  return (
    <section className="relative py-16 overflow-hidden" style={{ background: "linear-gradient(135deg,#1C2E3A 0%,#2F3A45 55%,#1A2D3A 100%)" }}>
      {/* Dot grid overlay */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:"radial-gradient(rgba(169,214,245,.06) 1px,transparent 1px)", backgroundSize:"28px 28px" }} />
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:700, height:320, borderRadius:"50%", background:"radial-gradient(ellipse,rgba(169,214,245,.09) 0%,transparent 70%)", filter:"blur(50px)", pointerEvents:"none" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {METRICS.map((m, i) => (
            <Reveal key={m.label} delay={i * 90} className="text-center">
              <div style={{
                width: 52, height: 52, borderRadius: 16, margin: "0 auto 16px",
                background: "rgba(169,214,245,.13)", display: "flex", alignItems: "center", justifyContent: "center",
                transition: "transform .3s ease, background .3s ease",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.15) rotate(5deg)"; e.currentTarget.style.background = "rgba(169,214,245,.22)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.background = "rgba(169,214,245,.13)"; }}>
                <m.icon size={24} color="#A9D6F5" />
              </div>
              <div className="text-4xl font-black text-white mb-1.5" style={JK}>{m.value}</div>
              <div className="text-sm font-semibold text-[#A9D6F5]">{m.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Services ─────────────────────────────────────────── */

const SERVICES = [
  {
    icon: Shield,
    title: "Device Insurance",
    desc: "Comprehensive coverage for accidental damage, liquid damage, screen breaks, and more — across all major device brands.",
    color: "rgba(169,214,245,0.15)",
    accent: "#A9D6F5",
    tags: ["Accidental", "Liquid", "Screen"],
  },
  {
    icon: RefreshCw,
    title: "Extended Warranty",
    desc: "Extend your manufacturer warranty and keep your device protected long after the original coverage expires.",
    color: "rgba(207,250,254,0.18)",
    accent: "#67C8D8",
    tags: ["Post-Warranty", "OEM Grade", "Parts"],
  },
  {
    icon: FileText,
    title: "Claims Management",
    desc: "Fast, transparent claims processing with real-time status updates. Most claims resolved in under 48 hours.",
    color: "rgba(209,250,229,0.2)",
    accent: "#4CAF8F",
    tags: ["48h Resolution", "Digital", "Transparent"],
  },
  {
    icon: Wrench,
    title: "Device Repairs",
    desc: "Certified technicians at 500+ authorized service centers nationwide, using only genuine manufacturer parts.",
    color: "rgba(237,233,254,0.2)",
    accent: "#8B7CF8",
    tags: ["Genuine Parts", "Certified", "Guaranteed"],
  },
  {
    icon: Truck,
    title: "Pickup & Delivery",
    desc: "Doorstep pickup and delivery for your device. We collect, repair, and return — all without you leaving home.",
    color: "rgba(254,243,199,0.25)",
    accent: "#D4954A",
    tags: ["Doorstep", "Same-Day", "Tracked"],
  },
  {
    icon: Activity,
    title: "Repair Tracking",
    desc: "Real-time visibility into your repair status at every stage. Know exactly where your device is, always.",
    color: "rgba(252,231,243,0.2)",
    accent: "#D87AAC",
    tags: ["Real-Time", "Notifications", "Live"],
  },
];

function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-8">
        <Reveal className="text-center mb-14">
          <p className="text-xs font-bold tracking-widest text-[#A9D6F5] uppercase mb-3">What We Offer</p>
          <h2 className="text-[2.4rem] font-extrabold text-[#2F3A45] tracking-tight mb-4" style={JK}>
            Complete Device Lifecycle Protection
          </h2>
          <p className="text-base text-[#64748B] max-w-xl mx-auto leading-relaxed">
            Every service you need, from the moment you buy to the moment you upgrade — unified in one platform.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 70}>
              <div className="group relative bg-white rounded-2xl p-6 border border-[#E8EEF4] hover:border-[#A9D6F5]/50 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden h-full"
                style={{ transition: "transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s ease, border-color .25s ease" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
                onMouseLeave={e => e.currentTarget.style.transform = ""}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${s.color} 0%, transparent 65%)` }} />
                <div className="relative flex flex-col h-full">
                  <div className="w-11 h-11 rounded-xl mb-5 flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: s.color }}>
                    <s.icon size={20} style={{ color: s.accent }} />
                  </div>
                  <h3 className="text-sm font-bold text-[#2F3A45] mb-2.5" style={JK}>{s.title}</h3>
                  <p className="text-sm text-[#64748B] leading-relaxed mb-4 flex-1">{s.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {s.tags.map(t => (
                      <span key={t} className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                        style={{ backgroundColor: s.color, color: s.accent }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-[#A9D6F5] group-hover:gap-2 transition-all duration-200">
                    Learn more <ChevronRight size={13} />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── About Us ──────────────────────────────────────── */

const MILESTONES = [
  { year: "2018", title: "Founded in Bengaluru", desc: "AVLTECH was born from a simple belief — device protection should just work." },
  { year: "2019", title: "First 10,000 Customers", desc: "Reached our first milestone, covering devices across 5 major Indian cities." },
  { year: "2021", title: "100+ Service Partners", desc: "Built our authorized repair network across 15 states with OEM-certified centers." },
  { year: "2022", title: "Claims Portal Launched", desc: "Introduced real-time claims tracking, resolving 95% of claims within 48 hours." },
  { year: "2023", title: "Pan-India Operations", desc: "Expanded doorstep pickup and delivery to all 28 states across India." },
  { year: "2026", title: "200,000+ Devices Protected", desc: "Became India's most trusted device lifecycle protection platform." },
];

const TEAM = [
  {
    name: "Arjun Mehta",
    role: "Chief Executive Officer",
    img: "photo-1472099645785-5658abf4ff4e",
    quote: "We built AVLTECH to make trust the default, not the exception.",
    bg: "rgba(169,214,245,.1)",
  },
  {
    name: "Priya Nair",
    role: "Chief Technology Officer",
    img: "photo-1580489944761-15a19d654956",
    quote: "Every feature we ship eliminates a friction point our customers once accepted.",
    bg: "rgba(207,250,254,.12)",
  },
  {
    name: "Rahul Sharma",
    role: "Chief Operations Officer",
    img: "photo-1570295999919-56ceb5ecca61",
    quote: "Reliability isn't a promise — it's an infrastructure decision.",
    bg: "rgba(237,233,254,.1)",
  },
];

const VALUES = [
  { icon: Shield,     title: "Trust First",        desc: "Every decision we make is filtered through one question: does this earn customer trust?", color: "#A9D6F5" },
  { icon: Zap,        title: "Speed Matters",       desc: "We measure ourselves in minutes and hours, never in days and weeks.",                    color: "#67C8D8" },
  { icon: Users,      title: "Human-Centered",      desc: "Technology serves people. We design for real moments, not ideal scenarios.",             color: "#8B7CF8" },
  { icon: BadgeCheck, title: "Zero Compromise",     desc: "Genuine parts, certified centers, verified processes — always, no exceptions.",           color: "#4CAF8F" },
];

function useCounter(target: number, active: boolean, duration = 1800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let cur = 0;
    const step = target / (duration / 16);
    const id = setInterval(() => {
      cur += step;
      if (cur >= target) { setVal(target); clearInterval(id); }
      else setVal(Math.floor(cur));
    }, 16);
    return () => clearInterval(id);
  }, [active, target, duration]);
  return val;
}

function AboutCountStat({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const n = useCounter(target, active, 1600);
  return <>{n}{suffix}</>;
}

function AboutUs() {
  const { ref: statsRef, inView: statsInView } = useInView(0.2);
  const { ref: timelineRef, inView: timelineInView } = useInView(0.05);
  const [activeTimeline, setActiveTimeline] = useState(0);

  useEffect(() => {
    if (!timelineInView) return;
    const id = setInterval(() => {
      setActiveTimeline(prev => (prev < MILESTONES.length - 1 ? prev + 1 : prev));
    }, 600);
    return () => clearInterval(id);
  }, [timelineInView]);

  return (
    <section id="about" style={{ background: "#FCFCFD", overflow: "hidden" }}>
      {/* ── Hero Banner ── */}
      <div style={{
        position: "relative", padding: "100px 28px 80px", textAlign: "center", overflow: "hidden",
        background: "linear-gradient(145deg,#1A2A36 0%,#2F3A45 40%,#1C3548 70%,#12202E 100%)",
        backgroundSize: "300% 300%", animation: "aboutBg 16s ease infinite",
      }}>
        {/* Animated orbs */}
        {[
          { w: 500, h: 400, top: "-10%", left: "10%",  c: "rgba(169,214,245,.14)", a: "blobDrift  18s ease-in-out infinite" },
          { w: 400, h: 360, top: "30%",  right: "5%",  c: "rgba(207,250,254,.09)", a: "blobDrift2 22s ease-in-out infinite" },
        ].map((o, i) => (
          <div key={i} style={{
            position: "absolute", ...o as any, borderRadius: "50%",
            background: `radial-gradient(ellipse, ${o.c} 0%, transparent 70%)`,
            filter: "blur(60px)", animation: o.a, pointerEvents: "none",
          }} />
        ))}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "radial-gradient(rgba(169,214,245,.045) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

        <div style={{ position: "relative", zIndex: 5, maxWidth: 860, margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: ".2em", color: "#A9D6F5", textTransform: "uppercase", marginBottom: 18 }}>About AVLTECH</p>
            <h2 style={{
              ...JK, fontSize: "clamp(2.4rem, 5.5vw, 4.4rem)", fontWeight: 900,
              letterSpacing: "-.035em", lineHeight: 1.06, color: "white", marginBottom: 24,
            }}>
              We Didn't Just Build<br />
              <span style={{
                background: "linear-gradient(135deg, #A9D6F5 0%, #CFFAFE 50%, #A9D6F5 100%)",
                backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                animation: "shimText 4s ease infinite",
              }}>
                a Product. We Fixed an Industry.
              </span>
            </h2>
            <p style={{ fontSize: 18, color: "rgba(169,200,220,.75)", lineHeight: 1.75, maxWidth: 620, margin: "0 auto 36px" }}>
              Device protection in India was broken — hidden clauses, slow claims, fake parts, and zero transparency. In 2018, we decided to rebuild it from first principles.
            </p>
          </Reveal>

          {/* Animated stats */}
          <div ref={statsRef} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2, maxWidth: 700, margin: "0 auto" }}>
            {[
              { target: 8,   suffix: " yrs",  label: "In Business"         },
              { target: 200, suffix: "K+",    label: "Devices Protected"   },
              { target: 500, suffix: "+",     label: "Service Partners"    },
              { target: 98,  suffix: "%",     label: "Claims Resolved"     },
            ].map((s, i) => (
              <div key={s.label} style={{
                padding: "24px 12px",
                opacity: statsInView ? 1 : 0,
                transform: statsInView ? "none" : "translateY(20px)",
                transition: `all .65s cubic-bezier(.22,1,.36,1) ${i * 100}ms`,
              }}>
                <div style={{ ...JK, fontSize: 36, fontWeight: 900, color: "white", lineHeight: 1, marginBottom: 6 }}>
                  <AboutCountStat target={s.target} suffix={s.suffix} active={statsInView} />
                </div>
                <div style={{ fontSize: 12, color: "rgba(169,200,220,.6)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Story + Image ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 28px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 72, alignItems: "center" }}>
          <Reveal dir="left">
            <div style={{ position: "relative" }}>
              <div style={{ borderRadius: 24, overflow: "hidden", height: 460, background: "#E8EEF4" }}>
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&h=700&fit=crop&auto=format"
                  alt="AVLTECH team"
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .7s ease" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
                  onMouseLeave={e => e.currentTarget.style.transform = ""}
                />
                <div style={{ position: "absolute", inset: 0, borderRadius: 24, background: "linear-gradient(to top, rgba(47,58,69,.5) 0%, transparent 55%)" }} />
              </div>
              {/* Floating founded badge */}
              <div style={{
                position: "absolute", right: -20, bottom: 32, background: "white",
                borderRadius: 20, padding: "18px 22px", boxShadow: "0 16px 56px rgba(0,0,0,.1)",
                border: "1px solid #EAF0F6", animation: "teamFloat 5s ease-in-out infinite",
              }}>
                <p style={{ ...JK, fontSize: 32, fontWeight: 900, color: "#2F3A45", margin: 0 }}>2018</p>
                <p style={{ fontSize: 11, color: "#64748B", margin: "2px 0 8px" }}>Founded in Bengaluru</p>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#10B981" }} />
                  <span style={{ fontSize: 11, color: "#059669", fontWeight: 700 }}>Operating pan-India</span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal dir="right">
            <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: ".2em", color: "#A9D6F5", textTransform: "uppercase", marginBottom: 16 }}>Our Story</p>
            <h3 style={{ ...JK, fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 900, color: "#2F3A45", letterSpacing: "-.025em", lineHeight: 1.12, marginBottom: 20 }}>
              Built on a Single Conviction
            </h3>
            <p style={{ fontSize: 16, color: "#5A6B7A", lineHeight: 1.8, marginBottom: 18 }}>
              Our founders experienced firsthand what millions of Indians still face — a cracked screen, a denied claim, a repaired phone that breaks again in three weeks. The device protection industry was extractive, opaque, and indifferent.
            </p>
            <p style={{ fontSize: 16, color: "#5A6B7A", lineHeight: 1.8, marginBottom: 32 }}>
              So we rebuilt it. AVLTECH connects customers, insurers, OEM service centers, and logistics partners into one seamless platform — where every step is tracked, every part is genuine, and every claim is handled with speed and dignity.
            </p>
            {[
              "Doorstep pickup in 15+ cities",
              "Genuine OEM parts — guaranteed",
              "Real-time claim & repair tracking",
              "No hidden fees, ever",
            ].map(pt => (
              <div key={pt} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div style={{
                  width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "linear-gradient(135deg,#A9D6F5,#67B8E6)",
                  boxShadow: "0 3px 10px rgba(169,214,245,.38)",
                }}>
                  <Check size={12} color="white" />
                </div>
                <span style={{ fontSize: 15, fontWeight: 600, color: "#2F3A45" }}>{pt}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </div>

      {/* ── Mission / Vision / Values ── */}
      <div style={{ background: "#F8FAFC", padding: "80px 28px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: ".2em", color: "#A9D6F5", textTransform: "uppercase", marginBottom: 12 }}>What Drives Us</p>
            <h3 style={{ ...JK, fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 900, color: "#2F3A45", letterSpacing: "-.025em" }}>
              Purpose, Principles & Promise
            </h3>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18 }}>
            {[
              { label: "Mission", icon: "🎯", color: "#A9D6F5", bg: "rgba(169,214,245,.08)", desc: "To make device protection effortless, transparent, and genuinely trustworthy for every Indian." },
              { label: "Vision",  icon: "🔭", color: "#67C8D8", bg: "rgba(207,250,254,.1)",  desc: "To become India's most trusted technology lifecycle partner — from purchase to upgrade." },
              { label: "Promise", icon: "🤝", color: "#8B7CF8", bg: "rgba(237,233,254,.1)",  desc: "Every claim handled with speed, every repair done right, every customer treated with care." },
            ].map((card, i) => (
              <Reveal key={card.label} delay={i * 100}>
                <div style={{
                  background: "white", borderRadius: 22, padding: "32px 28px",
                  border: "1px solid #EAF0F6", position: "relative", overflow: "hidden",
                  transition: "transform .32s cubic-bezier(.22,1,.36,1), box-shadow .32s ease, border-color .25s ease",
                  cursor: "default",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 24px 64px rgba(47,58,69,.1)"; e.currentTarget.style.borderColor = `${card.color}55`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; e.currentTarget.style.borderColor = "#EAF0F6"; }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${card.color}, ${card.color}88)` }} />
                  <div style={{ fontSize: 36, marginBottom: 16 }}>{card.icon}</div>
                  <h4 style={{ ...JK, fontSize: 18, fontWeight: 900, color: "#2F3A45", marginBottom: 12 }}>{card.label}</h4>
                  <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.72 }}>{card.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── Core Values Grid ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 28px" }}>
        <Reveal style={{ textAlign: "center", marginBottom: 52 }}>
          <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: ".2em", color: "#A9D6F5", textTransform: "uppercase", marginBottom: 12 }}>Our Values</p>
          <h3 style={{ ...JK, fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 900, color: "#2F3A45", letterSpacing: "-.025em" }}>
            The Principles Behind Every Decision
          </h3>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 80}>
              <div style={{
                background: "white", borderRadius: 20, padding: "26px 22px",
                border: "1px solid #EAF0F6", cursor: "default",
                transition: "transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s ease, border-color .25s ease",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = `0 20px 52px rgba(47,58,69,.1)`; e.currentTarget.style.borderColor = `${v.color}44`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; e.currentTarget.style.borderColor = "#EAF0F6"; }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 16, marginBottom: 18,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: `${v.color}18`,
                  transition: "transform .3s ease",
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.14) rotate(5deg)"}
                  onMouseLeave={e => e.currentTarget.style.transform = ""}>
                  <v.icon size={22} color={v.color} />
                </div>
                <h4 style={{ ...JK, fontSize: 15, fontWeight: 800, color: "#2F3A45", marginBottom: 8 }}>{v.title}</h4>
                <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.68 }}>{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ── Animated Timeline ── */}
      <div style={{ background: "#F8FAFC", padding: "80px 28px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: ".2em", color: "#A9D6F5", textTransform: "uppercase", marginBottom: 12 }}>Our Journey</p>
            <h3 style={{ ...JK, fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 900, color: "#2F3A45", letterSpacing: "-.025em" }}>
              Six Years of Milestones
            </h3>
          </Reveal>

          <div ref={timelineRef} style={{ position: "relative", maxWidth: 780, margin: "0 auto" }}>
            {/* Vertical line */}
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 2, background: "#EAF0F6", transform: "translateX(-50%)" }}>
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0,
                background: "linear-gradient(180deg, #A9D6F5, #3598C8)",
                height: timelineInView ? "100%" : "0%",
                transition: "height 2.4s cubic-bezier(.22,1,.36,1) .3s",
                borderRadius: 2,
              }} />
            </div>

            {MILESTONES.map((m, i) => {
              const isLeft = i % 2 === 0;
              const visible = i <= activeTimeline;
              return (
                <div key={m.year} style={{
                  display: "flex", alignItems: "center", marginBottom: 44,
                  flexDirection: isLeft ? "row" : "row-reverse",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "none" : `translateX(${isLeft ? -24 : 24}px)`,
                  transition: "opacity .55s cubic-bezier(.22,1,.36,1), transform .55s cubic-bezier(.22,1,.36,1)",
                }}>
                  {/* Card */}
                  <div style={{
                    flex: 1, background: "white", borderRadius: 18,
                    padding: "20px 22px", border: "1px solid #EAF0F6",
                    marginRight: isLeft ? 32 : 0, marginLeft: isLeft ? 0 : 32,
                    boxShadow: "0 4px 20px rgba(47,58,69,.06)",
                    transition: "box-shadow .3s ease, transform .3s ease",
                    cursor: "default",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 12px 40px rgba(47,58,69,.11)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(47,58,69,.06)"; e.currentTarget.style.transform = ""; }}>
                    <span style={{ fontSize: 11, fontWeight: 900, color: "#A9D6F5", letterSpacing: ".1em" }}>{m.year}</span>
                    <h4 style={{ ...JK, fontSize: 15, fontWeight: 800, color: "#2F3A45", margin: "6px 0 6px" }}>{m.title}</h4>
                    <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6, margin: 0 }}>{m.desc}</p>
                  </div>

                  {/* Centre dot */}
                  <div style={{
                    width: 16, height: 16, borderRadius: "50%", flexShrink: 0, zIndex: 2,
                    background: "linear-gradient(135deg,#A9D6F5,#3598C8)",
                    boxShadow: `0 0 0 4px white, 0 0 0 6px ${visible ? "#A9D6F5" : "#EAF0F6"}`,
                    animation: visible ? "timelineDot .5s cubic-bezier(.22,1,.36,1) both" : "none",
                    transition: "box-shadow .4s ease",
                  }} />

                  {/* Empty side */}
                  <div style={{ flex: 1, marginRight: isLeft ? 0 : 32, marginLeft: isLeft ? 32 : 0 }} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Leadership ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 28px 100px" }}>
        <Reveal style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: ".2em", color: "#A9D6F5", textTransform: "uppercase", marginBottom: 12 }}>The Team</p>
          <h3 style={{ ...JK, fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 900, color: "#2F3A45", letterSpacing: "-.025em" }}>
            People Who Care Deeply
          </h3>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 22 }}>
          {TEAM.map((member, i) => (
            <Reveal key={member.name} delay={i * 110}>
              <div style={{
                background: "white", borderRadius: 24, overflow: "hidden",
                border: "1px solid #EAF0F6", cursor: "default",
                transition: "transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s ease",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 28px 72px rgba(47,58,69,.12)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
                {/* Photo */}
                <div style={{ position: "relative", height: 220, background: member.bg, overflow: "hidden" }}>
                  <img src={`https://images.unsplash.com/${member.img}?w=500&h=400&fit=crop&auto=format`}
                    alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .6s ease" }}
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.06)"}
                    onMouseLeave={e => e.currentTarget.style.transform = ""} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(47,58,69,.4) 0%,transparent 50%)" }} />
                </div>
                {/* Info */}
                <div style={{ padding: "22px 22px 26px" }}>
                  <h4 style={{ ...JK, fontSize: 17, fontWeight: 900, color: "#2F3A45", marginBottom: 3 }}>{member.name}</h4>
                  <p style={{ fontSize: 12, color: "#A9D6F5", fontWeight: 700, marginBottom: 14, letterSpacing: ".02em" }}>{member.role}</p>
                  <div style={{ borderLeft: "3px solid #A9D6F5", paddingLeft: 14 }}>
                    <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.65, fontStyle: "italic", margin: 0 }}>
                      &ldquo;{member.quote}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── How It Works ────────────────────────────────────── */

function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Choose Your Plan",
      desc: "Select coverage that fits your device and budget. Get insured in under 5 minutes with instant digital activation.",
      icon: Shield,
    },
    {
      step: "02",
      title: "File a Claim Instantly",
      desc: "Submit claims through our app or web portal. AI-powered assessment, minimal documentation required.",
      icon: FileText,
    },
    {
      step: "03",
      title: "We Handle Everything",
      desc: "Doorstep pickup, certified repair at authorized centers, and home delivery. Track every step in real time.",
      icon: Truck,
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-8">
        <Reveal className="text-center mb-14">
          <p className="text-xs font-bold tracking-widest text-[#A9D6F5] uppercase mb-3">How It Works</p>
          <h2 className="text-[2.4rem] font-extrabold text-[#2F3A45] tracking-tight mb-4" style={JK}>
            Three Steps to Total Peace of Mind
          </h2>
          <p className="text-base text-[#64748B] max-w-xl mx-auto leading-relaxed">
            We've eliminated every friction point in device protection. Here's how simple it really is.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connecting line — sits at the centre of the icon row */}
          <div className="hidden md:block absolute top-[3.2rem] left-[calc(16.67%+3rem)] right-[calc(16.67%+3rem)] h-px"
            style={{ background: "linear-gradient(90deg,#A9D6F5,#67B8E6,#3598C8)" }} />

          {steps.map((s, i) => (
            <Reveal key={s.step} delay={i * 120}>
              <div className="relative bg-white rounded-2xl p-6 border border-[#E8EEF4] h-full"
                style={{ transition: "transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s ease, border-color .25s ease" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 20px 56px rgba(47,58,69,.1)"; e.currentTarget.style.borderColor = "rgba(169,214,245,.45)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; e.currentTarget.style.borderColor = "#E8EEF4"; }}>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #A9D6F5, #7EC8F0)" }}>
                    <s.icon size={20} color="#1A3A52" />
                  </div>
                  <span className="text-5xl font-black" style={{ ...JK, color: "#EAF0F6" }}>{s.step}</span>
                </div>
                <h3 className="text-base font-bold text-[#2F3A45] mb-2.5" style={JK}>{s.title}</h3>
                <p className="text-sm text-[#64748B] leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom stats bar */}
        <Reveal delay={300}>
          <div className="mt-10 rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
            style={{ background: "linear-gradient(135deg,#1C2E3A 0%,#2F3A45 100%)" }}>
            {[
              { val: "< 3 min", label: "To file a claim" },
              { val: "48 hrs",  label: "Average resolution" },
              { val: "100%",    label: "Genuine parts" },
              { val: "Pan-India", label: "Service coverage" },
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-xl font-extrabold text-[#A9D6F5] mb-1" style={JK}>{stat.val}</div>
                <div className="text-xs text-[#6A8A9A]">{stat.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Why Choose ─────────────────────────────────────── */

const WHY = [
  { icon: BadgeCheck, title: "Authorized Repairs Only", desc: "Every repair is performed at OEM-certified centers with genuine manufacturer parts. No shortcuts, no substandard components." },
  { icon: Lock, title: "Secure Claims Handling", desc: "End-to-end encrypted claims processing. Your data stays protected throughout the entire service journey." },
  { icon: Zap, title: "Instant Digital Experience", desc: "Buy protection, file claims, and track repairs entirely online. No paperwork, no branch visits, no delays." },
  { icon: Headphones, title: "Dedicated Support", desc: "Real people, real help. Our support team is available 7 days a week with average response times under 2 minutes." },
  { icon: TrendingUp, title: "Transparent Pricing", desc: "No hidden fees, no surprise deductibles, no fine print traps. What you see is what you pay — always." },
  { icon: Clock, title: "48-Hour Resolution", desc: "We prioritize speed without compromising quality. Most claims are fully resolved within 48 hours of submission." },
];

function WhyChoose() {
  return (
    <section className="py-24 bg-[#FCFCFD]">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <Reveal>
              <p className="text-xs font-bold tracking-widest text-[#A9D6F5] uppercase mb-3">Why AVLTECH</p>
              <h2 className="text-[2.4rem] font-extrabold text-[#2F3A45] tracking-tight mb-5" style={JK}>
                Built on Trust,<br />Driven by Technology
              </h2>
              <p className="text-base text-[#64748B] leading-relaxed mb-8">
                We built AVLTECH because we believed device protection could be radically simpler, faster, and more trustworthy than anything that existed.
              </p>
              <div className="space-y-3">
                {["No paperwork, ever", "Doorstep convenience", "Real-time transparency", "Genuine parts guaranteed"].map(pt => (
                  <div key={pt} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, #A9D6F5, #67B8E6)" }}>
                      <Check size={11} color="white" />
                    </div>
                    <span className="text-sm font-medium text-[#2F3A45]">{pt}</span>
                  </div>
                ))}
              </div>
              <button className="mt-9 flex items-center gap-2 text-sm font-bold text-[#1A3A52] px-6 py-3 rounded-xl"
                style={{
                  background: "linear-gradient(135deg, #A9D6F5, #7EC8F0)",
                  transition: "transform .25s cubic-bezier(.22,1,.36,1), box-shadow .25s ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(169,214,245,.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
                Learn About Us <ArrowRight size={15} />
              </button>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={i * 60}>
                <div className="bg-white rounded-2xl p-5 border border-[#E8EEF4] h-full"
                  style={{ transition: "transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s ease, border-color .25s ease" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 36px rgba(47,58,69,.09)"; e.currentTarget.style.borderColor = "rgba(169,214,245,.45)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; e.currentTarget.style.borderColor = "#E8EEF4"; }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{ backgroundColor: "rgba(169,214,245,0.13)", transition: "transform .3s ease" }}
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.12) rotate(4deg)"}
                    onMouseLeave={e => e.currentTarget.style.transform = ""}>
                    <w.icon size={18} color="#1A6A96" />
                  </div>
                  <h4 className="text-sm font-bold text-[#2F3A45] mb-1.5" style={JK}>{w.title}</h4>
                  <p className="text-xs text-[#64748B] leading-relaxed">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Trust Strip ─────────────────────────────────────── */

function TrustStrip() {
  const badges = [
    { icon: BadgeCheck, label: "ISO 27001 Certified" },
    { icon: Lock, label: "256-bit Encryption" },
    { icon: Award, label: "IRDAI Registered" },
    { icon: Shield, label: "Authorized Service Network" },
    { icon: Package, label: "Genuine Parts Only" },
    { icon: Wifi, label: "Real-Time Tracking" },
  ];
  return (
    <div className="bg-[#F3F6F8] py-6 border-y border-[#E8EEF4] overflow-hidden">
      <div className="flex items-center gap-12 w-max" style={{ animation: "marquee 28s linear infinite" }}>
        {[...badges, ...badges].map((b, i) => (
          <div key={i} className="flex items-center gap-2.5 whitespace-nowrap">
            <b.icon className="w-4 h-4 text-[#A9D6F5]" />
            <span className="text-xs font-semibold text-[#64748B]">{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Testimonials ────────────────────────────────────── */

const TESTIMONIALS = [
  { name: "Priya Sharma",    role: "Marketing Director · Bengaluru", img: "photo-1494790108377-be9c29b29330", tag: "Laptop Repair",        rating: 5,
    quote: "Filed a claim at 7 AM. AVLTECH had a technician at my door by 9 AM and my laptop returned repaired by 6 PM. I couldn't believe how seamlessly it all worked." },
  { name: "Rahul Mehta",     role: "Software Engineer · Pune",       img: "photo-1472099645785-5658abf4ff4e", tag: "Screen Replacement",   rating: 5,
    quote: "The claims process took three minutes. No forms, no arguments. Everything transparent — I tracked my phone's repair in real time. This is what device protection should feel like." },
  { name: "Anjali Krishnan", role: "Freelance Designer · Chennai",   img: "photo-1580489944761-15a19d654956", tag: "Tablet Warranty Claim", rating: 5,
    quote: "My tablet was picked up, repaired with a genuine part, and returned in perfect condition. The technician even called when it was done. Absolutely brilliant service." },
  { name: "Vikram Nair",     role: "Entrepreneur · Mumbai",          img: "photo-1570295999919-56ceb5ecca61", tag: "Insurance Claim",      rating: 5,
    quote: "Three phones protected over two years. Every single claim resolved in under 24 hours. The app is beautiful and the support team is genuinely exceptional." },
];

function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);

  const jump = (next: number) => {
    if (fading) return;
    setFading(true);
    setTimeout(() => { setIdx(next); setFading(false); }, 320);
  };

  useEffect(() => {
    const id = setInterval(() => jump((idx + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  const t = TESTIMONIALS[idx];

  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-8">
        <Reveal className="text-center mb-14">
          <p className="text-xs font-bold tracking-widest text-[#A9D6F5] uppercase mb-3">Customer Stories</p>
          <h2 className="text-[2.4rem] font-extrabold text-[#2F3A45] tracking-tight mb-4" style={JK}>
            Real People. Real Results.
          </h2>
          <p className="text-base text-[#64748B] max-w-xl mx-auto">
            200,000+ customers trust AVLTECH with their devices.
          </p>
        </Reveal>

        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          {/* Main card */}
          <div style={{
            background: "white", borderRadius: 24, padding: "40px 44px",
            border: "1px solid #E8EEF4", boxShadow: "0 8px 40px rgba(47,58,69,.07)",
            position: "relative", overflow: "hidden",
            opacity: fading ? 0 : 1,
            transform: fading ? "translateY(12px) scale(.99)" : "none",
            transition: "opacity .32s ease, transform .32s ease",
          }}>
            <div style={{ position: "absolute", top: 16, right: 32, fontSize: 100, lineHeight: 1, fontWeight: 900, color: "rgba(169,214,245,.1)", fontFamily: "Georgia, serif", userSelect: "none", pointerEvents: "none" }}>
              &ldquo;
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20 }}>
              {[...Array(t.rating)].map((_, j) => <Star key={j} size={15} style={{ fill: "#FBBF24", color: "#FBBF24" }} />)}
              <span style={{ marginLeft: 8, fontSize: 11, fontWeight: 800, color: "#1A6A96", background: "rgba(169,214,245,.15)", padding: "3px 10px", borderRadius: 999 }}>{t.tag}</span>
            </div>
            <blockquote style={{ fontSize: 17, color: "#2F3A45", lineHeight: 1.78, fontWeight: 500, marginBottom: 28, position: "relative", zIndex: 1 }}>
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <div style={{ display: "flex", alignItems: "center", gap: 14, paddingTop: 22, borderTop: "1px solid #F3F6F8" }}>
              <img src={`https://images.unsplash.com/${t.img}?w=64&h=64&fit=crop&auto=format`} alt={t.name}
                style={{ width: 46, height: 46, borderRadius: "50%", objectFit: "cover", boxShadow: "0 0 0 3px rgba(169,214,245,.28)" }} />
              <div>
                <p style={{ ...JK, fontSize: 15, fontWeight: 800, color: "#2F3A45", margin: 0 }}>{t.name}</p>
                <p style={{ fontSize: 12, color: "#64748B", margin: 0 }}>{t.role}</p>
              </div>
            </div>
          </div>

          {/* Dot + arrow controls */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginTop: 24 }}>
            <button onClick={() => jump((idx - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
              style={{ width: 36, height: 36, borderRadius: "50%", border: "1.5px solid #E8EEF4", background: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all .2s ease" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#A9D6F5"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(169,214,245,.28)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#E8EEF4"; e.currentTarget.style.boxShadow = ""; }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.5"><polyline points="15,18 9,12 15,6"/></svg>
            </button>
            <div style={{ display: "flex", gap: 7 }}>
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => jump(i)} style={{
                  height: 7, borderRadius: 4, border: "none", cursor: "pointer",
                  width: i === idx ? 26 : 7,
                  background: i === idx ? "linear-gradient(90deg,#A9D6F5,#67B8E6)" : "#E8EEF4",
                  transition: "width .4s cubic-bezier(.22,1,.36,1), background .3s ease",
                }} />
              ))}
            </div>
            <button onClick={() => jump((idx + 1) % TESTIMONIALS.length)}
              style={{ width: 36, height: 36, borderRadius: "50%", border: "1.5px solid #E8EEF4", background: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all .2s ease" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#A9D6F5"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(169,214,245,.28)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#E8EEF4"; e.currentTarget.style.boxShadow = ""; }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.5"><polyline points="9,18 15,12 9,6"/></svg>
            </button>
          </div>

          {/* Avatar row */}
          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 18 }}>
            {TESTIMONIALS.map((tm, i) => (
              <button key={i} onClick={() => jump(i)} style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
                padding: "8px 12px", borderRadius: 14, border: "none", cursor: "pointer",
                background: i === idx ? "rgba(169,214,245,.1)" : "transparent",
                outline: i === idx ? "1.5px solid rgba(169,214,245,.5)" : "1.5px solid transparent",
                transition: "all .3s ease",
              }}>
                <img src={`https://images.unsplash.com/${tm.img}?w=40&h=40&fit=crop&auto=format`}
                  alt={tm.name} style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover", opacity: i === idx ? 1 : .4, transition: "opacity .3s ease" }} />
                <span style={{ fontSize: 10, fontWeight: 700, color: "#64748B" }}>{tm.name.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Partners ────────────────────────────────────────── */

/*
 * WORDPRESS / CMS CONNECTOR
 * ─────────────────────────────────────────────────────
 * Each partner object below maps 1-to-1 with a WordPress
 * Custom Post Type (e.g. "avltech_partner") or an ACF
 * Repeater field. To pull live data replace this array with:
 *
 *   const PARTNERS = await fetch(
 *     '/wp-json/wp/v2/avltech_partner?per_page=100'
 *   ).then(r => r.json()).then(posts => posts.map(p => ({
 *     name:     p.title.rendered,
 *     category: p.acf.category,           // ACF text field
 *     logoUrl:  p.acf.logo_url,           // ACF image URL
 *     accent:   p.acf.brand_color,        // ACF color picker
 *     initials: p.acf.initials,           // ACF text field
 *   })));
 *
 * Fields: name (string), category (string),
 *         logoUrl (string | null), accent (hex), initials (string)
 * ─────────────────────────────────────────────────────
 */
const PARTNERS: {
  name: string;
  category: string;
  logoUrl: string | null; // ← replace with WordPress image URL
  accent: string;
  initials: string;
}[] = [
  // ── Insurance ──────────────────────────────────────
  { name: "Bajaj Allianz",       category: "Insurance",   logoUrl: null, accent: "#E63946", initials: "BA" },
  { name: "HDFC ERGO",           category: "Insurance",   logoUrl: null, accent: "#004C97", initials: "HE" },
  { name: "ICICI Lombard",       category: "Insurance",   logoUrl: null, accent: "#F47920", initials: "IL" },
  { name: "New India Assurance", category: "Insurance",   logoUrl: null, accent: "#1B6CA8", initials: "NI" },
  { name: "Reliance General",    category: "Insurance",   logoUrl: null, accent: "#0062A8", initials: "RG" },
  // ── Service Centers ────────────────────────────────
  { name: "Apple Authorized",    category: "Service",     logoUrl: null, accent: "#555555", initials: "A"  },
  { name: "Samsung Care",        category: "Service",     logoUrl: null, accent: "#1428A0", initials: "SC" },
  { name: "OnePlus Service",     category: "Service",     logoUrl: null, accent: "#F5010C", initials: "OP" },
  { name: "Dell Expert",         category: "Service",     logoUrl: null, accent: "#007DB8", initials: "DE" },
  { name: "HP Service",          category: "Service",     logoUrl: null, accent: "#0096D6", initials: "HP" },
  // ── Logistics ──────────────────────────────────────
  { name: "BlueDart",            category: "Logistics",   logoUrl: null, accent: "#00438C", initials: "BD" },
  { name: "Delhivery",           category: "Logistics",   logoUrl: null, accent: "#D4291B", initials: "DL" },
  { name: "Ekart",               category: "Logistics",   logoUrl: null, accent: "#F7981D", initials: "EK" },
  { name: "FedEx India",         category: "Logistics",   logoUrl: null, accent: "#4D148C", initials: "FX" },
  { name: "XpressBees",          category: "Logistics",   logoUrl: null, accent: "#F5A623", initials: "XB" },
];

/* Partner logo card — shows image if logoUrl is set, else styled initials badge */
function PartnerCard({ p }: { p: typeof PARTNERS[0] }) {
  return (
    <div style={{
      flexShrink: 0,
      display: "flex", alignItems: "center", gap: 12,
      background: "white",
      border: "1px solid #EAF0F6",
      borderRadius: 16,
      padding: "14px 20px",
      minWidth: 180,
      boxShadow: "0 2px 12px rgba(47,58,69,.05)",
      transition: "box-shadow .3s ease, transform .3s ease, border-color .3s ease",
      cursor: "default",
    }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(47,58,69,.12)";
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.borderColor = `${p.accent}44`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(47,58,69,.05)";
        e.currentTarget.style.transform = "";
        e.currentTarget.style.borderColor = "#EAF0F6";
      }}>

      {/* Logo or initials badge */}
      <div style={{
        width: 40, height: 40, borderRadius: 10, flexShrink: 0,
        overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center",
        background: `${p.accent}14`,
        border: `1.5px solid ${p.accent}28`,
      }}>
        {p.logoUrl ? (
          /* ← WordPress image URL drops in here */
          <img src={p.logoUrl} alt={p.name}
            style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        ) : (
          <span style={{
            fontSize: p.initials.length > 2 ? 10 : 12,
            fontWeight: 900, color: p.accent,
            fontFamily: "'Plus Jakarta Sans', Inter, sans-serif",
            letterSpacing: "-.02em",
          }}>
            {p.initials}
          </span>
        )}
      </div>

      <div>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#2F3A45", margin: 0, whiteSpace: "nowrap" }}>
          {p.name}
        </p>
        <p style={{ fontSize: 10.5, color: "#94A3B8", margin: 0, fontWeight: 500 }}>
          {p.category}
        </p>
      </div>
    </div>
  );
}

/* Infinite horizontal scroll row */
function PartnerRow({ items, speed = 38 }: { items: typeof PARTNERS; speed?: number }) {
  return (
    <div style={{ overflow: "hidden", position: "relative", padding: "6px 0" }}>
      {/* Dual copy for seamless loop */}
      <div style={{
        display: "flex", gap: 14, width: "max-content",
        animation: `partnersScroll ${speed}s linear infinite`,
      }}>
        {[...items, ...items].map((p, i) => (
          <PartnerCard key={`${p.name}-${i}`} p={p} />
        ))}
      </div>
      {/* Fade masks */}
      <div style={{ position: "absolute", inset: "0 auto 0 0", width: 80, pointerEvents: "none", background: "linear-gradient(90deg,#FCFCFD,transparent)", zIndex: 2 }} />
      <div style={{ position: "absolute", inset: "0 0 0 auto", width: 80, pointerEvents: "none", background: "linear-gradient(270deg,#FCFCFD,transparent)", zIndex: 2 }} />
    </div>
  );
}

function Partners() {
  const insurance = PARTNERS.filter(p => p.category === "Insurance");
  const service   = PARTNERS.filter(p => p.category === "Service");
  const logistics = PARTNERS.filter(p => p.category === "Logistics");

  return (
    <section id="partners" className="py-24 bg-[#FCFCFD]">
      <div className="max-w-7xl mx-auto px-8">
        <Reveal className="text-center mb-14">
          <p className="text-xs font-bold tracking-widest text-[#A9D6F5] uppercase mb-3">Our Network</p>
          <h2 className="text-[2.6rem] font-extrabold text-[#2F3A45] tracking-tight mb-4" style={JK}>
            Trusted Partnerships Across India
          </h2>
          <p className="text-lg text-[#64748B] max-w-xl mx-auto">
            Insurance providers, authorized service centers, and logistics partners — all verified, all premium.
          </p>
        </Reveal>

        {/* Category labels + flowing rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {[
            { label: "Insurance Partners",       items: insurance, speed: 34 },
            { label: "Service Center Partners",  items: service,   speed: 40 },
            { label: "Logistics Partners",       items: logistics, speed: 30 },
          ].map(row => (
            <div key={row.label}>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: ".16em", color: "#94A3B8", textTransform: "uppercase", marginBottom: 10, paddingLeft: 2 }}>
                {row.label}
              </p>
              <PartnerRow items={row.items} speed={row.speed} />
            </div>
          ))}
        </div>

        {/* Stats strip */}
        <Reveal className="mt-14">
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16,
            background: "linear-gradient(135deg,#1C2E3A,#2F3A45)",
            borderRadius: 20, padding: "28px 32px",
          }}>
            {[
              { v: "20+",  l: "Insurance Providers" },
              { v: "500+", l: "Authorized Service Centers" },
              { v: "28",   l: "States with Logistics Coverage" },
            ].map(s => (
              <div key={s.l} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: "#A9D6F5", ...JK, marginBottom: 4 }}>{s.v}</div>
                <div style={{ fontSize: 12, color: "#5A7A8E" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Blog ────────────────────────────────────────────── */

const POSTS = [
  {
    category: "Device Care",
    title: "5 Ways to Extend Your Smartphone's Lifespan by 2+ Years",
    excerpt: "Small habits compound into major savings. We reveal the maintenance routines that our top technicians recommend.",
    img: "photo-1512941937669-90a1b58e7e9c",
    read: "4 min read",
    date: "Jun 18, 2026",
  },
  {
    category: "Insurance Guide",
    title: "What Your Manufacturer Warranty Actually Covers (And What It Doesn't)",
    excerpt: "Most people find out after a damage event. We break down the fine print so you are never caught off guard.",
    img: "photo-1563013544-824ae1b704d3",
    read: "6 min read",
    date: "Jun 12, 2026",
  },
  {
    category: "Repair Insights",
    title: "Genuine vs. Third-Party Parts: The Real Cost of Choosing Wrong",
    excerpt: "A ₹500 saving on a screen replacement can cost ₹15,000 in follow-up damage. Here is the full picture.",
    img: "photo-1588776814546-1ffdd307df48",
    read: "5 min read",
    date: "Jun 5, 2026",
  },
];

function BlogPreview() {
  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-8">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-xs font-bold tracking-widest text-[#A9D6F5] uppercase mb-3">From the Blog</p>
            <h2 className="text-[2.2rem] font-extrabold text-[#2F3A45] tracking-tight" style={JK}>
              Insights & Resources
            </h2>
          </div>
          <button className="flex items-center gap-2 text-sm font-semibold text-[#1A6A96]"
            style={{ transition: "gap .2s ease" }}
            onMouseEnter={e => e.currentTarget.style.gap = "12px"}
            onMouseLeave={e => e.currentTarget.style.gap = "8px"}>
            View all articles <ArrowRight size={15} />
          </button>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {POSTS.map((post, i) => (
            <Reveal key={post.title} delay={i * 90}>
              <article className="group bg-white rounded-2xl overflow-hidden border border-[#E8EEF4] cursor-pointer h-full flex flex-col"
                style={{ transition: "transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s ease, border-color .25s ease" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 20px 52px rgba(47,58,69,.1)"; e.currentTarget.style.borderColor = "rgba(169,214,245,.35)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; e.currentTarget.style.borderColor = "#E8EEF4"; }}>
                <div className="relative bg-[#E8EEF4] overflow-hidden" style={{ height: 192, flexShrink: 0 }}>
                  <img src={`https://images.unsplash.com/${post.img}?w=600&h=380&fit=crop&auto=format`}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0"
                    style={{ background: "linear-gradient(to top,rgba(47,58,69,.22) 0%,transparent 50%)" }} />
                  <div className="absolute top-3 left-3">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                      style={{ background: "rgba(255,255,255,.92)", backdropFilter: "blur(8px)", color: "#1A6A96" }}>
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2.5 text-[11px] text-[#94A3B8] mb-3">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.read}</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#2F3A45] leading-snug mb-2.5 flex-1 group-hover:text-[#1A6A96] transition-colors" style={JK}>
                    {post.title}
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-1 text-xs font-semibold text-[#A9D6F5]"
                    style={{ transition: "gap .2s ease" }}>
                    Read more <ChevronRight size={13} />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Final CTA ───────────────────────────────────────── */

function FinalCTA() {
  return (
    <section className="py-24 bg-[#FCFCFD]">
      <div className="max-w-4xl mx-auto px-8 text-center">
        <Reveal>
          <div className="relative rounded-2xl px-12 py-14 overflow-hidden"
            style={{ background: "linear-gradient(145deg,#1C2E3A 0%,#2F3A45 55%,#1A2D3A 100%)" }}>
            {/* Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[480px] h-[240px] opacity-20 pointer-events-none"
              style={{ background: "radial-gradient(ellipse, #A9D6F5 0%, transparent 70%)", filter: "blur(50px)" }} />
            <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:"radial-gradient(rgba(169,214,245,.04) 1px,transparent 1px)", backgroundSize:"22px 22px" }} />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 text-xs font-bold px-3.5 py-1.5 rounded-full mb-6"
                style={{ backgroundColor: "rgba(169,214,245,0.12)", color: "#A9D6F5", border: "1px solid rgba(169,214,245,0.2)" }}>
                <Shield size={11} />
                Activate Protection Today
              </div>

              <h2 className="font-extrabold text-white leading-tight tracking-tight mb-5" style={{ ...JK, fontSize: "clamp(2rem,4.5vw,3rem)" }}>
                Your Device Deserves<br />
                <span style={{ background: "linear-gradient(135deg, #A9D6F5, #CFFAFE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Better Protection.
                </span>
              </h2>

              <p className="text-base text-[#8BA5B8] leading-relaxed mb-8 max-w-lg mx-auto">
                Join 200,000+ customers who have already discovered the smarter way to protect, repair, and manage their devices.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button className="flex items-center gap-2 font-bold text-sm text-[#1A3A52] px-7 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
                  style={{ background: "linear-gradient(135deg, #A9D6F5, #7EC8F0)" }}>
                  Get Protected Now <ArrowRight className="w-4 h-4" />
                </button>
                <button className="flex items-center gap-2 text-sm font-semibold text-white px-7 py-4 rounded-xl border border-white/15 hover:border-white/30 hover:bg-white/5 transition-all duration-200">
                  <Phone className="w-4 h-4" />
                  Talk to an Expert
                </button>
              </div>

              <p className="mt-6 text-xs text-[#64748B]">
                No commitment. Cancel anytime. Instant digital activation.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Footer ──────────────────────────────────────────── */

function Footer() {
  const col1 = ["Device Insurance", "Extended Warranty", "Device Repairs", "Claims Management", "Pickup & Delivery", "Repair Tracking"];
  const col2 = ["About AVLTECH", "Partner Network", "Blog & Resources", "Careers", "Press Kit", "Sitemap"];
  const col3 = ["Help Center", "File a Claim", "Track a Repair", "Contact Support", "Business Enquiries", "Become a Partner"];

  return (
    <footer style={{ background: "linear-gradient(180deg,#1C2E3A 0%,#2F3A45 100%)", color: "white" }}>
      <div className="max-w-7xl mx-auto px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-5">
              <ImageWithFallback
                src={avltechLogo}
                alt="AVLTECH logo"
                className="w-auto object-contain brightness-0 invert"
                style={{ height: 40 }}
              />
            </div>
            <p className="text-sm leading-relaxed mb-5 max-w-xs" style={{ color: "rgba(169,200,220,.6)" }}>
              India's most trusted device protection, repair, and insurance management platform.
            </p>
            <div className="space-y-2.5 mb-6">
              {[
                { icon: Phone, text: "1800-123-AVLTECH" },
                { icon: Mail,  text: "support@avltech.in" },
                { icon: MapPin,text: "Bengaluru, Karnataka, India" },
              ].map(({ icon: I, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <I size={14} color="#A9D6F5" className="flex-shrink-0" />
                  <span className="text-sm" style={{ color: "rgba(169,200,220,.6)" }}>{text}</span>
                </div>
              ))}
            </div>

            {/* Social icons — match nav sizing */}
            <div className="flex items-center gap-2">
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  title={s.label}
                  style={{
                    width: 34, height: 34, borderRadius: 9, flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "rgba(169,200,220,.55)", background: "rgba(255,255,255,.06)",
                    border: "1px solid rgba(255,255,255,.1)",
                    textDecoration: "none",
                    transition: "color .22s ease, background .22s ease, transform .22s cubic-bezier(.22,1,.36,1), border-color .22s ease",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = s.hoverColor;
                    e.currentTarget.style.background = `${s.hoverColor}18`;
                    e.currentTarget.style.borderColor = `${s.hoverColor}44`;
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = "rgba(169,200,220,.55)";
                    e.currentTarget.style.background = "rgba(255,255,255,.06)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,.1)";
                    e.currentTarget.style.transform = "";
                  }}>
                  <s.icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {[
            { heading: "Services", links: col1 },
            { heading: "Company",  links: col2 },
            { heading: "Support",  links: col3 },
          ].map(col => (
            <div key={col.heading}>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(169,200,220,.35)" }}>{col.heading}</p>
              <ul className="space-y-2.5">
                {col.links.map(l => (
                  <li key={l}>
                    <a href="#" className="text-sm transition-colors duration-200"
                      style={{ color: "rgba(169,200,220,.55)", textDecoration: "none" }}
                      onMouseEnter={e => e.currentTarget.style.color = "white"}
                      onMouseLeave={e => e.currentTarget.style.color = "rgba(169,200,220,.55)"}>
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,.07)" }} className="py-5">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "rgba(169,200,220,.35)" }}>
            © 2026 AVLTECH Technologies Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-5 flex-wrap justify-center">
            {["Privacy Policy", "Terms of Service", "IRDAI Disclosure", "Cookie Policy"].map(l => (
              <a key={l} href="#" className="text-xs transition-colors duration-200"
                style={{ color: "rgba(169,200,220,.35)", textDecoration: "none" }}
                onMouseEnter={e => e.currentTarget.style.color = "rgba(169,200,220,.75)"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(169,200,220,.35)"}>
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── Root ────────────────────────────────────────────── */

export default function App() {
  return (
    <div className="bg-[#FCFCFD]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Nav />
      <Hero />
      <MetricsBar />
      <ServicesSection />
      <AboutUs />
      <HowItWorks />
      <TrustStrip />
      <WhyChoose />
      <Testimonials />
      <Partners />
      <BlogPreview />
      <FinalCTA />
      <Footer />
    </div>
  );
}
