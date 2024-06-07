"use client"

import { useFont } from "@/context/FontContext";
import useLocaleCode from "@/hooks/useLocaleCode";
import { NextPage } from "next"
import { useTranslations } from 'next-intl';
import { Linkedin } from "lucide-react"
import { Aclonica } from 'next/font/google';
import Card3D from "@/component/Card/Card3D";

const aclonica = Aclonica({ subsets: ['latin'], weight: '400' });

const About: NextPage = () => {
    const t = useTranslations('About');

    const { localeCode } = useLocaleCode();
    const { gloock, zhFont } = useFont();
    const fontClassName = localeCode === "en" ? gloock.className : zhFont.className;

    return (
        <main className="w-full min-h-[100vh] flex flex-col items-center">
            <div className="max-sm:mt-28 mt-36 mb-12 max-sm:mb-8">
                <h1 className={`${fontClassName} font-semibold max-sm:text-2xl text-3xl tracking-wider text-slate-700 dark:text-gray-100`}>📃 {t('title')}</h1>
            </div>

            <Card3D />

            <a href="https://www.linkedin.com/in/yiming-liao/" target="_blank"
                className="flex justify-center items-center my-8">
                <p className={`${aclonica.className} text-slate-500 text-sm dark:text-slate-300`}>Yiming Liao</p>
                <Linkedin className="scale-[65%] -rotate-12 mb-1 text-slate-500 ml-[2px] dark:text-slate-300" />
            </a>
        </main>
    )
}
export default About