import React, { Component } from 'react';
import { FaRecycle } from 'react-icons/fa';

class RegisterBagComponent extends Component {

    constructor(props){
        super(props);

        this.state = {
            bagId: null,
            isBagIdValidated: false,
            validationResponse: '',
            uid: null
        }
    }

    componentDidMount() {
        const  { id } = this.props.match.params;
        this.checkOrGetUserId();
        this.setState({bagId:id});

        this.verifyBagId();
    }

    verifyBagId() {
        //TODO koble til ekte API, mock for nå
        var that = this;

        const validationResponses = ['Godkjent', 'Ikke godkjent', 'Brukt'];

        fetch('/api/QR/Activate', {
            method: "POST",
                body: JSON.stringify({a: 1, b: 2})
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error))

        setTimeout(function(){
            that.setState({isBagIdValidated: true, validationResponse: validationResponses[Math.floor(Math.random() * validationResponses.length)  ]})

            if(that.state.validationResponse === 'Godkjent'){
                that.checkOrGetUserId();
            }

        }, Math.random()*1000 * 4);
    }

    checkOrGetUserId() {
        let id = localStorage.getItem('uid');
        if(id == null){
            //TODO fetch user ID from API and store to localstorage.
            //mock
            id = 123141231
        }

        localStorage.setItem('uid', id);
        this.setState({uid: id});
    }

    verifyBagId() {
        fetch('/api/QR/Activate?qrCode=' + this.state.bagId + '&userid=' + this.state.uid, {
            method: "POST",
            mode: "no-cors"
        })
            .then(response => this.handleRespone(response))
            .catch(error => console.log(error)) //TODO handle error riktig.
    }

    handleRespone(response){
        //TODO gjør noe med responsen her!
        // vise godkjent / ikke godkjent, bla bla
    }

    render(){

        this.verifyBagId();


        return(
            <div>
                <h1>REGISTER BAG</h1>
                <p>Din pose har id: {this.state.bagId}</p>

                {this.state.isBagIdValidated ? <p>Bag response: {this.state.validationResponse} </p> : <FaRecycle/>}
            </div>
        )
    }
}

export default RegisterBagComponent;