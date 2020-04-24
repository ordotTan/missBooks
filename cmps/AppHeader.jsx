import NavBar from './NavBar.jsx'

import UserMsg from './UserMsg.jsx'


export default function AppHeader(props) {
    return (
        <section className="nav-bar-section">
             <h1>Miss-Books</h1>
             <button className = "back-btn" onClick={()=>{props.history.goBack();}}>Back</button>
            <NavBar></NavBar>
            <UserMsg></UserMsg>
        </section>
    )
}