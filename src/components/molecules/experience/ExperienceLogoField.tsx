"use client";

import { Button } from "@/components/atoms/buttons/button";
import { Input } from "@/components/atoms/inputs/input";
import { Label } from "@/components/atoms/inputs/label";
import { isLogoSource } from "@/utils/helper/experience-logo";
import { ImagePlus, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const ACCEPTED_TYPES = [
  "image/svg+xml",
  "image/png",
  "image/jpeg",
  "image/webp",
];

/** Logos are inlined into the experience row, so keep them genuinely small. */
const MAX_LOGO_BYTES = 64 * 1024;

interface ExperienceLogoFieldProps {
  company: string;
  value: string;
  onChange: (value: string) => void;
}

export const ExperienceLogoField = ({
  company,
  value,
  onChange,
}: ExperienceLogoFieldProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isReading, setIsReading] = useState(false);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast.error("Logo must be an SVG, PNG, JPEG, or WebP image");
      return;
    }

    if (file.size > MAX_LOGO_BYTES) {
      toast.error("Logo must be 64 KB or smaller");
      return;
    }

    setIsReading(true);
    try {
      const { promise: read, resolve, reject } =
        Promise.withResolvers<string>();
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result ?? ""));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
      const dataUri = await read;

      if (!isLogoSource(dataUri)) {
        toast.error("Could not read that file as an image");
        return;
      }

      onChange(dataUri);
    } catch {
      toast.error("Could not read that file as an image");
    } finally {
      setIsReading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-neutral-200">Company Logo</Label>

      <div className="flex items-start gap-4">
        {isLogoSource(value) ? (
          <img
            src={value}
            alt={`${company || "Company"} logo`}
            className="h-16 w-16 shrink-0 rounded-xl object-contain"
          />
        ) : (
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-neutral-800 text-lg font-black text-teal-400">
            {(company || "?").charAt(0).toUpperCase()}
          </div>
        )}

        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isReading}
              className="border-neutral-700 text-neutral-200 hover:bg-neutral-800"
            >
              <ImagePlus className="mr-2 h-4 w-4" />
              {isReading ? "Reading..." : value ? "Replace logo" : "Upload logo"}
            </Button>

            {value && (
              <Button
                type="button"
                variant="ghost"
                onClick={() => onChange("")}
                className="text-red-400 hover:bg-red-950/30 hover:text-red-300"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Remove
              </Button>
            )}
          </div>

          <Input
            value={isLogoSource(value) && value.startsWith("data:") ? "" : value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-neutral-800 border-neutral-700 text-white"
            placeholder="or paste an https:// image URL"
          />

          <p className="text-xs text-neutral-500">
            Stored with the company record. SVG, PNG, JPEG or WebP, max 64 KB.
          </p>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
};

export default ExperienceLogoField;
