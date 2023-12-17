import React from 'react'
// No Need this component
function InfoEdit(props) {
    const { setEdit } = props;
    return (
        <>
            <div className="modal" onClick={() => setEdit(prev => !prev)}>
                <input type="checkbox" id="my-modal" className="modal-toggle" />
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Congratulations random Internet user!</h3>
                    <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
                    <div className="modal-action">
                        <label htmlFor="my-modal" className="btn">Yay!</label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InfoEdit
