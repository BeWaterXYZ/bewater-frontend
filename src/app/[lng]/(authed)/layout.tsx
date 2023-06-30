'use client';

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  const { lng = 'en' } = params || {};

  return <div className="pt-24 lg:pt-20">{children}</div>;
}
