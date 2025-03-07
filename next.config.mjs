import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const AWS_BUCKET_URL1 = process.env.AWS_BUCKET_URL || "default-bucket-url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "credentialless",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Allow images from Google Profile
      },
      {
        protocol: "https",
        pathname: "/**", // This allows any path under the bucket
        hostname: AWS_BUCKET_URL1,
      },
      // {
      //   protocol: "https",
      //   pathname: "/**", // This allows any path under the bucket
      //   hostname: process.env.NEXT_PUBLIC_S3_BUCKET2,
      // },
    ],
  },
};

export default withNextIntl(nextConfig);
