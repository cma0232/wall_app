import React, { Component } from 'react';

class Post extends Component {

    state = {
        books: []
    }

    loadBooks = () => {
        fetch('http://127.0.0.1:8000/api/books/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${this.props.token}`
            },
            body: JSON.stringify(this.state.credentials)
        })
            .then(data => data.json())
            .then(
                data => {
                    this.setState({ books: data })
                }
            )
            .catch(error => console.error(error))
    }

    render() {
        return (
            <div>
            
            </div>
        );
    }
}

export default Post;