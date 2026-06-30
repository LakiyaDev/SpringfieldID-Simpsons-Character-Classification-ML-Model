import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

const sizes = {
  sm: { icon: 28, text: "text-base" },
  md: { icon: 36, text: "text-xl" },
  lg: { icon: 44, text: "text-2xl" },
} as const;

export function Logo({ size = "md", showText = true, className = "" }: LogoProps) {
  const { icon, text } = sizes[size];

  const content = (
    <>
      <Image
        src="/logo.png"
        alt=""
        width={icon}
        height={icon}
        className="shrink-0 rounded-full shadow-sm"
        priority
      />
      {showText && (
        <span className={`font-serif font-bold tracking-tight text-springfield-brown ${text}`}>
          Springfield ID
        </span>
      )}
    </>
  );

  const classes = `inline-flex items-center gap-2.5 hover:opacity-90 transition-opacity ${className}`;

  return (
    <Link href="/" className={classes} aria-label="Springfield ID home">
      {content}
    </Link>
  );
}
