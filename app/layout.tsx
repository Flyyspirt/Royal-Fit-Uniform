import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://royalfituniform.com'),
  title: 'Royal Fit Uniform | Premium B2B Uniforms for Hotels & Hospitals',
  description: 'Your B2B uniform partner for hotels and hospitals. Quality uniforms with bulk pricing, customization options, and reliable delivery. Request a free quote today.',
  keywords: 'hotel uniforms, hospital scrubs, bulk uniforms, hospitality uniforms, healthcare uniforms, custom workwear, B2B uniforms, professional uniforms',
  authors: [{ name: 'Royal Fit Uniform' }],
  openGraph: {
    title: 'Royal Fit Uniform | Premium B2B Uniforms for Hotels & Hospitals',
    description: 'Your B2B uniform partner for hotels and hospitals. Quality uniforms with customization and reliable service.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Royal Fit Uniform',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Royal Fit Uniform | Premium B2B Uniforms',
    description: 'Your B2B uniform partner for hotels and hospitals.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#227762" />
      </head>
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  )
}
