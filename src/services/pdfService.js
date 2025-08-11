// First, install the required dependencies:
// npm install jspdf html2canvas

// src/services/pdfService.js
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ImgBack from "../assets/BackgroundImg.png"

// Function to reverse Arabic text for jsPDF (since jsPDF doesn't handle RTL properly)
const processArabicText = (text) => {
  if (!text) return '';
  
  // Simple RTL text processing - you might need a more sophisticated library like bidi-js
  // This is a basic implementation that works for simple Arabic text
  const arabicRegex = /[\u0600-\u06FF\u0750-\u077F]/;
  
  if (arabicRegex.test(text)) {
    // For Arabic text, we need to reverse the string and handle special characters
    // This is a simplified approach - for complex text you might need bidi-js library
    return text.split('').reverse().join('');
  }
  
  return text;
};

// Better Arabic text processing function
const formatArabicText = (text) => {
  if (!text) return '';
  
  // Check if text contains Arabic characters
  const arabicRegex = /[\u0600-\u06FF\u0750-\u077F]/;
  
  if (arabicRegex.test(text)) {
    // For simple Arabic text without complex shaping, just return as is
    // jsPDF will handle basic Arabic if you have the right font
    return text;
  }
  
  return text;
};

export const generatePDF = async (elementId, filename = 'customer-lines.pdf', language = 'en') => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }

    // Configure html2canvas options
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
     backgroundColor: '#38539e',
    
      width: element.scrollWidth,
      height: element.scrollHeight,
    });

    const imgData = canvas.toDataURL('image/png');
    
    // Calculate dimensions
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Add metadata
    pdf.setProperties({
      title: language === 'ar' ? 'قائمة أرقام العميل' : 'Customer Lines List',
      subject: language === 'ar' ? 'أرقام الهواتف المسجلة' : 'Registered Phone Numbers',
      author: 'Zain',
      creator: 'Zain Customer Portal'
    });

    // Save the PDF
    pdf.save(filename);
    
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
};

