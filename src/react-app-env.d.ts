/// <reference types="react-scripts" />

// Parcel's `bundle-text:` scheme imports a bundle's compiled output as a string.
// Used to inline the Tailwind CSS so it can be injected into the shadow root.
declare module "bundle-text:*" {
  const content: string;
  export default content;
}
