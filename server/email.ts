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
    <tr style="border-bottom: 1px solid #E2E8F0;">
      <td style="padding: 16px 0; color: #2D3748; font-size: 16px;">${product.name}</td>
      <td style="padding: 16px 0; color: #2D3748; font-size: 16px; text-align: center;">${product.quantity}</td>
      <td style="padding: 16px 0; color: #2D3748; font-size: 16px; text-align: right;">${product.price} SEK</td>
    </tr>
  `).join('');

  const paymentInfo = data.paymentMethod === 'crypto' 
    ? `<p style="color: #064F8C; font-size: 16px; margin: 8px 0;"><strong>Cryptocurrency:</strong> ${data.cryptoCurrency}</p>
       <p style="color: #064F8C; font-size: 16px; margin: 8px 0;"><strong>Belopp att betala:</strong> ${data.cryptoAmount} ${data.cryptoCurrency}</p>`
    : `<p style="color: #064F8C; font-size: 16px; margin: 8px 0;"><strong>Betalningsmetod:</strong> ${data.paymentMethod}</p>`;

  return `
    <!DOCTYPE html>
    <html lang="sv">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Orderbekräftelse - Scandiscent</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #F5F1E8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; overflow: hidden;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #064F8C 0%, #111B3E 100%); padding: 40px 30px; text-align: center;">
          <h1 style="color: #FFFFFF; font-size: 32px; margin: 0; font-weight: bold;">Scandiscent</h1>
          <p style="color: rgba(255,255,255,0.9); font-size: 18px; margin: 10px 0 0 0;">Tack för din beställning!</p>
        </div>

        <!-- Main Content -->
        <div style="padding: 40px 30px;">
          <h2 style="color: #064F8C; font-size: 24px; margin: 0 0 20px 0;">Orderbekräftelse</h2>
          
          <p style="color: #2D3748; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
            Hej ${data.customerName},<br><br>
            Vi har mottagit din beställning och börjar förbereda den för diskret leverans. 
            Här är detaljerna för din order:
          </p>

          <!-- Order Details -->
          <div style="background-color: #F7FAFC; border-radius: 12px; padding: 25px; margin: 30px 0;">
            <h3 style="color: #064F8C; font-size: 20px; margin: 0 0 20px 0;">Order #${data.orderId.substring(0, 8)}</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="border-bottom: 2px solid #064F8C;">
                  <th style="padding: 12px 0; color: #064F8C; font-size: 16px; text-align: left;">Produkt</th>
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