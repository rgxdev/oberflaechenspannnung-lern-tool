import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching"
import { clientsClaim } from "workbox-core"
import { registerRoute } from "workbox-routing"
import { StaleWhileRevalidate, CacheFirst } from "workbox-strategies"

declare const self: ServiceWorkerGlobalScope & {
  __WB_MANIFEST: unknown
  skipWaiting(): void
  registration: ServiceWorkerRegistration
  clients: {
    openWindow(url: string): Promise<any>
  }
  addEventListener(type: string, listener: (event: any) => void): void
}

precacheAndRoute(self.__WB_MANIFEST)

cleanupOutdatedCaches()

clientsClaim()

registerRoute(
  ({ request }) => request.mode === "navigate",
  new StaleWhileRevalidate({
    cacheName: "pages-cache",
  }),
)

registerRoute(
  ({ request }) =>
    request.destination === "style" || request.destination === "script" || request.destination === "worker",
  new StaleWhileRevalidate({
    cacheName: "static-resources",
  }),
)

registerRoute(
  ({ request }) => request.destination === "image",
  new CacheFirst({
    cacheName: "images-cache",
    plugins: [
      {
        cacheKeyWillBeUsed: async ({ request }) => {
          return `${request.url}?version=1`
        },
      },
    ],
  }),
)

self.addEventListener("message", (event: any) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting()
  }
})

self.addEventListener("sync", (event: any) => {
  if (event.tag === "background-sync") {
    event.waitUntil(
      Promise.resolve(),
    )
  }
})

self.addEventListener("push", (event: any) => {
  if (event.data) {
    const data = event.data.json()
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: "/icon-192x192.png",
        badge: "/badge-72x72.png",
        tag: "learning-notification",
        requireInteraction: true,
      }),
    )
  }
})

self.addEventListener("notificationclick", (event: any) => {
  event.notification.close()
  event.waitUntil(self.clients.openWindow("/"))
})
