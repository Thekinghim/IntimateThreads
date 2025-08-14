import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import heroImage from "@assets/IMG_2353_1755189196516.jpg";

export default function BecomeModel() {
  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      {/* Hero Section */}
      <section 
        className="relative py-16 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#064F8C]/80 to-[#111B3E]/80"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="font-cormorant font-bold text-6xl mb-6" style={{ color: '#F5D061' }}>Bli en Modell</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto font-dm-sans">
            Gå med i vår exklusiva community av nordiska kvinnor och tjäna pengar på ett diskret sätt.
          </p>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-[#F5F1E8]">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
          <Card className="bg-white shadow-xl border-none">
            <CardContent className="p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name */}
                <div>
                  <Label htmlFor="name" className="text-base font-dm-sans text-[#4A5568] mb-3 block">Name</Label>
                  <Input
                    id="name"
                    placeholder="Name"
                    className="h-12 text-base border-gray-300 focus:border-[#064F8C]"
                  />
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="text-base font-dm-sans text-[#4A5568] mb-3 block">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    className="h-12 text-base border-gray-300 focus:border-[#064F8C]"
                  />
                </div>

                {/* Country */}
                <div>
                  <Label htmlFor="country" className="text-base font-dm-sans text-[#4A5568] mb-3 block">Country</Label>
                  <Input
                    id="country"
                    placeholder="Country"
                    className="h-12 text-base border-gray-300 focus:border-[#064F8C]"
                  />
                </div>

                {/* Show Face */}
                <div>
                  <Label htmlFor="showFace" className="text-base font-dm-sans text-[#4A5568] mb-3 block">Show Face?</Label>
                  <Select>
                    <SelectTrigger className="h-12 text-base border-gray-300 focus:border-[#064F8C]">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="partial">Partial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Birthday, Height, Weight */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div>
                  <Label htmlFor="birthday" className="text-base font-dm-sans text-[#4A5568] mb-3 block">Birthday</Label>
                  <Input
                    id="birthday"
                    type="date"
                    className="h-12 text-base border-gray-300 focus:border-[#064F8C]"
                  />
                </div>

                <div>
                  <Label htmlFor="height" className="text-base font-dm-sans text-[#4A5568] mb-3 block">Height</Label>
                  <Input
                    id="height"
                    placeholder="Height"
                    className="h-12 text-base border-gray-300 focus:border-[#064F8C]"
                  />
                </div>

                <div>
                  <Label htmlFor="weight" className="text-base font-dm-sans text-[#4A5568] mb-3 block">Weight</Label>
                  <Input
                    id="weight"
                    placeholder="Weight"
                    className="h-12 text-base border-gray-300 focus:border-[#064F8C]"
                  />
                </div>
              </div>

              {/* Video Add-ons */}
              <div className="mt-10">
                <Label className="text-base font-dm-sans text-[#4A5568] mb-6 block">
                  Please click on which Video Add-ons you would consider offering to customers:
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Checkbox id="striptease" className="border-gray-300" />
                    <Label htmlFor="striptease" className="text-base font-dm-sans text-[#4A5568]">Striptease / Nudity</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox id="pantyStuffing" className="border-gray-300" />
                    <Label htmlFor="pantyStuffing" className="text-base font-dm-sans text-[#4A5568]">Panty-Stuffing</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox id="masturbation" className="border-gray-300" />
                    <Label htmlFor="masturbation" className="text-base font-dm-sans text-[#4A5568]">Masturbation</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox id="anal" className="border-gray-300" />
                    <Label htmlFor="anal" className="text-base font-dm-sans text-[#4A5568]">Anal</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox id="doublePenetration" className="border-gray-300" />
                    <Label htmlFor="doublePenetration" className="text-base font-dm-sans text-[#4A5568]">Double Penetration</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox id="includePartner" className="border-gray-300" />
                    <Label htmlFor="includePartner" className="text-base font-dm-sans text-[#4A5568]">Include Partner (e.g. sex)</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox id="none" className="border-gray-300" />
                    <Label htmlFor="none" className="text-base font-dm-sans text-[#4A5568]">None of these</Label>
                  </div>
                </div>
              </div>

              {/* Photo Upload Sections */}
              <div className="mt-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <Label className="text-base font-dm-sans text-[#4A5568] mb-3 block">Photo #1</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Button variant="outline" className="text-[#4A5568]">Choose files</Button>
                      <p className="text-sm text-gray-500 mt-2">No fil...hosen</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-dm-sans text-[#4A5568] mb-3 block">Photo #2</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Button variant="outline" className="text-[#4A5568]">Choose files</Button>
                      <p className="text-sm text-gray-500 mt-2">No fil...hosen</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-dm-sans text-[#4A5568] mb-3 block">Photo #3</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Button variant="outline" className="text-[#4A5568]">Choose files</Button>
                      <p className="text-sm text-gray-500 mt-2">No fil...hosen</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-dm-sans text-[#4A5568] mb-3 block">Photo #4</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Button variant="outline" className="text-[#4A5568]">Choose files</Button>
                      <p className="text-sm text-gray-500 mt-2">No fil...hosen</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-dm-sans text-[#4A5568] mb-3 block">Photo #5</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Button variant="outline" className="text-[#4A5568]">Choose files</Button>
                      <p className="text-sm text-gray-500 mt-2">No fil...hosen</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-dm-sans text-[#4A5568] mb-3 block">Photo #6</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Button variant="outline" className="text-[#4A5568]">Choose files</Button>
                      <p className="text-sm text-gray-500 mt-2">No fil...hosen</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* How did you hear about us */}
              <div className="mt-10">
                <Label htmlFor="hearAbout" className="text-base font-dm-sans text-[#4A5568] mb-3 block">
                  How did you hear about us?
                </Label>
                <Textarea
                  id="hearAbout"
                  className="min-h-[80px] text-base border-gray-300 focus:border-[#064F8C]"
                />
              </div>

              {/* Message */}
              <div className="mt-8">
                <Label htmlFor="message" className="text-base font-dm-sans text-[#4A5568] mb-3 block">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Include anything extra you want to say."
                  className="min-h-[120px] text-base border-gray-300 focus:border-[#064F8C]"
                />
              </div>

              {/* Submit Button */}
              <div className="mt-12 text-center">
                <Button
                  size="lg"
                  className="gold-button font-medium px-16 py-4 text-xl rounded-3xl shadow-lg uppercase tracking-wide"
                >
                  JOIN THE TEAM
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}