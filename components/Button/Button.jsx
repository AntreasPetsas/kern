import './Button.css';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  type = 'button',
  onClick,
  className = '',
  ...rest
}) {
  const classes = [
    'kern-btn',
    `kern-btn--${variant}`,
    `kern-btn--${size}`,
    loading && 'kern-btn--loading',
    fullWidth && 'kern-btn--full-width',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      aria-busy={loading || undefined}
      aria-disabled={disabled || undefined}
      onClick={disabled || loading ? undefined : onClick}
      {...rest}
    >
      {loading && <span className="kern-btn__spinner" aria-hidden="true" />}
      {children}
    </button>
  );
}
