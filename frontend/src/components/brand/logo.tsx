import Link from "next/link";

type FraudExLogoProps = {
    inverse?: boolean;
    size?: "sm" | "md" | "lg";
    href?: string | null;
    className?: string;
    wordmarkClassName?: string;
    showWordmark?: boolean;
};

const symbolSizes = {
    sm: "size-8",
    md: "size-10",
    lg: "size-12",
};

export function FraudExLogo({
    inverse = false,
    size = "sm",
    href = "/",
    className = "",
    wordmarkClassName = "",
    showWordmark = true,
}: FraudExLogoProps) {
    const content = (
        <span className={`group inline-flex items-center gap-2.5 ${className}`}>
            <span
                aria-hidden="true"
                className={`relative flex shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-6 ${symbolSizes[size]} ${
                    inverse ? "bg-white text-[#111211]" : "bg-[#111211] text-white"
                }`}
            >
                <span className="absolute left-1/2 top-1/2 size-[22%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
                <span className="absolute left-1/2 top-1/2 h-[62%] w-px -translate-x-1/2 -translate-y-1/2 bg-current" />
                <span className="absolute left-1/2 top-1/2 h-px w-[62%] -translate-x-1/2 -translate-y-1/2 bg-current" />
            </span>
            {showWordmark && (
                <span
                    className={`text-[17px] font-semibold tracking-[-0.045em] ${
                        inverse ? "text-white" : "text-[#111211]"
                    } ${wordmarkClassName}`}
                >
                    FraudEx
                </span>
            )}
        </span>
    );

    if (href === null) return content;

    return (
        <Link href={href} aria-label="FraudEx home">
            {content}
        </Link>
    );
}
