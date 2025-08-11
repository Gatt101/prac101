"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface EnhanceResponse {
  message: string;
  data?: {
    id: string;
    enhancedBody: any;
    enhancedHeaders?: Record<string, string>;
    rationale?: string;
    responseStatus?: number;
    responseBody?: any;
  };
  error?: string;
}

export default function ProfilePage() {
    const router = useRouter();
  const [endpointUrl, setEndpointUrl] = useState("");
  const [httpMethod, setHttpMethod] = useState<HttpMethod>("POST");
  const [requestHeaders, setRequestHeaders] = useState<string>("{\n  \"Content-Type\": \"application/json\"\n}");
  const [originalBody, setOriginalBody] = useState<string>("{}");
  const [contextText, setContextText] = useState<string>("");
  const [useAI, setUseAI] = useState<boolean>(true);
  const [execute, setExecute] = useState<boolean>(false);
  const [groqApiKey, setGroqApiKey] = useState<string>("");
  const [model, setModel] = useState<string>("gpt-oss-120b");
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<EnhanceResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [logoutLoading, setLogoutLoading] = useState<boolean>(false);
  const [profileId, setProfileId] = useState<string | null>(null);

  const parseJson = (value: string) => {
    try {
      return value.trim() ? JSON.parse(value) : undefined;
    } catch (e: any) {
      throw new Error(`Invalid JSON: ${e.message}`);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const headersObj = parseJson(requestHeaders) || {};
      const bodyObj = httpMethod === "GET" || httpMethod === "DELETE" ? undefined : parseJson(originalBody) || {};

      const res = await fetch("/api/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          endpointUrl,
          httpMethod,
          requestHeaders: headersObj,
          originalBody: bodyObj,
          contextText,
          useAI,
          provider: "groq",
          model,
          groqApiKey: groqApiKey || undefined,
          execute,
        }),
      });
      const data = (await res.json()) as EnhanceResponse;
      if (!res.ok) {
        setError(data?.error || `Request failed with status ${res.status}`);
      }
      setResult(data);
    } catch (err: any) {
      setError(String(err?.message || err));
    } finally {
      setLoading(false);
    }
  };

  const onLogout = async () => {
    try {
      setLogoutLoading(true);
      await axios.get("/api/users/logout");
      toast.success("Logout successful!");
      router.push("/login");
    } catch (err) {
      toast.error("Logout failed.");
    } finally {
      setLogoutLoading(false);
    }
  };

    const fetchProfile = async () => {
            try {
      const response = await axios.get("/api/users/me");
      setProfileId(response.data?.data?._id ?? null);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

   const changePassword = async () => {
        try {
      await axios.get("/api/users/changepassword");
      toast.success("Password change email sent!");
        } catch (error) {
            console.error("Error changing password:", error);
            toast.error("Failed to change password");
        }
  };

    return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Context-Aware API Enhancer</h1>

      <div className="border rounded p-4 space-y-3">
        <div className="text-sm font-medium">Account actions</div>
        <div className="flex flex-wrap gap-2">
          <button
            className="bg-red-500 text-white px-3 py-2 rounded"
            onClick={onLogout}
            disabled={logoutLoading}
          >
            {logoutLoading ? "Logging out..." : "Logout"}
                </button>
          <button
            className="bg-blue-500 text-white px-3 py-2 rounded"
            onClick={fetchProfile}
          >
                    Get Profile
                </button>
          <button
            className="bg-green-600 text-white px-3 py-2 rounded"
            onClick={changePassword}
          >
                    Change Password
                </button>
        </div>
        <div className="text-sm">
          {profileId ? (
            <Link className="text-blue-600 underline" href={`/profile/${profileId}`}>
              View Profile
            </Link>
          ) : (
            <span>No profile loaded</span>
          )}
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Endpoint URL</label>
          <input
            type="url"
            required
            value={endpointUrl}
            onChange={(e) => setEndpointUrl(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="https://api.example.com/v1/chat/completions"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Method</label>
            <select
              value={httpMethod}
              onChange={(e) => setHttpMethod(e.target.value as HttpMethod)}
              className="w-full border rounded px-3 py-2"
            >
              {(["GET", "POST", "PUT", "PATCH", "DELETE"] as HttpMethod[]).map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Use AI</label>
            <input type="checkbox" checked={useAI} onChange={(e) => setUseAI(e.target.checked)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Execute Immediately</label>
            <input type="checkbox" checked={execute} onChange={(e) => setExecute(e.target.checked)} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Context / Instructions</label>
          <textarea
            value={contextText}
            onChange={(e) => setContextText(e.target.value)}
            className="w-full border rounded px-3 py-2 h-28"
            placeholder="e.g., Optimize for short, helpful responses. Use system message to steer the model."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Request Headers (JSON)</label>
            <textarea
              value={requestHeaders}
              onChange={(e) => setRequestHeaders(e.target.value)}
              className="w-full border rounded px-3 py-2 h-44 font-mono"
              placeholder='{"Content-Type":"application/json"}'
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Request Body (JSON)</label>
            <textarea
              value={originalBody}
              onChange={(e) => setOriginalBody(e.target.value)}
              className="w-full border rounded px-3 py-2 h-44 font-mono"
              placeholder="{}"
              disabled={httpMethod === "GET" || httpMethod === "DELETE"}
            />
          </div>
        </div>

        <details className="border rounded p-3">
          <summary className="cursor-pointer select-none">Advanced (Groq)</summary>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Groq API Key</label>
              <input
                type="password"
                value={groqApiKey}
                onChange={(e) => setGroqApiKey(e.target.value)}
                className="w-full border rounded px-3 py-2"
                placeholder="gsk_..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Model</label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full border rounded px-3 py-2"
                placeholder="gpt-oss-120b"
              />
            </div>
          </div>
        </details>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-60"
        >
          {loading ? "Enhancing..." : "Enhance Request"}
        </button>
      </form>

      {error && (
        <div className="p-3 border border-red-300 bg-red-50 text-red-700 rounded">
          {error}
        </div>
      )}

      {result?.data && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Enhanced Output</h2>
          {result.data.rationale && (
            <div className="p-3 border rounded bg-gray-50">
              <div className="text-sm text-gray-600">AI rationale</div>
              <div className="whitespace-pre-wrap">{result.data.rationale}</div>
            </div>
          )}
          {result.data.enhancedHeaders && (
            <div>
              <div className="text-sm font-medium mb-1">Enhanced Headers</div>
              <pre className="p-3 border rounded bg-gray-50 overflow-auto text-sm">{JSON.stringify(result.data.enhancedHeaders, null, 2)}</pre>
            </div>
          )}
          <div>
            <div className="text-sm font-medium mb-1">Enhanced Body</div>
            <pre className="p-3 border rounded bg-gray-50 overflow-auto text-sm">{JSON.stringify(result.data.enhancedBody, null, 2)}</pre>
          </div>

          {(typeof result.data.responseStatus !== "undefined") && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium mb-1">Target Response Status</div>
                <div className="p-3 border rounded bg-gray-50">{result.data.responseStatus}</div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Target Response Body</div>
                <pre className="p-3 border rounded bg-gray-50 overflow-auto text-sm">{JSON.stringify(result.data.responseBody, null, 2)}</pre>
              </div>
            </div>
          )}
        </div>
      )}
        </div>
    );
}