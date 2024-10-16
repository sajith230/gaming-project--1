import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SystemRequirementsProps {
  minimumOS: string;
  minimumCPU: string;
  minimumRAM: string;
  minimumStorage: string;
  minimumGPU: string;
  recommendedOS: string;
  recommendedCPU: string;
  recommendedRAM: string;
  recommendedStorage: string;
  recommendedGPU: string;
}

const SystemRequirements = ({
  minimumOS,
  minimumCPU,
  minimumRAM,
  minimumStorage,
  minimumGPU,
  recommendedOS,
  recommendedCPU,
  recommendedRAM,
  recommendedStorage,
  recommendedGPU,
  setMinimumOS,
  setMinimumCPU,
  setMinimumRAM,
  setMinimumStorage,
  setMinimumGPU,
  setRecommendedOS,
  setRecommendedCPU,
  setRecommendedRAM,
  setRecommendedStorage,
  setRecommendedGPU,
}: SystemRequirementsProps & {
  setMinimumOS: (value: string) => void;
  setMinimumCPU: (value: string) => void;
  setMinimumRAM: (value: string) => void;
  setMinimumStorage: (value: string) => void;
  setMinimumGPU: (value: string) => void;
  setRecommendedOS: (value: string) => void;
  setRecommendedCPU: (value: string) => void;
  setRecommendedRAM: (value: string) => void;
  setRecommendedStorage: (value: string) => void;
  setRecommendedGPU: (value: string) => void;
}) => {
  return (
    <div>
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-3 *:text-[1em]">
          <TabsTrigger value="windows">Windows</TabsTrigger>
          <TabsTrigger value="xbox">Xbox</TabsTrigger>
          <TabsTrigger value="playstation">Playstation</TabsTrigger>
        </TabsList>
        <TabsContent value="windows">
          <p className="text-white text-[1.3em] font-semibold mb-6 mt-6">
            Minimum System Requirements
          </p>

          <div>
            <div className="grid grid-cols-12 mb-8 content-center items-center">
              <div className="col-span-2">
                <p className="text-white font-medium">Operating System</p>
              </div>

              <div className="col-span-10">
                <Select onValueChange={setMinimumOS}>
                  <SelectTrigger className="w-full text-[14px]">
                    <SelectValue placeholder="Select Operating System" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value="WINDOWS 10 / 11 WITH DIRECTX 12"
                      className="text-[14px]"
                    >
                      WINDOWS 10 / 11 WITH DIRECTX 12
                    </SelectItem>
                    <SelectItem value="More Options.." className="text-[14px]">
                      More Options..
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-12 mb-8 items-center">
              <div className="col-span-2">
                <p className="text-white font-medium">CPU</p>
              </div>

              <div className="col-span-10">
                <Select onValueChange={setMinimumCPU}>
                  <SelectTrigger className="w-full text-[14px]">
                    <SelectValue placeholder="Select CPU" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value="INTEL® CORE™ i7-8700K, AMD RYZEN™ 5 3600"
                      className="text-[14px]"
                    >
                      INTEL® CORE™ i7-8700K, AMD RYZEN™ 5 3600
                    </SelectItem>
                    <SelectItem value="More Options.." className="text-[14px]">
                      More Options..
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-12 mb-8 items-center">
              <div className="col-span-2">
                <p className="text-white font-medium">Graphics</p>
              </div>

              <div className="col-span-10">
                <Select onValueChange={setMinimumGPU}>
                  <SelectTrigger className="w-full text-[14px]">
                    <SelectValue placeholder="Select Graphics" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value="GEFORCE® GTX 1660 · 6GB, AMD RX 5600 XT · 6GB, INTEL® ARC A750 · 8GB (REBAR ON)"
                      className="text-[14px]"
                    >
                      GEFORCE® GTX 1660 · 6GB, AMD RX 5600 XT · 6GB, INTEL® ARC
                      A750 · 8GB (REBAR ON)
                    </SelectItem>
                    <SelectItem value="More Options.." className="text-[14px]">
                      More Options..
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-12 mb-8 items-center">
              <div className="col-span-2">
                <p className="text-white font-medium">Ram Memory</p>
              </div>

              <div className="col-span-10">
                <Select onValueChange={setMinimumRAM}>
                  <SelectTrigger className="w-full text-[14px]">
                    <SelectValue placeholder="Select Memory" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value="16 GB (dual-channel mode)"
                      className="text-[14px]"
                    >
                      16 GB (dual-channel mode)
                    </SelectItem>
                    <SelectItem value="More Options.." className="text-[14px]">
                      More Options..
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-12 mb-8 items-center">
              <div className="col-span-2">
                <p className="text-white font-medium">Storage</p>
              </div>

              <div className="col-span-10">
                <Select onValueChange={setMinimumStorage}>
                  <SelectTrigger className="w-full text-[14px]">
                    <SelectValue placeholder="Select Storage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="65 GB SSD" className="text-[14px]">
                      65 GB SSD
                    </SelectItem>
                    <SelectItem value="More Options.." className="text-[14px]">
                      More Options..
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-12 mb-8 items-center">
              <div className="col-span-2">
                <p className="text-white font-medium">Resolution</p>
              </div>

              <div className="col-span-10">
                <Select>
                  <SelectTrigger className="w-full text-[14px]">
                    <SelectValue placeholder="Select Resolution" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value="1080p / 30 Fps / Low Preset with Upscaler Set to Quality"
                      className="text-[14px]"
                    >
                      1080p / 30 Fps / Low Preset with Upscaler Set to Quality
                    </SelectItem>
                    <SelectItem value="More Options.." className="text-[14px]">
                      More Options..
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <p className="text-white text-[1.3em] font-semibold mb-6 mt-10">
            Recommended System Requirements
          </p>

          <div>
            <div className="grid grid-cols-12 mb-8 items-center">
              <div className="col-span-2">
                <p className="text-white font-medium">Operating System</p>
              </div>

              <div className="col-span-10">
                <Select onValueChange={setRecommendedOS}>
                  <SelectTrigger className="w-full text-[14px]">
                    <SelectValue placeholder="Select Operating System" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value="WINDOWS 10 / 11 WITH DIRECTX 12"
                      className="text-[14px]"
                    >
                      WINDOWS 10 / 11 WITH DIRECTX 12
                    </SelectItem>
                    <SelectItem value="More Options.." className="text-[14px]">
                      More Options..
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-12 mb-8 items-center">
              <div className="col-span-2">
                <p className="text-white font-medium">CPU</p>
              </div>

              <div className="col-span-10">
                <Select onValueChange={setRecommendedCPU}>
                  <SelectTrigger className="w-full text-[14px]">
                    <SelectValue placeholder="Select CPU" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value="INTEL® CORE™ i7-8700K, AMD RYZEN™ 5 3600"
                      className="text-[14px]"
                    >
                      INTEL® CORE™ i7-8700K, AMD RYZEN™ 5 3600
                    </SelectItem>
                    <SelectItem value="More Options.." className="text-[14px]">
                      More Options..
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-12 mb-8 items-center">
              <div className="col-span-2">
                <p className="text-white font-medium">Graphics</p>
              </div>

              <div className="col-span-10">
                <Select onValueChange={setRecommendedGPU}>
                  <SelectTrigger className="w-full text-[14px]">
                    <SelectValue placeholder="Select Graphics" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value="GEFORCE® GTX 1660 · 6GB, AMD RX 5600 XT · 6GB, INTEL® ARC A750 · 8GB (REBAR ON)"
                      className="text-[14px]"
                    >
                      GEFORCE® GTX 1660 · 6GB, AMD RX 5600 XT · 6GB, INTEL® ARC
                      A750 · 8GB (REBAR ON)
                    </SelectItem>
                    <SelectItem value="More Options.." className="text-[14px]">
                      More Options..
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-12 mb-8 items-center">
              <div className="col-span-2">
                <p className="text-white font-medium">Ram Memory</p>
              </div>

              <div className="col-span-10">
                <Select onValueChange={setRecommendedRAM}>
                  <SelectTrigger className="w-full text-[14px]">
                    <SelectValue placeholder="Select Memory" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value="16 GB (dual-channel mode)"
                      className="text-[14px]"
                    >
                      16 GB (dual-channel mode)
                    </SelectItem>
                    <SelectItem value="More Options.." className="text-[14px]">
                      More Options..
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-12 mb-8 items-center">
              <div className="col-span-2">
                <p className="text-white font-medium">Storage</p>
              </div>

              <div className="col-span-10">
                <Select onValueChange={setRecommendedStorage}>
                  <SelectTrigger className="w-full text-[14px]">
                    <SelectValue placeholder="Select Storage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="65 GB SSD" className="text-[14px]">
                      65 GB SSD
                    </SelectItem>
                    <SelectItem value="More Options.." className="text-[14px]">
                      More Options..
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-12 mb-8 items-center">
              <div className="col-span-2">
                <p className="text-white font-medium">Resolution</p>
              </div>

              <div className="col-span-10">
                <Select>
                  <SelectTrigger className="w-full text-[14px]">
                    <SelectValue placeholder="Select Resolution" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value="1080p / 30 Fps / Low Preset with Upscaler Set to Quality"
                      className="text-[14px]"
                    >
                      1080p / 30 Fps / Low Preset with Upscaler Set to Quality
                    </SelectItem>
                    <SelectItem value="More Options.." className="text-[14px]">
                      More Options..
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="xbox"></TabsContent>

        <TabsContent value="playstation"></TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemRequirements;
