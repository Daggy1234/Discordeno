import Client from "../module/client.ts"
import { RequestMethod } from "../types/fetch.ts"

// type RequestBody = string | Blob | ArrayBufferView | ArrayBuffer | FormData | URLSearchParams | null | undefined

export default class DiscordRequestManager {
  token = this.client.token
  constructor(public client: Client) {
    this.client = client
  }

  async get(url: string, body?: unknown) {
    console.log("get", url)
    return this.runMethod(RequestMethod.Get, url, body)
  }

  async post(url: string, body?: unknown) {
    console.log("post", url)
    return this.runMethod(RequestMethod.Post, url, body)
  }

  async delete(url: string, body?: unknown) {
    return this.runMethod(RequestMethod.Delete, url, body)
  }

  async patch(url: string, body: unknown) {
    console.log("patch", url)
    return this.runMethod(RequestMethod.Patch, url, body)
  }

  async put(url: string, body?: unknown) {
    return this.runMethod(RequestMethod.Put, url, body)
  }

  protected async runMethod(method: RequestMethod, url: string, body?: unknown) {
    console.log("resolve", url, this.resolveURL(url))
    const headers = this.getDiscordHeaders()
    return fetch(this.resolveURL(url), {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    }).then(response => response.json())
  }

  // A hook for the RouteAwareRequestManager to override URLs.
  protected resolveURL(url: string) {
    return url
  }

  // The Record type here plays nice with Deno's `fetch.headers` expected type.
  getDiscordHeaders(): Record<string, string> {
    return {
      Authorization: this.token,
      "User-Agent": `Discordeno (https://github.com/skillz4killz/discordeno, 0.0.1)`
    }
  }
}