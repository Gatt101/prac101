import ContactSection from "./components/contact-section";
import Footer from "./components/footer";
import HeroSection from "./components/hero-section";
import ProjectSection from "./components/project-section";
import TechStackSection from "./components/tech-stack-section";

export default function Home() {
 return (
  
   <div className="">
    <HeroSection/>
   <ProjectSection/>
   <TechStackSection />
   <ContactSection/>
   <Footer/>
   </div>
  
 );
}
