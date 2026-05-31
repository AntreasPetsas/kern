import './Input.css';

export function Input({
  id,
  label,
  value,
  onChange,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  required = false,
  type = 'text',
  autoComplete,
  className = '',
  ...rest
}) {
  const hasError = Boolean(errorMessage);
  const helperId = helperText ? `${id}-helper` : undefined;
  const errorId = hasError ? `${id}-error` : undefined;
  const describedBy = errorId ?? helperId;

  const fieldClasses = ['kern-field', hasError && 'kern-field--error', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={fieldClasses}>
      <label className="kern-field__label" htmlFor={id}>
        {label}
        {required && <span className="kern-field__required" aria-hidden="true"> *</span>}
      </label>

      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        autoComplete={autoComplete}
        aria-required={required || undefined}
        aria-invalid={hasError || undefined}
        aria-describedby={describedBy}
        className="kern-field__input"
        {...rest}
      />

      {hasError ? (
        <span id={errorId} className="kern-field__error-msg" role="alert">
          {errorMessage}
        </span>
      ) : helperText ? (
        <span id={helperId} className="kern-field__helper">
          {helperText}
        </span>
      ) : null}
    </div>
  );
}
