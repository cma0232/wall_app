import React, { useState, useEffect } from 'react';

export default function Wall(props) {
    const message = props.message



    console.log(message)

    return (
        <div>
            <div>
                {message ?
                    message.map(e => {
                        return (
                            <div key={e.id}>
                                {e.message}
                            </div>
                        )
                    })
                    : null}
            </div>
        </div>
    )
}