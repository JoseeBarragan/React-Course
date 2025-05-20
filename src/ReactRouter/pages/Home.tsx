import { Link } from '../Link.tsx'

export function HomePage() {
    return(
        <>
            <h2>Home</h2>
            <Link target="_self" to="/src/ReactRouter/about">Ir al about</Link>
        </>
    )
}