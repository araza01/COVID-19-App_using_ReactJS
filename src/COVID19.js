import React, { Component } from 'react'

export default class Covid19 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            output: []
        }
        this.handleNumbers = this.handleNumbers.bind(this);
    }

    handleNumbers = (num) => {
        let parts = num.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }

    componentDidMount() {
        fetch("https://api.covid19api.com/world?from=2020-10-03T23:59:00Z&to=2020-10-04T00:00:00")
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
                        <div className="numbers">
                            {
                                output.map((stats) => {
                                    return this.handleNumbers(stats.TotalConfirmed);
                                })
                            }
                        </div>
                    </article>
                    
                    <article className="float-sm-left recov-cases recov-col">
                        <div className="cases">Total<br />Recovered</div>
                        <div className="numbers">
                            {
                                output.map((stats) => {
                                    return this.handleNumbers(stats.TotalRecovered);
                                })
                            }
                        </div>
                    </article>
                    
                    <article className="float-sm-left death-cases death-col">
                        <div className="cases">Total<br />Deaths</div>
                        <div className="numbers">
                            {
                                output.map((stats) => {
                                    return this.handleNumbers(stats.TotalDeaths);
                                })
                            }
                        </div>
                    </article>
                </section>

                <section className="container">
                    <article className="search-bar">
                        <input type="text" placeholder="Search by Country" />
                        <button type="submit">Submit</button>
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
                </section>
            </React.Fragment>
        );
    }
}
