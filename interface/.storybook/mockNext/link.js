function MockLink({
  href,
  children,
  ...props
}) {
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}

export default MockLink;
