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
            <div className="about-us-section">
                <h1>Who are we?</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, commodi. Rerum itaque fugiat minima pariatur ipsa, inventore quod cum consequuntur, iste iure facilis voluptate optio voluptas unde earum exercitationem quis.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, commodi. Rerum itaque fugiat minima pariatur ipsa, inventore quod cum consequuntur, iste iure facilis voluptate optio voluptas unde earum exercitationem quis.</p>
                <img src="assets/img/missBooks.png"></img>
            </div>
        )
    }
}