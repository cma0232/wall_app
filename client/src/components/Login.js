import React, { Component } from 'react';

class Login extends Component {
    state = {
        credentials: { username: '', email:'', password: '' },
        errorMessage: '',
        successMessage: '',
        message: ''
    }

    login = () => {

        this.setState({ successMessage: null })
        this.setState({ errorMessage: null });
        console.log(this.state.credentials)
        fetch(`${process.env.REACT_APP_API_URL}/auth/`, {
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
                }
            )
            .catch(error => console.error(error))
    }

    register = () => {
        this.setState({ errorMessage: null });
        this.setState({ successMessage: null })
        console.log(this.state.credentials)
        fetch(`${process.env.REACT_APP_API_URL}/api/users/`, {
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
        return fetch(`${process.env.REACT_APP_API_URL}/api/wall/`, {
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
        
    }


    render() {
        let status;
        if (this.state.errorMessage) {
            status = <h3>Something went wrong, please try again.</h3>
        } else if (this.state.successMessage) {
            status = <div className='form-group m-5'><h3>Login in successfully!</h3>
                <textarea className='form-control ' rows="4"
                    onChange={this.inputMessage}
                    name='message'
                    value={this.state.message}></textarea>
                <button className="btn btn-primary m-3" onClick={() => {
                    this.postMessage()
                        .then(e => {
                            this.props.refreshPost()
                        })
                }}>Post Message</button></div>
        }
        return (
            <div>
            <div className='m-5 was-validated'>
                <h1>Login Form</h1>
                <div className='form-group ml-5 mr-5'>
                <label >Username: </label>
                <input type="text" name="username"
                        className="form-control "
                        value={this.state.credentials.username}
                        onChange={this.inputChanged} />
                
                </div>
                <div className='form-group ml-5 mr-5'>
                <label>Email:</label>
                <input type="email" name="email"
                        className="form-control" 
                        value={this.state.credentials.email}
                        onChange={this.inputChanged} />
                </div>
                <div className='form-group ml-5 mr-5'>
                <label>Password:</label>
                <input type="password" name="password"
                        className="form-control"
                        value={this.state.credentials.password}
                        onChange={this.inputChanged} />
                </div>
                
                <button className="btn btn-primary m-5" onClick={this.login}>Login</button>
                <button className="btn btn-primary m-5" onClick={this.register}>Register</button>
                </div>
                <div className='container'>{status}</div>
            </div>
        )
    }
}

export default Login;