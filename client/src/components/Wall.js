import React from 'react';

export default function Wall(props) {
    const message = props.message

    return (
        <div>
            
                <h3 className='lead font-weight-bolder'>WALL</h3>

                {message ?
                    message.map(e => {
                        return (
                            <div key={e.id}>{e.message}<hr className="mt-2 mb-3" /></div>
                        )
                    })
                    : null}

        </div>
    )
}