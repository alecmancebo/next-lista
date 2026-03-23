import './globals.css' 


export const metadata = {
  title: 'Mi Lista de Nombres',
  description: 'App creada con Next.js',
}

/*esto es solo metadatos para seo e info */

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


/*layout.js), que es una pieza fundamental en el App Router de Next.js. Su función es definir la estructura común (el "esqueleto") de todas las páginas de tu aplicación.*/ 