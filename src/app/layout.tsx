import type { Metadata } from "next";
import { Roboto, IBM_Plex_Serif } from "next/font/google";
import "./styles/globals.css";
import { TransitionProvider } from "./contexts/TransitionContext";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

const ibmPlexSerif = IBM_Plex_Serif({
  variable: "--font-ibm-plex-serif",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Studiovistara",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/mcs5aof.css" />
        <style>{`
          @font-face {
            font-family: 'Corbel';
            src: url('/fonts/Corbel/corbel.ttf') format('truetype');
            font-weight: 400;
            font-style: normal;
          }
          @font-face {
            font-family: 'Corbel';
            src: url('/fonts/Corbel/corbell.ttf') format('truetype');
            font-weight: 300;
            font-style: normal;
          }
          @font-face {
            font-family: 'Corbel';
            src: url('/fonts/Corbel/corbelb.ttf') format('truetype');
            font-weight: 700;
            font-style: normal;
          }
          @font-face {
            font-family: 'Corbel';
            src: url('/fonts/Corbel/corbeli.ttf') format('truetype');
            font-weight: 400;
            font-style: italic;
          }
          @font-face {
            font-family: 'Corbel';
            src: url('/fonts/Corbel/corbelli.ttf') format('truetype');
            font-weight: 300;
            font-style: italic;
          }
          @font-face {
            font-family: 'Corbel';
            src: url('/fonts/Corbel/corbelz.ttf') format('truetype');
            font-weight: 900;
            font-style: normal;
          }
        `}</style>
      </head>
      <body
        className={`${roboto.variable} ${ibmPlexSerif.variable} antialiased`}
      >
        <TransitionProvider>
          {children}
        </TransitionProvider>
      </body>
    </html>
  );
}
