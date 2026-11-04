import ContactSection from "./components/contact-section";
import Footer from "./components/footer";
import HeroSection from "./components/hero-section";
import ProjectSection from "./components/project-section";
import TechStackSection from "./components/tech-stack-section";
import AboutMe from "./components/about-me";
import AgentPipelineSection from "./components/agent-pipeline-section";
import { AiChatWidget } from "@/components/ui/ai-chat-widget";
import ExperienceSection from "./components/experience-section";

export default function Home() {
 return (
  
   <div className="">
    <HeroSection/>
   <section id="about">
     <AboutMe/>
   </section>
   <section id="experience">
     <ExperienceSection/>
   </section>
   <AgentPipelineSection/>
   <section id="projects">
     <ProjectSection/>
   </section>
   <section id="skills">
     <TechStackSection/>
   </section>
   <section id="contact">
     <ContactSection/>
   </section>
   <Footer/>
   <AiChatWidget/>
   </div>
  
 );
}
