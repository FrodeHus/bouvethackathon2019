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
        this.setState({ bagId : id });
        this.checkOrGetUserId();
    }

    checkOrGetUserId() {
        let id = localStorage.getItem('uid');
        if(id == null){
            fetch('http://bouvet-panther-api.azurewebsites.net/api/User/Register', {
                method: "GET",
                mode: "no-cors"
            }).then(response => response.json())
                .then(response => this.setState({uid: response.uid}))
                .catch(error => console.log(error)) //TODO handle error riktig.
        }else{
            this.setState({uid: id})
        }
    }

    verifyBagId() {
        fetch('/api/QR/Activate?qrCode=' + this.state.bagId + '&userid=' + this.state.uid, {
            method: "POST",
            mode: "no-cors"
        }).then(response => this.handleRespone(response))
            .catch(error => console.log(error)) //TODO handle error riktig.
    }

    handleRespone(response){
        //TODO gjør noe med responsen her!
        // vise godkjent / ikke godkjent, bla bla
        console.log(response);
    }

    render(){

        if(this.state.uid == null){
            return (<div>
                <FaRecycle/>
            </div>);
        }

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