import "tailwindcss/tailwind.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="flex flex-col justify-between">
      <ApolloProvider client={client}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ApolloProvider>
    </div>
  );
}

export default MyApp;
