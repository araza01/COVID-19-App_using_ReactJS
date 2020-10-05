import React, { Component } from 'react'

export default class Covid19 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            output: {},
            input: "",
            data: []
        }
        this.handleNumbers = this.handleNumbers.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleData = this.handleData.bind(this);
    }

    handleNumbers = (num) => {
        let parts = num.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }

    handleChange = (e) => {
        this.setState({
            input: e.target.value
        });
    }

    handleData = () => {
        fetch("https://api.covid19api.com/summary")
        .then(response => response.json())
        .then((result) => {
            this.setState({
                isLoaded: true,
                data: result
            });
        }).catch((error) => {
            this.setState({
                isLoaded: true,
                error
            });
        })
    }

    componentDidMount() {
        fetch("https://api.covid19api.com/summary")
        .then(response => response.json())
        .then((result) => {
            this.setState({
                isLoaded: true,
                output: result
            });
        }).catch((error) => {
            this.setState({
                isLoaded: true,
                error
            });
        })
    }

    render() {
        const {isLoaded, error, output} = this.state;
        
        if(error) {
            return (
                <section className="container">
                    <article className="align">
                        Error: {error.message}
                    </article>
                </section>
            );
        } else if(!isLoaded) {
            return (
                <section className="container">
                    <article className="align">
                        Loading<i className="fa fa-spinner fa-spin"></i>
                    </article>
                </section>
            );
        }
        return (
            <React.Fragment>
                <section className="container">
                    <article className="align">
                        <div className="header">COVID-19 CORONAVIRUS PANDEMIC</div>
                        <div className="sub-header">Coronavirus Cases:</div>
                    </article>
                </section>

                <section className="container">
                    <article className="float-sm-left conf-cases conf-col">
                        <div className="cases">Total<br />Confirmed</div>
                        <div className="numbers">{this.handleNumbers(output.Global.TotalConfirmed)}</div>
                    </article>
                    
                    <article className="float-sm-left recov-cases recov-col">
                        <div className="cases">Total<br />Recovered</div>
                        <div className="numbers">{this.handleNumbers(output.Global.TotalRecovered)}</div>
                    </article>
                    
                    <article className="float-sm-left death-cases death-col">
                        <div className="cases">Total<br />Deaths</div>
                        <div className="numbers">{this.handleNumbers(output.Global.TotalDeaths)}</div>
                    </article>
                </section>

                <section className="container">
                    <article className="search-bar">
                        <input type="text" placeholder="Search by Country" onChange={this.handleChange} />
                        <button type="submit" onClick={this.handleData}>Submit</button>
                    </article>
                </section>

                <section className="container">
                    <article className="info-list">
                        <ul>
                            <li>Country</li>
                            <li>Confirmed</li>
                            <li>Active</li>
                            <li>Recovered</li>
                            <li>Deceased</li>
                        </ul>
                    </article>

                    <article className="info-list">
                        if(this.state.input === output.Countries.Country) {
                            <ul>
                                <li>{output.Countries.Country}</li>
                                <li>{output.Countries.TotalConfirmed}</li>
                                <li>{output.Countries.TotalRecovered}</li>
                                <li>{output.Countries.TotalDeaths}</li>
                            </ul>
                        }
                    </article>
                </section>
            </React.Fragment>
        );
    }
}
