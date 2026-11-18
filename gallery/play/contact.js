import { registrationEndpoint } from "./registration-config.js";

export async function collectEmail({ email, route }) {
  const local = ["127.0.0.1", "localhost", "[::1]"].includes(location.hostname);
  const endpoint = local ? new URL("api/register", import.meta.url) : registrationEndpoint;
  if (!endpoint) {
    throw new Error("此预览尚未接通邮箱登记服务。");
  }

  let response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "omit",
      cache: "no-store",
      referrerPolicy: "no-referrer",
      signal: AbortSignal.timeout(10_000),
      body: JSON.stringify({ email, route }),
    });
  } catch {
    throw new Error("暂时无法连接登记服务，请重试。");
  }

  if (response.status === 400) throw new Error("请检查邮箱地址后再试。");
  if (response.status === 429) throw new Error("登记请求过多，请稍后重试。");
  const acknowledgement = await response.json().catch(() => null);
  if (!response.ok || acknowledgement?.registered !== true) {
    throw new Error("邮箱尚未登记，请重试。");
  }
}
