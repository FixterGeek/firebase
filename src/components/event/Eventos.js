import React, { Component } from 'react';
import './Eventos.css';
import {EventosDisplay} from './EventosDisplay';

class Eventos extends Component {

    state = {
        events:[]
    }

    componentDidMount () {
        window.scroll(0, 0)
        this.getEvents()
    }

    getForward = () => {}
    getPast = () => {}


    getEvents = () => {

        fetch('https://graph.facebook.com/v3.1/1186612441363158/events?access_token=EAAE9FGa6lzgBAMCOyhQKE2ZCMyMip7FljYeZCls7nOK9tbNmZAd4kqNeDk3JmcDFZANq6b9ZCjvZBSCQVjfFZCG6oEmvURZC5IYjsTCh3243m0JgQgkYCty5b0TKMbZAlEkCRZClp4ytZACGoBALJmKENXpaADe4H9jjS8iF0gHF6KogS1pGi28NZBjZByZAEnrAhLaqD9oFomI21QZA5DZBk7tQ3BKTZAC5atktqyaD1ZA0La8TcdsAZDZD')
        .then(r=>{
            if(!r.ok) console.log(r)
            return r.json()
        })
        .then(res=>{
            console.log(res.data)
            this.setState({events:res.data})
        })
        // window.FB.api(
        //     '/1186612441363158/events',
        //     'GET',
        //     {AccessToken:"EAAE9FGa6lzgBABiuMxLz7XycXjPUMCEualdR1LlJFYsZApKAr6Yik7xnbD5YrfZAZCic5HqV38ZBZC4Xw49oZBZAAdTE4bxdScbc1JCIuqoBtB3fusKSwjaGNmVAZAonuqxN1TAXmX5JXcQFlG6wt4xCe6KWZBXsrKuMHQ7xUKNnDZCNJYUxVlpQ3f1e135hSNdmfTUKDRBnZCHkPyGFOhX3Sa6ZByZAf7mZCXONS4JjWkAmeGOgZDZD"},
        //     function(response) {
        //         console.log(response)
        //     }
        //   );
    }

    render() {
        const {events} = this.state
        const newEvents = this.getForward(events)
        const pastEvents = this.getPast(events)
        return (
            <div className="">
                <EventosDisplay
                    events={events}
                />
            </div>
        );
    }
}

export default Eventos;
