interface Window {
  plausible: (event: string, options?: { props: { [key: string]: unknown } }) => void;
}
