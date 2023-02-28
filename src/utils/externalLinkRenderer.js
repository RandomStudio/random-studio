export const externalLinkRenderer = ({ href, children }) => {
  return (
    <a href={href} rel="noreferrer" target="_blank">
      {children}
    </a>
  );
};

export default externalLinkRenderer;
