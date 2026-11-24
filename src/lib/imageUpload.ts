/**
 * Client-side image upload and compression utility.
 * Compresses uploaded images using an HTML5 canvas to keep Base64 strings
 * lightweight (< 50KB) so they fit effortlessly within browser LocalStorage.
 */

export interface CompressImageOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0.1 to 1.0
  format?: "image/webp" | "image/jpeg";
}

export function compressAndEncodeImage(
  file: File,
  options: CompressImageOptions = {}
): Promise<string> {
  const {
    maxWidth = 400,
    maxHeight = 400,
    quality = 0.85,
    format = "image/webp",
  } = options;

  return new Promise((resolve, reject) => {
    // Basic file validation
    if (!file.type.startsWith("image/")) {
      return reject(new Error("Selected file must be an image."));
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate aspect-ratio scale
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          return resolve(event.target?.result as string);
        }

        // Draw image onto canvas with smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);

        // Export compressed Base64 DataURL
        try {
          const compressedDataUrl = canvas.toDataURL(format, quality);
          resolve(compressedDataUrl);
        } catch {
          // Fallback to jpeg if format unsupported
          const fallbackDataUrl = canvas.toDataURL("image/jpeg", quality);
          resolve(fallbackDataUrl);
        }
      };

      img.onerror = () => reject(new Error("Failed to load and render image."));
      img.src = event.target?.result as string;
    };

    reader.onerror = () => reject(new Error("Failed to read image file."));
    reader.readAsDataURL(file);
  });
}

export const PRESET_AVATARS = [
  { id: "viper", name: "Viper Duelist", path: "/images/avatars/avatar-viper.svg" },
  { id: "lion", name: "LionCity Ops", path: "/images/avatars/avatar-lion.svg" },
  { id: "rift", name: "Rift Syndicate", path: "/images/avatars/avatar-rift.svg" },
  { id: "apex", name: "Apex Warrior", path: "/images/avatars/avatar-apex.svg" },
  { id: "habesha", name: "Habesha Crest", path: "/images/avatars/avatar-habesha.svg" },
  { id: "zen", name: "Zen Precision", path: "/images/avatars/avatar-zenmaster.svg" },
  { id: "legacy1", name: "ShadowKing", path: "/images/avatar-shadowking.png" },
  { id: "legacy2", name: "GameRift", path: "/images/avatar-gamerift.png" },
];

export const PRESET_BANNERS = [
  { id: "stadium", name: "Millennium Hall Arena", path: "/images/ethora-stadium-banner.jpg" },
  { id: "clean", name: "Vanguard Main Stage", path: "/images/login-arena-clean.jpg" },
  { id: "ranking", name: "National Apex Grid", path: "/images/ethora-ranking-bg.png" },
];
