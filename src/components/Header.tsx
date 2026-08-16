"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface SearchResult {
  id: number;
  title?: string;
  name?: string;
  media_type: "movie" | "tv";
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string;
}

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length >= 2) {
        try {
          const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
          const data = await response.json();
          setSuggestions(data.results);
          setShowSuggestions(true);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSuggestionClick = (suggestion: SearchResult) => {
    setShowSuggestions(false);
    setSearchQuery("");
    if (suggestion.media_type === "movie") {
      router.push(`/movies/movie-review/${suggestion.id}`);
    } else {
      router.push(`/tv/tv-review/${suggestion.id}`);
    }
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <Link href="/movies">Movies</Link>
                  </li>
                  <li>
                    <Link href="/tv">TV Shows</Link>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <Link className="btn btn-ghost text-xl" href="/">RED HOT FLIX</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li className="flex items-center flex-row gap-2 relative">
              <form onSubmit={handleSearch} className="flex items-center gap-2 w-full">
                <input 
                  type="text" 
                  placeholder="Search movies, TV, critics..." 
                  className="input input-bordered flex-1" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery.trim().length >= 2 && setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                />
                <button type="submit" className="btn btn-primary flex-shrink-0 w-20 rounded-lg cursor-pointer">Search</button>
              </form>
              {showSuggestions && suggestions.length > 0 && (
                <div className="flex flex-col absolute top-full left-0 mt-2 w-full bg-base-100 shadow-lg rounded-lg overflow-hidden z-50">
                  {suggestions.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="pt-2 pb-2 hover:bg-base-300 cursor-pointer border-b last:border-b-0 w-full"
                    >
                      <div className="flex justify-between items-center gap-3">
                        <span className="text-sm font-medium">
                          {suggestion.title || suggestion.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {suggestion.media_type === "movie" ? "Movie" : "TV Show"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/movies">Movies</Link>
            </li>
            <li>
              <Link href="/tv">TV Shows</Link>
            </li>
            <li>
              <Link href="/news">News</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
