import { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://arokyaillam.org'

export function generateMetadata({
  title,
  description,
  path,
  image,
}: {
  title?: string
  description?: string
  path?: string
  image?: string
}): Metadata {
  const fullTitle = title
    ? `${title} | AROKYA ILLAM CHARITABLE TRUST`
    : 'AROKYA ILLAM CHARITABLE TRUST — Think better.'

  const fullDescription = description
    ? description
    : 'Healthcare and aided support for persons with disability: mental wellness, patient care, mobility devices, PwD camps, nutrition, and education support.'

  const url = path ? `${baseUrl}${path}` : baseUrl
  const imageUrl = image || `${baseUrl}/api/og?title=${encodeURIComponent(fullTitle)}&description=${encodeURIComponent(fullDescription)}`

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: [
      'disability support',
      'healthcare',
      'charitable trust',
      'PwD',
      'accessibility',
      'rehabilitation',
      'mental health',
      'mobility aids',
      'medical camps',
      'education support',
      'India',
      'NGO',
      'nonprofit'
    ],
    authors: [{ name: 'AROKYA ILLAM CHARITABLE TRUST' }],
    creator: 'AROKYA ILLAM CHARITABLE TRUST',
    publisher: 'AROKYA ILLAM CHARITABLE TRUST',
    robots: 'index,follow',
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      url,
      title: fullTitle,
      description: fullDescription,
      siteName: 'AROKYA ILLAM CHARITABLE TRUST',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
  }
}

export const defaultMetadata = generateMetadata({})