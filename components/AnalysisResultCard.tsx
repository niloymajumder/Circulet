
import React from 'react';
import { WasteAnalysis, DisposalMethod } from '../types';
import { RecycleIcon } from './icons/RecycleIcon';
import { CompostIcon } from './icons/CompostIcon';
import { LandfillIcon } from './icons/LandfillIcon';
import { HazardousIcon } from './icons/HazardousIcon';
import { ReuseIcon } from './icons/ReuseIcon';
import { LightbulbIcon } from './icons/LightbulbIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

interface AnalysisResultCardProps {
  result: WasteAnalysis;
  image: string;
}

const getDisposalInfo = (method: DisposalMethod): { Icon: React.ElementType; color: string; label: string } => {
  switch (method) {
    case DisposalMethod.RECYCLE:
      return { Icon: RecycleIcon, color: 'bg-recycle-blue', label: 'Recycle' };
    case DisposalMethod.COMPOST:
      return { Icon: CompostIcon, color: 'bg-compost-brown', label: 'Compost' };
    case DisposalMethod.LANDFILL:
      return { Icon: LandfillIcon, color: 'bg-landfill-gray', label: 'Landfill' };
    case DisposalMethod.HAZARDOUS:
      return { Icon: HazardousIcon, color: 'bg-hazard-red', label: 'Hazardous' };
    case DisposalMethod.REUSE:
        return { Icon: ReuseIcon, color: 'bg-eco-green', label: 'Reuse' };
    case DisposalMethod.SPECIAL:
        return { Icon: RecycleIcon, color: 'bg-purple-500', label: 'Special Disposal' };
    default:
      return { Icon: LandfillIcon, color: 'bg-gray-500', label: 'Unknown' };
  }
};

export const AnalysisResultCard: React.FC<AnalysisResultCardProps> = ({ result, image }) => {
  const { Icon, color, label } = getDisposalInfo(result.disposalMethod);

  return (
    <div className="animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
                <img src={image} alt={result.itemName} className="rounded-lg object-cover w-full aspect-square" />
            </div>
            <div className="md:col-span-2">
                <span className="text-sm font-medium text-eco-gray">{result.materialType}</span>
                <h2 className="text-3xl font-bold text-eco-dark mt-1">{result.itemName}</h2>
                
                <div className={`mt-4 inline-flex items-center gap-3 px-4 py-2 rounded-full text-white font-semibold text-lg ${color}`}>
                    <Icon className="w-7 h-7" />
                    <span>{label}</span>
                </div>

                <div className="mt-6">
                    <h3 className="text-xl font-bold text-eco-dark mb-3">Disposal Instructions</h3>
                    <ul className="space-y-2">
                        {result.instructions.map((step, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <CheckCircleIcon className="w-6 h-6 text-eco-green flex-shrink-0 mt-0.5" />
                                <span className="text-eco-gray">{step}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

      <div className="mt-8 p-4 bg-eco-green/10 rounded-lg border-l-4 border-eco-green">
        <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
                <LightbulbIcon className="w-8 h-8 text-eco-green-dark"/>
            </div>
            <div>
                <h4 className="font-bold text-eco-green-dark">Eco-Friendly Tip</h4>
                <p className="text-eco-gray mt-1">{result.ecoSuggestion}</p>
            </div>
        </div>
      </div>
    </div>
  );
};
