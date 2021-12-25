import React from 'react';

export default function Wall(props) {
    const message = props.message

    return (
        <div>
            <table className='table'>
                <thead>
                    <tr className='lead font-weight-bolder'>WALL</tr>
                </thead>
                <tbody>
                    
                {message ?
                    message.map(e => {
                        return (
                            <tr>
                            <td key={e.id}>
                                {e.message}
                            </td></tr>
                        )
                    })
                    : null}
                    
                </tbody>
            </table>
        </div>
    )
}