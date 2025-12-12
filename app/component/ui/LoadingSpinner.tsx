type LoadingSpinnerProps = {
  className?: string;
};

export default function LoadingSpinner({ className = "" }: LoadingSpinnerProps) {
  return (
    <div
      className={`animate-spin inline-block w-5 h-5 border-2 border-primary border-t-transparent rounded-full   ${className}`}
    />
  );
}