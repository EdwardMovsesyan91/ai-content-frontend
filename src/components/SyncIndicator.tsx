export default function SyncIndicator() {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground italic animate-pulse">
      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8z"
        />
      </svg>
      Syncing latest posts...
    </div>
  );
}
