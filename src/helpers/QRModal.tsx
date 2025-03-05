import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { X, Download, Share2 } from "lucide-react";

const QRModal = ({ url, username, onClose }) => {
  const qrRef = useRef(null); // Create a ref for the QRCodeCanvas
  const downloadQR = () => {
    if (!qrRef.current) return;

    const canvas = qrRef.current.querySelector("canvas");
    if (!canvas) return;

    const qrUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = qrUrl;
    link.download = `${username}-qr.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="fixed  inset-0 flex items-center justify-center bg-gray-000 bg-opacity-50 backdrop-blur-sm z-50">
      <div
        className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-3xl mx-4 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className=" p-8 flex flex-col justify-center items-center">
            <div ref={qrRef} className="bg-white p-4 rounded-xl shadow-md">
              <QRCodeCanvas value={url} size={200} level="H" />
            </div>
            <p className="mt-4 text-sm text-white text-center">Scan and share your feedback</p>
          </div>

          {/* Interaction Section */}
          <div className="p-8 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-100">Your QR Code</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors" aria-label="Close">
                <X className="text-white" size={24} />
              </button>
            </div>
            <p className="text-gray-400 mb-8">
              Your unique QR code has been generated. You can download it or share the link directly.
            </p>
            <div className="space-y-4 mt-auto">
              <button onClick={downloadQR}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                <Download size={20} />
                Download QR Code
              </button>
              <button onClick={() => navigator.share({ url })}
                className="w-full flex items-center justify-center gap-2 bg-gray-800 text-gray-100 py-3 px-4 rounded-lg
            hover:bg-gray-300 transition-colors"
              >
                <Share2 size={20} />
                Share Profile Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRModal;
