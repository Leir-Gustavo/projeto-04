import './styles.css';


function ConfirmModal({ open, handleClose, handleConfirm, title, subTitle, textBtnConfirm, textBtnCancel }) {
    return (
        <>
            {open &&
                <div className="backdrop">
                    <div className="modal">
                        <h1>{title}</h1>
                        <span>{subTitle}</span>
                        <div className="container-button">
                            <button className="btn-blue" onClick={handleConfirm}>{textBtnConfirm}</button>

                            <button
                                className="btn-red"
                                onClick={handleClose}
                            >{textBtnCancel}</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ConfirmModal;