import React from 'react';
import Link from 'next/link';

function ActionLink({
  href,
  children,
  onClick = () => {},
}) {
  if (href[0] === '#') {
    return (
      <>
        <a href={href} onClick={onClick}>
          {children}
        </a>
        <style jsx>{`
          a {
            width: 100%;
          }
        `}</style>
      </>
    );
  }

  return (
    <Link href={href}>
      <a>{children}</a>
      <style jsx>{`
        a {
          width: 100%;
        }
      `}</style>
    </Link>
  );
}

export default ActionLink;
