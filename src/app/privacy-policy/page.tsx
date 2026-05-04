import React from 'react';
import styles from '@/styles/policy.module.css';

export const metadata = {
  title: 'Privacy Policy — FirstRoom',
  description: 'Understand how we collect, use, and safeguard your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className={styles.policyContainer}>
      <h1 className={styles.pageTitle}>Privacy Policy</h1>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>User Information and Privacy</h2>
        <p className={styles.text}>
          First Room Collective (“we,” “us,” or “our”) is committed to protecting the privacy and security of the information you share with us. We implement strict protocols to maintain the confidentiality, integrity, and security of all data stored on our systems. Only authorized employees who require access to your information to perform their duties are granted such access. Any violation of our privacy and security policies may result in disciplinary action, including termination and potential legal proceedings.
        </p>
        <p className={styles.text}>
          This Privacy Policy outlines how we collect, use, and safeguard your personal information when you visit <strong>www.firstroom.in</strong> (the “Website”). By using the Website or submitting personal information, you consent to the collection and use of information in accordance with this policy. We encourage you to review this policy periodically for updates.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Collection of Information</h2>
        <p className={styles.text}>
          First Room Collective collects, processes, and retains information about you when you visit our Website. You must provide personal information such as your name, email address, phone number, and address to access content, make purchases, or communicate with us.
        </p>
        <p className={styles.text}>Personal Information may include, but is not limited to:</p>
        <ul className={styles.list}>
          <li className={styles.listItem}>Full name</li>
          <li className={styles.listItem}>Email address</li>
          <li className={styles.listItem}>Phone number</li>
          <li className={styles.listItem}>Country, city, and state</li>
          <li className={styles.listItem}>Billing and shipping addresses (for purchases)</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Use of Information</h2>
        <p className={styles.text}>We collect personal information for the following purposes:</p>
        <ul className={styles.list}>
          <li className={styles.listItem}>To process transactions and deliver products or services</li>
          <li className={styles.listItem}>To improve our Website, products, and overall customer experience</li>
          <li className={styles.listItem}>To communicate with you regarding orders, inquiries, and updates</li>
          <li className={styles.listItem}>To send marketing and promotional communications (with your consent)</li>
          <li className={styles.listItem}>To comply with applicable legal and regulatory requirements</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Consent</h2>
        <p className={styles.text}>
          By providing your personal information, you consent to its collection and use for the purposes listed above. If we request your information for secondary purposes (e.g., marketing), we will seek your explicit consent in advance.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Withdrawing Consent</h2>
        <p className={styles.text}>
          If you do not wish to receive it after opting in, you may withdraw your consent at any time by contacting us at <strong>support@thefirstroom.in</strong>. Once your request is received, your information will not be used for marketing purposes.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Disclosure of Information</h2>
        <p className={styles.text}>
          We may disclose your personal information if required by law or if you violate our Terms of Service. Additionally, in the event of a merger, acquisition, or sale of assets, your information may be transferred to the new entity.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Payment Security</h2>
        <p className={styles.text}>
          We use secure Internet Payment Gateway (IPG) services to process all transactions. First Room Collective does not store your card details. Payment information is encrypted and processed through PCI-DSS-compliant gateways to ensure secure transactions.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Third-Party Services</h2>
        <p className={styles.text}>
          We may use third-party service providers for functions such as payment processing and order fulfillment. These providers may collect, use, or disclose your information only as necessary to perform their services. We encourage you to review their privacy policies, as once you leave our Website or engage with a third-party service, First Room Collective is not liable to your data.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Official Order Channels</h2>
        <p className={styles.text}>
          First Room Collective is not liable for any payments or transactions made through platforms or contacts other than our official website <strong>www.firstroom.in</strong> or the verified mobile number listed on the website. We strongly advise customers to place orders only through these authorized channels to ensure authenticity and secure service.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Security Measures</h2>
        <p className={styles.text}>
          We use industry-standard security protocols to prevent unauthorized access, misuse, or loss of your personal information. While we take reasonable precautions, no method of transmission over the Internet is 100% secure.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Cookies</h2>
        <p className={styles.text}>
          Our Website uses cookies to enhance your browsing experience and maintain session information. Cookies do not personally identify you on other websites and are used solely for technical and analytical purposes.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Age of Consent</h2>
        <p className={styles.text}>
          By using this Website, you confirm that you are of the age of majority in your jurisdiction or that you have obtained parental or guardian consent to use our services.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Changes to This Privacy Policy</h2>
        <p className={styles.text}>
          We reserve the right to update or modify this Privacy Policy at any time. Any changes will take effect immediately upon being posted on the Website. We encourage you to revisit this policy regularly to stay informed on how we protect your personal data.
        </p>
      </div>

      <div className={styles.contactInfo}>
        <p className={styles.contactTitle}>Contact Information</p>
        <p className={styles.text}>
          If you have any questions about this Privacy Policy or if you wish to access, correct, amend, or delete any personal information we have about you, please contact us at:<br />
          <strong>support@firstroom.in</strong>
        </p>
      </div>
    </div>
  );
}
