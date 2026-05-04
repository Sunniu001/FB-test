import React from 'react';
import styles from '@/styles/policy.module.css';

export const metadata = {
  title: 'Return & Exchange Policy — FirstRoom',
  description: 'Review our policies on returns, exchanges, and replacements for custom wallpapers.',
};

export default function ReturnExchangePage() {
  return (
    <div className={styles.policyContainer}>
      <h1 className={styles.pageTitle}>Return & Exchange Policy</h1>

      <div className={styles.section}>
        <p className={styles.text}>
          At <strong>First Room Collective</strong>, we take great care to ensure that every wallpaper meets the highest standards of quality and craftsmanship. All our wallpapers are made to order and tailored specifically for your space, making each piece uniquely yours. Please review our return and exchange policy outlined below:
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Quality & Installation</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>Each wallpaper undergoes stringent quality checks before being carefully packed in durable tubes for secure delivery.</li>
          <li className={styles.listItem}>Our wallpapers require professional installation. While we can connect you to local installers in select cities, we do not take responsibility for any issues arising from installation or wall conditions.</li>
          <li className={styles.listItem}>We strongly recommend inspecting the wallpaper before installation. We are not liable for installation errors or any costs incurred through third-party services.</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Returns & Exchanges</h2>
        <p className={styles.text}>
          As our wallpapers are custom-made to specific dimensions, we do not accept returns or exchanges for the following reasons:
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>Change of mind</li>
          <li className={styles.listItem}>Incorrect measurements provided by the customer</li>
        </ul>
        <p className={styles.text}>However, if your order is defective or incorrect, we will address the issue as follows:</p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Damaged or Incorrect Orders</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>If you receive a damaged or incorrect product, please notify us within 2 working days of delivery by emailing us at <strong>support@firstroom.in</strong>.</li>
          <li className={styles.listItem}>Attach clear photographs of the product, including its packaging and the affected areas, to help us assess the issue.</li>
          <li className={styles.listItem}>Upon verification, we will arrange for a replacement at no additional cost. If a pickup is required, we will coordinate it depending on the serviceability of your location.</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Replacements</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>If a manufacturing defect is confirmed, a replacement will be dispatched on priority.</li>
          <li className={styles.listItem}>In cases where pickup or delivery service is limited, we will assist you in finding the most feasible resolution.</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Credit Note Option</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>If you prefer not to receive a replacement, a coupon code equivalent to the order value can be issued for use in future purchases on our website (valid for 1 year).</li>
          <li className={styles.listItem}>The value of your next order must be equal to or greater than the credit note amount. If the new order exceeds the credit note, the remaining balance shall be paid by the customer.</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Important Notes</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>Cancellations, refunds, and exchanges are not permitted for made-to-order wallpapers.</li>
          <li className={styles.listItem}>Products must be inspected before installation. We are not responsible for errors made during installation, installer charges, or issues arising from incorrect measurements.</li>
          <li className={styles.listItem}>If your area is not serviceable for pickup, we will guide you through the return and replacement process accordingly.</li>
        </ul>
      </div>

      <div className={styles.contactInfo}>
        <p className={styles.contactTitle}>For any concerns regarding your order, please reach out to us at:</p>
        <p className={styles.text}>
          <strong>support@firstroom.in</strong><br />
          Our team is happy to assist you!
        </p>
      </div>
    </div>
  );
}
