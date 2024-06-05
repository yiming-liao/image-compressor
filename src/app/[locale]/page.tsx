"use client"

import { NextPage } from "next"
import { useTranslations } from 'next-intl';
import ImageCompressor from "@/component/ImageCompressor"
import useLocaleCode from "@/hooks/useLocaleCode";
import { useFont } from "@/context/FontContext";

const Home: NextPage = () => {
    const t = useTranslations('Home');

    const { localeCode } = useLocaleCode();
    const { gloock, zhFont } = useFont();
    const fontClassName = localeCode === "en" ? gloock.className : zhFont.className;

    return (
        <main className="w-full min-h-[100svh] flex flex-col items-center">
            <div className="max-sm:mt-28 mt-36 mb-12">
                <h1 className={`${fontClassName} font-semibold text-3xl text-slate-700`}>🖼️ {t('title')}</h1>
            </div>
            <div className="max-w-96 w-[90%] min-h-[450px] shadow-xl rounded-xl border-4 border-gray-200/50">
                <ImageCompressor />
            </div>
        </main>
    )
}
export default Home
