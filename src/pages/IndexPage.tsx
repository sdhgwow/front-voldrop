import BasePage from "./common/BasePage";
import { PreviewContainer } from "../components/PreviewContainer";
import { Main } from "../components/Main";
import { useState } from "react";

function IndexPage() {
    const [appliedFilters, setAppliedFilters] = useState({
        selectedCategory: undefined,
        selectedBrands: undefined,
        selectedCollections: undefined,
        selectedSeasons: undefined,
        selectedTags: undefined,
        selectedColors: undefined,
        selectedSizes: undefined,
        isPopular: undefined,
        isNew: undefined,
        searchQuery: undefined,
        minPrice: undefined,
        maxPrice: undefined,
    });


    function applyFilters(filters) {
        setAppliedFilters(filters);
    }

    return (
        <BasePage title={""} desc={""}>
            <PreviewContainer applyFilters={applyFilters} />
            <Main filters={appliedFilters} />
        </BasePage>
    )
}

export default IndexPage