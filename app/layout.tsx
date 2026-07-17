import { seoData } from "@/config/root/seo";
import { getUrl } from "@/lib/utils";
import "@/styles/tailwind.css";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/theme-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Next.js Blog",
    default: seoData.title,
    absolute: seoData.absoluteTitle,
  },
  generator: seoData.author.name,
  applicationName: seoData.title,
  description: seoData.description,
  referrer: "origin-when-cross-origin",
  keywords: seoData.keywords,
  authors: [
    {
      name: seoData.author.name,
      url: seoData.author.twitterUrl,
    },
  ],
  creator: seoData.author.name,
  publisher: seoData.author.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(getUrl()),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/favicons/android-icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    shortcut: ["/favicons/favicon-32x32.png"],
    apple: [
      { url: "/favicons/apple-icon.png" },
      { url: "/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/favicons/apple-icon-precomposed.png",
      },
    ],
  },
  manifest: `${getUrl()}/favicons/manifest.json`,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: getUrl(),
    title: seoData.title,
    description: seoData.description,
    siteName: seoData.title,
    images: [
      {
        url: `${getUrl()}/images/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: seoData.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seoData.ogTitle,
    description: seoData.description,
    images: `${getUrl()}/images/twitter-image.png`,
    creator: seoData.author.twitterAddress,
  },
  appleWebApp: {
    capable: true,
    title: seoData.title,
    statusBarStyle: "black-translucent",
  },
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fontSans.variable}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="bg-background font-sans text-foreground">
            {children}
            <VercelAnalytics />
            <Toaster position="top-center" />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
