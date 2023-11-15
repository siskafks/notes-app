import React from "react";

function SearchBar({ keyword, onSearch }){
    return(
        <div className="note-search">
            <input type="text" placeholder="Search" value={keyword} onChange={onSearch} />
        </div>
    )
}

export default SearchBar;