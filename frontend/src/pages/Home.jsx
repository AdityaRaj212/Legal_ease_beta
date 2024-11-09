import HeroSection from './../components/HeroSection';
import FeaturesSection from './../components/FeaturesSection';
import ContactForm from './../components/ContactForm';
import DescriptionSection from './../components/DescriptionSection';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import Greeting from '../components/Greeting';
import Chatbot from '../components/Chatbot';
import UserReviews from '../components/UserReviews';
import LegalResources from '../components/LegalResources';
import styles from './styles/Home.module.css';
import ChatbotPrompt from '../components/ChatbotPrompt';

const Home = () => {
    const {user, loading} = useAuth();
    const navigate = useNavigate();

    const scrollToFeatures = () => {
        const featuresSection = document.getElementById('features-section');
        if (featuresSection) {
          featuresSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if(loading) return (<Loading/>);

    if(!user){
        navigate('/login');
    }

    return (
        <div className={styles.container}>
            <Greeting />
            <HeroSection scrollToFeatures={scrollToFeatures} />
            <FeaturesSection id="features-section" />
            <DescriptionSection />
            <UserReviews />
            <ContactForm />
            <Chatbot/>
            <ChatbotPrompt />
        </div>
    )
}

export default Home;