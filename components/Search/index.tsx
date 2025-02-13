import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Command } from 'cmdk'
import { Search as SearchIcon, Loader2 } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import { searchContent } from '../../utils/search'
import type { SearchResult } from '../../utils/search'

export function Search() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(open => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const search = useCallback(async (value: string) => {
    if (!value.trim()) {
      setResults([])
      return
    }

    setLoading(true)
    try {
      const searchResults = await searchContent(value)
      setResults(searchResults)
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    }
    setLoading(false)
  }, [])

  const handleSelect = useCallback((item: SearchResult) => {
    setOpen(false)
    let path = '/'
    
    switch (item.source) {
      case 'thought':
        path = `/thoughts/${item.slug}`
        break
      case 'til':
        path = `/til/${item.slug}`
        break
      case 'project':
        path = `/projects#${item.slug}`
        break
    }
    
    router.push(path)
  }, [router])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={twMerge(
          "flex items-center gap-2 px-3 py-2 text-sm",
          "text-muted-foreground hover:text-foreground",
          "transition-colors duration-200"
        )}
      >
        <SearchIcon className="h-4 w-4" />
        <span className="hidden sm:inline-block">
          Search...
        </span>
        <kbd className="hidden sm:inline-flex items-center gap-1 text-xs">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Search"
        className={twMerge(
          "fixed inset-0 z-50",
          "bg-background/80 backdrop-blur-sm",
          "data-[state=open]:animate-in",
          "data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0",
          "data-[state=open]:fade-in-0"
        )}
      >
        <div className={twMerge(
          "fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]",
          "w-full max-w-lg",
          "border border-border rounded-lg",
          "bg-background shadow-lg",
          "duration-200",
          "data-[state=open]:animate-in",
          "data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0",
          "data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95",
          "data-[state=open]:zoom-in-95",
          "data-[state=closed]:slide-out-to-left-1/2",
          "data-[state=closed]:slide-out-to-top-[48%]",
          "data-[state=open]:slide-in-from-left-1/2",
          "data-[state=open]:slide-in-from-top-[48%]"
        )}>
          <Command.Input
            value={query}
            onValueChange={(value) => {
              setQuery(value)
              search(value)
            }}
            placeholder="Search content..."
            className={twMerge(
              "w-full border-none",
              "px-4 h-12",
              "bg-transparent",
              "text-foreground",
              "placeholder:text-muted-foreground",
              "focus:outline-none",
              "disabled:cursor-not-allowed",
              "disabled:opacity-50"
            )}
          />

          <Command.List className="max-h-[300px] overflow-y-auto p-2">
            {loading && (
              <Command.Loading className="py-6 text-center">
                <Loader2 className="h-4 w-4 animate-spin mx-auto" />
              </Command.Loading>
            )}

            {!loading && results.length === 0 && query && (
              <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                No results found.
              </Command.Empty>
            )}

            {!loading && results.map((item) => (
              <Command.Item
                key={`${item.source}-${item.slug}`}
                value={item.title}
                onSelect={() => handleSelect(item)}
                className={twMerge(
                  "relative flex cursor-pointer",
                  "select-none items-center rounded-sm px-2 py-3",
                  "text-sm outline-none",
                  "aria-selected:bg-accent",
                  "data-[disabled]:pointer-events-none",
                  "data-[disabled]:opacity-50"
                )}
              >
                <div className="flex flex-col gap-1">
                  <div className="font-medium">{item.title}</div>
                  {item.description && (
                    <div className="text-xs text-muted-foreground line-clamp-1">
                      {item.description}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="capitalize">{item.source}</span>
                    {item.date && (
                      <>
                        <span>•</span>
                        <span>{new Date(item.date).toLocaleDateString()}</span>
                      </>
                    )}
                  </div>
                </div>
              </Command.Item>
            ))}
          </Command.List>
        </div>
      </Command.Dialog>
    </>
  )
} 