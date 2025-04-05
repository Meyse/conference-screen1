import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Conference Dashboard",
  description: "Real-time metrics dashboard for conference displays",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style>
          {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          html, body {
            height: 100%;
            width: 100%;
            color: white;
            background-color: black;
            font-family: system-ui, -apple-system, sans-serif;
            overflow: hidden;
          }
          
          :root {
            --primary: #3b82f6;
            --primary-light: #60a5fa;
          }
          `}
        </style>
      </head>
      <body style={{ 
        margin: 0, 
        padding: 0, 
        background: 'black', 
        color: 'white', 
        height: '100%',
        width: '100%',
        overflow: 'hidden'
      }}>
        {children}
      </body>
    </html>
  );
}
