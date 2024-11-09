import React, { useState } from 'react';
import styles from './styles/LegalResources.module.css';
import Greeting from '../components/Greeting';

const LegalResourcesPage = () => {
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
        }
      ]
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredResources = resources
    .filter((resource) =>
      selectedCategory === 'All' || resource.category === selectedCategory
    )
    .map((resource) => ({
      ...resource,
      items: resource.items.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((resource) => resource.items.length > 0);

  return (
    <div className={styles.legalResourcesPage}>
      <Greeting />
      <h1 className={styles.title}>Explore Legal Resources</h1>
      <p className={styles.subtitle}>A collection of essential legal documents and official government resources for Indian law.</p>

      <div className={styles.controls}>
        <input
          type="text"
          className={styles.searchBar}
          placeholder="Search legal resources..."
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <div className={styles.categoryFilters}>
          {['All', 'Constitution of India', 'Indian Penal Code (IPC)', 'Legal Aid and Support'].map((category) => (
            <button
              key={category}
              className={`${styles.categoryButton} ${selectedCategory === category ? styles.active : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {filteredResources.map((resource, index) => (
        <div key={index} className={styles.resourceCategory}>
          <h2 className={styles.categoryTitle}>{resource.category}</h2>
          <div className={styles.linksContainer}>
            {resource.items.map((item, i) => (
              <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className={styles.linkCard}>
                <h3 className={styles.linkTitle}>{item.title}</h3>
                <p className={styles.linkDescription}>{item.description}</p>
              </a>
            ))}
          </div>
        </div>
      ))}
      <button className={styles.returnButton} onClick={() => window.history.back()}>Return to Home</button>
    </div>
  );
};

export default LegalResourcesPage;
