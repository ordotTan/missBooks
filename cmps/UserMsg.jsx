import eventBusService from '../services/eventBusService.js'

export default class UserMsg extends React.Component {
    state = {msg: null}

    componentDidMount() {
        this.unsubscribeFromEventBus = eventBusService.on('user-msg', (msg)=>{
            const delay = 5000;
            this.setState({msg})
            setTimeout(()=>{
                this.setState({msg: null})
            }, delay)
        })
    }
    componentWillUnmount() {
        this.unsubscribeFromEventBus();
    }

    render() {
        const {msg} = this.state
        return (!msg)? '' : 
        <section className="user-msg">
            <button className="close-user-msg" onClick={()=>{
                this.setState({msg: null})
            }}>x</button>
            "{msg.book.title}"{msg.txt}
            {msg.action ==='add' && <a href={`/#/book/${msg.book.id}/${msg.book.title}`}>Check it out</a>}
        </section>
    }
}