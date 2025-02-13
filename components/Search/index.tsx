import { useDeferredValue, useState } from 'react'
import { Content } from '../../utils/interfaces'

interface SearchResultsProps {
  query: string;
}

const SearchResults = ({ query }: SearchResultsProps) => {
  // Implement search results display
  return query ? (
    <div className="mt-4">
      <p>Search results for: {query}</p>
      {/* Add actual search results here */}
    </div>
  ) : null;
}

const Search = () => {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="px-4 py-2 rounded border dark:bg-slate-800 dark:border-slate-600"
        placeholder="Search..."
      />
      <SearchResults query={deferredQuery} />
    </div>
  )
}

export default Search 