export const generateAdvancedPDFOld = (data, language = 'en') => {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.width;
    const pageHeight = pdf.internal.pageSize.height;
    
    // Set font based on language
    if (language === 'ar') {
      // For Arabic, we'll use a workaround since jsPDF has limited Arabic support
      pdf.setFont('helvetica');
      pdf.setFontSize(12);
    } else {
      pdf.setFont('helvetica');
    }
    
    // Header
    pdf.setFontSize(20);
    pdf.setTextColor(28, 55, 129); // Zain blue
    
    const title = language === 'ar' ? 'قائمة أرقام العميل' : 'Customer Lines List';
    const processedTitle = language === 'ar' ? formatArabicText(title) : title;
    const titleWidth = pdf.getTextWidth(processedTitle);
    
    if (language === 'ar') {
      // For Arabic, position from right
      pdf.text(processedTitle, pageWidth - titleWidth - 20, 30);
    } else {
      // For English, center the title
      pdf.text(processedTitle, (pageWidth - titleWidth) / 2, 30);
    }
    
    // Date
    pdf.setFontSize(10);
    pdf.setTextColor(0, 0, 0);
    const date = new Date().toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US');
    const dateLabel = language === 'ar' ? 'التاريخ:' : 'Date:';
    const dateText = `${formatArabicText(dateLabel)} ${date}`;
    
    if (language === 'ar') {
      pdf.text(dateText, pageWidth - 20, 45, { align: 'right' });
    } else {
      pdf.text(dateText, 20, 45);
    }
    
    // Table headers
    let yPosition = 60;
    pdf.setFontSize(12);
    pdf.setTextColor(255, 255, 255);
    pdf.setFillColor(28, 55, 129);
    
    const headers = language === 'ar' 
      ? ['رقم الهاتف', 'نوع الخدمة', 'نوع العقد']
      : ['Phone Number', 'Service Type', 'Contract Type'];
    
    // Process Arabic headers
    const processedHeaders = headers.map(header => 
      language === 'ar' ? formatArabicText(header) : header
    );
    
    // Draw header row
    pdf.rect(20, yPosition - 5, 170, 10, 'F');
    
    if (language === 'ar') {
      // For Arabic, headers from right to left
      pdf.text(processedHeaders[0], 165, yPosition, { align: 'right' });
      pdf.text(processedHeaders[1], 120, yPosition, { align: 'right' });
      pdf.text(processedHeaders[2], 75, yPosition, { align: 'right' });
    } else {
      // For English, headers from left to right
      pdf.text(processedHeaders[0], 25, yPosition);
      pdf.text(processedHeaders[1], 80, yPosition);
      pdf.text(processedHeaders[2], 135, yPosition);
    }
    
    yPosition += 15;
    
    // Table data
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(10);
    
    data.forEach((item, index) => {
      if (yPosition > pageHeight - 30) {
        pdf.addPage();
        yPosition = 30;
      }
      
      const msisdn = item.msisdn || '';
      
      // Get market and contract type based on language
      let market, contractType;
      
      if (language === 'ar') {
        market = item.aR_Market || item.eN_Market || '';
        contractType = item.aR_ContractType || item.eN_ContractType || '';
      } else {
        market = item.eN_Market || '';
        contractType = item.eN_ContractType || '';
      }
      
      // Process Arabic text
      const processedMarket = language === 'ar' ? formatArabicText(market) : market;
      const processedContractType = language === 'ar' ? formatArabicText(contractType) : contractType;
      
      // Alternate row colors
      if (index % 2 === 0) {
        pdf.setFillColor(248, 249, 250);
        pdf.rect(20, yPosition - 5, 170, 10, 'F');
      }
      
      if (language === 'ar') {
        // For Arabic, align text to the right
        pdf.text(msisdn, 165, yPosition, { align: 'right' });
        pdf.text(processedMarket, 120, yPosition, { align: 'right' });
        pdf.text(processedContractType, 75, yPosition, { align: 'right' });
      } else {
        // For English, align text to the left
        pdf.text(msisdn, 25, yPosition);
        pdf.text(processedMarket, 80, yPosition);
        pdf.text(processedContractType, 135, yPosition);
      }
      
      yPosition += 10;
    });
    
    // Footer
    pdf.setFontSize(8);
    pdf.setTextColor(128, 128, 128);
    const footer = language === 'ar' 
      ? 'تم إنشاؤها بواسطة بوابة زين للعملاء'
      : 'Generated by Zain Customer Portal';
    const processedFooter = language === 'ar' ? formatArabicText(footer) : footer;
    const footerWidth = pdf.getTextWidth(processedFooter);
    
    if (language === 'ar') {
      pdf.text(processedFooter, pageWidth - footerWidth - 20, pageHeight - 10);
    } else {
      pdf.text(processedFooter, (pageWidth - footerWidth) / 2, pageHeight - 10);
    }
    
    // Save with appropriate filename
    const filename = language === 'ar' 
      ? 'customer-lines-list-ar.pdf'  // Using English filename to avoid issues
      : 'customer-lines-list.pdf';
    pdf.save(filename);
    
    return true;
  } catch (error) {
    console.error('Error generating advanced PDF:', error);
    throw new Error('Failed to generate PDF');
  }
};

