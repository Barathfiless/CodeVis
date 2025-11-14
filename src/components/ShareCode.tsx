import { useState } from "react";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface ShareCodeProps {
  code: string;
  language: string;
}

export const ShareCode = ({ code, language }: ShareCodeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleShare = async () => {
    if (!email.trim()) {
      toast.error("Please enter an email address");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate sending email (in production, this would call a backend API)
      const subject = `Check out my ${language} code!`;
      const body = `Here's the code I wrote:\n\n${code}\n\nLanguage: ${language}\n\nCheck it out on CodeVis!`;
      
      // Create mailto link
      const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // In a real application, you would send this to a backend API
      // For now, we'll copy to clipboard and show the mailto link
      
      // Copy to clipboard
      await navigator.clipboard.writeText(`${subject}\n\n${body}`);
      
      toast.success(`Code copied to clipboard! You can now share it with ${email}`);
      
      // Optionally open the mailto link
      // window.location.href = mailtoLink;
      
      setEmail("");
      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to share code");
      console.error("Share error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleShare();
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="gap-1.5 h-8 w-8 p-0 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 border border-blue-500/30 hover:border-blue-500/50 transition-all duration-200 flex items-center justify-center dark:from-blue-500/20 dark:to-purple-500/20 dark:border-blue-500/30 light:from-blue-600/60 light:to-purple-600/60 light:border-blue-700/60 light:hover:from-blue-700/70 light:hover:to-purple-700/70 light:hover:border-blue-800"
        onClick={() => setIsOpen(true)}
        title="Share code with friends"
      >
        <Share2 className="h-4 w-4 text-blue-400 dark:text-blue-400 light:text-white" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Share Code</DialogTitle>
            <DialogDescription>
              Share your {language} code with friends via email
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Friend's Email</label>
              <Input
                placeholder="friend@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={handleShare}
              disabled={isLoading || !email.trim()}
              className="w-full"
            >
              {isLoading ? "Sharing..." : "Share Code"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
