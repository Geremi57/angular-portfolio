const fs = require('fs');
const path = require('path');

// These will come from Netlify's environment variables
const targetPath = path.join(__dirname, 'src/environments/environment.prod.ts');

const content = `export const environment = {
  production: true,
  emailjs: {
    serviceId: '${process.env.NG_APP_EMAILJS_SERVICE_ID || ''}',
    templateId: '${process.env.NG_APP_EMAILJS_TEMPLATE_ID || ''}',
    publicKey: '${process.env.NG_APP_EMAILJS_PUBLIC_KEY || ''}',
    toEmail: '${process.env.NG_APP_EMAILJS_TO_EMAIL || 'wangageremi725@gmail.com'}'
  }
};
`;

fs.writeFileSync(targetPath, content);
console.log('✅ Environment file generated with Netlify variables');