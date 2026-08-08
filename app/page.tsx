import { getPortfolioData } from "@/lib/github";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { ResumeSection } from "@/components/sections/Resume";
import { CertificationsSection } from "@/components/sections/Certifications";
import { ProjectsSection } from "@/components/sections/Projects";
import { TechStackSection } from "@/components/sections/TechStack";
import { ContributionsSection } from "@/components/sections/Contributions";
import { ContactSection } from "@/components/sections/Contact";
import { Marquee } from "@/components/ui/Marquee";

export default async function Home() {
  const data = await getPortfolioData();

  return (
    <>
      <Hero user={data.user} stats={data.stats} />
      <About user={data.user} stats={data.stats} languageStats={data.languageStats} />
      <ResumeSection />
      <CertificationsSection />
      <Marquee 
        text="SELECTED WORK" 
        speed={25} 
        direction="left" 
        textColor="var(--accent-primary)" 
      />
      <ProjectsSection pinnedRepos={data.pinnedRepos} totalRepos={data.user.public_repos} githubUrl={data.user.html_url} />
      <TechStackSection />
      <ContributionsSection username={data.user.login} />
      <Marquee 
        text="OPEN TO COLLABORATE" 
        speed={20} 
        direction="right" 
        textColor="var(--accent-secondary)" 
      />
      <ContactSection user={data.user} />
    </>
  );
}
