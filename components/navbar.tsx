"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { useRef } from "react";

const navItems = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  { name: "Projects", link: "/projects" },
  { name: "Experience", link: "/experience" },
  { name: "Competitive", link: "/competitive" },
  { name: "Blog", link: "/blog" },
  { name: "Contact", link: "/contact" },
];

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

const NavbarWrapper = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const prevScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const scrollingDown = latest > prevScrollY.current;
    const scrollingUp = latest < prevScrollY.current;

    if (scrollingDown) {
      setIsScrolled(true);
    } else if (scrollingUp) {
      setIsScrolled(false);
    }

    prevScrollY.current = latest;
  });

  return (
    <motion.div
      ref={ref}
      className={cn(
        "fixed inset-x-0 top-0 z-40 w-full flex justify-center mt-6 px-4",
        className
      )}
    >
      <motion.div
        className="w-full max-w-6xl"
        animate={{
          width: isScrolled ? "60%" : "90%",
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 40,
          duration: 0.1,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

const NavBody = ({ children, className }: NavBodyProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className={cn(
        "relative z-[60] flex flex-row items-center justify-between rounded-full transition-shadow duration-300 w-full",
        isScrolled ? "shadow-lg" : "",
        "backdrop-blur-md bg-figma-menu/80 border border-white/20 px-6 py-3",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "flex flex-row items-center justify-center space-x-1 text-sm font-medium",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          key={`link-${idx}`}
          href={item.link}
          onMouseEnter={() => setHovered(idx)}
          onClick={(e) => onItemClick && onItemClick(e, item.link)}
          className="relative px-3 py-2 text-white/80 hover:text-white transition-colors font-poppins"
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-transparent border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.3)]"
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 100,
              }}
            />
          )}
          <span
            className={cn(
              "relative z-20",
              hovered === idx ? "text-white font-medium" : "text-white"
            )}
          >
            {item.name}
          </span>
        </Link>
      ))}
    </motion.div>
  );
};

const MobileNav = ({ children, className }: MobileNavProps) => {
  return (
    <motion.div
      className={cn(
        "relative z-50 flex flex-col items-center justify-between py-3 px-4 lg:hidden rounded-full backdrop-blur-md bg-figma-menu/80 border border-white/20 shadow-md w-full max-w-sm mx-auto mt-6",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

const MobileNavHeader = ({ children, className }: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className
      )}
    >
      {children}
    </div>
  );
};

const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.1,
            ease: "easeInOut",
          }}
          className={cn(
            "absolute inset-x-0 mx-auto top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg backdrop-blur-md bg-figma-menu/90 border border-white/20 px-4 py-8 shadow-md",
            className
          )}
          style={{ width: "100%" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return isOpen ? (
    <IconX
      className="text-white w-6 h-6 cursor-pointer hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300"
      onClick={onClick}
    />
  ) : (
    <IconMenu2
      className="text-white w-6 h-6 cursor-pointer hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300"
      onClick={onClick}
    />
  );
};

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleItemClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <NavbarWrapper className="hidden lg:flex">
        <NavBody>
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 font-normal text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] transition-all duration-300"
          >
            <span className="font-bold text-white font-poppins text-lg">
              itsyash
            </span>
          </Link>

          {/* Navigation Items - Centered */}
          <div className="flex-1 flex justify-center">
            <NavItems items={navItems} onItemClick={handleItemClick} />
          </div>

          {/* Hire Me Button */}
          <Button
            asChild
            className="bg-figma-gradient hover:bg-figma-gradient/90 text-black font-medium px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 font-poppins hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
          >
            <Link href="/contact">Hire me</Link>
          </Button>
        </NavBody>
      </NavbarWrapper>

      {/* Mobile Navbar */}
      <MobileNav className="lg:hidden">
        <MobileNavHeader>
          {/* Mobile Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 font-normal text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] transition-all duration-300"
          >
            <span className="font-bold text-white font-poppins">itsyash</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          />
        </MobileNavHeader>

        {/* Mobile Menu */}
        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          <div className="flex flex-col space-y-4 w-full">
            {navItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.link}
                onClick={handleItemClick}
                className="text-white/80 hover:text-white transition-all duration-300 px-4 py-2 rounded-lg hover:bg-figma-gradient font-poppins hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
              >
                {item.name}
              </Link>
            ))}
            <Button
              asChild
              className="bg-figma-gradient hover:bg-figma-gradient/90 text-black font-medium px-6 py-3 rounded-full transition-all duration-300 w-full font-poppins hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
            >
              <Link href="/contact">Hire me</Link>
            </Button>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </>
  );
}
