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
import feedbackImage from "@assets/IMG_2335_1754760267758.jpg";

export default function FeedbackAndTips() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    modelName: "",
    orderNumber: "",
    pantiesSatisfaction: "",
    deliverySpeed: "",
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
      pantiesSatisfaction: "",
      deliverySpeed: "",
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
    <div className="min-h-screen bg-[#F5F1E8]">
      {/* Hero Section */}
      <section 
        className="relative text-white py-16 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(6, 79, 140, 0.7), rgba(10, 90, 156, 0.7)), url(${feedbackImage})`
        }}
      >
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl font-bold mb-4 gold-text-static drop-shadow-lg">Feedback & Gåvor</h1>
          <p className="text-xl text-white/95 max-w-3xl mx-auto drop-shadow-md">
            Din åsikt är viktig för oss. Berätta om din upplevelse och hjälp oss att förbättra vår service.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <Card className="bg-white border-none shadow-none">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-8 text-center gold-text-static">Recensera Din Beställning</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700 font-medium">
                      Namn <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Namn"
                      className="bg-white border-gray-300 focus:border-[#064F8C] focus:ring-[#064F8C] text-gray-700"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 font-medium">
                      E-post <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="E-post"
                      className="bg-white border-gray-300 focus:border-[#064F8C] focus:ring-[#064F8C] text-gray-700"
                      required
                    />
                  </div>
                </div>

                {/* Model Name and Order Number */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="modelName" className="text-gray-700 font-medium">
                      Modellens Namn <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="modelName"
                      value={formData.modelName}
                      onChange={(e) => setFormData(prev => ({ ...prev, modelName: e.target.value }))}
                      placeholder="Modellens namn"
                      className="bg-white border-gray-300 focus:border-[#064F8C] focus:ring-[#064F8C] text-gray-700"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="orderNumber" className="text-gray-700 font-medium">
                      Beställningsnummer <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="orderNumber"
                      value={formData.orderNumber}
                      onChange={(e) => setFormData(prev => ({ ...prev, orderNumber: e.target.value }))}
                      placeholder="Beställningsnummer"
                      className="bg-white border-gray-300 focus:border-[#064F8C] focus:ring-[#064F8C] text-gray-700"
                      required
                    />
                  </div>
                </div>

                {/* Rating Questions */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">
                      Hur nöjd var du med TROSORNA? <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.pantiesSatisfaction} onValueChange={(value) => setFormData(prev => ({ ...prev, pantiesSatisfaction: value }))}>
                      <SelectTrigger className="bg-white border-gray-300 focus:border-[#064F8C] focus:ring-[#064F8C] text-gray-700">
                        <SelectValue placeholder="Välj din bedömning" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {ratingOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value} className="text-gray-700">
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">
                      Vad tyckte du om beställningens LEVERANSHASTIGHET? <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.deliverySpeed} onValueChange={(value) => setFormData(prev => ({ ...prev, deliverySpeed: value }))}>
                      <SelectTrigger className="bg-white border-gray-300 focus:border-[#064F8C] focus:ring-[#064F8C] text-gray-700">
                        <SelectValue placeholder="Välj din bedömning" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {ratingOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value} className="text-gray-700">
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Would Order Again */}
                <div className="space-y-3">
                  <Label className="text-gray-700 font-medium text-base">
                    Skulle du beställa från din modell igen?
                  </Label>
                  <RadioGroup
                    value={formData.orderAgain}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, orderAgain: value }))}
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="yes" className="border-gray-300 text-[#064F8C]" />
                      <Label htmlFor="yes" className="text-gray-700">Ja</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="no" className="border-gray-300 text-[#064F8C]" />
                      <Label htmlFor="no" className="text-gray-700">Nej</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="maybe" id="maybe" className="border-gray-300 text-[#064F8C]" />
                      <Label htmlFor="maybe" className="text-gray-700">Kanske</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Anonymous Option */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="anonymous"
                    checked={formData.remainAnonymous}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, remainAnonymous: checked as boolean }))}
                    className="border-gray-300 data-[state=checked]:bg-[#064F8C]"
                  />
                  <Label htmlFor="anonymous" className="text-gray-700 font-medium">
                    Förbli Anonym För Modellen (Valfritt)
                  </Label>
                </div>
                <p className="text-sm text-gray-600 ml-6 -mt-2">
                  Ja - håll mitt namn och beställningsnummer anonymt
                </p>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-700 font-medium">
                    Meddelande Till Modell Eller Sajt (Valfritt)
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Vad gillade du? Något vi kan förbättra?"
                    className="bg-white border-gray-300 focus:border-[#064F8C] focus:ring-[#064F8C] text-gray-700 min-h-[100px]"
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