const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'src/environments');

const environment = `export const environment = {
  production: false,
  emailjs: {
    serviceId: '${process.env.NG_APP_EMAILJS_SERVICE_ID || ''}',
    templateId: '${process.env.NG_APP_EMAILJS_TEMPLATE_ID || ''}',
    publicKey: '${process.env.NG_APP_EMAILJS_PUBLIC_KEY || ''}',
    toEmail: '${process.env.NG_APP_EMAILJS_TO_EMAIL || ''}'
  }
};
`;

const productionEnvironment = `export const environment = {
  production: true,
  emailjs: {
    serviceId: '${process.env.NG_APP_EMAILJS_SERVICE_ID || ''}',
    templateId: '${process.env.NG_APP_EMAILJS_TEMPLATE_ID || ''}',
    publicKey: '${process.env.NG_APP_EMAILJS_PUBLIC_KEY || ''}',
    toEmail: '${process.env.NG_APP_EMAILJS_TO_EMAIL || ''}'
  }
};
`;

fs.mkdirSync(targetDir, { recursive: true });

fs.writeFileSync(
  path.join(targetDir, 'environment.ts'),
  environment
);

fs.writeFileSync(
  path.join(targetDir, 'environment.prod.ts'),
  productionEnvironment
);

console.log('✅ Environment files generated');