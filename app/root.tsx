import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/node';
import { json } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

import tailwindStylesheetUrl from './styles/tailwind.css';
import { getUser } from './session.server';
import { Nav, UserBar } from './components';

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: tailwindStylesheetUrl },
    // NOTE: Architect deploys the public directory to /_static/
    { rel: 'icon', href: '/_static/favicon.ico' },
  ];
};

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Jaaba',
  viewport: 'width=device-width,initial-scale=1',
});

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  return json<LoaderData>({
    user: await getUser(request),
  });
};

export default function App() {
  return (
    <html lang='en' className='h-full'>
      <head>
        <Meta />
        <Links />
      </head>
      <body className='flex h-full'>
        <Nav />
        <div className='flex h-full w-full flex-col'>
          <UserBar />
          <div className='flex h-full flex-col overflow-y-auto'>
            <Outlet />
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
