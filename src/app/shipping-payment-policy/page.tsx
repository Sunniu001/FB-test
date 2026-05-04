import React from 'react';
import styles from '@/styles/policy.module.css';

export const metadata = {
  title: 'Shipping & Payment Policy — FirstRoom',
  description: 'Learn about our shipping timelines, delivery process, and accepted payment methods.',
};

export default function ShippingPaymentPage() {
  return (
    <div className={styles.policyContainer}>
      <h1 className={styles.pageTitle}>Shipping & Payment Policy</h1>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Shipping</h2>
        <p className={styles.text}>
          We partner with trusted courier services to ensure safe and efficient delivery across India and internationally. Shipping timelines may vary by product and are available on the respective product pages.
        </p>
        <p className={styles.text}>
          Orders are dispatched on business days (Monday to Friday). Saturdays, Sundays, and public holidays are considered non-working days.
        </p>
        <p className={styles.text}>
          For orders placed during promotional periods or sales, please refer to our Sale Terms & Conditions below.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Tracking & Delivery</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>Once the order is shipped, the tracking number and shipping partner details will be shared via email.</li>
          <li className={styles.listItem}>Delivery will be attempted up to three (3) times. If unsuccessful due to negligence of the customer, the package will be returned, and refunds shall not be processed for such failed deliveries.</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Payment Methods</h2>
        <p className={styles.text}>We offer multiple payment options for a seamless checkout experience.</p>
        
        <div style={{ marginBottom: '20px' }}>
          <p style={{ fontWeight: 600, marginBottom: '8px' }}>For Domestic Orders (India):</p>
          <ul className={styles.list}>
            <li className={styles.listItem}>Debit & Credit Cards (Visa, Mastercard, American Express)</li>
            <li className={styles.listItem}>Net Banking</li>
            <li className={styles.listItem}>UPI & Digital Wallets</li>
          </ul>
        </div>

        <div>
          <p style={{ fontWeight: 600, marginBottom: '8px' }}>For International Orders:</p>
          <ul className={styles.list}>
            <li className={styles.listItem}>Credit Cards (Visa, Mastercard, American Express)</li>
            <li className={styles.listItem}>PayPal & PayU (third-party payment gateways)</li>
          </ul>
        </div>

        <p className={styles.text} style={{ marginTop: '16px', fontStyle: 'italic', fontSize: '0.95rem' }}>
          Note: As per RBI regulations, Indian debit/credit cards are not enabled for international transactions by default. Customers must activate international usage directly with their card issuer or mobile application.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Sale Terms & Conditions</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>Products purchased during a sale or with additional discounts are not eligible for return, refund, or exchange, except in cases of damage or confirmed design-related issues.</li>
          <li className={styles.listItem}>Once a sale period ends, products added to the cart or under discussion with our sales team shall not be eligible for sale pricing, unless an advance payment has already been made.</li>
        </ul>
      </div>

      <div className={styles.contactInfo}>
        <p className={styles.contactTitle}>For any queries related to shipping, delivery, or payments, please write to us at:</p>
        <p className={styles.text}>
          <strong>First Room Collective</strong><br />
          support@firstroom.in<br />
          +91 96507 06644
        </p>
      </div>
    </div>
  );
}
