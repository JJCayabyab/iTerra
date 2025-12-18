import Image from "next/image";
import Link from "next/link";
import { Github, Globe, Mail, MapPin } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
        
                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-100 flex flex-col md:row justify-between items-center gap-4">
                    <p className="text-xs text-gray-400 font-medium">
                        © {currentYear} Iterra. Built by <span className="text-[var(--color-primary)]">Jeremy Jhay Cayabyab</span>.
                    </p>
                  
                </div>
   
        </footer>
    );
}