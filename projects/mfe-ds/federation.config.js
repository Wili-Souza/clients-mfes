const {
  withNativeFederation,
  shareAll,
} = require("@angular-architects/native-federation/config");

module.exports = withNativeFederation({
  name: "mfe-ds",

  exposes: {
    "./Component": "./projects/mfe-ds/src/app/app.component.ts",
    "./ButtonComponent":
      "projects/mfe-ds/src/app/components/button/button.component.ts",
    "./FieldComponent":
      "projects/mfe-ds/src/app/components/field/field.component.ts",
    "./CardComponent":
      "projects/mfe-ds/src/app/components/card/card.component.ts",
    "./ModalContainerComponent":
      "projects/mfe-ds/src/app/components/modal-container/modal-container.component.ts",
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: "auto",
    }),
    "@angular/common/locales/pt": {
      packageInfo: {
        entryPoint: "@angular/common/locales/pt",
        esm: true,
      },
    },
  },

  skip: [
    "rxjs/ajax",
    "rxjs/fetch",
    "rxjs/testing",
    "rxjs/webSocket",
    // Add further packages you don't need at runtime
  ],

  // Please read our FAQ about sharing libs:
  // https://shorturl.at/jmzH0
});
