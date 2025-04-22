// this is origonal version
/*import { useRef, useState } from "react";

import Wave from "./Wave";
import { Microphone } from "@phosphor-icons/react";

export enum MicrophoneStatus {
  Listening,
  stopListening
}

interface MicrophoneInputProps {
  talking: boolean;
  contentChange?: (content: string) => void;
  onSubmit?: (content: string) => void;
  onStopPlay?: () => void;
  onStatusChange?: (status: MicrophoneStatus) => void;
}

const SpeechRecognition =
  globalThis.SpeechRecognition || globalThis.webkitSpeechRecognition;

export default function MicrophoneInput({
  talking = false,
  contentChange,
  onSubmit,
  onStopPlay,
  onStatusChange
}: MicrophoneInputProps) {
  const firstflag = useRef(true);
  let recognition = useRef<SpeechRecognition>();

  const [play, setPlay] = useState<boolean>(false);
  const handlerStop = () => {
    setPlay(false);
    onStopPlay && onStopPlay();
  };

  const startPlay = () => {
    if (play) return;
    recognition.current = new SpeechRecognition();
    recognition.current.continuous = true;
    recognition.current.lang = "zh";
    //recognition.current.lang = "zh-HK", "zh-TW";
    recognition.current.interimResults = true;
    recognition.current.maxAlternatives = 1;
    recognition.current.onresult = function (event) {
      const item = event.results[0];

      console.info(
        "Result received: " + item[0].transcript + " ." + item[0].confidence,
      );
      contentChange && contentChange(item[0].transcript);
      if (item.isFinal) {
        recognition.current?.stop();
        onSubmit && onSubmit(item[0].transcript);
      }
    };
    recognition.current.onstart = function () {
      console.log("start");
      onStatusChange && onStatusChange(MicrophoneStatus.Listening);
    };
    recognition.current.onend = function () {
      setPlay(false);
      console.log("end");
      onStatusChange && onStatusChange(MicrophoneStatus.stopListening)
    };
    recognition.current.onspeechend = function () {
      recognition.current!.stop();
    };

    recognition.current.onerror = function (event) {
      console.error("Error occurred in recognition: " + event.error);
    };
    recognition.current.start();
    setPlay(true);
  };

  return (
    <button
      className="w-full p-1 flex flex-row justify-center bg-default-100 items-center gap-4 overflow-hidden color-inherit subpixel-antialiased rounded-md bg-background/10 backdrop-blur backdrop-saturate-150"
      onClick={startPlay}
    >
      <Microphone fontSize={28} color={play ? "#1f94ea" : "white"} />
      <Wave play={play} />
    </button>
  );
}*/

