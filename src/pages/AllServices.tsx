import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import ServiceCard from '@/components/ServiceCard';
// Assets
import webDevTeam from '@/assets/web-dev-team.jpg';
import mobileDev from '@/assets/mobile-dev.jpg';
import uiUxDesign from '@/assets/ui-ux-design.jpg';
import cloudSolutions from '@/assets/cloud-solutions.jpg';
import devops from '@/assets/devops.jpg';
import flowFunction from '@/assets/flow-function.jpg';
import backendDev from '@/assets/BackendServices.jpg';

const AllServices = () => {
  const services = [
    {
      title: 'Web Development',
      description: 'We design visually compelling, user-centric websites that blend creativity with functional brand from scratch.',
      image: webDevTeam,
      tags: ['React', 'Next.js', 'Net'],
      reverse: false,
      link: "/web-services"
    },
    {
      title: 'Mobile Development',
      description: 'Cross-platform mobile apps and responsive web applications that deliver exceptional user experiences.',
      image: mobileDev,
      tags: ['React', 'Flutter', 'iOS', 'Andriod'],
      reverse: true,
      link: "/app-services"
    },
    {
      title: 'UI UX Design',
      description: 'User-centered design solutions that combine aesthetics with functionality for optimal user engagement.',
      image: uiUxDesign,
      tags: ['Figma', 'Framer'],
      reverse: false,
      link: "/saas-services"
    },
    {
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and migration services on AWS, Azure, and Google Cloud Platform.',
      image: cloudSolutions,
      tags: ['AWS', 'Azure', 'GCP'],
      reverse: true,
      link: "/api-integration-services"
    },
    {
      title: 'Dev Ops and Automation',
      description: 'Streamline your development lifecycle with CI/CD pipelines and automated deployment strategies.',
      image: devops,
      tags: ['React', 'Flutter', 'K8s'],
      reverse: false,
      link: "/custom-software-services"
    },
    {
      title: 'Flow To Function',
      description: 'Extend your team with our skilled developers who integrate seamlessly with your existing workforce.',
      image: flowFunction,
      tags: ['Full Stack', 'Front End', 'Back End'],
      reverse: true,
      link: "/app-services"
    },
    {
      title: 'Backend Development',
      description: 'Scalable backend development with automated deployment strategies accourding to lastes world requriments.',
      image: backendDev,
      tags: ['Node.js', 'Django'],
      reverse: false,
      link: "/backend-services"
    }
  ];

  return (
    <div className="min-h-screen bg-[#000000]">

      <PageHeader
        title="Procedures"
        subtitle="Services"
        description="Ideas, stories, and strategies from the creative edge covering design, development, and the tools that bring bold digital work to life."
      />

      {/* Services List */}
      <motion.section
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }} className="py-20">
        <div className="section-container">
          <div className="divide-y divide-border">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                image={service.image}
                tags={service.tags}
                reverse={service.reverse}
                link={service.link}
              />
            ))}
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default AllServices;
