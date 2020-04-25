const Router = ReactRouterDOM.HashRouter 
const { Route, Switch } = ReactRouterDOM
const history = History.createBrowserHistory()

import BookApp from './pages/BookApp.jsx'
import BookDetails from './pages/BookDetails.jsx'
import AppHeader from './cmps/AppHeader.jsx'
import About from './pages/About.jsx'
import Home from './pages/Home.jsx'
import BookAdd from './pages/BookAdd.jsx'

export class App extends React.Component {

    render() {
        return (

            <Router>
                <main>
                    <AppHeader history ={history} />
                    <Switch>
                        <Route component={BookDetails} path="/book/:theBookId/:theBookName" />
                        <Route component={BookApp} path="/book" />
                        <Route component={BookAdd} path="/addBook" />
                        <Route component={About} path="/about" />
                        <Route component={Home} path="/" />
                    </Switch>
                </main>
                <footer>
                    copyrights 2020 &copy;
                </footer>
            </Router>
        )
    }
}

