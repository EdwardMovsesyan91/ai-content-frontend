import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-muted-foreground mb-4">
        The page you’re looking for doesn’t exist.
      </p>

      <Link
        to="/login"
        className="text-primary underline hover:text-primary/80 transition-colors ml-1"
      >
        Go to Homepage
      </Link>
    </div>
  );
}
