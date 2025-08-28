import { ReactNode, useEffect, useRef, useState } from "react";
import { Building, MapPin, Navigation, Plane, X } from "lucide-react";
import { InputCodidge } from "../../UI/form/input/InputField";
import IconButton from "../../UI/button/IconButton";
import { useLazyQuery } from "@apollo/client";
import { getSearchAutoCompleteQuery } from "./api/query";
import { AutoCompleteSearchResults } from "./interface";

const getIconForType = (types: string[]) => {
  if (types.includes("airport"))
    return <Plane className="w-4 h-4 text-gray-800" />;
  if (types.includes("establishment") || types.includes("business"))
    return <Building className="w-4 h-4 text-gray-800" />;
  if (types.includes("route") || types.includes("street_address"))
    return <Navigation className="w-4 h-4 text-gray-800" />;
  return <MapPin className="w-4 h-4 text-gray-800" />;
};

interface PlaceData {
  displayName: string;
  formattedAddress: string;
  id: string;
}

interface IAutoCompleteProps {
  label?: ReactNode;
  placeholder?: string;
  initialValue: string;
  onChange: (val: PlaceData) => void;
  autoCompleteRestrictions: Record<string, any>;
}

export const PlacesAutoCompleteWidget = ({
  label,
  placeholder,
  initialValue,
  onChange,
}: IAutoCompleteProps) => {
  const [input, setInput] = useState(initialValue || "");
  const [selectedPlace, setSelectedPlace] = useState<PlaceData | null>(null);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const debounceTimerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [getSearchAutocmpleteFn, { loading }] = useLazyQuery<{
    autoCompleteSearch: AutoCompleteSearchResults;
  }>(getSearchAutoCompleteQuery);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        resetSearch();
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    setInput(initialValue || "");
    if (!initialValue) {
      setSuggestions([]);
      setSelectedPlace(null);
    }
  }, [initialValue]);

  // Debounced input watcher
  useEffect(() => {
    if (!input?.trim()) {
      setSuggestions([]);
      return;
    }

    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

    debounceTimerRef.current = setTimeout(() => {
      if (!selectedPlace && initialValue !== input) fetchSuggestions(input);
    }, 300);

    return () => clearTimeout(debounceTimerRef.current);
  }, [input, selectedPlace, initialValue]);

  const fetchSuggestions = async (query: string) => {
    try {
      const suggestions = await getSearchAutocmpleteFn({
        variables: {
          input: query,
        },
      });

      setSuggestions(suggestions.data?.autoCompleteSearch.places || []);
    } catch (err) {
      console.log("Suggestion fetch failed", err);
    } finally {
    }
  };

  const handleSelect = async (suggestion: any) => {
    try {
      const placeId = suggestion.placeId;
      const displayName = suggestion.displayName;
      const formattedAddress = suggestion.address;

      const placeData: PlaceData = {
        displayName: displayName || "Unknown",
        formattedAddress: formattedAddress || "",
        id: placeId || "",
      };
      onChange(placeData);
      setInput(placeData.displayName); // sync local display

      setSelectedPlace(placeData);
      setSuggestions([]);
    } catch (err) {
      console.log("Place selection failed", err);
      setError("Failed to select place. Please try again.");
    }
  };

  const resetSearch = () => {
    setSuggestions([]);
  };

  const handleClear = () => {
    setInput("");
    onChange({
      displayName: "",
      formattedAddress: "",
      id: "",
    }); // Optional: clear form state
    setSelectedPlace(null);
    setSuggestions([]);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <div className="relative">
        <InputCodidge
          rightIcon={<MapPin size={18} />}
          label={label}
          type="text"
          loading={loading}
          placeholder={placeholder}
          value={input}
          onFocus={() => setSuggestions(suggestions)} // re-show on focus
          onChange={(e) => {
            setError(null);
            setInput(e.target.value);
          }}
        />
        {selectedPlace && !loading && (
          <IconButton
            type="button"
            className="absolute !p-1 right-3 top-12 transform -translate-y-1/2 hover:bg-gray-100 !rounded-full"
            onClick={handleClear}
            icon={<X size={16} />}
          />
        )}
      </div>

      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 border-b border-red-100 rounded mt-1">
          {error}
        </div>
      )}

      {suggestions.length > 0 && (
        <div className="absolute z-50 mt-1 w-full bg-white border-gray-900 rounded-lg shadow-lg max-h-80 overflow-auto">
          {suggestions.map((s, i) => {
            const types = s.placeTypes || [];
            const primary = s.address;

            return (
              <div
                key={i}
                onClick={() => handleSelect(s)}
                className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 border-b border-b-gray-700 last:border-none"
              >
                <div className="flex-shrink-0 mt-0.5">
                  {getIconForType(types)}
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <div className="font-medium text-sm text-gray-800 truncate">
                    {primary}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
