"use client";

import React, { useRef, useState } from "react";
import { Upload, X, File as FileIcon } from "lucide-react";
import { Button } from "../buttons/button";
import { Label } from "./label";

export interface FileUploadProps {
  id: string;
  label: string;
  value?: File | string | null;
  onChange: (file: File | null) => void;
  accept?: string;
  maxSize?: number; // in MB
  required?: boolean;
  className?: string;
  description?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  id,
  label,
  value,
  onChange,
  accept = "image/*,.pdf,.html",
  maxSize = 5, // 5MB default
  required = false,
  className = "",
  description,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");
  const [preview, setPreview] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      onChange(null);
      setPreview("");
      return;
    }

    // Validate file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSize) {
      setError(`File size must be less than ${maxSize}MB`);
      onChange(null);
      return;
    }

    setError("");
    onChange(file);

    // Generate preview for images
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview("");
    }
  };

  const handleRemove = () => {
    onChange(null);
    setPreview("");
    setError("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const getFileName = () => {
    if (value instanceof File) {
      return value.name;
    }
    if (typeof value === "string" && value) {
      return value.split("/").pop() || "Existing file";
    }
    return null;
  };

  const fileName = getFileName();

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={id} className="text-neutral-200">
        {label} {required && "*"}
      </Label>
      {description && <p className="text-xs text-neutral-500">{description}</p>}

      <div className="space-y-2">
        {/* Hidden file input */}
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
          required={required && !value}
        />

        {/* Upload button or file display */}
        {fileName ? (
          <div className="flex items-center gap-2 p-3 bg-neutral-800 border border-neutral-700 rounded-md">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="h-12 w-12 object-cover rounded"
              />
            ) : (
              <FileIcon className="h-5 w-5 text-neutral-400" />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white truncate">{fileName}</p>
              {value instanceof File && (
                <p className="text-xs text-neutral-500">
                  {(value.size / 1024).toFixed(2)} KB
                </p>
              )}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              className="text-neutral-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button
            type="button"
            variant="outline"
            onClick={handleClick}
            className="w-full border-neutral-700 text-neutral-300 hover:bg-neutral-800"
          >
            <Upload className="mr-2 h-4 w-4" />
            Choose File
          </Button>
        )}

        {/* Error message */}
        {error && <p className="text-xs text-red-500">{error}</p>}

        {/* File type and size info */}
        <p className="text-xs text-neutral-500">
          Accepted: {accept.replaceAll("*", "all")} • Max size: {maxSize}MB
        </p>
      </div>
    </div>
  );
};