// Alternative function using html2canvas for better Arabic support
export const generatePDFFromHTML = async (data, language = 'en') => {
  try {
    // Create a temporary HTML element with proper Arabic styling
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '-9999px';
    tempDiv.style.width = '800px';
    tempDiv.style.backgroundColor = 'white';
    tempDiv.style.padding = '20px';
    tempDiv.style.fontFamily = language === 'ar' ? 'Arial, sans-serif' : 'Arial, sans-serif';
    tempDiv.style.direction = language === 'ar' ? 'rtl' : 'ltr';
    
    // Create HTML content
    const title = language === 'ar' ? 'قائمة أرقام العميل' : 'Customer Lines List';
    const date = new Date().toLocaleDateString(language === 'ar' ? 'en-US' : 'en-US');
    const dateLabel = language === 'ar' ? 'التاريخ:' : 'Date:';
    
    const headers = language === 'ar' 
      ? ['رقم الهاتف', 'نوع الخدمة', 'نوع العقد']
      : ['Phone Number', 'Service Type', 'Contract Type'];
    
    let html = `
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #1c3781; font-size: 24px; margin-bottom: 10px;">${title}</h1>
        <p style="margin: 0; font-size: 12px;">${dateLabel} ${date}</p>
      </div>
      
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <thead>
          <tr style="background-color: #1c3781; color: white;">
            <th style="padding: 10px; border: 1px solid #ccc; text-align: ${language === 'ar' ? 'right' : 'left'};">${headers[0]}</th>
            <th style="padding: 10px; border: 1px solid #ccc; text-align: ${language === 'ar' ? 'right' : 'left'};">${headers[1]}</th>
            <th style="padding: 10px; border: 1px solid #ccc; text-align: ${language === 'ar' ? 'right' : 'left'};">${headers[2]}</th>
          </tr>
        </thead>
        <tbody>
    `;
    
    data.forEach((item, index) => {
      const msisdn = item.msisdn || '';
      const market = language === 'ar' ? (item.aR_Market || item.eN_Market || '') : (item.eN_Market || '');
      const contractType = language === 'ar' ? (item.aR_ContractType || item.eN_ContractType || '') : (item.eN_ContractType || '');
      
      const bgColor = index % 2 === 0 ? '#f8f9fa' : 'white';
      
      html += `
        <tr style="background-color: ${bgColor};">
          <td style="padding: 8px; border: 1px solid #ccc; text-align: ${language === 'ar' ? 'right' : 'left'}; direction: ltr;">${msisdn}</td>
          <td style="padding: 8px; border: 1px solid #ccc; text-align: ${language === 'ar' ? 'right' : 'left'};">${market}</td>
          <td style="padding: 8px; border: 1px solid #ccc; text-align: ${language === 'ar' ? 'right' : 'left'};">${contractType}</td>
        </tr>
      `;
    });
    
    const footer = language === 'ar' 
      ? 'تم إنشاؤها بواسطة بوابة زين للعملاء'
      : 'Generated by Zain Customer Portal';
    
    html += `
        </tbody>
      </table>
      
      <div style="text-align: center; margin-top: 30px; font-size: 10px; color: #666;">
        ${footer}
      </div>
    `;
    
    tempDiv.innerHTML = html;
    document.body.appendChild(tempDiv);
    
    // Generate PDF from HTML using html2canvas
    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: tempDiv.scrollWidth,
      height: tempDiv.scrollHeight,
    });
    
    // Remove temporary element
    document.body.removeChild(tempDiv);
    
    const imgData = canvas.toDataURL('image/png');
    
    // Calculate dimensions
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    
    let position = 0;
    
    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    // Add metadata
    pdf.setProperties({
      title: language === 'ar' ? 'Customer Lines List' : 'Customer Lines List', // Use English for metadata to avoid issues
      subject: language === 'ar' ? 'Registered Phone Numbers' : 'Registered Phone Numbers',
      author: 'Zain',
      creator: 'Zain Customer Portal'
    });
    
    // Save with appropriate filename
    const filename = language === 'ar' 
      ? 'customer-lines-list-ar.pdf'
      : 'customer-lines-list.pdf';
    pdf.save(filename);
    
    return true;
  } catch (error) {
    console.error('Error generating PDF from HTML:', error);
    throw new Error('Failed to generate PDF');
  }
};

// Main export - use the HTML-based method for better Arabic support
export const generateAdvancedPDF = generatePDFFromHTML;