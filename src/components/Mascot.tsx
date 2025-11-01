import React from "react";

interface MascotProps {
  size?: number;
  className?: string;
  bounce?: boolean;
}

const Mascot: React.FC<MascotProps> = ({ size = 80, className = "", bounce = false }) => (
  <span className={`mascot-kids ${bounce ? "mascot-bounce animate-float" : ""} ${className}`}>
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      style={{ display: "inline-block" }}
    >
      <circle cx="40" cy="40" r="36" fill="#FFD600" stroke="#FF6F61" strokeWidth="6" />
      <ellipse cx="30" cy="38" rx="5" ry="8" fill="#fff" />
      <ellipse cx="50" cy="38" rx="5" ry="8" fill="#fff" />
      <ellipse cx="30" cy="40" rx="2" ry="3" fill="#6EC6FF" />
      <ellipse cx="50" cy="40" rx="2" ry="3" fill="#6EC6FF" />
      <ellipse cx="40" cy="55" rx="10" ry="5" fill="#FF6F61" />
      <ellipse cx="40" cy="53" rx="6" ry="2" fill="#fff" opacity="0.7" />
    </svg>
  </span>
);

export default Mascot;