"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

type MobileMenuProps = {
  links: { href: string; label: string }[];
  openLabel: string;
  closeLabel: string;
};

export function MobileMenu({
  links,
  openLabel,
  closeLabel,
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };

    const closeOutside = (event: FocusEvent | PointerEvent) => {
      if (
        event.target instanceof Node &&
        !rootRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const closeWhenHidden = () => {
      if (toggleRef.current?.getClientRects().length === 0) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("focusin", closeOutside);
    document.addEventListener("pointerdown", closeOutside);
    window.addEventListener("resize", closeWhenHidden);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("focusin", closeOutside);
      document.removeEventListener("pointerdown", closeOutside);
      window.removeEventListener("resize", closeWhenHidden);
    };
  }, [isOpen]);

  return (
    <div className="mobile-menu" ref={rootRef}>
      <button
        className="mobile-menu__toggle"
        type="button"
        ref={toggleRef}
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={isOpen ? closeLabel : openLabel}
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? (
          <X size={22} aria-hidden="true" />
        ) : (
          <Menu size={22} aria-hidden="true" />
        )}
      </button>
      <nav
        className="mobile-menu__panel"
        id={panelId}
        aria-label={openLabel}
        hidden={!isOpen}
      >
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} onClick={() => setIsOpen(false)}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
