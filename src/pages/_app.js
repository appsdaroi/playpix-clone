import "@/styles/globals.css";
import Head from "next/head";
import { Layout } from "@/modules/layout/";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
