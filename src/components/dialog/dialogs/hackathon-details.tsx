"use client";
import { Trophy, ExternalLink } from "lucide-react";
import { Dialogs } from "../store";

interface HackathonDetailsDialogProps {
  data: NonNullable<Dialogs["hackathon_details"]>;
  close: () => void;
}

export default function HackathonDetailsDialog({
  data,
  close,
}: HackathonDetailsDialogProps) {
  const handleHackathonClick = () => {
    window.open(data.url, '_blank');
  };

  return (
    <div className="flex flex-col justify-center w-[343px] md:w-[570px] bg-transparent">
      <div className="p-6 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <Trophy className="text-[#F59E0B]" size={24} />
          <h2 className="heading-5 text-[#F8FAFC]">Hackathon Details</h2>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="body-4 font-medium text-[#94A3B8]">Hackathon</label>
            <button
              onClick={handleHackathonClick}
              className="flex items-center gap-2 text-[#00FFFF] hover:text-[#00FFFF]/80 text-left w-full p-3 rounded-md hover:bg-[#334155] transition-colors border border-[#334155]"
            >
              <span className="font-medium body-3">{data.name}</span>
              <ExternalLink size={16} />
            </button>
          </div>
          
          <div className="space-y-2">
            <label className="body-4 font-medium text-[#94A3B8]">Host</label>
            <div className="p-3 bg-[#334155] rounded-md border border-[#475569]">
              <p className="text-[#F8FAFC] body-3">{data.host}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 