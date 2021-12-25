import React, { Component } from 'react';
import Wall from './Wall'

class Login extends Component {
    state = {
        credentials: { username: '', email:'', password: '' },
        errorMessage: '',
        successMessage: '',
        message: ''
    }

    login = () => {
        console.log(typeof (this.state.credentials))
        this.setState({ successMessage: null })
        this.setState({ errorMessage: null });
        console.log(this.state.credentials)
        fetch('http://localhost:8000/auth/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state.credentials)
        })
            .then(data => {
                if (data.ok) {
                    this.setState({ successMessage: data })
                    return data.json()
                } else {
                    throw data;
                }
            })
            .then(
                data => {
                    console.log(data.token)
                    //this.props.postMessage(data.token);
                }
            )
            .catch(error => console.error(error))
    }

    register = () => {
        this.setState({ errorMessage: null });
        this.setState({ successMessage: null })
        console.log(this.state.credentials)
        fetch('http://localhost:8000/api/users/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state.credentials)
        })
            .then(data => {
                if (data.ok) {
                    return data.json()
                } else {
                    throw data;
                }
            })
            .then(
                data => {
                    console.log(data);

                }
            )
            .catch(error => {

                this.setState({ errorMessage: error });
            })
    }

    postMessage = () => {
        return fetch('http://localhost:8000/api/wall/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            //Authorization: `Token ${this.props.token}`,
            body: JSON.stringify({ 'message': this.state.message })
        })
            .then(data => data.json())
            .then(data => { console.log(data) })
            .catch(error => console.error(error))

    }

    inputChanged = event => {
        const cred = this.state.credentials;
        cred[event.target.name] = event.target.value;
        this.setState({ credentials: cred });
    }

    inputMessage = event => {

        this.setState({ [event.target.name]: event.target.value })
        console.log(this.state.message)
    }



    render() {
        let status;
        if (this.state.errorMessage) {
            status = <h3 className="error">Something went wrong, please try again.</h3>
        } else if (this.state.successMessage) {
            status = <div><h3>Login in successfully!</h3>
                <textarea onChange={this.inputMessage}
                    name='message'
                    value={this.state.message}></textarea>
                <button onClick={() => {
                    this.postMessage()
                        .then(e => {
                            this.props.refreshPost()
                        })
                }}>Post Message</button></div>
        }
        return (
            <div>
            
                <h1>Login user form</h1>
                <form>
                <div className='form-group'>
                <label >Username: </label>
                <input type="text" name="username"
                        value={this.state.credentials.username}
                        onChange={this.inputChanged} />
                
                </div>
                <div className='form-group'>
                <label>Email:</label>
                <input type="text" name="email"
                        value={this.state.credentials.email}
                        onChange={this.inputChanged} />
                </div>
                <div className='form-group'>
                <label>Password:</label>
                    <input type="password" name="password"
                        value={this.state.credentials.password}
                        onChange={this.inputChanged} />
                </div>
                </form>
                <button onClick={this.login}>Login</button>
                <button onClick={this.register}>Register</button>
                {status}

                { }
            </div>
            
        )
    }
}

export default Login;