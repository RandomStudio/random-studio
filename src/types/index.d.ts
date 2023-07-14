/* eslint-disable no-unused-vars */

declare interface Window {
  plausible: (
    event: string,
    options?: { props: { [key: string]: unknown } },
  ) => void;
}
