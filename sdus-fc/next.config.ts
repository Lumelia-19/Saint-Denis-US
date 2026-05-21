import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // TODO: Ajouter les domaines des images externes si nécessaire
      // Exemple pour l'API FFF :
      // { protocol: 'https', hostname: 'media.fff.fr' },
    ],
  },
};

export default nextConfig;
