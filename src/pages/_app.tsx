import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "@/store";
import ClientOnly from "@/components/layouts/ClientOnly";
import AuthLayout from "@/components/layouts/AuthLayout";

type CustomAppProps = AppProps & {
  Component: {
    requireAuth?: boolean;
  } & AppProps["Component"];
};

function App({ Component, pageProps }: CustomAppProps) {
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
