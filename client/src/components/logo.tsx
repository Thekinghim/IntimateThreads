import logoImage from "@assets/generated_images/Swedish_flag_underwear_logo_572d5b33.png";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ className = "", size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12", 
    lg: "h-16 w-16"
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img 
        src={logoImage} 
        alt="Scandiscent Logo" 
        className={`${sizeClasses[size]} object-contain`}
      />
      <span className="text-xl font-light tracking-wide">Scandiscent</span>
    </div>
  );
}