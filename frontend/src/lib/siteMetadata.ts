import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const siteConfig = {
  name: "Springfield ID",
  title: "Springfield ID — Simpsons Character Classifier",
  description:
    "Upload a photo to identify Springfield characters instantly using Azure Custom Vision AI.",
  url: siteUrl,
  logo: "/logo.png",
} as const;

const sharedIcons: Metadata["icons"] = {
  icon: [
    { url: siteConfig.logo, type: "image/png" },
    { url: siteConfig.logo, sizes: "32x32", type: "image/png" },
    { url: siteConfig.logo, sizes: "192x192", type: "image/png" },
  ],
  shortcut: siteConfig.logo,
  apple: [{ url: siteConfig.logo, sizes: "180x180", type: "image/png" }],
};

const sharedOpenGraphImage = {
  url: siteConfig.logo,
  width: 512,
  height: 512,
  alt: `${siteConfig.name} logo`,
};

export function createPageMetadata(
  title: string,
  description: string = siteConfig.description
): Metadata {
  return {
    title,
    description,
    icons: sharedIcons,
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: siteConfig.name,
      images: [sharedOpenGraphImage],
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [siteConfig.logo],
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  icons: sharedIcons,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteUrl,
    siteName: siteConfig.name,
    images: [sharedOpenGraphImage],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.logo],
  },
};
