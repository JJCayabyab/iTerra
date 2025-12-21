import Image from "next/image";
import Link from "next/link";
import { Github, Globe, Mail, MapPin } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-100 py-8 mt-12">
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                <p className="text-xs text-gray-400 font-medium " >
                    © {currentYear} iTerra. Built by <span className="text-primary">Jeremy Jhay Cayabyab</span>.
                </p>
            </div>
        </footer>
    );
}