import { Children, useEffect, useState, type JSX, lazy, Suspense} from 'react';
import {HomePage} from './pages/Home.tsx'
const About = lazy(() => import('./pages/About.tsx'))
import {match} from 'path-to-regexp'
import EVENTS from './const.ts';
import {Route} from './Route.tsx';
import { getCurrentPath } from './utils.ts';

const Routes = [
    {
        path: '/src/ReactRouter/',
        Component: HomePage
    },
    {
        path: '/src/ReactRouter/about',
        Component: About
    },
    {
        path: '/src/ReactRouter/search/:query',
        Component: () => <h1>Buscador</h1>
    }
]

type RouteParams = Record<string, string>;

type RouteComponent = (props: { routeParams?: RouteParams }) => JSX.Element;

type Route = {
    path: string,
    Component: RouteComponent
}

type RouterProps = {
    children: any | undefined,
    routes?: Route[],
    defaultComponent?: RouteComponent
}


export function Router ({children, routes = [], defaultComponent: DefaultComponent = () => <h1>Error 404</h1>}: RouterProps){
    const[currentPath, setPath] = useState(getCurrentPath())
    useEffect(() => {
        const onLocationChange = () => {
            setPath(window.location.pathname);
        }

        window.addEventListener(EVENTS.NAVIGATION_PUSHSTATE, onLocationChange);
        window.addEventListener(EVENTS.NAVIGATION_POPSTATE, onLocationChange)

        return () => {
            window.removeEventListener(EVENTS.NAVIGATION_PUSHSTATE, onLocationChange);
            window.removeEventListener(EVENTS.NAVIGATION_POPSTATE, onLocationChange);
        };
    }, [])

    let  routeParams = {}

    const routesFromChildren = Children.map(children, ({props, type}) => {
        const {name} = type;
        const isRoute = name === 'Route';
        return isRoute ? props : null;
    })

    let Page: RouteComponent | undefined = undefined;

    const routesToUse = routes.concat(routesFromChildren).filter(Boolean)

    for (const route of routesToUse) {
        const matcher = match(route.path, { decode: decodeURIComponent });
        const matched = matcher(currentPath);

        if (matched) {
            routeParams = matched.params;
            Page = route.Component;
            break;
        }
    }

    if (!Page) return <DefaultComponent/>;
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Page routeParams={routeParams} />
        </Suspense>
    );
}

export function App () {
    return(
        <main>
            <Suspense fallback={<div>Loading...</div>}>
                <Router routes={Routes}>
                    <Route path='/src/ReactRouter/' Component={HomePage}/>
                    <Route path='/src/ReactRouter/about' Component={About}/>
                </Router>
            </Suspense>
        </main>
    )
}