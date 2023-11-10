interface Button {
  children: string;
  id: string;
  disabled?: boolean;
  onClick(): void;
}

export default function Button({
  children,
  id,
  disabled = false,
  onClick,
}: Button) {
  return (
    <button id={id} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
