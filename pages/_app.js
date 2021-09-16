import "tailwindcss/tailwind.css";
import "../styles/globals.css";

import React, { useState } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";

import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";

import { ThemeProvider } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

function MyApp({ Component, pageProps }) {
  const [darkTheme, setDarkTheme] = useState(true);
  const appliedTheme = createTheme({
    palette: {
      type: darkTheme ? "dark" : "light",
    },
  });
  return (
    <div className="flex flex-col justify-between">
      <ApolloProvider client={client}>
        <ThemeProvider theme={appliedTheme}>
          <Paper>
            <Header themeHandler={setDarkTheme} isDark={darkTheme} />
            <Component {...pageProps} />
            <Footer />
          </Paper>
        </ThemeProvider>
      </ApolloProvider>
    </div>
  );
}

export default MyApp;
