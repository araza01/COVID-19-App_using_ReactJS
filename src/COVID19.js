import React, { Component } from 'react'

export default class Covid19 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            output: []
        }
    }
    componentDidMount() {
        fetch("https://api.covid19api.com/world/total")
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
        console.log(this.state.output);
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
            <section className="container">
                <article className="align">
                    <div className="header">COVID-19 CORONAVIRUS PANDEMIC</div>
                </article>
                <article>
                    <div>Confirmed</div>
                    <div>
                        <ul>
                            {
                                Object.keys(output).map((stats) => {
                                    return stats.TotalConfirmed;
                                })
                            }
                        </ul>
                    </div>
                </article>
            </section>
        );
    }
}
