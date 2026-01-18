import jsPDF from 'jspdf';
import { personalInfo, projects, skills, experiences } from './data';

interface GenerateCVOptions {
    locale: 'en' | 'pt-BR';
}

export async function generateCV({ locale }: GenerateCVOptions): Promise<void> {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;

    let yPos = margin;

    // Cores
    const primaryColor: [number, number, number] = [0, 240, 255]; // Cyan
    const textColor: [number, number, number] = [40, 40, 50];
    const mutedColor: [number, number, number] = [120, 120, 130];

    // ============================================
    // HEADER
    // ============================================

    // Nome
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(28);
    pdf.setTextColor(...textColor);
    pdf.text(personalInfo.name, margin, yPos + 10);
    yPos += 15;

    // Título
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(14);
    pdf.setTextColor(...primaryColor);
    const title = locale === 'en' ? personalInfo.title.en : personalInfo.title.ptBR;
    pdf.text(title, margin, yPos + 5);
    yPos += 12;

    // Linha separadora
    pdf.setDrawColor(...primaryColor);
    pdf.setLineWidth(0.5);
    pdf.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 8;

    // Contato (uma linha)
    pdf.setFontSize(9);
    pdf.setTextColor(...mutedColor);
    const contactLine = `${personalInfo.email}  •  ${personalInfo.github}  •  ${personalInfo.location}`;
    pdf.text(contactLine, margin, yPos);
    yPos += 12;

    // ============================================
    // ABOUT
    // ============================================

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.setTextColor(...primaryColor);
    pdf.text(locale === 'en' ? 'ABOUT' : 'SOBRE', margin, yPos);
    yPos += 6;

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.setTextColor(...textColor);
    const bio = locale === 'en' ? personalInfo.bio.en : personalInfo.bio.ptBR;
    const bioLines = pdf.splitTextToSize(bio, contentWidth);
    pdf.text(bioLines, margin, yPos);
    yPos += bioLines.length * 5 + 8;

    // ============================================
    // SKILLS
    // ============================================

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.setTextColor(...primaryColor);
    pdf.text(locale === 'en' ? 'SKILLS' : 'HABILIDADES', margin, yPos);
    yPos += 6;

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    pdf.setTextColor(...textColor);

    const skillsByCategory = {
        frontend: skills.filter(s => s.category === 'frontend').map(s => s.name),
        backend: skills.filter(s => s.category === 'backend').map(s => s.name),
        ai: skills.filter(s => s.category === 'ai').map(s => s.name),
        tools: skills.filter(s => s.category === 'tools').map(s => s.name),
    };

    const categoryLabels = {
        frontend: { en: 'Frontend', pt: 'Frontend' },
        backend: { en: 'Backend', pt: 'Backend' },
        ai: { en: 'AI & ML', pt: 'IA & ML' },
        tools: { en: 'Tools', pt: 'Ferramentas' },
    };

    Object.entries(skillsByCategory).forEach(([category, skillList]) => {
        const label = locale === 'en'
            ? categoryLabels[category as keyof typeof categoryLabels].en
            : categoryLabels[category as keyof typeof categoryLabels].pt;

        pdf.setFont('helvetica', 'bold');
        pdf.text(`${label}: `, margin, yPos);
        const labelWidth = pdf.getTextWidth(`${label}: `);

        pdf.setFont('helvetica', 'normal');
        pdf.text(skillList.join(', '), margin + labelWidth, yPos);
        yPos += 5;
    });
    yPos += 6;

    // ============================================
    // EXPERIENCE
    // ============================================

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.setTextColor(...primaryColor);
    pdf.text(locale === 'en' ? 'EXPERIENCE' : 'EXPERIÊNCIA', margin, yPos);
    yPos += 6;

    experiences.forEach((exp) => {
        const role = locale === 'en' ? exp.role.en : exp.role.ptBR;
        const description = locale === 'en' ? exp.description.en : exp.description.ptBR;
        const endDate = exp.endDate || (locale === 'en' ? 'Present' : 'Presente');

        // Role & Company
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(10);
        pdf.setTextColor(...textColor);
        pdf.text(role, margin, yPos);
        yPos += 4;

        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(9);
        pdf.setTextColor(...mutedColor);
        pdf.text(`${exp.company} | ${exp.startDate} - ${endDate}`, margin, yPos);
        yPos += 5;

        pdf.setTextColor(...textColor);
        const descLines = pdf.splitTextToSize(description, contentWidth);
        pdf.text(descLines, margin, yPos);
        yPos += descLines.length * 4 + 4;

        // Technologies
        pdf.setFontSize(8);
        pdf.setTextColor(...mutedColor);
        pdf.text(exp.technologies.join(' • '), margin, yPos);
        yPos += 8;
    });

    // ============================================
    // PROJECTS
    // ============================================

    // Verificar se precisa de nova página
    if (yPos > pageHeight - 60) {
        pdf.addPage();
        yPos = margin;
    }

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.setTextColor(...primaryColor);
    pdf.text(locale === 'en' ? 'FEATURED PROJECTS' : 'PROJETOS EM DESTAQUE', margin, yPos);
    yPos += 6;

    const featuredProjects = projects.filter(p => p.featured);

    featuredProjects.forEach((project) => {
        const description = locale === 'en' ? project.description.en : project.description.ptBR;

        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(10);
        pdf.setTextColor(...textColor);
        pdf.text(project.name, margin, yPos);

        if (project.isPrivate) {
            pdf.setFontSize(8);
            pdf.setTextColor(...mutedColor);
            pdf.text(` (${locale === 'en' ? 'Private' : 'Privado'})`, margin + pdf.getTextWidth(project.name), yPos);
        }
        yPos += 4;

        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(9);
        pdf.setTextColor(...textColor);
        const descLines = pdf.splitTextToSize(description, contentWidth);
        pdf.text(descLines, margin, yPos);
        yPos += descLines.length * 4 + 2;

        pdf.setFontSize(8);
        pdf.setTextColor(...mutedColor);
        pdf.text(project.technologies.join(' • '), margin, yPos);
        yPos += 7;

        // Verificar se precisa de nova página
        if (yPos > pageHeight - 30) {
            pdf.addPage();
            yPos = margin;
        }
    });

    // ============================================
    // FOOTER
    // ============================================

    pdf.setFontSize(8);
    pdf.setTextColor(...mutedColor);
    const footerText = locale === 'en'
        ? 'Generated from davidassef.me'
        : 'Gerado em davidassef.me';
    pdf.text(footerText, pageWidth / 2, pageHeight - 10, { align: 'center' });

    // Download
    const filename = locale === 'en'
        ? 'David_Assef_Resume.pdf'
        : 'David_Assef_Curriculo.pdf';
    pdf.save(filename);
}
