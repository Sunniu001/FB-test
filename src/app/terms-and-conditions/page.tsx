import React from 'react';
import styles from '@/styles/policy.module.css';

export const metadata = {
  title: 'Terms and Conditions — FirstRoom',
  description: 'Read our general terms and conditions for using our website and services.',
};

export default function TermsPage() {
  return (
    <div className={styles.policyContainer}>
      <h1 className={styles.pageTitle}>Terms and Conditions</h1>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>1. General Terms</h2>
        <p className={styles.text}>
          This website is operated by <strong>First Room Collective</strong>. Throughout the site, the terms “we,” “us,” and “our” refer to First Room Collective. By accessing or using any part of our website, you agree to be bound by these terms and conditions (“Terms”). If you do not agree with these Terms, you may refrain using our website or services.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>2. Order Process</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>Customers must provide complete details of the wallpaper they wish to order, including dimensions and any customization requests.</li>
          <li className={styles.listItem}>Upon submitting an order, a proof image and a quote will be provided within 2–4 business days (excluding weekends and public holidays).</li>
          <li className={styles.listItem}>Orders will only be processed after payment has been confirmed.</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>3. Payment</h2>
        <p className={styles.text}>We accept the following payment methods:</p>
        <ul className={styles.list}>
          <li className={styles.listItem}>Credit or Debit Cards</li>
          <li className={styles.listItem}>Wallets</li>
          <li className={styles.listItem}>Net Banking</li>
          <li className={styles.listItem}>UPI</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>4. Cancellation and Refund Policy</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>No refunds shall be issued for customized products (e.g., custom-sized murals or bespoke designs).</li>
          <li className={styles.listItem}>Any defects caused by First Room Collective will be addressed through a replacement, provided the issue is reported within 2 days of delivery, along with proof of delivery and supporting images.</li>
          <li className={styles.listItem}>If an item is damaged during transit, a replacement will be issued after verification.</li>
          <li className={styles.listItem}>We recommend customers record a video while unboxing the product to help resolve any issues related to delivery or packaging damage.</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>5. Production and Delivery</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>Orders will be delivered within approximately 15 days from payment confirmation.</li>
          <li className={styles.listItem}>We use third-party courier services and are not liable for delays caused by shipping partners.</li>
          <li className={styles.listItem}>If a package is not received, no refund will be processed.</li>
          <li className={styles.listItem}>Customers are responsible for any customs duties or taxes applicable in their respective countries.</li>
          <li className={styles.listItem}>Shipping charges are non-refundable.</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>6. Quality and Inspection</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>Customers should inspect products before installation and report any visible defects prior to use.</li>
          <li className={styles.listItem}>First Room Collective shall not be liable for damage due to wall damage, seepage, chemical exposure, or other external factors post-installation.</li>
          <li className={styles.listItem}>Minor color variations may occur between digital displays and physical products. We recommend ordering printed samples for accurate color matching.</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>7. Installation</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>We supply wallpapers only and do not offer installation services in all locations, (i.e either within India or internationally.)</li>
          <li className={styles.listItem}>We may provide references for independent local installers (in select cities) upon request, but First Room Collective is not responsible for their workmanship.</li>
          <li className={styles.listItem}>Installation charges are non-refundable under any circumstances.</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>8. Accuracy of Information</h2>
        <p className={styles.text}>
          While we strive to ensure accuracy, we do not guarantee that all content on the website is complete, error-free, or up to date. We reserve the right to change or update product details, pricing, and availability without prior notice.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>9. Intellectual Property</h2>
        <p className={styles.text}>
          All content, designs, images, and text on this website are the intellectual property of First Room Collective. Any unauthorized reproduction, distribution, or use of our content is strictly prohibited.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>10. Limitation of Liability</h2>
        <p className={styles.text}>
          First Room Collective shall not be held liable for indirect, incidental, or consequential damages resulting from the use of our products or services. Our liability shall be limited to the extent permitted by applicable law.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>11. Governing Law</h2>
        <p className={styles.text}>
          These Terms shall be governed by and interpreted in accordance with the applicable law in India. Any disputes arising from these Terms shall be subject to arbitration in Gurgaon, India.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>12. Changes to Terms and Conditions</h2>
        <p className={styles.text}>
          We reserve the right to update, modify, or replace any part of these Terms at any time. It is your responsibility to review this page periodically. Continued use of our website following changes constitutes your deemed acceptance of the revised Terms.
        </p>
      </div>

      <div className={styles.contactInfo}>
        <p className={styles.contactTitle}>For any inquiries regarding these Terms, please contact us at:</p>
        <p className={styles.text}>
          <strong>First Room Collective</strong><br />
          support@firstroom.in<br />
          +91 96507 06644
        </p>
      </div>
    </div>
  );
}
