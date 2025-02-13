const LoadingState = () => {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-8"></div>
      <div className="space-y-3">
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-4/6"></div>
      </div>
    </div>
  )
}

export default LoadingState 