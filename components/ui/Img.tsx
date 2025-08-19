import Image, { ImageProps } from "next/image";

type Variant = "hero" | "card" | "thumb" | "icon";

const PRESETS: Record<Variant, { sizes: string; fill?: boolean }> = {
  hero: {
    sizes: "100vw",
    fill: true,
  },
  // ⬇⬇⬇ FIX: card și thumb folosesc fill, deoarece le punem într-un wrapper cu aspectRatio
  card: {
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
    fill: true,      // <— important
  },
  thumb: {
    sizes: "(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 200px",
    fill: true,      // <— important
  },
  icon: {
    sizes: "48px",
    // fără fill la icon, de obicei îi dai width/height direct
  },
};

export type ImgProps = Omit<ImageProps, "src" | "alt"> & {
  src: string;
  alt: string;
  variant?: Variant;
  cover?: boolean;
  priority?: boolean;
};

export default function Img({
  src,
  alt,
  variant = "card",
  sizes,
  fill,
  cover,
  priority,
  style,
  ...rest
}: ImgProps) {
  const preset = PRESETS[variant];
  const computedSizes = sizes ?? preset.sizes;
  const computedFill = fill ?? preset.fill ?? false;

  return (
    <Image
      src={src}
      alt={alt}
      sizes={computedSizes}
      fill={computedFill}
      priority={priority}
      style={{ objectFit: cover ? "cover" : undefined, ...style }}
      {...rest}
    />
  );
}