// 0311 多國語言測試
/*import { useRef, useState, useEffect } from "react";
import Wave from "./Wave";
import { Microphone, CaretLeft, CaretRight } from "@phosphor-icons/react";

export enum MicrophoneStatus {
  Listening,
  stopListening
}

// 支援的語言配置
interface SupportedLanguage {
  code: string;
  displayName: string;
}

// 定義支援的語言列表
const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  { code: "yue-Hant-HK", displayName: "廣東話 (Cantonese)" },
  { code: "en-US", displayName: "English" },
  { code: "zh-CN", displayName: "中文 (普通话)" },
  { code: "ja-JP", displayName: "日本語 (Japanese)" },
];

interface MicrophoneInputProps {
  talking: boolean;
  contentChange?: (content: string) => void;
  onSubmit?: (content: string, languageCode?: string) => void;
  onStopPlay?: () => void;
  onStatusChange?: (status: MicrophoneStatus) => void;
  onLanguageChange?: (language: SupportedLanguage) => void;
  initialLanguage?: string;
}

const SpeechRecognition =
  globalThis.SpeechRecognition || globalThis.webkitSpeechRecognition;

export default function MicrophoneInput({
  talking = false,
  contentChange,
  onSubmit,
  onStopPlay,
  onStatusChange,
  onLanguageChange,
  initialLanguage = "zh-CN"
}: MicrophoneInputProps) {
  const recognition = useRef<SpeechRecognition>();
  const [play, setPlay] = useState<boolean>(false);
  
  // 找出初始語言在列表中的索引
  const initialIndex = SUPPORTED_LANGUAGES.findIndex(lang => lang.code === initialLanguage);
  const [languageIndex, setLanguageIndex] = useState<number>(initialIndex >= 0 ? initialIndex : 0);
  const currentLanguage = SUPPORTED_LANGUAGES[languageIndex];
  
  const [currentText, setCurrentText] = useState<string>("");
  
  // 語言改變時的處理
  useEffect(() => {
    if (onLanguageChange) {
      onLanguageChange(currentLanguage);
    }
    
    // 如果正在錄音，重新啟動以應用新語言
    if (play && recognition.current) {
      recognition.current.stop();
      setTimeout(() => startPlay(), 300);
    }
  }, [languageIndex]);
  
  const handlerStop = () => {
    if (recognition.current) {
      recognition.current.stop();
    }
    setPlay(false);
    onStopPlay && onStopPlay();
  };
  
  // 選擇上一個語言
  const prevLanguage = () => {
    setLanguageIndex((languageIndex - 1 + SUPPORTED_LANGUAGES.length) % SUPPORTED_LANGUAGES.length);
  };
  
  // 選擇下一個語言
  const nextLanguage = () => {
    setLanguageIndex((languageIndex + 1) % SUPPORTED_LANGUAGES.length);
  };

  const startPlay = () => {
    if (play) return;
    
    recognition.current = new SpeechRecognition();
    recognition.current.continuous = true;
    recognition.current.lang = currentLanguage.code;
    recognition.current.interimResults = true;
    recognition.current.maxAlternatives = 1;
    
    recognition.current.onresult = function (event) {
      const item = event.results[0];
      const transcript = item[0].transcript;

      console.info(
        `Result received: "${transcript}" (Confidence: ${item[0].confidence}) - Language: ${currentLanguage.displayName}`,
      );
      
      setCurrentText(transcript);
      contentChange && contentChange(transcript);
      
      if (item.isFinal) {
        recognition.current?.stop();
        onSubmit && onSubmit(transcript, currentLanguage.code);
      }
    };
    
    recognition.current.onstart = function () {
      console.log(`Start listening in ${currentLanguage.displayName}`);
      onStatusChange && onStatusChange(MicrophoneStatus.Listening);
    };
    
    recognition.current.onend = function () {
      setPlay(false);
      console.log("Voice recording ended");
      onStatusChange && onStatusChange(MicrophoneStatus.stopListening);
    };
    
    recognition.current.onspeechend = function () {
      recognition.current!.stop();
    };

    recognition.current.onerror = function (event) {
      console.error(`Error occurred in recognition: ${event.error}`);
      setPlay(false);
    };
    
    recognition.current.start();
    setPlay(true);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {// 語言選擇器 (左右箭頭) }
      <div className="flex items-center justify-between bg-gray-800 rounded-md border border-gray-700 p-2">
        <button 
          onClick={prevLanguage}
          className="p-1 rounded-full hover:bg-gray-700"
          aria-label="Previous language"
        >
          <CaretLeft size={18} />
        </button>
        
        <div className="flex-1 text-center font-medium">
          {currentLanguage.displayName}
        </div>
        
        <button 
          onClick={nextLanguage}
          className="p-1 rounded-full hover:bg-gray-700"
          aria-label="Next language"
        >
          <CaretRight size={18} />
        </button>
      </div>
      
      {// 麥克風按鈕 }
      <button
        className="w-full p-1 flex flex-row justify-center bg-default-100 items-center gap-4 overflow-hidden color-inherit subpixel-antialiased rounded-md bg-background/10 backdrop-blur backdrop-saturate-150"
        onClick={play ? handlerStop : startPlay}
      >
        <Microphone fontSize={28} color={play ? "#1f94ea" : "white"} />
        <Wave play={play} />
      </button>
      
      {// 顯示當前識別內容 }
      {currentText && (
        <div className="text-sm mt-1 px-2 py-1 bg-gray-700/30 rounded">
          {currentText}
        </div>
      )}
    </div>
  );
}*/

// 0422 micorphone for android 
import { useRef, useState, useEffect } from "react";
import Wave from "./Wave";
import { Microphone } from "@phosphor-icons/react";

export enum MicrophoneStatus {
  Listening,
  stopListening
}

interface MicrophoneInputProps {
  talking: boolean;
  contentChange?: (content: string) => void;
  onSubmit?: (content: string) => void;
  onStopPlay?: () => void;
  onStatusChange?: (status: MicrophoneStatus) => void;
}

// 保持原始声明方式的兼容性
const SpeechRecognition =
  globalThis.SpeechRecognition || globalThis.webkitSpeechRecognition;

