// import this after install `@mdi/font` package
import "@mdi/font/css/materialdesignicons.css";

import "vuetify/styles";
import { createVuetify } from "vuetify";

export default defineNuxtPlugin((app) => {
  const myCustomLightTheme = {
    dark: false,
    colors: {
      background: "#f0f1f5",
      surface: "#fefefe",
      "surface-bright": "#f0edf7",
      "surface-light": "#EEEEEE",
      "surface-variant": "#7c7c7c",
      "on-surface-variant": "#EEEEEE",
      "my-font-color": "#242424",
      primary: "#e6e4f5",
      "primary-darken-1": "#1f2192",
      secondary: "#37367a",
      "secondary-darken-1": "#3d2770",
      error: "#b3243e",
      info: "#3a5da7",
      success: "#417442",
      warning: "#d67804",
      orange: "#d64004",
    },
    variables: {
      "border-color": "#000000",
      "border-opacity": 0.12,
      "high-emphasis-opacity": 0.87,
      "medium-emphasis-opacity": 0.6,
      "disabled-opacity": 0.38,
      "idle-opacity": 0.04,
      "hover-opacity": 0.04,
      "focus-opacity": 0.12,
      "selected-opacity": 0.08,
      "activated-opacity": 0.12,
      "pressed-opacity": 0.12,
      "dragged-opacity": 0.08,
      "theme-kbd": "#212529",
      "theme-on-kbd": "#FFFFFF",
      "theme-code": "#F5F5F5",
      "theme-on-code": "#000000",
    },
  };

  const vuetify = createVuetify({
    theme: {
      defaultTheme: "myCustomLightTheme",
      themes: {
        myCustomLightTheme,
      },
    },
    defaults: {
      VTextField: {
        variant: "outlined",
        density: "compact",
      },
      VSelect: {
        variant: "outlined",
        density: "compact",
      },
      VTextarea: {
        variant: "outlined",
        density: "compact",
      },
    },
  });

  app.vueApp.use(vuetify);
});
