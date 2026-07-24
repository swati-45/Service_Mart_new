import React from "react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Toaster } from "react-hot-toast";

import { getMuiTheme } from "./theme/muiTheme";
import GlobalToast from "./components/Toast";
import AppContent from "./AppContent";

function App() {
  const muiTheme = React.useMemo(() => getMuiTheme(), []);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider theme={muiTheme}>
          <CssBaseline />

          <AppContent />

          <Toaster position="top-right" />
          <GlobalToast />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;