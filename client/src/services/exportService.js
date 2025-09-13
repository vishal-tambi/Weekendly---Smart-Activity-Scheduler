import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';

class ExportService {
  // Generate shareable link
  generateShareableLink(planId) {
    const baseUrl = window.location.origin;
    return `${baseUrl}/shared/${planId}`;
  }

  // Export plan as image
  async exportAsImage(elementId, filename = 'weekend-plan') {
    try {
      const element = document.getElementById(elementId);
      if (!element) {
        throw new Error('Element not found');
      }

      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2, // High resolution
        useCORS: true,
        allowTaint: true
      });

      // Download image
      const link = document.createElement('a');
      link.download = `${filename}.png`;
      link.href = canvas.toDataURL();
      link.click();

      return canvas.toDataURL();
    } catch (error) {
      console.error('Export as image failed:', error);
      throw error;
    }
  }

  // Export plan as PDF
  async exportAsPDF(elementId, filename = 'weekend-plan') {
    try {
      const element = document.getElementById(elementId);
      if (!element) {
        throw new Error('Element not found');
      }

      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${filename}.pdf`);
      return true;
    } catch (error) {
      console.error('Export as PDF failed:', error);
      throw error;
    }
  }

  // Generate QR code for sharing
  async generateQRCode(url) {
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(url, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      });
      return qrCodeDataUrl;
    } catch (error) {
      console.error('QR code generation failed:', error);
      throw error;
    }
  }

  // Share via Web Share API
  async shareViaWebAPI(planData) {
    if (navigator.share) {
      try {
        await navigator.share({
          title: planData.title,
          text: `Check out my ${planData.theme} weekend plan!`,
          url: this.generateShareableLink(planData._id)
        });
        return true;
      } catch (error) {
        console.error('Web share failed:', error);
        return false;
      }
    }
    return false;
  }

  // Copy to clipboard
  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.error('Copy to clipboard failed:', error);
      return false;
    }
  }

  // Generate social media sharing URLs
  generateSocialShareUrls(planData) {
    const shareUrl = this.generateShareableLink(planData._id);
    const shareText = `Check out my ${planData.theme} weekend plan: ${planData.title}`;
    
    return {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      email: `mailto:?subject=${encodeURIComponent(planData.title)}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`
    };
  }
}

export default new ExportService();