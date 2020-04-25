export default class BookFilter extends React.Component {
    state = {
        filter: {
            name: '',
            minPrice: '',
            maxPrice: ''
        }
    }

    handleChange = ({ target }) => { // The onChnage function gets be default "event".. and we destructe from it "target"
        const field = target.name
        const value = (target.type === 'number') ? parseInt(target.value) : target.value
        this.setState(prevState => ({ filter: { ...prevState.filter, [field]: value } }), () => { // this will run the onSetFilter for every input change
            this.props.onSetFilter(this.state.filter)
        })
    }
    // if we want to invoke the filter by clicking on a button... 
    // onFilter = (ev) => {
    //     ev.preventDefault()
    //     this.props.onSetFilter(this.state.filter)
    // }

    render() {
        const { name, maxPrice, minPrice } = this.state.filter
        return (
            <section className="filter-books">
                {/* <h2>Filter</h2> */}
            {/* <form onSubmit={ this.onFilter }> */}
                <label htmlFor="">Title: </label>
                <input type="text" name="name" placeholder="Book Title  " value={ name } onChange={ this.handleChange } />
                <label htmlFor="">Min Price: </label>
                <input type="number" name="minPrice"  value={ minPrice } onChange={ this.handleChange } />
                <label htmlFor="">Max Price:</label>
                <input type="number" name="maxPrice" value={ maxPrice } onChange={ this.handleChange } />
                {/* <button>Filter</button> */}
            {/* </form> */}
            </section>

        )
    }
}