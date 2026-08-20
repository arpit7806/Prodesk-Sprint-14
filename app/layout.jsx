import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Sprint 14 - Auth MVP",
  description: "Walking skeleton: Next.js auth architecture and route guards",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
