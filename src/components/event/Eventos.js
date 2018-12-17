import React, { Component } from "react";
import "./Eventos.css";
import { EventosDisplay } from "./EventosDisplay";
import axios from "axios";

class Eventos extends Component {
  state = {
    events: []
  };

  componentDidMount() {
    window.scroll(0, 0);
    this.getEvents();
  }

  getForward = () => {};
  getPast = () => {};

  getEvents = () => {
    const token =
      "EAAMPgo9FBsoBAH4iJ8VlwNr8Fq3FM8BwzdUjs3Ge3xoXfH58KdzEryHswIga0k7aICVYb3KYjdd2A5eYv6drLVyFZBdcAHTUMQWnaRSeePNCVbZB3MREmaxG7SnlveTYZBG6zSVxhsdDT1EhtbQgdBEKA4YvB0hi7wPn1FZAhpUNQ3GTpMeZA9oj6BIg5hXwZD";
    fetch(
      `https://graph.facebook.com/v3.2/1186612441363158/events?access_token=${token}`
    )
      .then(r => {
        if (!r.ok) console.log(r);
        return r.json();
      })
      .then(res => {
        console.log(res.data);
        this.setState({ events: res.data });
      });
    // window.FB.api(
    //     '/1186612441363158/events',
    //     'GET',
    //     {AccessToken:"EAAE9FGa6lzgBABiuMxLz7XycXjPUMCEualdR1LlJFYsZApKAr6Yik7xnbD5YrfZAZCic5HqV38ZBZC4Xw49oZBZAAdTE4bxdScbc1JCIuqoBtB3fusKSwjaGNmVAZAonuqxN1TAXmX5JXcQFlG6wt4xCe6KWZBXsrKuMHQ7xUKNnDZCNJYUxVlpQ3f1e135hSNdmfTUKDRBnZCHkPyGFOhX3Sa6ZByZAf7mZCXONS4JjWkAmeGOgZDZD"},
    //     function(response) {
    //         console.log(response)
    //     }
    //   );
  };

  sendMail = () => {
    const url =
      "https://us-central1-reactfirebase-b16aa.cloudfunctions.net/sendMail";
    axios.get(url).then(r => console.log(r));
  };

  render() {
    const { events } = this.state;
    const newEvents = this.getForward(events);
    const pastEvents = this.getPast(events);
    return (
      <div className="">
        <button onClick={this.sendMail}>TestMail</button>
        <EventosDisplay events={events} />
      </div>
    );
  }
}

export default Eventos;
