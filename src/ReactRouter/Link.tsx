type LinkProps = {
  to: string;
  target?: string;
  children: React.ReactNode;
};

export function Link({ to, target = "_self", children }: LinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (
      e.button === 0 &&
      !e.metaKey &&
      !e.altKey &&
      !e.ctrlKey &&
      !e.shiftKey &&
      target === "_self"
    ) {
      e.preventDefault();
      window.history.pushState({}, '', to);
      window.dispatchEvent(new Event("pushstate"));
    }
  };

  return (
    <a href={to} target={target} onClick={handleClick}>
      {children}
    </a>
  );
}
