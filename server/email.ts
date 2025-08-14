import { MailService } from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  console.warn("SENDGRID_API_KEY environment variable not set - emails will not be sent");
}

const mailService = new MailService();
if (process.env.SENDGRID_API_KEY) {
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
}

interface OrderEmailData {
  customerName: string;
  customerEmail: string;
  orderId: string;
  products: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  paymentMethod: string;
  cryptoCurrency?: string;
  cryptoAmount?: string;
  shippingAddress: string;
}

function generateOrderConfirmationHTML(data: OrderEmailData): string {
  const productsHTML = data.products.map(product => `
    <div style="display: flex; align-items: center; padding: 16px; margin-bottom: 12px; border: 2px solid rgba(6, 79, 140, 0.1); border-radius: 8px; background-color: #F5F1E8; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
      <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #F8BBD9 0%, #E879F9 100%); border-radius: 8px; margin-right: 16px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); display: flex; align-items: center; justify-content: center;">
        <div style="width: 32px; height: 32px; background-color: rgba(255,255,255,0.5); border-radius: 4px;"></div>
      </div>
      <div style="flex: 1;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h4 style="color: #064F8C; font-size: 16px; font-weight: 600; margin: 0;">${product.name}</h4>
          <span style="color: #4A5568; font-size: 14px;">${product.quantity}</span>
        </div>
        <p style="color: #4A5568; font-size: 14px; margin: 4px 0 0 0;">Antal: ${product.quantity}</p>
      </div>
      <div style="text-align: right; margin-left: 16px;">
        <p style="color: #064F8C; font-size: 16px; font-weight: 600; margin: 0;">${product.price.toLocaleString('sv-SE')} kr</p>
      </div>
    </div>
  `).join('');

  const orderNumber = `SCND${data.orderId.substring(0, 6).toUpperCase()}`;
  const customerName = data.customerName || data.customerEmail.split('@')[0];

  return `
    <!DOCTYPE html>
    <html lang="sv">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Orderbekräftelse - Scandiscent</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #F5F1E8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #111B3E 0%, #064F8C 100%); color: #FFFFFF; text-align: center; padding: 48px 32px;">
          <h1 style="font-size: 36px; font-weight: bold; letter-spacing: 4px; margin: 0; background: linear-gradient(135deg, #FFD700 0%, #FFA500 25%, #B8860B 50%, #DAA520 75%, #FFD700 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">ScandiScent</h1>
        </div>

        <!-- Success Message -->
        <div style="padding: 48px 32px; text-align: center; background-color: #F5F1E8;">
          <div style="margin-bottom: 24px;">
            <div style="width: 64px; height: 64px; background-color: #D1FAE5; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <svg style="width: 32px; height: 32px; color: #10B981;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 style="color: #064F8C; font-size: 14px; margin: 0 0 8px 0; font-weight: 500;">Order ${orderNumber}</h2>
            <h1 style="color: #064F8C; font-size: 32px; font-weight: bold; margin: 0 0 24px 0; font-family: 'Cormorant Garamond', serif;">Tack ${customerName}!</h1>
          </div>

          <!-- Map Placeholder -->
          <div style="margin-bottom: 32px;">
            <div style="width: 100%; height: 200px; background: linear-gradient(135deg, #F5F1E8 0%, #FFFFFF 50%, #E8E4D6 100%); border: 2px solid rgba(6, 79, 140, 0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; position: relative;">
              <div style="text-align: center;">
                <div style="width: 32px; height: 32px; background-color: #064F8C; border-radius: 50%; margin: 0 auto 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"></div>
                <p style="font-size: 14px; font-weight: 600; color: #064F8C; margin: 0;">Leveransadress</p>
                <p style="font-size: 12px; color: #4A5568; margin: 4px 0 0 0; white-space: pre-line;">${data.shippingAddress}</p>
              </div>
              <div style="position: absolute; bottom: 8px; right: 8px; font-size: 12px; color: #064F8C; background-color: #FFFFFF; padding: 4px 8px; border-radius: 4px; border: 1px solid rgba(6, 79, 140, 0.2);">
                📍 Maps
              </div>
            </div>
          </div>

          <div style="text-align: left;">
            <h3 style="color: #064F8C; font-size: 18px; font-weight: bold; margin: 0 0 8px 0; font-family: 'Cormorant Garamond', serif;">Din Scandiscent order är bekräftad!</h3>
            <p style="color: #4A5568; font-size: 16px; margin: 0 0 24px 0;">Du kommer få ett email när din order är redo.</p>

            <div style="background-color: #FFFFFF; border: 1px solid rgba(6, 79, 140, 0.1); border-radius: 8px; padding: 24px; margin-bottom: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              <h4 style="color: #064F8C; font-weight: 600; margin: 0 0 16px 0;">Vill du göra en ny beställning?</h4>
              <p style="color: #4A5568; margin: 0;">
                Du kan påbörja en ny order genom att besöka vår hemsida: 
                <a href="https://www.scandiscent.com/womens" style="color: #064F8C; text-decoration: underline; font-weight: 500;">scandiscent.com</a>
              </p>
            </div>
          </div>
        </div>

        <!-- Order Items -->
        <div style="padding: 0 32px 32px; background-color: #FFFFFF;">
          <div style="display: flex; flex-wrap: wrap; gap: 32px;">
            <!-- Items List -->
            <div style="flex: 1; min-width: 300px;">
              ${productsHTML}
            </div>

            <!-- Order Summary -->
            <div style="flex: 1; min-width: 300px;">
              <div style="background-color: #F5F1E8; border: 2px solid rgba(6, 79, 140, 0.2); border-radius: 8px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <h3 style="color: #064F8C; font-weight: 600; margin: 0 0 16px 0; font-family: 'Lora', serif;">Ordersammanfattning</h3>
                
                <div style="margin-bottom: 24px;">
                  <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                    <span style="color: #4A5568; font-size: 14px;">Delsumma</span>
                    <span style="color: #064F8C; font-size: 14px; font-weight: 500;">${data.totalAmount.toLocaleString('sv-SE')} kr</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                    <span style="color: #4A5568; font-size: 14px;">Frakt</span>
                    <span style="color: #10B981; font-size: 14px; font-weight: 600;">Gratis</span>
                  </div>
                  <div style="border-top: 2px solid rgba(6, 79, 140, 0.2); padding-top: 12px;">
                    <div style="display: flex; justify-content: space-between;">
                      <span style="color: #064F8C; font-weight: 600;">Total</span>
                      <span style="color: #064F8C; font-weight: 600; font-size: 18px;">
                        <span style="color: #4A5568; font-size: 12px; margin-right: 4px;">SEK</span>
                        ${data.totalAmount.toLocaleString('sv-SE')} kr
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Customer Information -->
                <div style="border-top: 2px solid rgba(6, 79, 140, 0.2); padding-top: 24px;">
                  <div style="display: flex; flex-wrap: wrap; gap: 24px;">
                    <div style="flex: 1; min-width: 120px;">
                      <h4 style="color: #064F8C; font-weight: 600; margin: 0 0 8px 0;">Kontaktinformation</h4>
                      <div style="color: #4A5568; font-size: 14px;">
                        <p style="margin: 0 0 4px 0;">${data.customerName}</p>
                        <p style="margin: 0;">${data.customerEmail}</p>
                      </div>
                    </div>
                    
                    <div style="flex: 1; min-width: 120px;">
                      <h4 style="color: #064F8C; font-weight: 600; margin: 0 0 8px 0;">Betalningsmetod</h4>
                      <div style="color: #4A5568; font-size: 14px;">
                        <p style="margin: 0; text-transform: capitalize;">${data.paymentMethod}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Contact Info -->
              <div style="margin-top: 24px; text-align: center; color: #4A5568; font-size: 14px;">
                <p style="margin: 0 0 4px 0;">Behöver du hjälp med din order?</p>
                <a href="mailto:scandiscentswe@gmail.com" style="color: #064F8C; text-decoration: underline; font-weight: 500;">Kontakta oss</a>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #F5F1E8; padding: 48px 32px; text-align: center; border-top: 4px solid rgba(6, 79, 140, 0.1);">
          <!-- Newsletter Signup -->
          <div style="margin-bottom: 32px; max-width: 400px; margin-left: auto; margin-right: auto;">
            <h3 style="color: #064F8C; font-size: 18px; font-weight: bold; margin: 0 0 16px 0; font-family: 'Cormorant Garamond', serif;">Prenumerera på vårt nyhetsbrev</h3>
            <p style="color: #4A5568; font-size: 14px; margin: 0 0 16px 0;">Få exklusiva erbjudanden och nyheter direkt i din inkorg</p>
            <div style="display: flex; gap: 8px;">
              <input type="email" placeholder="Din e-postadress" style="flex: 1; padding: 12px 16px; border: 1px solid rgba(6, 79, 140, 0.2); border-radius: 8px; background-color: #FFFFFF; color: #064F8C; font-size: 14px;">
              <button style="padding: 12px 24px; background: linear-gradient(135deg, #FFD700 0%, #B8860B 100%); color: #064F8C; font-weight: 500; border: none; border-radius: 8px; cursor: pointer; font-size: 14px;">Prenumerera</button>
            </div>
          </div>
          
          <div style="color: #4A5568; font-size: 12px;">
            <p style="margin: 0 0 4px 0; font-weight: 500;">www.scandiscent.com</p>
            <p style="margin: 0 0 4px 0;">Stockholm, Sverige</p>
            <p style="margin: 0 0 4px 0;">Org nr: 556-XXX-XXXX</p>
            <p style="margin: 16px 0 0 0; color: #064F8C; font-weight: 500;">© 2025 ScandiScent. Alla rättigheter förbehållna.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
                  <th style="padding: 12px 0; color: #064F8C; font-size: 16px; text-align: center;">Antal</th>
                  <th style="padding: 12px 0; color: #064F8C; font-size: 16px; text-align: right;">Pris</th>
                </tr>
              </thead>
              <tbody>
                ${productsHTML}
              </tbody>
            </table>
            
            <div style="border-top: 2px solid #064F8C; padding-top: 20px; margin-top: 20px;">
              <p style="color: #064F8C; font-size: 20px; font-weight: bold; text-align: right; margin: 0;">
                Totalt: ${data.totalAmount} SEK
              </p>
            </div>
          </div>

          <!-- Payment Info -->
          <div style="background-color: #F0F4F8; border-radius: 12px; padding: 25px; margin: 30px 0;">
            <h3 style="color: #064F8C; font-size: 20px; margin: 0 0 15px 0;">Betalningsinformation</h3>
            ${paymentInfo}
          </div>

          <!-- Shipping Info -->
          <div style="background-color: #F0F4F8; border-radius: 12px; padding: 25px; margin: 30px 0;">
            <h3 style="color: #064F8C; font-size: 20px; margin: 0 0 15px 0;">Leveransadress</h3>
            <p style="color: #2D3748; font-size: 16px; margin: 0; white-space: pre-line;">${data.shippingAddress}</p>
          </div>

          <!-- Next Steps -->
          <div style="background: linear-gradient(135deg, #064F8C 0%, #111B3E 100%); border-radius: 12px; padding: 25px; margin: 30px 0;">
            <h3 style="color: #FFFFFF; font-size: 20px; margin: 0 0 15px 0;">Nästa steg</h3>
            <ul style="color: rgba(255,255,255,0.9); font-size: 16px; line-height: 1.6; margin: 0; padding-left: 20px;">
              <li>Vi förbereder din beställning inom 24 timmar</li>
              <li>Du får ett spårningsnummer via email när paketet skickas</li>
              <li>Leverans sker diskret i neutral förpackning</li>
              <li>Leveranstid: 2-5 arbetsdagar inom Sverige</li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div style="text-align: center; margin: 40px 0;">
            <p style="color: #64748B; font-size: 14px; margin: 0 0 10px 0;">
              Har du frågor om din beställning?
            </p>
            <p style="color: #064F8C; font-size: 16px; margin: 0; font-weight: bold;">
              Kontakta oss på: support@scandiscent.se
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #F7FAFC; padding: 30px; text-align: center; border-top: 1px solid #E2E8F0;">
          <p style="color: #64748B; font-size: 14px; margin: 0 0 10px 0;">
            Tack för att du valde Scandiscent
          </p>
          <p style="color: #64748B; font-size: 12px; margin: 0;">
            Detta email skickades till ${data.customerEmail}
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export async function sendOrderConfirmationEmail(data: OrderEmailData): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    console.log('No SendGrid API key - email not sent for order:', data.orderId);
    return false;
  }

  try {
    const emailContent = {
      to: data.customerEmail,
      from: 'scandiscentswe@gmail.com', // Using verified email from SendGrid account
      subject: `Orderbekräftelse - Order #${data.orderId.substring(0, 8)} | Scandiscent`,
      html: generateOrderConfirmationHTML(data),
    };

    await mailService.send(emailContent);
    console.log(`Order confirmation email sent to ${data.customerEmail} for order ${data.orderId}`);
    return true;
  } catch (error: any) {
    console.error('Failed to send order confirmation email:', error);
    if (error.response?.body?.errors) {
      console.error('SendGrid error details:', JSON.stringify(error.response.body.errors, null, 2));
    }
    return false;
  }
}