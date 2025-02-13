import { Meta } from '../../components/SEO/Meta'
import { Layout } from '../../components/Layout'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Text } from '../../components/ui/base'
import { GithubIcon, LinkedinIcon } from 'lucide-react'
import { useRef } from 'react'
import { toast } from 'react-hot-toast'
import { useTheme } from 'next-themes'

const experiences = [
  {
    title: "Software Engineer",
    company: "Current Position",
    period: "July 2022 - Present",
    description: [
      "Starknet Remix Plugin development",
      "Cairo development and feasibility research",
      "Cross-team collaboration on Solidity contracts and best practices",
      "Pipeline implementations and Rust programming",
      "Contributing to blockchain infrastructure and developer tools"
    ]
  },
  {
    title: "Software Developer (Freelance)",
    company: "Self-employed",
    period: "Sep 2017 - Present",
    description: [
      "Won Fair Data Society Gitcoin hackathon with Wikipedia to Swarm uploader",
      "Development with Node.js/Nest (Rest and GraphQL APIs)",
      "Full-stack development with PostgreSQL and React/Next.js in TypeScript",
      "Conducted Solidity workshops and software development fundamentals training"
    ]
  },
  {
    title: "Software Developer",
    company: "WalletConnect",
    period: "May 2021 - Oct 2021",
    description: [
      "Built service for API creation and delivery using PostgreSQL and Next.js",
      "Developed registry for service data storage and exposure",
      "Contributed to Wallet Connect 2.0 examples and documentation",
      "Created libraries for Supabase-React interaction using SWR"
    ]
  },
  {
    title: "Software Developer",
    company: "First Factory",
    period: "Nov 2019 - Apr 2021",
    description: [
      "Led financial sector projects for customer account management",
      "Implemented data visualization solutions with Nest.js and React",
      "Mentored junior developers and conducted technical interviews",
      "Developed internal tooling for employee data management"
    ]
  },
  {
    title: "Software Developer",
    company: "Accenture",
    period: "Jan 2019 - Nov 2019",
    description: [
      "Led development of internal social network from inception",
      "Managed developer team and technical decisions",
      "Implemented solutions using TypeScript (React and Node) and Drupal"
    ]
  },
  {
    title: "Software Developer",
    company: "Estudio Manati",
    period: "Aug 2015 - Sep 2017",
    description: [
      "Full-stack development with JavaScript/TypeScript, React, and PHP",
      "Worked with diverse tech stack including Drupal, MySQL, and Docker",
      "Collaborated in agile teams for remote and local projects"
    ]
  }
]

const skills = {
  "Programming Languages": [
    "TypeScript", "JavaScript", "Solidity", "Cairo", "Rust", "PHP"
  ],
  "Frameworks & Libraries": [
    "React", "Next.js", "Node.js", "Nest.js", "GraphQL", "TypeORM"
  ],
  "Infrastructure & Tools": [
    "PostgreSQL", "MySQL", "AWS", "Docker", "Git", "Supabase"
  ],
  "Blockchain & Web3": [
    "Smart Contracts", "Starknet", "Web3.js", "Ethereum", "Swarm"
  ]
}

const education = [
  {
    degree: "Computer Science",
    institution: "UCR - Costa Rica",
    period: "2015",
    details: "Focus on software development fundamentals"
  },
  {
    degree: "Physics",
    institution: "UCR - Costa Rica",
    period: "2012-2015",
    details: "Foundation in analytical thinking and problem-solving"
  }
]

