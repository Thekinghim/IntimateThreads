import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

export default function FeedbackAndTips() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    modelName: "",
    orderNumber: "",
    videoSatisfaction: "",
    pantiesSatisfaction: "",
    deliverySpeed: "",
    videoAddOns: "",
    modelPerformance: "",
    orderAgain: "",
    remainAnonymous: false,
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.modelName || !formData.orderNumber) {
      toast({
        title: "Obligatoriska fält saknas",
        description: "Vänligen fyll i alla obligatoriska fält markerade med *",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Feedback skickat!",
      description: "Tack för din feedback. Vi uppskattar dina åsikter.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      modelName: "",
      orderNumber: "",
      videoSatisfaction: "",
      pantiesSatisfaction: "",
      deliverySpeed: "",
      videoAddOns: "",
      modelPerformance: "",
      orderAgain: "",
      remainAnonymous: false,
      message: ""
    });
  };

  const ratingOptions = [
    { value: "1", label: "1 - Mycket missnöjd" },
    { value: "2", label: "2 - Missnöjd" },
    { value: "3", label: "3 - Neutral" },
    { value: "4", label: "4 - Nöjd" },
    { value: "5", label: "5 - Mycket nöjd" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F0E8] to-[#E8DDD4]">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#064F8C] to-[#0A5A9C] text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4 gold-text-static">Feedback och Tips</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Din åsikt är viktig för oss. Berätta om din upplevelse och hjälp oss att förbättra vår service.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <Card className="bg-white/80 border-[#064F8C]/20 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-8 text-center gold-text-static">Recensera Din Beställning</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[#064F8C] font-medium">
                      Namn <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Namn"
                      className="border-[#064F8C]/30 focus:border-[#064F8C] focus:ring-[#064F8C]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#064F8C] font-medium">
                      E-post <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="E-post"
                      className="border-[#064F8C]/30 focus:border-[#064F8C] focus:ring-[#064F8C]"
                      required
                    />
                  </div>
                </div>

                {/* Model Name and Order Number */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="modelName" className="text-[#064F8C] font-medium">
                      Modellens Namn <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="modelName"
                      value={formData.modelName}
                      onChange={(e) => setFormData(prev => ({ ...prev, modelName: e.target.value }))}
                      placeholder="Modellens namn"
                      className="border-[#064F8C]/30 focus:border-[#064F8C] focus:ring-[#064F8C]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="orderNumber" className="text-[#064F8C] font-medium">
                      Beställningsnummer <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="orderNumber"
                      value={formData.orderNumber}
                      onChange={(e) => setFormData(prev => ({ ...prev, orderNumber: e.target.value }))}
                      placeholder="Beställningsnummer"
                      className="border-[#064F8C]/30 focus:border-[#064F8C] focus:ring-[#064F8C]"
                      required
                    />
                  </div>
                </div>

                {/* Rating Questions */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-[#064F8C] font-medium">
                      Hur nöjd var du med VIDEO? <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.videoSatisfaction} onValueChange={(value) => setFormData(prev => ({ ...prev, videoSatisfaction: value }))}>
                      <SelectTrigger className="border-[#064F8C]/30 focus:border-[#064F8C] focus:ring-[#064F8C]">
                        <SelectValue placeholder="Välj din bedömning" />
                      </SelectTrigger>
                      <SelectContent>
                        {ratingOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[#064F8C] font-medium">
                      Hur nöjd var du med TROSORNA? <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.pantiesSatisfaction} onValueChange={(value) => setFormData(prev => ({ ...prev, pantiesSatisfaction: value }))}>
                      <SelectTrigger className="border-[#064F8C]/30 focus:border-[#064F8C] focus:ring-[#064F8C]">
                        <SelectValue placeholder="Välj din bedömning" />
                      </SelectTrigger>
                      <SelectContent>
                        {ratingOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[#064F8C] font-medium">
                      Vad tyckte du om beställningens LEVERANSHASTIGHET? <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.deliverySpeed} onValueChange={(value) => setFormData(prev => ({ ...prev, deliverySpeed: value }))}>
                      <SelectTrigger className="border-[#064F8C]/30 focus:border-[#064F8C] focus:ring-[#064F8C]">
                        <SelectValue placeholder="Välj din bedömning" />
                      </SelectTrigger>
                      <SelectContent>
                        {ratingOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[#064F8C] font-medium">
                      Inkluderade din modell alla VIDEO TILLÄGG? <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.videoAddOns} onValueChange={(value) => setFormData(prev => ({ ...prev, videoAddOns: value }))}>
                      <SelectTrigger className="border-[#064F8C]/30 focus:border-[#064F8C] focus:ring-[#064F8C]">
                        <SelectValue placeholder="Välj din bedömning" />
                      </SelectTrigger>
                      <SelectContent>
                        {ratingOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[#064F8C] font-medium">
                      Hur var MODELLENS PRESTATION och energi i videon? 
                      <div className="text-sm text-gray-600 mt-1">
                        (t.ex. verkade hon engagerad, onanerade med ansträngning, orgasm?)
                      </div>
                      <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.modelPerformance} onValueChange={(value) => setFormData(prev => ({ ...prev, modelPerformance: value }))}>
                      <SelectTrigger className="border-[#064F8C]/30 focus:border-[#064F8C] focus:ring-[#064F8C]">
                        <SelectValue placeholder="Välj din bedömning" />
                      </SelectTrigger>
                      <SelectContent>
                        {ratingOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Would Order Again */}
                <div className="space-y-3">
                  <Label className="text-[#064F8C] font-medium text-base">
                    Skulle du beställa från din modell igen?
                  </Label>
                  <RadioGroup
                    value={formData.orderAgain}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, orderAgain: value }))}
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="yes" className="border-[#064F8C] text-[#064F8C]" />
                      <Label htmlFor="yes" className="text-[#064F8C]">Ja</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="no" className="border-[#064F8C] text-[#064F8C]" />
                      <Label htmlFor="no" className="text-[#064F8C]">Nej</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="maybe" id="maybe" className="border-[#064F8C] text-[#064F8C]" />
                      <Label htmlFor="maybe" className="text-[#064F8C]">Kanske</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Anonymous Option */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="anonymous"
                    checked={formData.remainAnonymous}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, remainAnonymous: checked as boolean }))}
                    className="border-[#064F8C] data-[state=checked]:bg-[#064F8C]"
                  />
                  <Label htmlFor="anonymous" className="text-[#064F8C] font-medium">
                    Förbli Anonym För Modellen (Valfritt)
                  </Label>
                </div>
                <p className="text-sm text-gray-600 ml-6 -mt-2">
                  Ja - håll mitt namn och beställningsnummer anonymt
                </p>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-[#064F8C] font-medium">
                    Meddelande Till Modell Eller Sajt (Valfritt)
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Vad gillade du? Något vi kan förbättra?"
                    className="border-[#064F8C]/30 focus:border-[#064F8C] focus:ring-[#064F8C] min-h-[100px]"
                    rows={4}
                  />
                </div>

                {/* Submit Button */}
                <div className="text-center pt-6">
                  <Button
                    type="submit"
                    className="bg-[#064F8C] hover:bg-[#053D6B] text-white px-12 py-3 rounded-lg font-semibold text-lg transition-colors"
                  >
                    Skicka Feedback
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}