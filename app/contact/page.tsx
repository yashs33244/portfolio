"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Clock, Send, ArrowRight } from "lucide-react";
import Link from "next/link";
import { GridOverlay } from "@/components/ui/grid-overlay";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Format the message for WhatsApp
      const whatsappMessage = encodeURIComponent(
        `🔔 New Portfolio Contact\n\n👤 Name: ${name}\n📧 Email: ${email}\n\n💬 Message:\n${message}`
      );

      // Create WhatsApp URL with your number
      const whatsappUrl = `https://api.whatsapp.com/send?phone=918755765125&text=${whatsappMessage}`;

      // Open WhatsApp in a new window
      window.open(whatsappUrl, "_blank");

      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });

      // Reset form
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error sending message",
        description: "Please try again or contact me directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-figma-dark">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <GridOverlay />

        <div className="figma-container relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1
              className={`text-[60px] md:text-[80px] lg:text-[100px] font-bold leading-[0.9] text-white font-poppins mb-6 transition-all duration-1000 delay-300 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              Get In{" "}
              <span className="text-figma-gradient bg-clip-text text-transparent">
                Touch
              </span>
            </h1>

            <p
              className={`text-xl md:text-2xl font-normal leading-[32px] text-white/80 font-poppins mb-12 max-w-[600px] mx-auto transition-all duration-800 delay-600 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              I'm always open to discussing new projects, creative ideas or
              opportunities to be part of your vision.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="figma-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div
              className={`transition-all duration-1000 delay-400 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              <div className="bg-figma-menu border border-white/10 rounded-lg p-8 h-full">
                <h2 className="text-3xl font-semibold mb-8 text-white font-poppins">
                  Let's Connect
                </h2>
                <p className="text-white/70 mb-12 text-lg leading-relaxed">
                  Ready to bring your ideas to life? I'd love to hear about your
                  project and explore how we can work together.
                </p>

                <div className="space-y-8">
                  <div className="flex items-start gap-6 group">
                    <div className="w-12 h-12 bg-figma-gradient rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Mail className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg mb-2">
                        Email
                      </h3>
                      <p className="text-white/70">yashs3324@gmail.com</p>
                      <p className="text-white/50 text-sm mt-1">
                        Professional inquiries
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 group">
                    <div className="w-12 h-12 bg-figma-gradient rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Phone className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg mb-2">
                        Phone
                      </h3>
                      <p className="text-white/70">+91 8755-765-125</p>
                      <p className="text-white/50 text-sm mt-1">
                        Quick discussions
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 group">
                    <div className="w-12 h-12 bg-figma-gradient rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg mb-2">
                        Location
                      </h3>
                      <p className="text-white/70">India</p>
                      <p className="text-white/50 text-sm mt-1">
                        Available worldwide
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 group">
                    <div className="w-12 h-12 bg-figma-gradient rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Clock className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg mb-2">
                        Response Time
                      </h3>
                      <p className="text-white/70">24-48 hours</p>
                      <p className="text-white/50 text-sm mt-1">
                        Usually much faster
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-12 pt-8 border-t border-white/10">
                  <p className="text-white/70 mb-4">
                    Follow me on social media:
                  </p>
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-white bg-transparent hover:bg-figma-gradient hover:text-black hover:border-figma-gradient transition-all duration-300"
                      asChild
                    >
                      <Link
                        href="https://github.com/yashs33244"
                        target="_blank"
                      >
                        GitHub
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-white bg-transparent hover:bg-figma-gradient hover:text-black hover:border-figma-gradient transition-all duration-300"
                      asChild
                    >
                      <Link
                        href="https://linkedin.com/in/yashs33244"
                        target="_blank"
                      >
                        LinkedIn
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-white bg-transparent hover:bg-figma-gradient hover:text-black hover:border-figma-gradient transition-all duration-300"
                      asChild
                    >
                      <Link
                        href="https://twitter.com/yashs33244"
                        target="_blank"
                      >
                        Twitter
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div
              className={`transition-all duration-1000 delay-600 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              <div className="bg-figma-menu border border-white/10 rounded-lg p-8">
                <h2 className="text-2xl font-semibold mb-6 text-white font-poppins">
                  Send a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">
                      Name *
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="bg-figma-dark border-white/20 text-white placeholder:text-white/50 focus:border-figma-purple focus:ring-figma-purple"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="bg-figma-dark border-white/20 text-white placeholder:text-white/50 focus:border-figma-purple focus:ring-figma-purple"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell me about your project or idea..."
                      className="bg-figma-dark border-white/20 text-white placeholder:text-white/50 focus:border-figma-purple focus:ring-figma-purple min-h-[150px] resize-none"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-figma-gradient hover:bg-figma-gradient/90 text-black font-medium text-lg py-6 rounded-full transition-all duration-300 hover:scale-105"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message via WhatsApp
                        <Send className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>

                  <p className="text-white/50 text-sm text-center">
                    By sending a message, you'll be redirected to WhatsApp for
                    instant communication.
                  </p>
                </form>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div
            className={`text-center py-16 mt-16 transition-all duration-1000 delay-800 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div className="bg-figma-menu border border-white/10 rounded-lg p-12">
              <h2 className="text-3xl font-bold text-white mb-6 font-poppins">
                Ready to Start Your Project?
              </h2>
              <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
                Let's discuss your ideas and turn them into reality. I'm here to
                help you build something amazing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  className="bg-figma-gradient hover:bg-figma-gradient/90 text-black font-medium text-lg px-8 py-4 h-auto rounded-full transition-all duration-300 hover:scale-105"
                >
                  <Link href="/projects">
                    View My Work
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-white/20 text-white bg-transparent hover:bg-white/10 font-medium text-lg px-8 py-4 h-auto rounded-full transition-all duration-300 hover:scale-105"
                >
                  <Link href="/about">Learn More About Me</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
