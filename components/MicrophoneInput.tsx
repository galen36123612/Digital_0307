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
/*import { useRef, useState, useEffect } from "react";
import Wave from "./Wave";
import { Microphone } from "@phosphor-icons/react";

export enum MicrophoneStatus {
  Idle,
  Listening,
  StopListening,
  Error
}

interface MicrophoneInputProps {
  talking: boolean;
  contentChange?: (content: string) => void;
  onSubmit?: (content: string) => void;
  onStopPlay?: () => void;
  onStatusChange?: (status: MicrophoneStatus) => void;
}

// 定义 SpeechRecognition 相关的接口
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

// 扩展 Window 接口以包含 SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognition;
    webkitSpeechRecognition?: new () => SpeechRecognition;
  }
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: (event: Event) => void;
  onend: (event: Event) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onspeechend: (event: Event) => void;
}

export default function MicrophoneInput({
  talking = false,
  contentChange,
  onSubmit,
  onStopPlay,
  onStatusChange
}: MicrophoneInputProps) {
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [play, setPlay] = useState<boolean>(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // 检查浏览器是否支持语音识别
  useEffect(() => {
    const SpeechRecognitionAPI = 
      window.SpeechRecognition || 
      window.webkitSpeechRecognition || 
      null;
    
    if (!SpeechRecognitionAPI) {
      setErrorMessage('您的浏览器不支持语音识别功能');
    }
  }, []);

  // 请求麦克风权限
  const requestMicrophonePermission = async (): Promise<boolean> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // 获取权限后立即停止使用麦克风
      stream.getTracks().forEach(track => track.stop());
      setHasPermission(true);
      return true;
    } catch (error) {
      console.error('麦克风权限被拒绝:', error);
      setHasPermission(false);
      setErrorMessage('请允许访问麦克风以使用语音功能');
      onStatusChange && onStatusChange(MicrophoneStatus.Error);
      return false;
    }
  };

  const handlerStop = (): void => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setPlay(false);
    onStopPlay && onStopPlay();
  };

  const startPlay = async (): Promise<void> => {
    if (play) return;
    
    // 如果未检查权限，先请求权限
    if (hasPermission === null) {
      const granted = await requestMicrophonePermission();
      if (!granted) return;
    } else if (hasPermission === false) {
      // 如果已经拒绝过权限，提示用户
      setErrorMessage('请在浏览器设置中允许访问麦克风');
      return;
    }

    // 清除可能的错误信息
    setErrorMessage('');

    const SpeechRecognitionAPI = 
      window.SpeechRecognition || 
      window.webkitSpeechRecognition;
    
    if (!SpeechRecognitionAPI) {
      setErrorMessage('您的浏览器不支持语音识别功能');
      return;
    }

    // 创建新的语音识别实例
    recognitionRef.current = new SpeechRecognitionAPI();
    
    // 配置语音识别
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.maxAlternatives = 1;
    
    // 根据设备优化语言设置
    recognitionRef.current.lang = "zh-CN"; // 尝试标准普通话
    
    // 设置事件处理器
    recognitionRef.current.onstart = (event: Event): void => {
      console.log("语音识别已启动");
      setPlay(true);
      onStatusChange && onStatusChange(MicrophoneStatus.Listening);
    };

    recognitionRef.current.onresult = (event: SpeechRecognitionEvent): void => {
      const results = event.results;
      if (results.length > 0) {
        const item = results[results.length - 1];
        const transcript = item[0].transcript;
        
        console.info(
          "收到识别结果: " + transcript + " (置信度: " + item[0].confidence + ")"
        );
        
        contentChange && contentChange(transcript);
        
        if (item.isFinal) {
          if (onSubmit) {
            onSubmit(transcript);
            handlerStop();
          }
        }
      }
    };

    recognitionRef.current.onend = (event: Event): void => {
      console.log("语音识别已结束");
      setPlay(false);
      onStatusChange && onStatusChange(MicrophoneStatus.StopListening);
    };

    recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent): void => {
      console.error("语音识别错误: ", event.error);
      setErrorMessage(`语音识别出错: ${event.error}`);
      setPlay(false);
      onStatusChange && onStatusChange(MicrophoneStatus.Error);
    };

    // 启动语音识别
    try {
      recognitionRef.current.start();
    } catch (error) {
      console.error("启动语音识别失败:", error);
      setErrorMessage('启动语音识别失败');
      setPlay(false);
    }
  };

  return (
    <div className="w-full">
      {errorMessage && (
        <div className="text-red-500 text-sm mb-2 text-center">
          {errorMessage}
        </div>
      )}
      <button
        className="w-full p-1 flex flex-row justify-center bg-default-100 items-center gap-4 overflow-hidden color-inherit subpixel-antialiased rounded-md bg-background/10 backdrop-blur backdrop-saturate-150"
        onClick={play ? handlerStop : startPlay}
        disabled={!!errorMessage && errorMessage.includes('不支持')}
      >
        <Microphone fontSize={28} color={play ? "#1f94ea" : "white"} />
        <Wave play={play} />
        <span className="ml-2">{play ? "点击停止" : "点击开始语音输入"}</span>
      </button>
    </div>
  );
}*/

