import http from "@/utils/http";

export async function submitResume<T>(data: T) {
  return http({
    url: "/resume",
    method: "post",
    data,
  });
}