export default function MicrophoneInput({
  talking = false,
  contentChange,
  onSubmit,
  onStopPlay,
  onStatusChange
}: MicrophoneInputProps) {
  const firstflag = useRef(true);
  let recognition = useRef<typeof SpeechRecognition>();
  const [play, setPlay] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>("");
  const [isAndroid, setIsAndroid] = useState<boolean>(false);
  const restartTimeoutRef = useRef<number | null>(null);
  
  // 检测是否为 Android 设备
  useEffect(() => {
    const userAgent = navigator.userAgent || "";
    setIsAndroid(/android/i.test(userAgent));
  }, []);
  
  // 清理资源
  useEffect(() => {
    return () => {
      if (restartTimeoutRef.current) {
        window.clearTimeout(restartTimeoutRef.current);
      }
      if (recognition.current) {
        try {
          recognition.current.stop();
        } catch (e) {
          console.error("清理资源时停止识别失败:", e);
        }
      }
    };
  }, []);

  const handlerStop = () => {
    if (recognition.current) {
      try {
        recognition.current.stop();
      } catch (e) {
        console.error("停止识别失败:", e);
      }
    }
    if (restartTimeoutRef.current) {
      window.clearTimeout(restartTimeoutRef.current);
      restartTimeoutRef.current = null;
    }
    setPlay(false);
    onStopPlay && onStopPlay();
  };

  const startPlay = () => {
    if (play) return;
    
    try {
      recognition.current = new SpeechRecognition();
      
      // 针对 Android 设备的特殊配置
      recognition.current.continuous = true;
      recognition.current.lang = isAndroid ? "zh-CN" : "zh";
      recognition.current.interimResults = true;
      recognition.current.maxAlternatives = 1;
      
      recognition.current.onresult = function(event) {
        if (event.results.length > 0) {
          const item = event.results[0];
          const currentTranscript = item[0].transcript;
          console.info(
            "识别结果: " + currentTranscript + " ." + item[0].confidence,
          );
          
          setTranscript(currentTranscript);
          contentChange && contentChange(currentTranscript);
          
          // 如果不是 Android 设备，或者结果是最终结果，则提交
          if (item.isFinal && !isAndroid) {
            try {
              recognition.current?.stop();
              onSubmit && onSubmit(currentTranscript);
            } catch (e) {
              console.error("停止识别失败:", e);
            }
          }
        }
      };
      
      recognition.current.onstart = function() {
        console.log("识别开始");
        onStatusChange && onStatusChange(MicrophoneStatus.Listening);
      };
      
      recognition.current.onend = function() {
        console.log("识别结束");
        
        // 在 Android 设备上，如果有识别文本并且用户没有手动停止，提交结果
        if (isAndroid && play && transcript) {
          onSubmit && onSubmit(transcript);
        }
        
        onStatusChange && onStatusChange(MicrophoneStatus.stopListening);
        
        // 如果是 Android 设备且仍在播放状态，则尝试重新启动识别
        // 这解决了 Android 上过早停止识别的问题
        if (isAndroid && play) {
          restartTimeoutRef.current = window.setTimeout(() => {
            try {
              console.log("在 Android 设备上重新启动识别");
              recognition.current = new SpeechRecognition();
              recognition.current.continuous = true;
              recognition.current.lang = "zh-CN";
              recognition.current.interimResults = true;
              recognition.current.maxAlternatives = 1;
              
              // 重新绑定所有事件处理器
              const setupEvents = startPlay;
              setupEvents();
            } catch (e) {
              console.error("重新启动识别失败:", e);
              setPlay(false);
            }
          }, 300);
        } else {
          setPlay(false);
        }
      };
      
      // 对于 Android 设备，不设置 onspeechend 处理器
      // 这可以防止过早结束识别
      if (!isAndroid) {
        recognition.current.onspeechend = function() {
          recognition.current!.stop();
        };
      }
      
      recognition.current.onerror = function(event) {
        console.error("识别错误: " + event.error);
        
        // 处理 Android 上常见的 "no-speech" 错误
        if (isAndroid && event.error === "no-speech" && play) {
          console.log("忽略 no-speech 错误并重新启动");
          
          if (restartTimeoutRef.current) {
            window.clearTimeout(restartTimeoutRef.current);
          }
          
          restartTimeoutRef.current = window.setTimeout(() => {
            try {
              const setupEvents = startPlay;
              setupEvents();
            } catch (e) {
              console.error("重新启动识别失败:", e);
              setPlay(false);
            }
          }, 500);
          
          return;
        }
        
        setPlay(false);
      };
      
      recognition.current.start();
      setPlay(true);
      setTranscript("");
    } catch (error) {
      console.error("启动语音识别失败:", error);
      setPlay(false);
    }
  };

  return (
    <button
      className="w-full p-1 flex flex-row justify-center bg-default-100 items-center gap-4 overflow-hidden color-inherit subpixel-antialiased rounded-md bg-background/10 backdrop-blur backdrop-saturate-150"
      onClick={play ? handlerStop : startPlay}
    >
      <Microphone fontSize={28} color={play ? "#1f94ea" : "white"} />
      <Wave play={play} />
      {play && isAndroid && <span className="text-xs text-blue-300">正在收音...</span>}
    </button>
  );
}

// 添加 TypeScript 类型声明兼容性
declare global {
  interface Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
  }
}
