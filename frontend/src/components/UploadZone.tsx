"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  previewUrl: string | null;
  disabled?: boolean;
}

export function UploadZone({ onFileSelect, previewUrl, disabled }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File | undefined) => {
      if (!file || !file.type.startsWith("image/")) return;
      onFileSelect(file);
    },
    [onFileSelect]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (disabled) return;
      handleFile(e.dataTransfer.files[0]);
    },
    [disabled, handleFile]
  );

  const openPicker = () => {
    if (!disabled) inputRef.current?.click();
  };

  return (
    <div className="flex h-full flex-col">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        onClick={openPicker}
        className={`upload-dashed flex min-h-[9.5rem] flex-1 cursor-pointer flex-col items-center justify-center rounded-xl px-3 py-6 text-center sm:min-h-[12rem] sm:rounded-2xl sm:px-6 sm:py-8 ${
          isDragging ? "upload-dashed-active" : ""
        } ${disabled ? "pointer-events-none opacity-60" : ""}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          capture="environment"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />

        {previewUrl ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex w-full flex-col items-center gap-2 sm:gap-3"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt="Upload preview"
              className="max-h-36 w-full rounded-lg object-contain sm:max-h-48 sm:rounded-xl"
            />
            <p className="text-xs text-springfield-blue sm:text-sm">Tap to change photo</p>
          </motion.div>
        ) : (
          <>
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-springfield-blue/10 text-springfield-blue sm:mb-4 sm:h-14 sm:w-14">
              <CameraPlusIcon />
            </div>
            <p className="text-sm font-semibold text-springfield-blue sm:text-base">
              Tap to upload a photo
            </p>
            <p className="mt-0.5 text-xs text-[var(--text-muted)] sm:mt-1 sm:text-sm">
              JPG, PNG or WEBP · max 10 MB
            </p>
            <span className="mt-3 inline-flex rounded-full bg-springfield-brown px-3 py-1.5 text-xs font-semibold text-white sm:hidden">
              Select Photo
            </span>
          </>
        )}
      </div>

      <button
        type="button"
        onClick={openPicker}
        disabled={disabled}
        className="btn-primary mt-3 hidden w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold sm:mt-4 sm:flex"
      >
        <FolderIcon />
        Select from Computer
      </button>
    </div>
  );
}

function CameraPlusIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="sm:h-7 sm:w-7">
      <path d="M4 8h3l2-3h6l2 3h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V10a2 2 0 012-2z" />
      <circle cx="12" cy="13" r="3.5" />
      <path d="M19 7v1M19.5 7.5h-1" strokeLinecap="round" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 7a2 2 0 012-2h5l2 2h7a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
    </svg>
  );
}
