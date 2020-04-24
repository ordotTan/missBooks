const { NavLink } = ReactRouterDOM

export default function NavBar() {
    return (
        <nav>
            <div className="clean-list">
                <NavLink exact to='/'>Home</NavLink>
                <NavLink to='/addBook'>Find Books</NavLink>
                <NavLink to='/about'>About</NavLink>
                <NavLink to='/book'>Catalog</NavLink>
            </div>
        </nav>
    )
}