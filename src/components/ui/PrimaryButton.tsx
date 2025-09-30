type Props = {
  href?: string;
  children?: React.ReactNode;
  className?: string;
};
export default function PrimaryButton({
  href = "#contact",
  children = "://ZUR/ANFRAGE/",
  className = "",
}: Props) {
  return (
    <a href={href} className={`contact-btn ${className}`}>
      <span className="cta-label">{children}</span>
      <span className="cta-circle" aria-hidden="true" />
      <span className="cta-arrow" aria-hidden="true">»</span>
    </a>
  );
}
