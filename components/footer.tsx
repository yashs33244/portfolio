import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";

const pageLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Experience", href: "/experience" },
  { name: "Competitive", href: "/competitive" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const socialLinks = [
  { name: "GitHub", href: "https://github.com/yashs33244", icon: Github },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/yashs33244",
    icon: Linkedin,
  },
  { name: "Twitter", href: "https://twitter.com/yashs33244", icon: Twitter },
];

export default function Footer() {
  return (
    <footer className="bg-figma-dark border-t border-white/10 pt-[100px]">
      {/* Main footer content */}
      <div className="figma-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand and description */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl font-normal text-white font-poppins">
                itsyash
              </span>
            </div>
            <p className="text-white/70 mb-6 leading-relaxed">
              Fullstack Developer & Data Science Enthusiast crafting clean,
              modern websites and applications.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 hover:bg-figma-gradient rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-5 h-5 text-white group-hover:text-black transition-colors duration-300" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-white font-semibold mb-6 text-lg">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {pageLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-1">
            <h3 className="text-white font-semibold mb-6 text-lg">Services</h3>
            <ul className="space-y-3">
              <li>
                <span className="text-white/70">Frontend Development</span>
              </li>
              <li>
                <span className="text-white/70">Backend Development</span>
              </li>
              <li>
                <span className="text-white/70">Full Stack Solutions</span>
              </li>
              <li>
                <span className="text-white/70">Data Science</span>
              </li>
              <li>
                <span className="text-white/70">Cloud Infrastructure</span>
              </li>
            </ul>
          </div>

          {/* Contact Info & CTA */}
          <div className="md:col-span-1">
            <h3 className="text-white font-semibold mb-6 text-lg">
              Get In Touch
            </h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-figma-purple" />
                <span className="text-white/70 text-sm">
                  yashs3324@gmail.com
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-figma-purple" />
                <span className="text-white/70 text-sm">+91 8755-765-125</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-figma-purple" />
                <span className="text-white/70 text-sm">India</span>
              </div>
            </div>

            <Button
              asChild
              className="w-full bg-figma-gradient hover:bg-figma-gradient/90 text-black font-medium rounded-full transition-all duration-300 hover:scale-105"
            >
              <Link href="/contact">Let's Work Together</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Large itsyash text */}
      <div className="relative overflow-hidden py-20">
        <div className="figma-container">
          <h2 className="text-[120px] md:text-[180px] lg:text-[240px] font-bold text-center leading-none text-white/5 font-poppins select-none">
            itsyash
          </h2>
        </div>
      </div>
    </footer>
  );
}
