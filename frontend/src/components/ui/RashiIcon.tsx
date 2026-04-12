// src/components/ui/RashiIcon.tsx

interface RashiIconProps {
  id: string;
  className?: string;
}

export function RashiIcon({ id, className = "h-6 w-6" }: RashiIconProps) {
  // Using a 24x24 viewBox with crisp, consistent 1.5px stroke weight
  const svgProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className
  };

  switch (id) {
    case 'mesh': // Aries (♈) - The classic Ram's horns
      return (
        <svg {...svgProps}>
          <path d="M12 21L12 9" />
          <path d="M12 9a5 5 0 1 0-8-5" />
          <path d="M12 9a5 5 0 1 1 8-5" />
        </svg>
      );
    case 'vrishabh': // Taurus (♉) - Bull's head
      return (
        <svg {...svgProps}>
          <circle cx="12" cy="15" r="5" />
          <path d="M5 8a7 7 0 0 1 14 0" />
        </svg>
      );
    case 'mithun': // Gemini (♊) - The Twins / Pillars
      return (
        <svg {...svgProps}>
          <path d="M4 6a14 14 0 0 1 16 0" />
          <path d="M4 18a14 14 0 0 0 16 0" />
          <path d="M9 6v12" />
          <path d="M15 6v12" />
        </svg>
      );
    case 'kark': // Cancer (♋) - The Crab claws
      return (
        <svg {...svgProps}>
          <circle cx="16" cy="8" r="3" />
          <path d="M14 10a5 5 0 1 1-9 5" />
          <circle cx="8" cy="16" r="3" />
          <path d="M10 14a5 5 0 1 1 9-5" />
        </svg>
      );
    case 'singh': // Leo (♌) - The Lion's mane
      return (
        <svg {...svgProps}>
          <circle cx="8" cy="8" r="3" />
          <path d="M11 8c0 5 8 3 8-2s-4-6-8-1-6 5-3 9 7 6 11 3" />
        </svg>
      );
    case 'kanya': // Virgo (♍) - The Maiden (M with loop and cross)
      return (
        <svg {...svgProps}>
          <path d="M4 7v10M8 7v10M12 7v10" />
          <path d="M4 7c0-2 4-2 4 0M8 7c0-2 4-2 4 0" />
          <path d="M12 7c0-2 4-2 4 0c0 5 6 5 6 1s-3-5-6-2-4 8 2 10" />
          <path d="M13 14l4 4" />
        </svg>
      );
    case 'tula': // Libra (♎) - The Scales
      return (
        <svg {...svgProps}>
          <line x1="4" y1="17" x2="20" y2="17" />
          <path d="M4 13h5a3 3 0 1 0 6 0h5" />
        </svg>
      );
    case 'vrishchik': // Scorpio (♏) - The Scorpion (M with arrow tail)
      return (
        <svg {...svgProps}>
          <path d="M4 7v10M8 7v10M12 7v10" />
          <path d="M4 7c0-2 4-2 4 0M8 7c0-2 4-2 4 0" />
          <path d="M12 7c0-2 4-2 4 0c0 5 6 5 6 1s-2-5-4-3v6" />
          <path d="M16 19l4 4m0-4v4h-4" />
        </svg>
      );
    case 'dhanu': // Sagittarius (♐) - The Archer's arrow
      return (
        <svg {...svgProps}>
          <line x1="5" y1="19" x2="19" y2="5" />
          <polyline points="10 5 19 5 19 14" />
          <line x1="14" y1="16" x2="8" y2="10" />
        </svg>
      );
    case 'makar': // Capricorn (♑) - The Sea-Goat (V connected to loop)
      return (
        <svg {...svgProps}>
          <path d="M6 7l4 8 4-8" />
          <path d="M14 7c0 5 5 5 5 2s-2-4-4-2v6a3 3 0 1 1-6 0" />
        </svg>
      );
    case 'kumbh': // Aquarius (♒) - The Water Bearer (Waves)
      return (
        <svg {...svgProps}>
          <path d="M3 9l3-3 3 3 3-3 3 3 3-3 3 3" />
          <path d="M3 17l3-3 3 3 3-3 3 3 3-3 3 3" />
        </svg>
      );
    case 'meen': // Pisces (♓) - The two Fish
      return (
        <svg {...svgProps}>
          <path d="M6 3a16 16 0 0 0 0 18" />
          <path d="M18 3a16 16 0 0 1 0 18" />
          <path d="M4 12h16" />
        </svg>
      );
    default:
      return <svg {...svgProps}><circle cx="12" cy="12" r="10" /></svg>;
  }
}