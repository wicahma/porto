import { toast } from "react-hot-toast";
import { APIBaseResponse } from "@/interface/api.interface";

export const errorWrapper = async <T>(
  res: Promise<APIBaseResponse<T>>,
  showToast = true,
): Promise<APIBaseResponse<T>> => {
  let data: APIBaseResponse<T>;

  try {
    data = await res;
  } catch (err: any) {
    const msg =
      err?.response?.data?.message ||
      err?.message ||
      "Terjadi kesalahan, silahkan coba beberapa saat lagi!";
    if (showToast) {
      toast.error(msg);
    }
    throw err;
  }

  if (data.status === "error" || data.status === undefined) {
    if (showToast) {
      toast.error(
        data.message || "Terjadi kesalahan, silahkan coba beberapa saat lagi!",
      );
    }
    throw data;
  }

  return data;
};
