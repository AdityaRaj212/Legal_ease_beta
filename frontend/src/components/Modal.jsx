import React from 'react';
import styles from './styles/Modal.module.css';

const Modal = ({ onClose, children }) => {
    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