export default function Resume() {
  const resumeRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  const generatePDF = async () => {
    if (!resumeRef.current || typeof window === 'undefined') return

    try {
      // Show loading state
      const loadingToast = toast.loading('Generating PDF...')

      // Dynamically import libraries only when needed
      const [jsPDF, html2canvas] = await Promise.all([
        import('jspdf'),
        import('html2canvas')
      ])

      // Add PDF-specific styles temporarily
      const pdfStyles = document.createElement('style')
      const isDarkMode = theme === 'dark'
      
      pdfStyles.innerHTML = `
        .pdf-content {
          background: ${isDarkMode ? '#1a1b1e' : 'white'} !important;
          color: ${isDarkMode ? '#e4e5e7' : 'black'} !important;
          padding: 40px !important;
          max-width: 800px !important;
          margin: 0 auto !important;
        }
        .pdf-content * {
          color: ${isDarkMode ? '#e4e5e7' : 'black'} !important;
        }
        .pdf-content h1, .pdf-content h2, .pdf-content h3 {
          color: ${isDarkMode ? '#ffffff' : 'black'} !important;
          margin-bottom: 0.75em !important;
          font-weight: 600 !important;
        }
        .pdf-content .text-muted-foreground {
          color: ${isDarkMode ? '#a1a1aa' : '#4B5563'} !important;
        }
        .pdf-content .card {
          background: ${isDarkMode ? '#27272a' : 'white'} !important;
          border: 1px solid ${isDarkMode ? '#3f3f46' : '#E5E7EB'} !important;
          margin-bottom: 1.5em !important;
          page-break-inside: avoid !important;
          padding: 1.5rem !important;
          border-radius: 8px !important;
        }
        .pdf-content section {
          page-break-inside: avoid !important;
          margin-bottom: 2.5em !important;
        }
        .pdf-content .skill-tag {
          background: ${isDarkMode ? '#3f3f46' : '#F3F4F6'} !important;
          color: ${isDarkMode ? '#e4e5e7' : '#111827'} !important;
          border: 1px solid ${isDarkMode ? '#52525b' : '#E5E7EB'} !important;
          padding: 0.25rem 0.75rem !important;
          border-radius: 9999px !important;
          display: inline-block !important;
          margin: 0.25rem !important;
        }
        .pdf-content .header-info {
          text-align: center !important;
          margin-bottom: 2em !important;
        }
        .pdf-content .header-info h1 {
          font-size: 2em !important;
          margin-bottom: 0.5em !important;
        }
        .pdf-content .header-info .contact {
          margin-top: 1em !important;
          font-size: 0.9em !important;
        }
        .pdf-content ul {
          margin-left: 1.5em !important;
        }
        .pdf-content li {
          margin-bottom: 0.5em !important;
          line-height: 1.5 !important;
        }
      `
      document.head.appendChild(pdfStyles)

      // Add PDF class to content
      resumeRef.current.classList.add('pdf-content')

      // Create canvas with better quality settings
      const canvas = await html2canvas.default(resumeRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: isDarkMode ? '#1a1b1e' : '#ffffff',
        windowWidth: resumeRef.current.scrollWidth,
        windowHeight: resumeRef.current.scrollHeight,
      })

      // Initialize PDF with proper dimensions
      const pdf = new jsPDF.default({
        format: 'a4',
        unit: 'px',
        hotfixes: ['px_scaling']
      })

      // Calculate dimensions maintaining aspect ratio
      const imgWidth = 595 // A4 width in pixels at 72 DPI
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      const pageHeight = 842 // A4 height in pixels at 72 DPI
      let heightLeft = imgHeight
      let position = 0

      // Add first page
      pdf.addImage(
        canvas.toDataURL('image/png', 1.0),
        'PNG',
        0,
        position,
        imgWidth,
        imgHeight,
        '',
        'FAST'
      )
      heightLeft -= pageHeight

      // Add subsequent pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(
          canvas.toDataURL('image/png', 1.0),
          'PNG',
          0,
          position,
          imgWidth,
          imgHeight,
          '',
          'FAST'
        )
        heightLeft -= pageHeight
      }

      // Save the PDF
      pdf.save('edgar-barrantes-resume.pdf')
      
      // Cleanup PDF-specific styles
      document.head.removeChild(pdfStyles)
      resumeRef.current.classList.remove('pdf-content')
      
      // Hide loading state and show success
      toast.dismiss(loadingToast)
      toast.success('PDF generated successfully!')
    } catch (error) {
      console.error('Error generating PDF:', error)
      toast.error('Failed to generate PDF. Please try again.')
    }
  }

  return (
    <>
      <Meta
        title="Edgar Barrantes - Resume"
        description="Software engineer, specializing in blockchain development, distributed systems, and full-stack web applications."
      />
      <Layout>
        <div className="space-y-8 max-w-4xl mx-auto">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Text variant="h1">Resume</Text>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" asChild>
                  <a href="https://github.com/edgarbarrantes" target="_blank" rel="noopener noreferrer">
                    <GithubIcon className="w-4 h-4 mr-2" />
                    GitHub
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://linkedin.com/in/edgarbarrantes" target="_blank" rel="noopener noreferrer">
                    <LinkedinIcon className="w-4 h-4 mr-2" />
                    LinkedIn
                  </a>
                </Button>
              </div>
            </div>
            <Text variant="subtle" className="text-lg">
              Problem solver and self-taught software engineer. 
              Specializing in blockchain development, distributed systems, and full-stack web applications.
              Passionate about decentralized systems and thoughtful debates.
            </Text>
          </div>

          {/* Resume content wrapper for PDF generation */}
          <div ref={resumeRef} className="space-y-8">
            {/* Header Info (only visible in PDF) */}
            <div className="header-info">
              <Text variant="h1">Edgar Barrantes</Text>
              <Text variant="subtle">Software Engineer</Text>
              <div className="contact">
                <p>edgar@barrantes.dev • github.com/edgarbarrantes • linkedin.com/in/edgarbarrantes</p>
              </div>
            </div>

            {/* Experience */}
            <section className="space-y-4">
              <Text variant="h2">Experience</Text>
              <div className="grid gap-4">
                {experiences.map((exp, index) => (
                  <Card key={index} className="p-6 card">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <Text variant="h3">{exp.title}</Text>
                          <Text variant="subtle">{exp.company}</Text>
                        </div>
                        <Text variant="subtle" className="text-sm">{exp.period}</Text>
                      </div>
                      <ul className="list-disc list-inside space-y-1">
                        {exp.description.map((item, i) => (
                          <li key={i} className="text-muted-foreground">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Skills */}
            <section className="space-y-4">
              <Text variant="h2">Skills</Text>
              <Card className="p-6 card">
                <div className="grid md:grid-cols-2 gap-6">
                  {Object.entries(skills).map(([category, items]) => (
                    <div key={category} className="space-y-2">
                      <Text variant="h3" className="text-lg">{category}</Text>
                      <div className="flex flex-wrap gap-2">
                        {items.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm skill-tag"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </section>

            {/* Education */}
            <section className="space-y-4">
              <Text variant="h2">Education</Text>
              <Card className="p-6 card">
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <div key={index} className="flex justify-between items-start">
                      <div>
                        <Text variant="h3">{edu.degree}</Text>
                        <Text variant="subtle">{edu.institution}</Text>
                        <Text variant="subtle" className="text-sm">{edu.details}</Text>
                      </div>
                      <Text variant="subtle" className="text-sm">{edu.period}</Text>
                    </div>
                  ))}
                </div>
              </Card>
            </section>
          </div>
        </div>
      </Layout>
    </>
  )
} 