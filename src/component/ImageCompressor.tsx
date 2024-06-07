"use client";

import { useRef, useState } from 'react';
import Compressor from 'compressorjs';
import type { NextPage } from 'next';
import RippleEffect from './RippleEffect';
import { CornerDownRight, Paperclip, Download } from 'lucide-react';
import HoverButton from './Button/HoverButton';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useTranslations } from 'next-intl';

const ImageCompressor: NextPage = () => {
    const [downloadUrl, setDownloadUrl] = useState<string>("");
    const [fileName, setFileName] = useState<string | null>(null);
    const [customFileName, setCustomFileName] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null); // 添加一個狀態來保存文件
    const [quality, setQuality] = useState<number>(8); // 控制壓縮品質的狀態
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [mimeType, setMimeType] = useState<"png" | "webp" | "jpeg">("jpeg");

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const fileName = file.name;
        const extension = fileName.split('.').pop() || '';  // 使用正則表達式提取副檔名
        if (extension === "png") setMimeType("png");
        if (extension === "webp") setMimeType("webp");
        if (extension === "jpeg" || extension === "jpg") setMimeType("jpeg");
        setDownloadUrl("")
        setFileName(file.name);
        setFile(file); // 保存文件到狀態中
    };

    const handleCompress = () => {
        if (!file) return; // 確保有文件被選擇
        setIsLoading(true);
        new Compressor(file, {
            quality: quality / 10, // 使用狀態中的壓縮品質
            mimeType: `image/${mimeType}`,
            convertSize: 20000000, // 最大20MB
            success(result) {
                const url = URL.createObjectURL(result);
                setDownloadUrl(url);
                setIsLoading(false)
            },
            error(err) {
                console.error('Compress Error:', err.message);
            },
        });

        const timeStamp = getCurrentFormattedTime();
        setCustomFileName(`${timeStamp}`)
    }

    const handleButtonClick = () => inputRef.current?.click();

    // 出現動畫
    const ref = useRef<HTMLDivElement | null>(null);
    const downloadRef = useRef<HTMLDivElement | null>(null);
    useGSAP(() => {
        if (downloadUrl && !isLoading) {
            if (!downloadRef) return;
            gsap.fromTo(downloadRef.current, { display: "flex", opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .5, ease: "back.out(1.7)" });
        } else {
            gsap.set(downloadRef.current, { opacity: 0, display: "none" });
        }
    }, [downloadUrl, isLoading])

    // i18n
    const t = useTranslations("Compressor");

    return (
        <div className="w-full flex flex-col items-center justify-center px-8 py-8" ref={ref}>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={inputRef}
                className="hidden"
            />

            {/* 選擇檔案 */}
            <button
                onClick={handleButtonClick}
                className="w-auto h-10 pr-2 text-slate-600 font-semibold shadow bg-slate-100 border-2 border-slate-300 rounded-md active:scale-95 flex justify-center items-center
                sm:hover:bg-slate-600 sm:hover:text-slate-100 duration-150 max-sm:active:bg-slate-600 max-sm:active:text-slate-100
                "
            >
                <div className='w-6 ml-1 scale-[65%]'>
                    <Paperclip className='duration-0' />
                </div>
                {t("btn1")}
            </button>

            {/* 已上傳檔案 */}
            <div className='flex flex-col justify-center items-center mt-3'>
                <div className='relative flex justify-center items-center mt-1'>
                    <CornerDownRight className='text-slate-400 absolute left-0 -translate-x-[100%]' />
                    <div className=' bg-slate-100 w-52 h-12 rounded-md flex justify-start items-center overflow-auto shadow-inner cursor-grab active:cursor-grabbing'>
                        <RippleEffect buttonStyles={'w-full h-12 rounded-md'} rippleStyles={'bg-slate-400/50'} rippleScale={3} rippleDuration={1.85}>
                            <p className={`${fileName ? "text-slate-600" : "text-slate-500/50"} w-full font-semibold text-nowrap text-center`}>{fileName || `${t("none")}`}</p>
                        </RippleEffect>
                    </div>
                </div>
            </div>

            <div className='flex flex-col justify-center items-center mt-6'>
                {/* 輸出格式 */}
                <p className={` text-slate-400 w-full font-semibold text-nowrap text-start text-sm my-1 ml-1`}>
                    {t("p3")}：
                </p>
                <div className='flex justify-between w-52 items-center mb-3'>
                    {["jpeg", "png", "webp"]
                        .map((option, idx) => (
                            <HoverButton
                                key={idx}
                                pClassName={`${mimeType === option ? "text-white" : "text-slate-600"} group-hover:text-white duration-75 font-semibold`}
                                buttonClassName={`w-14 h-10 rounded-md ${mimeType === option ? "bg-slate-500" : "bg-white"} active:shadow-inner flex-center border-2 border-gray-100/30`}
                                spanClassName={"bg-slate-700/80 rounded-full"}
                                scale={1.6}
                                onClick={() => setMimeType(option as "jpeg" | "png" | "webp")}
                            >
                                <RippleEffect buttonStyles={'w-14 h-10 rounded-md'} rippleStyles={'bg-slate-200/50'} rippleScale={4} rippleDuration={.85}>
                                    {option}
                                </RippleEffect>
                            </HoverButton>
                        ))}
                </div>

                {/* 壓縮後容量 */}
                <p className={` text-slate-400 w-full font-semibold text-nowrap text-start text-sm my-1 ml-1`}>
                    {t("p1")}：
                </p>
                <div className='flex justify-between w-52 items-center gap-2'>
                    {[{ text: "10%", quality: 1 }, { text: "30%", quality: 5 }, { text: "60%", quality: 8 }, { text: "90%", quality: 9 }]
                        .map((option, idx) => (
                            <HoverButton
                                key={idx}
                                pClassName={`${quality === option.quality ? "text-white" : "text-slate-600"} group-hover:text-white duration-75 font-semibold`}
                                buttonClassName={`w-12 h-8 rounded-md ${quality === option.quality ? "bg-slate-500" : "bg-white"} active:shadow-inner flex-center border-2 border-gray-100/30`}
                                spanClassName={"bg-slate-700/80 rounded-full"}
                                scale={1.6}
                                onClick={() => setQuality(option.quality)}
                            >
                                <RippleEffect buttonStyles={'w-12 h-8 rounded-md'} rippleStyles={'bg-slate-200/50'} rippleScale={4} rippleDuration={.85}>
                                    {option.text}
                                </RippleEffect>
                            </HoverButton>
                        ))}
                </div>

                {/* 壓縮 */}
                <button
                    className={`w-28 h-12 rounded-full mt-6 font-semibold active:scale-95  duration-150  border-2 border-slate-300/75
                        ${fileName ? "bg-white text-slate-600 shadow-md sm:hover:bg-slate-500/75 sm:hover:text-slate-100 max-sm:active:bg-slate-600/75 max-sm:active:text-slate-100" : "bg-none text-slate-300/75"}`}
                    onClick={handleCompress}
                    disabled={!fileName}
                >
                    {t("btn2")}
                </button>
            </div>

            <div className={`w-fit mt-20 ${isLoading ? "" : "hidden"}`}>
                <svg className='animate-spin fill-slate-600/60' width="30px" height="30px" viewBox="0 0 122.315 122.88">
                    <g>
                        <path fillRule="evenodd" clipRule="evenodd" d="M94.754,14.534c8.844,0,16.014,7.17,16.014,16.012 c0,8.844-7.17,16.015-16.014,16.015c-8.843,0-16.013-7.17-16.013-16.015C78.741,21.704,85.911,14.534,94.754,14.534L94.754,14.534z M109.265,52.121c-7.205,0-13.049,5.844-13.049,13.048c0,7.207,5.844,13.049,13.049,13.051c7.207,0,13.051-5.844,13.051-13.051 C122.315,57.965,116.472,52.121,109.265,52.121L109.265,52.121z M94.135,89.903c-5.032,0-9.114,4.082-9.114,9.113 c0,5.032,4.082,9.114,9.114,9.114c5.031,0,9.113-4.082,9.113-9.114C103.248,93.985,99.166,89.903,94.135,89.903L94.135,89.903z M59.275,104.65c-5.032,0-9.114,4.081-9.114,9.113c0,5.034,4.082,9.116,9.114,9.116s9.113-4.082,9.113-9.116 C68.389,108.731,64.308,104.65,59.275,104.65L59.275,104.65z M23.652,90.86c-4.717,0-8.54,3.823-8.54,8.54 c0,4.715,3.823,8.54,8.54,8.54c4.714,0,8.538-3.825,8.538-8.54C32.19,94.684,28.366,90.86,23.652,90.86L23.652,90.86z M9.096,54.872C4.072,54.872,0,58.944,0,63.968c0,5.021,4.072,9.093,9.096,9.093c5.021,0,9.093-4.072,9.093-9.093 C18.189,58.944,14.116,54.872,9.096,54.872L9.096,54.872z M23.652,17.026c-6.354,0-11.508,5.155-11.508,11.509 s5.154,11.506,11.508,11.506s11.506-5.152,11.506-11.506S30.006,17.026,23.652,17.026L23.652,17.026z M59.341,0 c-7.651,0-13.858,6.205-13.858,13.855c0,7.651,6.207,13.856,13.858,13.856s13.856-6.205,13.856-13.856 C73.197,6.205,66.992,0,59.341,0L59.341,0z" />
                    </g>
                </svg>
            </div>


            <div className="mt-6 flex-col justify-center items-center hidden" ref={downloadRef}>
                <p className={` text-slate-400 w-full font-semibold text-nowrap text-start text-sm my-1 ml-1`}>
                    {t("p2")}：
                </p>
                <input
                    type="text"
                    value={customFileName}
                    onChange={(e) => setCustomFileName(e.target.value)}
                    className="w-52 h-10 p-2 border rounded-md text-slate-800"
                />
                <a
                    href={downloadUrl}
                    download={customFileName}
                    className="w-52 h-10 rounded-md flex items-center justify-center font-semibold text-slate-100 mt-2 shadow-md
                            bg-gradient-to-r from-gray-400 to-slate-500 
                            "
                >
                    <RippleEffect
                        buttonStyles={'w-full h-10 rounded-md flex items-center justify-center pr-2'}
                        rippleStyles={'w-full h-full bg-white/50 max-sm:hidden'}
                        rippleScale={3} rippleDuration={1}>
                        <Download className='scale-[65%]' />
                        {t("btn3")}
                    </RippleEffect>
                </a>
            </div>
        </div >
    );
};

export default ImageCompressor;




function getCurrentFormattedTime() {
    const now = new Date();

    const year = now.getFullYear();
    const month = now.getMonth() + 1; // 月份是從 0 開始的
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // 使用模板字串並將單個數字轉換為兩位數
    return `${year}${padToTwoDigits(month)}${padToTwoDigits(day)}_${padToTwoDigits(hours)}${padToTwoDigits(minutes)}${padToTwoDigits(seconds)}`;
}

// 補零函數，確保每部分至少有兩位數
function padToTwoDigits(num: number) {
    return num.toString().padStart(2, '0');
}
