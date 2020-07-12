import SendGrid from '@sendgrid/mail';
SendGrid.setApiKey(process.env.SENDGRID_API_KEY);

import { SENDGRID_FROM } from '../constants';

const sendEmail = ({
  to,
  templateId,
  data,
}) => {
  const mail = {
    to,
    from: SENDGRID_FROM,
    templateId,
    dynamic_template_data: {
      ...data,
    },
  };
  return SendGrid.send(mail);
}

export default sendEmail;
