export interface ButtonProps {
  /** Is this the principal call to action on the page? */
  primary?: boolean;
  /** What background color to use */
  backgroundColor?: string;
  /** How large should the button be? */
  size?: "small" | "medium" | "large";
  /** Button contents */
  label: string;
  /** Optional click handler */
  onClick?: () => void;
}

/** Primary UI component for user interaction */
export const Button = ({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  // Base classes
  const baseClasses =
    "inline-block cursor-pointer border-0 rounded-full font-bold leading-none font-sans";

  // Size classes
  const sizeClasses = {
    small: "px-4 py-2.5 text-xs",
    medium: "px-5 py-2.5 text-sm",
    large: "px-6 py-3 text-base",
  };

  // Variant classes
  const variantClasses = primary
    ? "bg-[#555ab9] text-white"
    : "shadow-[rgba(0,0,0,0.15)_0px_0px_0px_1px_inset] bg-transparent text-gray-800";

  return (
    <button
      type="button"
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses}`}
      style={backgroundColor ? { backgroundColor } : {}}
      {...props}
    >
      {label}
    </button>
  );
};
