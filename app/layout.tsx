import './globals.css' 


export const metadata = {
  title: 'Mi Lista de Nombres',
  description: 'App creada con Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}