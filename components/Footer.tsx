"use client"

import Link from "next/link"
import { Facebook, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-[#1A0F0A] text-white">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* About Section */}
                    <div className="space-y-6">
                        <h3 className="font-serif text-3xl text-[#D98C8C]">Flabbergaster Bakes</h3>
                        <p className="text-white/70 text-sm leading-relaxed">
                            Handcrafted artisanal cupcakes made with love and the finest ingredients. Every bite is a celebration!
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h4 className="font-serif text-xl text-[#D98C8C]">Quick Links</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/" className="text-white/70 hover:text-[#D98C8C] transition-colors text-sm">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/menu" className="text-white/70 hover:text-[#D98C8C] transition-colors text-sm">
                                    Menu
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-white/70 hover:text-[#D98C8C] transition-colors text-sm">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-white/70 hover:text-[#D98C8C] transition-colors text-sm">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h4 className="font-serif text-xl text-[#D98C8C]">Get in Touch</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-[#D98C8C] shrink-0 mt-1" />
                                <span className="text-white/70 text-sm">
                                    123 Baker Street, Mayfair, London
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone size={18} className="text-[#D98C8C] shrink-0 mt-1" />
                                <a href="tel:+442079460123" className="text-white/70 hover:text-[#D98C8C] transition-colors text-sm">
                                    +44 20 7946 0123
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail size={18} className="text-[#D98C8C] shrink-0 mt-1" />
                                <a href="mailto:hello@flabbergaster.com" className="text-white/70 hover:text-[#D98C8C] transition-colors text-sm">
                                    hello@flabbergaster.com
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="space-y-6">
                        <h4 className="font-serif text-xl text-[#D98C8C]">Follow Us</h4>
                        <p className="text-white/70 text-sm">
                            Stay updated with our latest creations and special offers!
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="https://facebook.com/flabbergasterbakes"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 bg-white/10 hover:bg-[#D98C8C] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                                aria-label="Facebook"
                            >
                                <Facebook size={20} />
                            </a>
                            <a
                                href="https://instagram.com/flabbergasterbakes"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 bg-white/10 hover:bg-[#D98C8C] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                                aria-label="Instagram"
                            >
                                <Instagram size={20} />
                            </a>
                            <a
                                href="https://x.com/flabbergasterbakes"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 bg-white/10 hover:bg-[#D98C8C] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                                aria-label="X (Twitter)"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            <a
                                href="https://linkedin.com/company/flabbergasterbakes"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 bg-white/10 hover:bg-[#D98C8C] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={20} />
                            </a>
                            <a
                                href="https://youtube.com/@flabbergasterbakes"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 bg-white/10 hover:bg-[#D98C8C] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                                aria-label="YouTube"
                            >
                                <Youtube size={20} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-white/50 text-sm">
                            © {new Date().getFullYear()} Flabbergaster Bakes. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <Link href="/privacy" className="text-white/50 hover:text-[#D98C8C] transition-colors text-sm">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="text-white/50 hover:text-[#D98C8C] transition-colors text-sm">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
