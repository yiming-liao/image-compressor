import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Navbar from '@/component/Navbar/Navbar';
import { FontProvider } from '@/context/FontContext';
import { Metadata } from 'next';
import DrawerLayout from '@/component/Drawer/DrawerLayout';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const { locale } = params;
    const title = locale === 'zh' ? '照片壓縮器' : "Image Compressor";
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


export default async function LocaleLayout({
    children,
    params: { locale }
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const messages = await getMessages();
    const trackingClass = locale === 'en' ? 'tracking-normal' : 'tracking-wider';

    return (
        <html lang={locale}>
            <body className={`${trackingClass}  overflow-hidden bg-primary`}>
                <NextIntlClientProvider messages={messages}>
                    <FontProvider>
                        <Navbar />
                        <DrawerLayout />
                        {children}
                    </FontProvider>
                </NextIntlClientProvider>
            </body>
        </html >
    );
}
