import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[hsl(var(--color-bg-base))] text-[hsl(var(--color-text-muted))] mt-16">
      <div className="wb-container pt-0 pb-10 space-y-20">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          {/* Left: Logo */}
          <div>
            <Image
              src="/logo.webp"
              alt="webbinich"
              width={280}
              height={64}
              className="logo-invert"
              priority={false}
            />
          </div>

          {/* Middle: Services */}
          <div className="space-y-3 text-center md:text-left md:pl-20">
            <p>Webdesign</p>
            <p>Suchmaschinen</p>
            <p>Digitale Werbung</p>
          </div>

          {/* Right: Legals */}
          <div className="space-y-3 text-right text-sm">
            <Link
              href="/cookies"
              className="block text-[hsl(var(--color-brand-secondary))] hover:opacity-90"
            >
              Cookie Richtlinien
            </Link>
            <Link
              href="/datenschutz"
              className="block text-[hsl(var(--color-brand-secondary))] hover:opacity-90"
            >
              Datenschutz
            </Link>
            <Link
              href="/impressum"
              className="block text-[hsl(var(--color-brand-secondary))] hover:opacity-90"
            >
              Impressum
            </Link>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          {/* Adresse */}
          <div className="text-[hsl(var(--color-text-base))]">
            <p>{"://web/bin/ich Webagentur"}</p>
            <p>Düsselthaler Str. 9</p>
            <p>40211 Düsseldorf</p>
            <p>GERMANY</p>
          </div>

          {/* Copyright */}
          <p className="text-xs text-[hsl(var(--color-text-base))] md:pb-[2px]">
            © {new Date().getFullYear()} ://web/bin/ich Webagentur
          </p>
        </div>
      </div>
    </footer>
  );
}
