import React, { useState, useEffect } from 'react';
import exportService from '../../services/exportService';
import Button from '../ui/Button';
import * as Icons from 'lucide-react';

const ExportModal = ({ isOpen, onClose, planData }) => {
  const [shareUrl, setShareUrl] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [socialUrls, setSocialUrls] = useState({});
  const [loading, setLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (isOpen && planData) {
      initializeShareData();
    }
  }, [isOpen, planData]);

  const initializeShareData = async () => {
    const url = exportService.generateShareableLink(planData._id);
    setShareUrl(url);
    setSocialUrls(exportService.generateSocialShareUrls(planData));
    
    try {
      const qr = await exportService.generateQRCode(url);
      setQrCode(qr);
    } catch (error) {
      console.error('QR generation failed:', error);
    }
  };

  const handleExportImage = async () => {
    setLoading(true);
    try {
      await exportService.exportAsImage('shareable-plan', planData.title);
    } catch (error) {
        console.log(error)
      alert('Export failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = async () => {
    setLoading(true);
    try {
      await exportService.exportAsPDF('shareable-plan', planData.title);
    } catch (error) {
        console.log(error)
      alert('PDF export failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = async () => {
    const success = await exportService.copyToClipboard(shareUrl);
    if (success) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleWebShare = async () => {
    const success = await exportService.shareViaWebAPI(planData);
    if (!success) {
      // Fallback to copy link
      handleCopyLink();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Icons.Share2 className="text-primary-600" size={24} />
              <h3 className="text-xl font-semibold text-gray-900">Share Your Weekend Plan</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Icons.X size={24} />
            </button>
          </div>

          {/* Share Link */}
          <div className="mb-8">
            <h4 className="font-medium text-gray-900 mb-3 flex items-center">
              <Icons.Link className="mr-2" size={18} />
              Shareable Link
            </h4>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm"
              />
              <Button
                onClick={handleCopyLink}
                variant="outline"
                className={copySuccess ? 'bg-green-50 border-green-200 text-green-800' : ''}
              >
                {copySuccess ? (
                  <>
                    <Icons.Check size={16} className="mr-1" />
                    Copied
                  </>
                ) : (
                  <>
                    <Icons.Copy size={16} className="mr-1" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* QR Code */}
          {qrCode && (
            <div className="mb-8">
              <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                <Icons.QrCode className="mr-2" size={18} />
                QR Code
              </h4>
              <div className="flex justify-center">
                <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                  <img src={qrCode} alt="QR Code" className="w-32 h-32" />
                </div>
              </div>
              <p className="text-sm text-gray-600 text-center mt-2">
                Scan to view the plan on mobile
              </p>
            </div>
          )}

          {/* Export Options */}
          <div className="mb-8">
            <h4 className="font-medium text-gray-900 mb-3 flex items-center">
              <Icons.Download className="mr-2" size={18} />
              Export Options
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handleExportImage}
                variant="outline"
                disabled={loading}
                className="flex items-center justify-center"
              >
                <Icons.Image className="mr-2" size={16} />
                Export as Image
              </Button>
              <Button
                onClick={handleExportPDF}
                variant="outline"
                disabled={loading}
                className="flex items-center justify-center"
              >
                <Icons.FileText className="mr-2" size={16} />
                Export as PDF
              </Button>
            </div>
          </div>

          {/* Social Sharing */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-3 flex items-center">
              <Icons.Users className="mr-2" size={18} />
              Share on Social Media
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <a
                href={socialUrls.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                <Icons.MessageCircle className="mr-2" size={16} />
                WhatsApp
              </a>
              <a
                href={socialUrls.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-4 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-500 transition-colors"
              >
                <Icons.Twitter className="mr-2" size={16} />
                Twitter
              </a>
              <a
                href={socialUrls.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Icons.Facebook className="mr-2" size={16} />
                Facebook
              </a>
              <a
                href={socialUrls.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-colors"
              >
                <Icons.Linkedin className="mr-2" size={16} />
                LinkedIn
              </a>
              <a
                href={socialUrls.email}
                className="flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                <Icons.Mail className="mr-2" size={16} />
                Email
              </a>
              <Button
                onClick={handleWebShare}
                variant="outline"
                className="flex items-center justify-center"
              >
                <Icons.Share className="mr-2" size={16} />
                More...
              </Button>
            </div>
          </div>

          {/* Close Button */}
          <div className="flex justify-end">
            <Button onClick={onClose} variant="outline">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;