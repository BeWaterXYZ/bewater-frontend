"use client";
import { useTranslation } from "@/app/i18n/client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Info } from "lucide-react";

export default function SponsorProtocolPage({
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
          <h1 className="text-2xl md:text-3xl font-bold text-white">Sponsor Address Protocol</h1>
        </div>

        <div className="space-y-6 md:space-y-8">
          <section>
            <h2 className="text-lg md:text-xl text-white mb-3 md:mb-4">What is Sponsor Address Protocol?</h2>
            <p className="text-[#94A3B8] leading-relaxed text-sm md:text-base">
              The Sponsor Address Protocol is a standardized format that allows developers to specify their sponsor receiving addresses in their GitHub bio. This enables the BeWater platform to automatically detect and display sponsor addresses for project funding.
            </p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl text-white mb-3 md:mb-4">How to Use</h2>
            <div className="bg-[#334155] p-4 md:p-6 rounded-lg">
              <p className="text-white font-mono text-sm md:text-base mb-3 md:mb-4">Format:</p>
              <code className="block bg-[#1E293B] p-3 md:p-4 rounded text-[#00FFFF] text-xs md:text-sm mb-3 md:mb-4 overflow-x-auto whitespace-nowrap">
                bewater:sponsor:chain1:address1|chain2:address2|...|
              </code>
              <p className="text-[#94A3B8] text-xs md:text-sm">Example:</p>
              <code className="block bg-[#1E293B] p-3 md:p-4 rounded text-[#00FFFF] text-xs md:text-sm overflow-x-auto whitespace-nowrap">
                bewater:sponsor:evm:0x1234567890abcdef1234567890abcdef12345678|
              </code>
            </div>
          </section>

          <section>
            <h2 className="text-lg md:text-xl text-white mb-3 md:mb-4">Supported Chains</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div className="bg-[#334155] p-3 md:p-4 rounded">
                <h3 className="text-white font-bold mb-2 text-sm md:text-base">Currently Supported</h3>
                <ul className="text-[#94A3B8] space-y-1 md:space-y-2 text-sm">
                  <li>• EVM Chains (evm)</li>
                  <li className="ml-4 text-[#94A3B8]">Currently only supports Ethereum</li>
                  <li className="ml-4 text-[#94A3B8]">Other EVM chains coming soon</li>
                </ul>
              </div>
              <div className="bg-[#334155] p-3 md:p-4 rounded">
                <h3 className="text-white font-bold mb-2 text-sm md:text-base">Coming Soon</h3>
                <ul className="text-[#94A3B8] space-y-1 md:space-y-2 text-sm">
                  <li>• Bitcoin (bitcoin/btc)</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 bg-[#334155] p-3 md:p-4 rounded">
              <h3 className="text-white font-bold mb-2 text-sm md:text-base">Chain Name Format</h3>
              <p className="text-[#94A3B8] text-sm mb-3">Each chain can be specified using either its full name or its short name:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-[#94A3B8] border-b border-[#475569]">
                      <th className="text-left py-2">Chain</th>
                      <th className="text-left py-2">Full Name</th>
                      <th className="text-left py-2">Short Name</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#94A3B8]">
                    <tr className="border-b border-[#475569]">
                      <td className="py-2">EVM</td>
                      <td className="py-2">evm</td>
                      <td className="py-2">evm</td>
                    </tr>
                    <tr>
                      <td className="py-2">Bitcoin</td>
                      <td className="py-2">bitcoin</td>
                      <td className="py-2">btc</td>
                    </tr>
                  </tbody>
                </table>
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

          <section>
            <h2 className="text-lg md:text-xl text-white mb-3 md:mb-4">Examples</h2>
            <div className="bg-[#334155] p-4 md:p-6 rounded-lg space-y-4">
              <div>
                <p className="text-white font-mono text-sm md:text-base mb-2">Single EVM Chain:</p>
                <code className="block bg-[#1E293B] p-3 md:p-4 rounded text-[#00FFFF] text-xs md:text-sm overflow-x-auto whitespace-nowrap">
                  bewater:sponsor:evm:0x1234567890abcdef1234567890abcdef12345678|
                </code>
              </div>
              <div>
                <p className="text-white font-mono text-sm md:text-base mb-2">Multiple Chains:</p>
                <code className="block bg-[#1E293B] p-3 md:p-4 rounded text-[#00FFFF] text-xs md:text-sm overflow-x-auto whitespace-nowrap">
                  bewater:sponsor:evm:0x1234567890abcdef1234567890abcdef12345678|bitcoin:bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh|
                </code>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 