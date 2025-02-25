import React, {ReactNode} from "react";
import ReactDOM from "react-dom";

interface ModalProps {
    isOpen: boolean;
    onClose: ()=>void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({isOpen, onClose, children}) => {
    if (!isOpen) return null;
    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xl ">
            <div className="bg-secondaryBack p-6 rounded-lg shadow-lg relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-textPrimary text-xl cursor-pointer">
                    ✖
                </button>
                {children}
            </div>
        </div>,
        document.body
    )
}

export default Modal;