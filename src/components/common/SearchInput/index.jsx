import React, { useState } from "react";
import { Input, SearchWrapper } from "./SearchInput.styles";
import { AiOutlineSearch } from "react-icons/ai";
const SearchInput = () => {
    const [isFocused, setIsFocused] = useState();
    const handleInputFocus = () => {
        setIsFocused(true);
    };
    const handleInputBlur = () => {
        setIsFocused(false);
    };
    return (
        <SearchWrapper isFocused={isFocused}>
            <AiOutlineSearch />
            <Input onFocus={handleInputFocus} onBlur={handleInputBlur} placeholder="Buscar en tweeter" />
        </SearchWrapper>
    );
};

export default SearchInput;
