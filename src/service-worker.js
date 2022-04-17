import { registerRoute, NavigationRoute, Route } from 'workbox-routing';
import {
  CacheFirst,
  StaleWhileRevalidate,
  NetworkFirst,
} from 'workbox-strategies';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';

precacheAndRoute(self.__WB_MANIFEST);

const handler = createHandlerBoundToURL('/index.html');
const navigationRoute = new NavigationRoute(handler);

// Handle API:
registerRoute(new RegExp(/^https?.*/), new NetworkFirst());

// // FontsRoute
// const FontsRoute = new Route(
//   new RegExp(/^https:\/\/fonts.(?:googleapis|gstatic).com\/(.*)/),
//   new StaleWhileRevalidate({
//     cacheName: 'google-fonts-cache',
//   })
// );

// Handle images:
const imageRoute = new Route(
  ({ request }) => {
    return request.destination === 'image';
  },
  new StaleWhileRevalidate({
    cacheName: 'images',
  })
);

// Handle scripts:
const scriptsRoute = new Route(
  ({ request }) => {
    return request.destination === 'script';
  },
  new CacheFirst({
    cacheName: 'scripts',
  })
);

// Handle styles:
const stylesRoute = new Route(
  ({ request }) => {
    return request.destination === 'style';
  },
  new CacheFirst({
    cacheName: 'styles',
  })
);

// Register routes
registerRoute(navigationRoute);
registerRoute(imageRoute);
registerRoute(scriptsRoute);
registerRoute(stylesRoute);
// registerRoute(FontsRoute);
