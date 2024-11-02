import React from 'react';
import styles from './styles/Loading.module.css'; // Import the CSS module for styling

const Loading = () => {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.loadingContent}>
                <div className={styles.logo}>Legal Ease</div>
                <div className={styles.loader}>
                    <div className={styles.circle}></div>
                    <div className={styles.circle}></div>
                    <div className={styles.circle}></div>
                </div>
                <p className={styles.loadingText}>Loading, please wait...</p>
            </div>
        </div>
    );
};

export default Loading;
