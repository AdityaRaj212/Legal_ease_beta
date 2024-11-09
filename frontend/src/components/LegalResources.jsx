import React from 'react';
import styles from './styles/LegalResources.module.css';

const LegalResources = () => {
  const resources = [
    {
      category: "Constitution of India",
      items: [
        {
          title: "The Constitution of India",
          link: "https://legislative.gov.in/constitution-of-india",
          description: "The supreme law of India, laying down the fundamental framework for governance and citizens' rights."
        },
        {
          title: "Indian Law Ministry - Constitution",
          link: "https://lawmin.gov.in/constitution-of-india",
          description: "Official government site with updated information and amendments to the Indian Constitution."
        }
      ]
    },
    {
      category: "Indian Penal Code (IPC)",
      items: [
        {
          title: "The Indian Penal Code",
          link: "https://indiacode.nic.in/handle/123456789/2263?view_type=browse&sam_handle=123456789/1362",
          description: "Defines criminal offenses and prescribes punishments in India. Essential reading for understanding criminal law."
        },
        {
          title: "National Crime Records Bureau (NCRB)",
          link: "https://ncrb.gov.in/",
          description: "Crime statistics and information related to IPC sections and their applications across India."
        }
      ]
    },
    {
      category: "Legal Aid and Support",
      items: [
        {
          title: "National Legal Services Authority (NALSA)",
          link: "https://nalsa.gov.in/",
          description: "Provides free legal aid and advice to eligible citizens. Learn about schemes for legal assistance."
        },
        {
          title: "Supreme Court of India",
          link: "https://main.sci.gov.in/",
          description: "Official website of the Supreme Court of India with judgments, case status, and general legal information."
        },
        {
          title: "High Courts in India",
          link: "https://doj.gov.in/",
          description: "Access links to all High Courts in India, with case status updates and court judgments."
        }
      ]
    },
    {
      category: "Law and Order",
      items: [
        {
          title: "Ministry of Law and Justice",
          link: "https://lawmin.gov.in/",
          description: "Central authority for lawmaking and amendments in India. Find legal news, recent bills, and official announcements."
        },
        {
          title: "Department of Justice",
          link: "https://doj.gov.in/",
          description: "Information on the justice delivery system, including infrastructure and judicial reforms."
        }
      ]
    }
  ];

  return (
    <section className={styles.legalResources}>
      <h2 className={styles.title}>Legal Resources and Official Links</h2>
      <p className={styles.subtitle}>Access essential legal documents and official government resources for Indian law.</p>
      
      {resources.map((resource, index) => (
        <div key={index} className={styles.resourceCategory}>
          <h3 className={styles.categoryTitle}>{resource.category}</h3>
          <div className={styles.linksContainer}>
            {resource.items.map((item, i) => (
              <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className={styles.linkCard}>
                <h4 className={styles.linkTitle}>{item.title}</h4>
                <p className={styles.linkDescription}>{item.description}</p>
              </a>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default LegalResources;
