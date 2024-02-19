const Modal = ({children}) => {
    return ( 
        <div className="modal-container">
            <div className="modalBlurBg"></div>
            <div className="modal">
                {children}
            </div>
        </div>
     );
}
export default Modal;