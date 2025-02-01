import type { AppProps } from "next/app";
import "../styles/globals.css";
import { MockDataProvider } from "@/context/MockDataContext";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MockDataProvider>
      <Component {...pageProps} />
    </MockDataProvider>
  );
}
