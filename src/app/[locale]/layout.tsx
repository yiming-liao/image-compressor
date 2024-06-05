import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Navbar from '@/component/Navbar/Navbar';
import { FontProvider } from '@/context/FontContext';

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
        <html lang={locale} className={`${trackingClass}  bg-neutral-100 overflow-hidden`}>
            <body>
                <NextIntlClientProvider messages={messages}>
                    <FontProvider>
                        <Navbar />
                        {children}
                    </FontProvider>
                </NextIntlClientProvider>
            </body>
        </html >
    );
}
