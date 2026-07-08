"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (overlay) {
      gsap.killTweensOf(overlay);
      gsap.set(overlay, { opacity: 1, pointerEvents: "all" });
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(overlay, { pointerEvents: "none" });
        },
      });
    }
  }, [pathname]);

  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (
        !href ||
        href.startsWith("http") ||
        href.startsWith("#") ||
        target.target === "_blank" ||
        e.metaKey ||
        e.ctrlKey ||
        target.hasAttribute("data-no-transition") ||
        target.closest("[data-no-transition]")
      ) {
        return;
      }

      try {
        const urlObj = new URL(href, window.location.href);
        const currentUrlObj = new URL(window.location.href);
        if (urlObj.pathname === currentUrlObj.pathname) {
          return;
        }
      } catch (err) {
        return;
      }

      e.preventDefault();

      const overlay = overlayRef.current;
      if (overlay) {
        gsap.killTweensOf(overlay);
        gsap.set(overlay, { pointerEvents: "all" });
        gsap.to(overlay, {
          opacity: 1,
          duration: 0.4,
          ease: "power2.inOut",
          onComplete: () => {
            router.push(href);
          },
        });
      }
    };

    document.addEventListener("click", handleLinkClick);
    return () => {
      document.removeEventListener("click", handleLinkClick);
    };
  }, [router]);

  return (
    <>
      <div
        ref={overlayRef}
        className="page-transition-overlay"
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "#000000",
          zIndex: 99999,
          pointerEvents: "none",
          opacity: 1,
        }}
      />
      {children}
    </>
  );
}
