function PlatformBadge({ platform }) {
  return (
    <span className="inline-flex items-center justify-center whitespace-nowrap rounded-lg border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-400">
      {platform || "N/A"}
    </span>
  );
}

export default PlatformBadge;