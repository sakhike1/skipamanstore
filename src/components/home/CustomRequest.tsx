import React, { useState } from 'react';
import { Upload, Send } from 'lucide-react';

const CustomRequest: React.FC = () => {
  const [formData, setFormData] = useState({
    designIdea: '',
    preferredColors: '',
    size: '',
    additionalNotes: '',
    name: '',
    email: '',
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setShowSuccess(true);
    setFormData({
      designIdea: '',
      preferredColors: '',
      size: '',
      additionalNotes: '',
      name: '',
      email: '',
    });
    setSelectedFile(null);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <div className="py-24 px-8 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <h2 className="fashion-heading text-6xl mb-4">CUSTOM<br />DESIGN</h2>
            <p className="fashion-subheading mb-8">YOUR VISION, OUR CRAFT</p>
            <p className="text-lg leading-relaxed opacity-80">
              Share your creative vision with us, and we'll bring it to life with meticulous attention to detail and premium quality materials. Each piece is crafted to your exact specifications, ensuring a truly unique garment that reflects your personal style.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-b border-white/30 focus:border-white outline-none py-2 transition-all placeholder-white/50"
                  placeholder="NAME"
                />
              </div>

              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-b border-white/30 focus:border-white outline-none py-2 transition-all placeholder-white/50"
                  placeholder="EMAIL"
                />
              </div>
            </div>

            <div>
              <textarea
                id="designIdea"
                name="designIdea"
                value={formData.designIdea}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full bg-transparent border-b border-white/30 focus:border-white outline-none py-2 transition-all resize-none placeholder-white/50"
                placeholder="DESIGN CONCEPT"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <input
                  type="text"
                  id="preferredColors"
                  name="preferredColors"
                  value={formData.preferredColors}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border-b border-white/30 focus:border-white outline-none py-2 transition-all placeholder-white/50"
                  placeholder="PREFERRED COLORS"
                />
              </div>

              <div>
                <select
                  id="size"
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-b border-white/30 focus:border-white outline-none py-2 transition-all text-white/50"
                >
                  <option value="" className="bg-black">SELECT SIZE</option>
                  <option value="S" className="bg-black">SMALL</option>
                  <option value="M" className="bg-black">MEDIUM</option>
                  <option value="L" className="bg-black">LARGE</option>
                  <option value="XL" className="bg-black">X-LARGE</option>
                  <option value="XXL" className="bg-black">XX-LARGE</option>
                </select>
              </div>
            </div>

            <div>
              <div className="border border-white/30 p-8 text-center cursor-pointer hover:border-white transition-colors">
                <input
                  type="file"
                  id="file-upload"
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p className="text-sm tracking-wider mb-2">UPLOAD REFERENCE IMAGE</p>
                  <p className="text-xs opacity-50">PNG, JPG, GIF up to 10MB</p>
                  {selectedFile && (
                    <p className="mt-4 text-sm">{selectedFile.name}</p>
                  )}
                </label>
              </div>
            </div>

            <div>
              <textarea
                id="additionalNotes"
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleInputChange}
                rows={3}
                className="w-full bg-transparent border-b border-white/30 focus:border-white outline-none py-2 transition-all resize-none placeholder-white/50"
                placeholder="ADDITIONAL NOTES"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group flex items-center space-x-3 border border-white px-8 py-4 hover:bg-white hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="tracking-wider">SUBMIT REQUEST</span>
              <Send size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {showSuccess && (
              <div className="border border-white/30 p-4">
                <p className="tracking-wider text-sm">
                  YOUR REQUEST HAS BEEN SUBMITTED SUCCESSFULLY
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomRequest;