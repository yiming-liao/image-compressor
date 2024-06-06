// app/[locale]/about/layout.tsx
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const { locale } = params;
    const title = locale === 'zh' ? '關於我' : 'About';
    return {
        title,
        description: 'A tool to compress images with ease.',
        icons: [
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '16x16',
                url: '/icon.png',
            },
            {
                rel: 'apple-touch-icon',
                type: 'image/png',
                sizes: '180x180',
                url: '/apple-icon.png',
            },
        ],
    };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
        </div>
    );
}
