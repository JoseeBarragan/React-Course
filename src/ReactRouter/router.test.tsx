import {describe, it, expect, beforeEach, vi} from 'vitest';
import {cleanup, render, screen} from '@testing-library/react';
import {Router} from './app.tsx'
import { getCurrentPath } from './utils.ts';
import { Route } from './Route.tsx';
import { Link } from './Link.tsx';

vi.mock('./utils.ts', () => ({
    getCurrentPath: vi.fn()
}))

describe('Router', () => {
    beforeEach(() => {
        cleanup()
        vi.clearAllMocks()
    })
    it('should work', () => {
        render(<Router routes={[]}/>)
        expect(true).toBeTruthy()
    })
    it('Should render 404 if no routes match', () => {
        render(<Router routes={[]} defaultComponent={() => <h1>404</h1>}/>)
        expect(screen.getByText('404')).toBeTruthy()
    })
    it('should render the component requested', () => {
        getCurrentPath.mockReturnValue('/src/ReactRouter/search/asfafasf');
        const Routes = [
            {
                path: '/src/ReactRouter/',
                Component: () => <h1>Home</h1>
            },
            {
                path: '/src/ReactRouter/about',
                Component: () => <h1>About</h1>
            },
            {
                path: '/src/ReactRouter/search/:query',
                Component: () => <h1>Buscador</h1>
            }
        ]
        render(<Router routes={Routes}/>)
        expect(screen.getByText('Buscador')).toBeTruthy()
    })
    it('should navigate through links', () => {
        getCurrentPath.mockReturnValue('/src/ReactRouter/')
        render(
            <Router>
                <Route path='/src/ReactRouter/' Component={() => {
                    return(
                        <>
                            <h1>Home</h1>
                            <Link to='/src/ReactRouter/about'>About</Link>
                        </>
                    )
                }}/>
                <Route path='/src/ReactRouter/about' Component={() => <h1>About</h1>}/>
            </Router>
        )

        screen.getByText('About').click()
        expect(screen.getByText('About')).toBeTruthy()
    })
})