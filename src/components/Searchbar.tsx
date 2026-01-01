import React, { useState, useEffect, useCallback } from "react";
import { Input } from '@heroui/react';

interface SearchBarProps {
    onSearch: (searchTerm: string) => void;
    placeholder?: string;
    debounceDelay?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
    onSearch,
    placeholder = "ค้นหาเกม...",
    debounceDelay = 300
}) => {
    const [searchValue, setSearchValue] = useState<string>("");

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(searchValue);
        }, debounceDelay);

        return () => clearTimeout(timer);
    }, [searchValue, debounceDelay, onSearch]);

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    }, []);

    return (
        <div className="mb-4">
            <Input
                placeholder={placeholder}
                onChange={handleSearchChange}
                value={searchValue}
            />
        </div>
    );
};
