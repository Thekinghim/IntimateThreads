import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Newsletter from "@/components/newsletter";
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
                  <Label htmlFor="name" className="text-base font-dm-sans text-[#064F8C] mb-3 block">Namn</Label>
                  <Input
                    id="name"
                    placeholder="Namn"
                    className="h-12 text-base border-[#064F8C] bg-transparent text-[#064F8C] focus:border-[#064F8C] focus:bg-transparent"
                  />
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="text-base font-dm-sans text-[#064F8C] mb-3 block">E-post</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="E-post"
                    className="h-12 text-base border-[#064F8C] bg-transparent text-[#064F8C] focus:border-[#064F8C] focus:bg-transparent"
                  />
                </div>

                {/* Country */}
                <div>
                  <Label htmlFor="country" className="text-base font-dm-sans text-[#064F8C] mb-3 block">Land</Label>
                  <Input
                    id="country"
                    placeholder="Land"
                    className="h-12 text-base border-[#064F8C] bg-transparent text-[#064F8C] focus:border-[#064F8C] focus:bg-transparent"
                  />
                </div>

                {/* Show Face */}
                <div>
                  <Label htmlFor="showFace" className="text-base font-dm-sans text-[#064F8C] mb-3 block">Visa ansikt?</Label>
                  <Select>
                    <SelectTrigger className="h-12 text-base border-[#064F8C] bg-transparent text-[#064F8C] focus:border-[#064F8C] focus:bg-transparent">
                      <SelectValue placeholder="Välj alternativ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Ja</SelectItem>
                      <SelectItem value="no">Nej</SelectItem>
                      <SelectItem value="partial">Delvis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Birthday, Height, Weight */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div>
                  <Label htmlFor="birthday" className="text-base font-dm-sans text-[#064F8C] mb-3 block">Födelsedatum</Label>
                  <Input
                    id="birthday"
                    type="date"
                    className="h-12 text-base border-[#064F8C] bg-transparent text-[#064F8C] focus:border-[#064F8C] focus:bg-transparent"
                  />
                </div>

                <div>
                  <Label htmlFor="height" className="text-base font-dm-sans text-[#064F8C] mb-3 block">Längd</Label>
                  <Input
                    id="height"
                    placeholder="Längd (cm)"
                    className="h-12 text-base border-[#064F8C] bg-transparent text-[#064F8C] focus:border-[#064F8C] focus:bg-transparent"
                  />
                </div>

                <div>
                  <Label htmlFor="weight" className="text-base font-dm-sans text-[#064F8C] mb-3 block">Vikt</Label>
                  <Input
                    id="weight"
                    placeholder="Vikt (kg)"
                    className="h-12 text-base border-[#064F8C] bg-transparent text-[#064F8C] focus:border-[#064F8C] focus:bg-transparent"
                  />
                </div>
              </div>



              {/* Photo Upload Sections */}
              <div className="mt-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <Label className="text-base font-dm-sans text-[#064F8C] mb-3 block">Foto #1</Label>
                    <div className="border-2 border-dashed border-[#064F8C] bg-[#F5F1E8] rounded-lg p-6 text-center">
                      <Button className="bg-[#064F8C] text-white hover:bg-[#0A5A9C] transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium px-6 py-2 rounded-lg">Välj filer</Button>
                      <p className="text-sm text-[#064F8C] mt-2">Ingen fil vald</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-dm-sans text-[#064F8C] mb-3 block">Foto #2</Label>
                    <div className="border-2 border-dashed border-[#064F8C] bg-[#F5F1E8] rounded-lg p-6 text-center">
                      <Button className="bg-[#064F8C] text-white hover:bg-[#0A5A9C] transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium px-6 py-2 rounded-lg">Välj filer</Button>
                      <p className="text-sm text-[#064F8C] mt-2">Ingen fil vald</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-dm-sans text-[#064F8C] mb-3 block">Foto #3</Label>
                    <div className="border-2 border-dashed border-[#064F8C] bg-[#F5F1E8] rounded-lg p-6 text-center">
                      <Button className="bg-[#064F8C] text-white hover:bg-[#0A5A9C] transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium px-6 py-2 rounded-lg">Välj filer</Button>
                      <p className="text-sm text-[#064F8C] mt-2">Ingen fil vald</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-dm-sans text-[#064F8C] mb-3 block">Foto #4</Label>
                    <div className="border-2 border-dashed border-[#064F8C] bg-[#F5F1E8] rounded-lg p-6 text-center">
                      <Button className="bg-[#064F8C] text-white hover:bg-[#0A5A9C] transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium px-6 py-2 rounded-lg">Välj filer</Button>
                      <p className="text-sm text-[#064F8C] mt-2">Ingen fil vald</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-dm-sans text-[#064F8C] mb-3 block">Foto #5</Label>
                    <div className="border-2 border-dashed border-[#064F8C] bg-[#F5F1E8] rounded-lg p-6 text-center">
                      <Button className="bg-[#064F8C] text-white hover:bg-[#0A5A9C] transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium px-6 py-2 rounded-lg">Välj filer</Button>
                      <p className="text-sm text-[#064F8C] mt-2">Ingen fil vald</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-dm-sans text-[#064F8C] mb-3 block">Foto #6</Label>
                    <div className="border-2 border-dashed border-[#064F8C] bg-[#F5F1E8] rounded-lg p-6 text-center">
                      <Button className="bg-[#064F8C] text-white hover:bg-[#0A5A9C] transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium px-6 py-2 rounded-lg">Välj filer</Button>
                      <p className="text-sm text-[#064F8C] mt-2">Ingen fil vald</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* How did you hear about us */}
              <div className="mt-10">
                <Label htmlFor="hearAbout" className="text-base font-dm-sans text-[#064F8C] mb-3 block">
                  Hur hörde du talas om oss?
                </Label>
                <Textarea
                  id="hearAbout"
                  className="min-h-[80px] text-base border-[#064F8C] bg-transparent text-[#064F8C] focus:border-[#064F8C] focus:bg-transparent"
                />
              </div>

              {/* Message */}
              <div className="mt-8">
                <Label htmlFor="message" className="text-base font-dm-sans text-[#064F8C] mb-3 block">Meddelande</Label>
                <Textarea
                  id="message"
                  placeholder="Skriv allt extra du vill tillägga här."
                  className="min-h-[120px] text-base border-[#064F8C] bg-transparent text-[#064F8C] focus:border-[#064F8C] focus:bg-transparent placeholder:text-[#064F8C]/60"
                />
              </div>

              {/* Submit Button */}
              <div className="mt-12 text-center">
                <Button
                  size="lg"
                  className="gold-button font-medium px-16 py-4 text-xl rounded-3xl shadow-lg uppercase tracking-wide"
                >
                  GÅ MED I TEAMET
                </Button>
              </div>
          </div>
        </div>
      </section>
      
      <Newsletter />
    </div>
  );
}