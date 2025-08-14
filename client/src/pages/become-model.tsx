import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
          <div className="p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name */}
                <div>
                  <Label htmlFor="name" className="text-base font-dm-sans text-[#064F8C] mb-3 block">Name</Label>
                  <Input
                    id="name"
                    placeholder="Name"
                    className="h-12 text-base border-[#064F8C] bg-[#F5F1E8] text-[#064F8C] focus:border-[#064F8C]"
                  />
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="text-base font-dm-sans text-[#064F8C] mb-3 block">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    className="h-12 text-base border-[#064F8C] bg-[#F5F1E8] text-[#064F8C] focus:border-[#064F8C]"
                  />
                </div>

                {/* Country */}
                <div>
                  <Label htmlFor="country" className="text-base font-dm-sans text-[#064F8C] mb-3 block">Country</Label>
                  <Input
                    id="country"
                    placeholder="Country"
                    className="h-12 text-base border-[#064F8C] bg-[#F5F1E8] text-[#064F8C] focus:border-[#064F8C]"
                  />
                </div>

                {/* Show Face */}
                <div>
                  <Label htmlFor="showFace" className="text-base font-dm-sans text-[#064F8C] mb-3 block">Show Face?</Label>
                  <Select>
                    <SelectTrigger className="h-12 text-base border-[#064F8C] bg-[#F5F1E8] text-[#064F8C] focus:border-[#064F8C]">
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
                  <Label htmlFor="birthday" className="text-base font-dm-sans text-[#064F8C] mb-3 block">Birthday</Label>
                  <Input
                    id="birthday"
                    type="date"
                    className="h-12 text-base border-[#064F8C] bg-[#F5F1E8] text-[#064F8C] focus:border-[#064F8C]"
                  />
                </div>

                <div>
                  <Label htmlFor="height" className="text-base font-dm-sans text-[#064F8C] mb-3 block">Height</Label>
                  <Input
                    id="height"
                    placeholder="Height"
                    className="h-12 text-base border-[#064F8C] bg-[#F5F1E8] text-[#064F8C] focus:border-[#064F8C]"
                  />
                </div>

                <div>
                  <Label htmlFor="weight" className="text-base font-dm-sans text-[#064F8C] mb-3 block">Weight</Label>
                  <Input
                    id="weight"
                    placeholder="Weight"
                    className="h-12 text-base border-[#064F8C] bg-[#F5F1E8] text-[#064F8C] focus:border-[#064F8C]"
                  />
                </div>
              </div>



              {/* Photo Upload Sections */}
              <div className="mt-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <Label className="text-base font-dm-sans text-[#064F8C] mb-3 block">Photo #1</Label>
                    <div className="border-2 border-dashed border-[#064F8C] bg-[#F5F1E8] rounded-lg p-6 text-center">
                      <Button variant="outline" className="text-[#064F8C] border-[#064F8C] bg-[#F5F1E8]">Choose files</Button>
                      <p className="text-sm text-[#064F8C] mt-2">No fil...hosen</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-dm-sans text-[#064F8C] mb-3 block">Photo #2</Label>
                    <div className="border-2 border-dashed border-[#064F8C] bg-[#F5F1E8] rounded-lg p-6 text-center">
                      <Button variant="outline" className="text-[#064F8C] border-[#064F8C] bg-[#F5F1E8]">Choose files</Button>
                      <p className="text-sm text-[#064F8C] mt-2">No fil...hosen</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-dm-sans text-[#064F8C] mb-3 block">Photo #3</Label>
                    <div className="border-2 border-dashed border-[#064F8C] bg-[#F5F1E8] rounded-lg p-6 text-center">
                      <Button variant="outline" className="text-[#064F8C] border-[#064F8C] bg-[#F5F1E8]">Choose files</Button>
                      <p className="text-sm text-[#064F8C] mt-2">No fil...hosen</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-dm-sans text-[#064F8C] mb-3 block">Photo #4</Label>
                    <div className="border-2 border-dashed border-[#064F8C] bg-[#F5F1E8] rounded-lg p-6 text-center">
                      <Button variant="outline" className="text-[#064F8C] border-[#064F8C] bg-[#F5F1E8]">Choose files</Button>
                      <p className="text-sm text-[#064F8C] mt-2">No fil...hosen</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-dm-sans text-[#064F8C] mb-3 block">Photo #5</Label>
                    <div className="border-2 border-dashed border-[#064F8C] bg-[#F5F1E8] rounded-lg p-6 text-center">
                      <Button variant="outline" className="text-[#064F8C] border-[#064F8C] bg-[#F5F1E8]">Choose files</Button>
                      <p className="text-sm text-[#064F8C] mt-2">No fil...hosen</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-dm-sans text-[#064F8C] mb-3 block">Photo #6</Label>
                    <div className="border-2 border-dashed border-[#064F8C] bg-[#F5F1E8] rounded-lg p-6 text-center">
                      <Button variant="outline" className="text-[#064F8C] border-[#064F8C] bg-[#F5F1E8]">Choose files</Button>
                      <p className="text-sm text-[#064F8C] mt-2">No fil...hosen</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* How did you hear about us */}
              <div className="mt-10">
                <Label htmlFor="hearAbout" className="text-base font-dm-sans text-[#064F8C] mb-3 block">
                  How did you hear about us?
                </Label>
                <Textarea
                  id="hearAbout"
                  className="min-h-[80px] text-base border-[#064F8C] bg-[#F5F1E8] text-[#064F8C] focus:border-[#064F8C]"
                />
              </div>

              {/* Message */}
              <div className="mt-8">
                <Label htmlFor="message" className="text-base font-dm-sans text-[#064F8C] mb-3 block">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Include anything extra you want to say."
                  className="min-h-[120px] text-base border-[#064F8C] bg-[#F5F1E8] text-[#064F8C] focus:border-[#064F8C]"
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
          </div>
        </div>
      </section>
    </div>
  );
}