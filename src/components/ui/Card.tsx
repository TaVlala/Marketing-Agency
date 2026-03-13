interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={`bg-white border border-neutral-200 p-8 ${
        hover ? 'transition-shadow duration-300 hover:shadow-lg' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
