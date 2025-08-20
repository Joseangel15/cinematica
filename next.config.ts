import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "theposterdb.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
        pathname: `/**`, // Replace {space_id} with your actual Contentful space ID
      },
    ]
  }
};

export default nextConfig;
