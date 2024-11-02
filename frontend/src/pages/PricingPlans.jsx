import React from 'react';
import styles from './styles/PricingPlans.module.css'; // Importing modular CSS
import { CheckCircle, Cancel, Star } from '@mui/icons-material'; // Icons for features
import Greeting from '../components/Greeting';

const PricingPlans = () => {
  return (
    <div className={styles.pricingPage}>
      <Greeting />
      <h1 className={styles.title}>Choose Your Plan</h1>
      <p className={styles.subtitle}>Find the best plan that suits your legal needs</p>
      <div className={styles.plansContainer}>
        {/* Basic Plan */}
        <div className={styles.planCard}>
          <h2 className={styles.planTitle}>Basic</h2>
          <p className={styles.price}>Free</p>
          <ul className={styles.featuresList}>
            <li><CheckCircle className={styles.icon}/> 5 free chats per day</li>
            {/* <li><CheckCircle className={styles.icon}/> Unlimited chat support</li> */}
            <li><Cancel className={styles.iconDisabled}/> Similar case judgments</li>
            <li><Cancel className={styles.iconDisabled}/> Lawyer suggestion</li>
          </ul>
          <button className={styles.selectButton}>Select Plan</button>
        </div>

        {/* Silver Plan */}
        <div className={`${styles.planCard} ${styles.popularPlan}`}>
          <h2 className={styles.planTitle}>Silver <span className={styles.popularBadge}>Popular</span></h2>
          <p className={styles.price}>Rs 30/month</p>
          <ul className={styles.featuresList}>
            <li><CheckCircle className={styles.icon}/> 50 chats per day</li>
            {/* <li><CheckCircle className={styles.icon}/> Unlimited chat support</li> */}
            <li><CheckCircle className={styles.icon}/> Similar case judgments</li>
            <li><Cancel className={styles.iconDisabled}/> Lawyer suggestion</li>
          </ul>
          <button className={styles.selectButton}>Select Plan</button>
        </div>

        {/* Gold Plan */}
        <div className={styles.planCard}>
          <h2 className={styles.planTitle}>Gold <Star className={styles.goldStar}/></h2>
          <p className={styles.price}>Rs 50/month</p>
          <ul className={styles.featuresList}>
            <li><CheckCircle className={styles.icon}/> Unlimited chat support</li>
            <li><CheckCircle className={styles.icon}/> Similar case judgments</li>
            <li><CheckCircle className={styles.icon}/> Lawyer suggestion</li>
          </ul>
          <button className={styles.selectButton}>Select Plan</button>
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
