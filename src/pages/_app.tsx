import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import dynamic from "next/dynamic";
import store, { persistor } from "@/store";

// Client-Only bileşenini lazy load et
const ClientOnly = dynamic(() => import("@/components/layouts/ClientOnly"), {
  ssr: false,
});

// AuthLayout bileşenini de lazy load et
const AuthLayout = dynamic(() => import("@/components/layouts/AuthLayout"), {
  ssr: false,
});

// Sayfa bazlı koruma yapısını belirle
type CustomAppProps = AppProps & {
  Component: {
    requireAuth?: boolean;
  } & AppProps["Component"];
};

function App({ Component, pageProps }: CustomAppProps) {
  // Varsayılan olarak requireAuth true kabul et
  const requireAuth = Component.requireAuth ?? true;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ClientOnly>
          <AuthLayout requireAuth={requireAuth}>
            <Component {...pageProps} />
          </AuthLayout>
        </ClientOnly>
      </PersistGate>
    </Provider>
  );
}

export default App;
