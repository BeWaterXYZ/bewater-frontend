"use client";
import { useTranslation } from "@/app/i18n/client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Info } from "lucide-react";

export default function GrantProtocolPage({
  params: { lng },
}: {
  params: { lng: string };
}) {
  const { t } = useTranslation(lng, "translation");
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="container mx-auto py-8 md:py-20 px-4">
      <button
        onClick={handleBack}
        className="flex items-center text-[#00FFFF] hover:text-[#00FFFF80] mb-6 md:mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </button>

      <div className="bg-[#1E293B] rounded-lg p-4 md:p-8">
        <div className="flex items-center mb-6 md:mb-8">
          <Info className="w-5 h-5 md:w-6 md:h-6 text-[#00FFFF] mr-2 md:mr-3" />
          <h1 className="text-2xl md:text-3xl font-bold text-white">Grant Address Protocol</h1>
        </div>

        <div className="space-y-6 md:space-y-8">
          <section>
            <h2 className="text-lg md:text-xl text-white mb-3 md:mb-4">What is Grant Address Protocol?</h2>
            <p className="text-[#94A3B8] leading-relaxed text-sm md:text-base">
              The Grant Address Protocol is a standardized format that allows developers to specify their grant receiving addresses in their GitHub bio. This enables the BeWater platform to automatically detect and display grant addresses for project funding.
            </p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl text-white mb-3 md:mb-4">How to Use</h2>
            <div className="bg-[#334155] p-4 md:p-6 rounded-lg">
              <p className="text-white font-mono text-sm md:text-base mb-3 md:mb-4">Format:</p>
              <code className="block bg-[#1E293B] p-3 md:p-4 rounded text-[#00FFFF] text-xs md:text-sm mb-3 md:mb-4 overflow-x-auto whitespace-nowrap">
                bewater:grant:chain1:address1|chain2:address2|...
              </code>
              <p className="text-[#94A3B8] text-xs md:text-sm">Example:</p>
              <code className="block bg-[#1E293B] p-3 md:p-4 rounded text-[#00FFFF] text-xs md:text-sm overflow-x-auto whitespace-nowrap">
                bewater:grant:ethereum:0x1234567890abcdef1234567890abcdef12345678
              </code>
            </div>
          </section>

          <section>
            <h2 className="text-lg md:text-xl text-white mb-3 md:mb-4">Supported Chains</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div className="bg-[#334155] p-3 md:p-4 rounded">
                <h3 className="text-white font-bold mb-2 text-sm md:text-base">Currently Supported</h3>
                <ul className="text-[#94A3B8] space-y-1 md:space-y-2 text-sm">
                  <li>• Ethereum</li>
                </ul>
              </div>
              <div className="bg-[#334155] p-3 md:p-4 rounded">
                <h3 className="text-white font-bold mb-2 text-sm md:text-base">Coming Soon</h3>
                <ul className="text-[#94A3B8] space-y-1 md:space-y-2 text-sm">
                  <li>• Bitcoin</li>
                  <li>• Polygon</li>
                  <li>• Arbitrum</li>
                  <li>• Optimism</li>
                  <li>• Base</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg md:text-xl text-white mb-3 md:mb-4">Best Practices</h2>
            <ul className="text-[#94A3B8] space-y-2 md:space-y-3 text-sm md:text-base">
              <li className="flex items-start">
                <span className="text-[#00FFFF] mr-2 flex-shrink-0">•</span>
                <span>Keep the format clean and readable</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#00FFFF] mr-2 flex-shrink-0">•</span>
                <span>Use the full address format (don&apos;t truncate)</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#00FFFF] mr-2 flex-shrink-0">•</span>
                <span>You can place the protocol string anywhere in your bio</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#00FFFF] mr-2 flex-shrink-0">•</span>
                <span>Verify addresses before adding them</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#00FFFF] mr-2 flex-shrink-0">•</span>
                <span>Update addresses if they change</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
} 