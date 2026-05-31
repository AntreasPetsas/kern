import './Card.css';

export function Card({
  children,
  shadow = 'sm',
  padding = 'md',
  as: Tag = 'div',
  className = '',
  ...rest
}) {
  const classes = [
    'kern-card',
    `kern-card--shadow-${shadow}`,
    `kern-card--padding-${padding}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}

export function CardHeader({ children, action, className = '', ...rest }) {
  return (
    <div className={['kern-card__header', className].filter(Boolean).join(' ')} {...rest}>
      <div className="kern-card__header-content">{children}</div>
      {action && <div className="kern-card__header-action">{action}</div>}
    </div>
  );
}

export function CardBody({ children, className = '', ...rest }) {
  return (
    <div className={['kern-card__body', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '', ...rest }) {
  return (
    <div className={['kern-card__footer', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </div>
  );
}
