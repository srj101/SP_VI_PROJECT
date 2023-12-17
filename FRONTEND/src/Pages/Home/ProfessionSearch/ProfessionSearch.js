import React, { useContext } from 'react';
import { FcSearch } from "react-icons/fc";
import { SearchContext } from '../../../Context/SearchContext';
import './ProfessionSearch.css'

const ProfessionSearch = () => {
    const { setSearch, search } = useContext(SearchContext) // Getting the search state and the setSearch function from the SearchContext

    const [active, setActive] = React.useState(true); // This state is used to toggle the placeholder

    const placeholderToggle = () => {    // This function is used to toggle the placeholder
        setActive(false);            // When the input is focused, the placeholder is visible
    };

    const placeholder = () => {        // This function is used to toggle the placeholder
        setActive(true);         // When the input is not focused, the placeholder is invisible
    };
    return (
        <div className='w-full px-8 lg:px-0'>
            <div className='w-full lg:w-1/2 mt-12 mb-10 lg:mb-12 z-49 relative mx-auto'>

                <FcSearch className='absolute search'> </FcSearch>
                <input
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                    type='text'
                    placeholder='Search your Interested Profession'
                    onFocus={placeholderToggle}
                    onBlur={placeholder}
                    className={`in input input-bordered border-2 border-stone-600 w-full  placeholder:p-[-1px] input-outline shadow-md ${active ? "placeholder:block" : "placeholder:invisible"
                        } `}
                />

            </div>
        </div>
    );
};

export default ProfessionSearch;