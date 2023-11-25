export interface CardProps {
  header?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
}

export function Card({ header, body, footer }: CardProps) {
  return (
    <div className="card-b relative rounded-3xl ">
      {header && <div>{header}</div>}
      {body && <div className="p-8">{body}</div>}
      {footer && <div>{footer}</div>}
    </div>
  );
}

export default Card;
