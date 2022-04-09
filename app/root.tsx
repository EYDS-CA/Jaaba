import type { MetaFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import tailwindStylesheetUrl from './styles/tailwind.css';

import { Nav, UserBar } from './components';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'JaaBa',
  viewport: 'width=device-width,initial-scale=1',
});

export function links() {
  return [{ rel: 'stylesheet', href: tailwindStylesheetUrl }];
}

export default function App() {
  return (
    <html lang='en' className='h-full'>
      <head>
        <Meta />
        <Links />
      </head>
      <body className='h-full flex'>
        <Nav />
        <div className='h-full flex flex-col'>
          <UserBar />
          <div className='h-full flex flex-col overflow-y-auto'>
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
