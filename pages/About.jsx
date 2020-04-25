
import AboutCompany from './AboutCompany.jsx'
import Careers from './Careers.jsx'
const { NavLink, Route, Switch } = ReactRouterDOM


export default class About extends React.Component {
    timeInterval = 0

    componentDidMount() {
        console.log('Landed at "About" page')
        this.timeInterval = setInterval(() => {
            console.log('still on "About" page... ')
        }, 3000)
    }

    componentWillUnmount() {
        console.log('Left "About" page')
        clearInterval(this.timeInterval)
    }

    render() {
        return (
            <section className="about-nav-bar">
                <NavLink to='/about/company'>Company</NavLink>
                <NavLink to='/about/careers'>Careers</NavLink>
                <Switch>
                    <Route component={Careers} path="/about/careers" />
                    <Route component={AboutCompany} path="/about" />
                </Switch>
            </section>


        )
    }
}