import { Menu_Get } from "@/types/menu";
import { useEffect, useState } from "react";

interface FilterProps {
  order: "Ascending" | "Descending";
  filterAllergens: (ingredients: string[]) => void;
  sortAscending: () => void;
  sortDescending: () => void;
  menu: Menu_Get[];
}

const Filter: React.FC<FilterProps> = ({
  filterAllergens,
  sortAscending,
  sortDescending,
  order,
  menu,
}) => {
  const [allergens, setAllergens] = useState<string[]>([]);
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);

  // Function to split and flatten allergens
  const flattenAllergens = (ingredients: string[]): string[] => {
    return ingredients
      .flatMap((ingredient) =>
        ingredient.split(",").map((allergen) => allergen.trim())
      )
      .filter(Boolean); // Remove empty strings
  };

  useEffect(() => {
    // Extract unique allergens from menu items
    const allAllergens = menu.reduce<string[]>((acc, item) => {
      return [...acc, ...flattenAllergens(item.ingredients)];
    }, []);
    // Remove duplicates and sort
    const uniqueAllergens = Array.from(new Set(allAllergens)).sort();
    setAllergens(uniqueAllergens);
  }, [menu]);

  useEffect(() => {
    filterAllergens(selectedAllergens);
  }, [selectedAllergens]);

  // Add an allergen to the selected list
  const addAllergen = (allergen: string) => {
    if (allergen && !selectedAllergens.includes(allergen)) {
      const newSelectedAllergens = [...selectedAllergens, allergen];
      setSelectedAllergens(newSelectedAllergens);
    }
  };

  // Remove an allergen from the selected list
  const removeAllergen = (allergen: string) => {
    const newSelectedAllergens = selectedAllergens.filter(
      (a) => a !== allergen
    );
    setSelectedAllergens(newSelectedAllergens);
  };

  return (
    <section className="w-full flex flex-col items-center space-y-4">
      <div className="flex flex-col gap-2 justify-center">
        {/* Dropdown to add new allergens */}
        <select
          onChange={(e) => addAllergen(e.currentTarget.value)}
          value=""
          className="px-2 py-1 border-2 rounded border-main-primary bg-main-light text-main-primary font-alumni text-2xl"
        >
          <option value="">Filter ingridients</option>
          {allergens
            .filter((allergen) => !selectedAllergens.includes(allergen))
            .map((allergen) => (
              <option key={allergen} value={allergen}>
                {allergen}
              </option>
            ))}
        </select>

        <section className="w-full flex flex-row flex-wrap gap-2 justify-center items-center">
          {/* Display selected allergens with remove buttons */}
          {selectedAllergens.map((allergen) => (
            <div
              key={allergen}
              className="flex items-center bg-main-primary px-2 py-1 rounded"
            >
              <span className="mr-2">{allergen}</span>
              <button
                onClick={() => removeAllergen(allergen)}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          ))}
        </section>
      </div>

      {/* Optional: Sorting controls */}
      <div className="flex space-x-2">
        <button
          onClick={sortAscending}
          className={`px-2 py-1 border rounded ${
            order === "Ascending"
              ? "bg-main-primary text-white border-main-primary"
              : "text-white"
          }`}
        >
          Sort Ascending
        </button>
        <button
          onClick={sortDescending}
          className={`px-2 py-1 border rounded ${
            order === "Descending"
              ? "bg-main-primary text-white border-main-primary"
              : "text-white"
          }`}
        >
          Sort Descending
        </button>
      </div>
    </section>
  );
};

export default Filter;
