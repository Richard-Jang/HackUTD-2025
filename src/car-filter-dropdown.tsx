import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';

// --- 1. Define Types ---

type FilterOption = string | number;

interface CarFilterState {
  models: FilterOption[];
  colors: FilterOption[];
  years: FilterOption[];
}

// --- 2. Filter Data ---

const TOYOTA_MODELS: FilterOption[] = [
  "Camry", "Corolla", "Corolla Hybrid", "Camry Hybrid", "Crown", "Prius",
  "RAV4", "RAV4 Hybrid", "Highlander", "Highlander Hybrid", "Grand Highlander",
  "Sequoia", "Corolla Cross", "4Runner", "Venza", "Land Cruiser", "bZ4X", "Tacoma",
  "Tundra", "Tundra Hybrid", "GR Corolla", "GR86", "GR Supra", "Sienna",
  "Corolla Hatchback", "Mirai", "Century"
];

const COLORS: FilterOption[] = [
  "White", "Black", "Silver", "Red", "Blue", "Gray", "Green"
];

const YEARS: FilterOption[] = Array.from({ length: 11 }, (_, i) => 2015 + i).reverse(); // 2025 down to 2015

// --- 3. Utility Components ---

interface ChipProps {
  label: string;
  onRemove: () => void;
}

// A component to display selected filter tags
const FilterChip: React.FC<ChipProps> = ({ label, onRemove }) => (
  <span className="inline-flex items-center text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full py-1 px-3 shadow-sm transition duration-150 ease-in-out hover:bg-indigo-200">
    {label}
    <button
      onClick={onRemove}
      className="ml-2 -mr-1 p-0.5 rounded-full hover:bg-indigo-300 transition"
      aria-label={`Remove filter: ${label}`}
    >
      <X className="w-3 h-3 text-indigo-700" />
    </button>
  </span>
);


interface FilterSectionProps {
  title: string;
  options: FilterOption[];
  selectedValues: FilterOption[];
  onToggle: (value: FilterOption) => void;
}

// A component for rendering a group of filter options (checkboxes)
const FilterSection: React.FC<FilterSectionProps> = ({ title, options, selectedValues, onToggle }) => (
  <div className="mb-4">
    <h3 className="font-bold text-sm text-gray-700 mb-2 border-b pb-1">{title}</h3>
    <div className="max-h-48 overflow-y-auto pr-2 space-y-1">
      {options.map((value) => {
        const id = `${title}-${value}`;
        const isSelected = selectedValues.includes(value);

        return (
          <label key={id} htmlFor={id} className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer hover:bg-indigo-50 p-1 rounded-md transition duration-150">
            <input
              type="checkbox"
              id={id}
              checked={isSelected}
              onChange={() => onToggle(value)}
              className="form-checkbox h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
            />
            <span>{value}</span>
          </label>
        );
      })}
    </div>
  </div>
);

// --- 4. Main Component ---

const initialFilterState: CarFilterState = {
  models: [],
  colors: [],
  years: [],
};

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<CarFilterState>(initialFilterState);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Generic handler to toggle a value in any filter category
  const handleToggleFilter = useCallback((category: keyof CarFilterState, value: FilterOption) => {
    setFilters(prev => {
      const current = prev[category];
      if (current.includes(value)) {
        // Remove value
        return { ...prev, [category]: current.filter(v => v !== value) };
      } else {
        // Add value
        return { ...prev, [category]: [...current, value] };
      }
    });
  }, []);

  // Handler to clear all filters
  const handleClearAll = useCallback(() => {
    setFilters(initialFilterState);
    setIsOpen(false);
  }, []);

  // Combine all selected filters into a single array for display
  const selectedChips = useMemo(() => {
    const chips: { category: keyof CarFilterState, label: string, value: FilterOption }[] = [];
    Object.keys(filters).forEach(categoryKey => {
      const category = categoryKey as keyof CarFilterState;
      filters[category].forEach(value => {
        chips.push({ category, label: String(value), value });
      });
    });
    return chips;
  }, [filters]);

  // Handler for removing a single chip
  const handleRemoveChip = useCallback((category: keyof CarFilterState, value: FilterOption) => {
    handleToggleFilter(category, value); // Toggle effectively removes it if it's currently selected
  }, [handleToggleFilter]);


  return (
    <div className="p-4 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">

        {/* --- Header and Right-Aligned Dropdown Container --- */}
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-extrabold text-gray-900">Toyota Inventory Listings</h1>
            <div className="relative inline-block text-left" ref={dropdownRef}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex justify-center w-full rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
                aria-expanded={isOpen}
                aria-haspopup="true"
              >
                <Filter className="w-5 h-5 mr-2 text-indigo-500" />
                Filters
                {selectedChips.length > 0 && (
                    <span className="ml-2 bg-indigo-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {selectedChips.length}
                    </span>
                )}
                <ChevronDown className={`-mr-1 ml-2 h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
              </button>

              {/* Dropdown Panel (Right Aligned) */}
              {isOpen && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-80 rounded-xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 z-10 p-6"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabIndex={-1}
                >
                  <div className="pb-4">
                    <h2 className="text-lg font-extrabold text-gray-900 mb-4">Filter Listings</h2>

                    {/* Make Filter (Fixed) */}
                    <div className="mb-4">
                      <h3 className="font-bold text-sm text-gray-700 mb-2 border-b pb-1">Make</h3>
                      <p className="text-indigo-600 font-semibold text-sm">Toyota (Fixed)</p>
                    </div>

                    {/* Model Filter */}
                    <FilterSection
                      title="Model"
                      options={TOYOTA_MODELS}
                      selectedValues={filters.models}
                      onToggle={(v) => handleToggleFilter('models', v)}
                    />

                    {/* Color Filter */}
                    <FilterSection
                      title="Color"
                      options={COLORS}
                      selectedValues={filters.colors}
                      onToggle={(v) => handleToggleFilter('colors', v)}
                    />

                    {/* Year Filter */}
                    <FilterSection
                      title="Year"
                      options={YEARS}
                      selectedValues={filters.years}
                      onToggle={(v) => handleToggleFilter('years', v)}
                    />

                    <div className="pt-4 border-t mt-4 flex justify-end">
                      <button
                        onClick={handleClearAll}
                        className="text-sm font-medium text-red-600 hover:text-red-800 transition duration-150 p-2 rounded-lg hover:bg-red-50"
                      >
                        Clear All Filters
                      </button>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
                      >
                        Apply Filters
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
        </div>

        {/* --- Display Selected Filters --- */}
        <div className="mt-4 p-4 bg-white rounded-xl shadow-md border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Active Filters ({selectedChips.length})</h2>
            <div className="flex flex-wrap gap-2 min-h-[40px] items-center">
                {selectedChips.length === 0 ? (
                    <p className="text-gray-500 italic">No filters selected. Click 'Filters' to narrow your search.</p>
                ) : (
                    selectedChips.map((chip, index) => (
                        <FilterChip
                            key={index}
                            label={`${chip.category.charAt(0).toUpperCase() + chip.category.slice(1)}: ${chip.label}`}
                            onRemove={() => handleRemoveChip(chip.category, chip.value)}
                        />
                    ))
                )}
            </div>
        </div>

        {/* --- Listing content goes here now --- */}
      </div>
    </div>
  );
}