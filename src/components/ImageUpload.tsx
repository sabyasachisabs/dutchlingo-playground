
import { Upload } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export const ImageUpload = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload an image file.",
      });
      return;
    }

    setIsLoading(true);
    try {
      // For now, just preview the image
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          toast({
            title: "Image uploaded successfully",
            description: "Image scan feature coming soon!",
          });
        };
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error uploading image",
        description: "Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-primary/20 transition-colors">
      <label htmlFor="image-upload" className="block cursor-pointer">
        <div className="flex flex-col items-center gap-4 p-8">
          <div className="p-4 bg-primary/10 rounded-full">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Scan Dutch Text
            </h3>
            <p className="text-sm text-gray-500">
              Upload an image containing Dutch text to check and translate
            </p>
          </div>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
            disabled={isLoading}
          />
        </div>
      </label>
    </div>
  );
};
