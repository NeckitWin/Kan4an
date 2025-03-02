import React, {ReactNode} from "react";
import ReactDOM from "react-dom";
import {useAppDispatch} from "../../app/hooks.ts";
import {closeModal} from "../../features/modalSlice.ts";

export interface ModalProps {
    isOpen: boolean;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({isOpen, children}) => {
    const dispatch = useAppDispatch();
    if (!isOpen) return null;
    const onClose = () => dispatch(closeModal());
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