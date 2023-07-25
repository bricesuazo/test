import HeaderContent from "@/components/client/components/header";
import { siteConfig } from "@/config/site";
import { ClerkProvider, currentUser } from "@clerk/nextjs";
import { AppShell, ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Analytics } from "@vercel/analytics/react";
import { type Metadata } from "next";
import { Poppins } from "next/font/google";

// export const revalidate = 0;

const font = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: "%s | " + siteConfig.name,
  },
  description: siteConfig.description,
  keywords: ["eBoto Mo", "Vote", "Election", "Voting System"],
  authors: [
    {
      name: "Brice Suazo",
      url: "https://bricesuazo.com",
    },
  ],
  creator: "Brice Suazo",
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@brice_suazo",
  },
  icons: {
    icon: "/images/favicon/favicon.ico",
    shortcut: "/images/favicon/favicon-16x16.png",
    apple: "/images/favicon/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
  metadataBase: new URL(siteConfig.url),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <ColorSchemeScript />
        </head>
        <body className={font.className}>
          <MantineProvider
            theme={{
              primaryColor: "green",
            }}
          >
            <Notifications />
            <AppShell
              padding={0}
              header={{ height: 60 }}
              // navbar={{ sm: 240, md: 300, xl: 340 }}
              //  navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            >
              <AppShell.Header>
                <HeaderContent user={user} />
              </AppShell.Header>

              <AppShell.Main>{children}</AppShell.Main>
            </AppShell>
            <Analytics />
          </MantineProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}