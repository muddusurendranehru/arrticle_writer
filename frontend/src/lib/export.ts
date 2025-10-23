import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import toast from 'react-hot-toast';

/**
 * Export content to PDF using browser print
 */
export const exportToPDF = () => {
  try {
    // Get the content from the editor
    const content = document.querySelector('textarea')?.value || '';
    
    if (!content) {
      toast.error('No content to export');
      return;
    }

    // Create a new window with formatted content
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast.error('Please allow popups to export PDF');
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Scientific Article Export</title>
          <style>
            body {
              font-family: 'Times New Roman', Times, serif;
              font-size: 12pt;
              line-height: 1.6;
              margin: 2cm;
              color: #000;
            }
            h1 {
              font-size: 16pt;
              font-weight: bold;
              margin-bottom: 1em;
              text-align: center;
            }
            p {
              margin-bottom: 1em;
              text-align: justify;
            }
            .citation {
              margin-left: 2em;
              font-size: 11pt;
            }
          </style>
        </head>
        <body>
          <h1>Scientific Article</h1>
          <div>${content.split('\n').map(para => `<p>${para}</p>`).join('')}</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();

    // Wait for content to load, then print
    setTimeout(() => {
      printWindow.print();
      toast.success('PDF export initiated. Use Print dialog to save as PDF.');
    }, 250);
  } catch (error) {
    console.error('PDF export error:', error);
    toast.error('Failed to export PDF');
  }
};

/**
 * Export content to DOCX using docx library
 */
export const exportToDOCX = async () => {
  try {
    // Get content from the right panel (rewritten content)
    const textareas = document.querySelectorAll('textarea');
    const content = textareas[1]?.value || textareas[0]?.value || '';
    
    if (!content) {
      toast.error('No content to export');
      return;
    }

    // Get title
    const titleInput = document.querySelector('input[type="text"]') as HTMLInputElement;
    const title = titleInput?.value || 'Untitled Article';

    // Create paragraphs from content
    const paragraphs = content.split('\n').filter(line => line.trim()).map(line =>
      new Paragraph({
        children: [
          new TextRun({
            text: line,
            size: 24, // 12pt
          })
        ],
        spacing: {
          after: 200,
        },
      })
    );

    // Create document
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              text: title,
              heading: HeadingLevel.HEADING_1,
              spacing: {
                after: 400,
              },
            }),
            ...paragraphs,
          ],
        },
      ],
    });

    // Generate and save the document
    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${title.replace(/[^a-z0-9]/gi, '_')}.docx`);
    
    toast.success('DOCX exported successfully!');
  } catch (error) {
    console.error('DOCX export error:', error);
    toast.error('Failed to export DOCX');
  }
};

/**
 * Export with citations
 */
export const exportWithCitations = async (
  content: string,
  citations: any[],
  format: 'pdf' | 'docx'
) => {
  try {
    let fullContent = content;
    
    // Append citations
    if (citations.length > 0) {
      fullContent += '\n\nReferences:\n\n';
      citations.forEach((citation, index) => {
        fullContent += `${index + 1}. ${citation.vancouverStyle || citation.text}\n`;
      });
    }

    if (format === 'pdf') {
      exportToPDF();
    } else {
      exportToDOCX();
    }
  } catch (error) {
    console.error('Export with citations error:', error);
    toast.error('Failed to export with citations');
  }
};

