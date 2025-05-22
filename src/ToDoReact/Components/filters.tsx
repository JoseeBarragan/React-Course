import { useTodos } from "../app"
import { FILTERS_BUTTONS, TODO_FILTERS} from "../consts"
import React from "react"

export type FilterValue = typeof TODO_FILTERS[ keyof typeof TODO_FILTERS]


export const Filters: React.FC = () => {
    const { filterSelected, handleFilter, setTodos} = useTodos()
    const handleClick = (event, key, href) => {
        event.preventDefault();
        (async () => {
            const response = await fetch(`http://localhost:3000${href}`);
            const data = await response.json();
            setTodos(data)
            handleFilter(key)
        })();
    }
    return(
        <ul className="filters">
            {
                Object.entries(FILTERS_BUTTONS).map(([key, {href, literal}]) => {
                    const isSelected = key === filterSelected;
                    const className = isSelected ? "selected": ""
                    return (
                        <li key={key}>
                            <a href={href} onClick={(event) => handleClick(event, key, href)} 
                                className={className}>
                                {literal}
                            </a>
                        </li>
                    )
                })
            }
        </ul>
    )
}  