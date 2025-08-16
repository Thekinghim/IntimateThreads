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
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <Card className="bg-white border-none shadow-none">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-dm-sans text-[#4A5568] font-medium">Namn</Label>
                    <Input
                      id="name"
                      placeholder="Namn"
                      className="bg-white border-gray-300 focus:border-[#064F8C] focus:ring-[#064F8C] text-gray-700"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-dm-sans text-[#4A5568] font-medium">E-post</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="E-post"
                      className="bg-white border-gray-300 focus:border-[#064F8C] focus:ring-[#064F8C] text-gray-700"
                    />
                  </div>

                  {/* Country */}
                  <div className="space-y-2">
                    <Label htmlFor="country" className="font-dm-sans text-[#4A5568] font-medium">Land</Label>
                    <Input
                      id="country"
                      placeholder="Land"
                      className="bg-white border-gray-300 focus:border-[#064F8C] focus:ring-[#064F8C] text-gray-700"
                    />
                  </div>

                  {/* Show Face */}
                  <div className="space-y-2">
                    <Label htmlFor="showFace" className="font-dm-sans text-[#4A5568] font-medium">Visa ansikt?</Label>
                    <Select>
                      <SelectTrigger className="bg-white border-gray-300 focus:border-[#064F8C] focus:ring-[#064F8C] text-gray-700">
                        <SelectValue placeholder="Välj alternativ" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="yes" className="text-gray-700">Ja</SelectItem>
                        <SelectItem value="no" className="text-gray-700">Nej</SelectItem>
                        <SelectItem value="partial" className="text-gray-700">Delvis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Birthday, Height, Weight */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="birthday" className="font-dm-sans text-[#4A5568] font-medium">Födelsedatum</Label>
                    <Input
                      id="birthday"
                      type="date"
                      className="bg-white border-gray-300 focus:border-[#064F8C] focus:ring-[#064F8C] text-gray-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="height" className="font-dm-sans text-[#4A5568] font-medium">Längd</Label>
                    <Input
                      id="height"
                      placeholder="Längd (cm)"
                      className="bg-white border-gray-300 focus:border-[#064F8C] focus:ring-[#064F8C] text-gray-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weight" className="font-dm-sans text-[#4A5568] font-medium">Vikt</Label>
                    <Input
                      id="weight"
                      placeholder="Vikt (kg)"
                      className="bg-white border-gray-300 focus:border-[#064F8C] focus:ring-[#064F8C] text-gray-700"
                    />
                  </div>
                </div>

                {/* Photo Upload Sections */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label className="font-dm-sans text-[#4A5568] font-medium">Foto #1</Label>
                      <div className="border-2 border-dashed border-[#064F8C] bg-[#F5F1E8] rounded-lg p-6 text-center">
                        <Button className="bg-[#064F8C] text-white hover:bg-[#0A5A9C] transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium px-6 py-2 rounded-lg">Välj filer</Button>
                        <p className="text-sm text-[#064F8C] mt-2">Ingen fil vald</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="font-dm-sans text-[#4A5568] font-medium">Foto #2</Label>
                      <div className="border-2 border-dashed border-[#064F8C] bg-[#F5F1E8] rounded-lg p-6 text-center">
                        <Button className="bg-[#064F8C] text-white hover:bg-[#0A5A9C] transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium px-6 py-2 rounded-lg">Välj filer</Button>
                        <p className="text-sm text-[#064F8C] mt-2">Ingen fil vald</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="font-dm-sans text-[#4A5568] font-medium">Foto #3</Label>
                      <div className="border-2 border-dashed border-[#064F8C] bg-[#F5F1E8] rounded-lg p-6 text-center">
                        <Button className="bg-[#064F8C] text-white hover:bg-[#0A5A9C] transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium px-6 py-2 rounded-lg">Välj filer</Button>
                        <p className="text-sm text-[#064F8C] mt-2">Ingen fil vald</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="font-dm-sans text-[#4A5568] font-medium">Foto #4</Label>
                      <div className="border-2 border-dashed border-[#064F8C] bg-[#F5F1E8] rounded-lg p-6 text-center">
                        <Button className="bg-[#064F8C] text-white hover:bg-[#0A5A9C] transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium px-6 py-2 rounded-lg">Välj filer</Button>
                        <p className="text-sm text-[#064F8C] mt-2">Ingen fil vald</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="font-dm-sans text-[#4A5568] font-medium">Foto #5</Label>
                      <div className="border-2 border-dashed border-[#064F8C] bg-[#F5F1E8] rounded-lg p-6 text-center">
                        <Button className="bg-[#064F8C] text-white hover:bg-[#0A5A9C] transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium px-6 py-2 rounded-lg">Välj filer</Button>
                        <p className="text-sm text-[#064F8C] mt-2">Ingen fil vald</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="font-dm-sans text-[#4A5568] font-medium">Foto #6</Label>
                      <div className="border-2 border-dashed border-[#064F8C] bg-[#F5F1E8] rounded-lg p-6 text-center">
                        <Button className="bg-[#064F8C] text-white hover:bg-[#0A5A9C] transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium px-6 py-2 rounded-lg">Välj filer</Button>
                        <p className="text-sm text-[#064F8C] mt-2">Ingen fil vald</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* How did you hear about us */}
                <div className="space-y-2">
                  <Label htmlFor="hearAbout" className="font-dm-sans text-[#4A5568] font-medium">
                    Hur hörde du talas om oss?
                  </Label>
                  <Textarea
                    id="hearAbout"
                    className="bg-white border-gray-300 focus:border-[#064F8C] focus:ring-[#064F8C] text-gray-700 min-h-[80px]"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="font-dm-sans text-[#4A5568] font-medium">Meddelande</Label>
                  <Textarea
                    id="message"
                    placeholder="Skriv allt extra du vill tillägga här."
                    className="bg-white border-gray-300 focus:border-[#064F8C] focus:ring-[#064F8C] text-gray-700 min-h-[120px]"
                  />
                </div>

                {/* Submit Button */}
                <div className="text-center pt-6">
                  <Button
                    size="lg"
                    className="gold-button font-medium px-16 py-4 text-xl rounded-3xl shadow-lg uppercase tracking-wide"
                  >
                    GÅ MED I TEAMET
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <Newsletter />
    </div>
  );
}