// 0422 Grok android
import { useRef, useState } from "react";
import Wave from "./Wave";
import { Microphone } from "@phosphor-icons/react";

export enum MicrophoneStatus {
  Listening,
  StopListening,
  Error,
  NotSupported,
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
  onStatusChange,
}: MicrophoneInputProps) {
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [play, setPlay] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 檢查麥克風權限
  const checkMicrophonePermission = async (): Promise<boolean> => {
    try {
      // 檢查 Permissions API 是否支援
      if (navigator.permissions && navigator.permissions.query) {
        const permissionStatus = await navigator.permissions.query({
          name: "microphone" as PermissionName, // Type assertion to bypass TypeScript error
        });
        return permissionStatus.state === "granted";
      } else {
        // Fallback: 嘗試使用 getUserMedia 檢查麥克風權限
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          // 如果成功獲取流，立即關閉
          stream.getTracks().forEach((track) => track.stop());
          return true;
        } catch (err) {
          console.error("getUserMedia error:", err);
          return false;
        }
      }
    } catch (err) {
      console.error("Permission query error:", err);
      return false;
    }
  };

  const startPlay = async () => {
    if (play) return;
    if (!SpeechRecognition) {
      setError("您的瀏覽器不支援語音識別功能");
      onStatusChange?.(MicrophoneStatus.NotSupported);
      return;
    }

    // 檢查權限
    const hasPermission = await checkMicrophonePermission();
    if (!hasPermission) {
      setError("請授予麥克風權限以使用語音識別");
      onStatusChange?.(MicrophoneStatus.Error);
      return;
    }

    try {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false; // Android 上連續模式可能不穩定，改為單次識別
      recognitionRef.current.lang = navigator.language || "zh-CN"; // 動態設置語言，備用 zh-CN
      recognitionRef.current.interimResults = true;
      recognitionRef.current.maxAlternatives = 1;

      recognitionRef.current.onresult = (event) => {
        const item = event.results[0];
        console.info(`Result received: ${item[0].transcript} (Confidence: ${item[0].confidence})`);
        contentChange?.(item[0].transcript);
        if (item.isFinal) {
          recognitionRef.current?.stop();
          onSubmit?.(item[0].transcript);
        }
      };

      recognitionRef.current.onstart = () => {
        console.log("Speech recognition started");
        setPlay(true);
        setError(null);
        onStatusChange?.(MicrophoneStatus.Listening);
      };

      recognitionRef.current.onend = () => {
        console.log("Speech recognition ended");
        setPlay(false);
        onStatusChange?.(MicrophoneStatus.StopListening);
        onStopPlay?.();
      };

      recognitionRef.current.onerror = (event) => {
        console.error(`Speech recognition error: ${event.error}`);
        setPlay(false);
        if (event.error === "not-allowed") {
          setError("麥克風權限被拒絕，請檢查瀏覽器設定");
        } else if (event.error === "network") {
          setError("網路問題，請檢查您的網路連線");
        } else {
          setError(`語音識別錯誤：${event.error}`);
        }
        onStatusChange?.(MicrophoneStatus.Error);
      };

      recognitionRef.current.start();
    } catch (err) {
      console.error("Failed to start speech recognition:", err);
      setError("無法啟動語音識別，請稍後重試");
      onStatusChange?.(MicrophoneStatus.Error);
    }
  };

  const stopPlay = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setPlay(false);
      onStopPlay?.();
    }
  };

  return (
    <div className="w-full">
      <button
        className="w-full p-1 flex flex-row justify-center bg-default-100 items-center gap-4 overflow-hidden color-inherit subpixel-antialiased rounded-md bg-background/10 backdrop-blur backdrop-saturate-150"
        onClick={play ? stopPlay : startPlay}
        disabled={!SpeechRecognition}
      >
        <Microphone fontSize={28} color={play ? "#1f94ea" : "white"} />
        <Wave play={play} />
      </button>
      {error && (
        <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
      )}
    </div>
  );
}
