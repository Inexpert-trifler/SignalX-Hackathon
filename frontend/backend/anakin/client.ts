import { withRetry } from "@backend/utils";

const ANAKIN_API_BASE = process.env.ANAKIN_API_BASE_URL || "https://api.anakin.ai/v1";
const ANAKIN_API_KEY = process.env.ANAKIN_API_KEY || "";

export class AnakinClient {
  private baseUrl: string;
  private apiKey: string;

  constructor(apiKey?: string, baseUrl?: string) {
    this.baseUrl = baseUrl || ANAKIN_API_BASE;
    this.apiKey = apiKey || ANAKIN_API_KEY;
  }

  private get headers(): HeadersInit {
    return {
      Authorization: `Bearer ${this.apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }

  async get<T>(path: string): Promise<T> {
    return withRetry(async () => {
      const res = await fetch(`${this.baseUrl}${path}`, {
        method: "GET",
        headers: this.headers,
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Anakin API GET ${path} failed: ${res.status} — ${errText}`);
      }
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        throw new Error(`Anakin API GET ${path} returned non-JSON response: ${text.slice(0, 100)}...`);
      }
      return res.json() as Promise<T>;
    });
  }

  async post<TBody, TResponse>(path: string, body: TBody): Promise<TResponse> {
    return withRetry(async () => {
      const res = await fetch(`${this.baseUrl}${path}`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Anakin API POST ${path} failed: ${res.status} — ${errText}`);
      }
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        throw new Error(`Anakin API POST ${path} returned non-JSON response: ${text.slice(0, 100)}...`);
      }
      return res.json() as Promise<TResponse>;
    });
  }

  get isConfigured(): boolean {
    return !!this.apiKey && this.apiKey.length > 0;
  }
}

export const anakinClient = new AnakinClient();
