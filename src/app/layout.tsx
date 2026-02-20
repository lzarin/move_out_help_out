import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "Move Out Help Out — College surplus to families in need",
  description:
    "Connect college move-out surplus to local nonprofits serving families in crisis. Schedule pickups, manage inventory, and coordinate logistics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className="font-sans antialiased"
        style={{
          // Fallback so colors show even if Tailwind CSS hasn't loaded yet
          backgroundColor: "#faf8f5",
          color: "#134e4a",
        }}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
