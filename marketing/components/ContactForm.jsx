import Input from '~/shared/components/Input';

function ContactForm() {
  return (
    <form>
      <div className="row">
        <Input
          type="text"
          label="Name"
          placeholder="Name"
        />
      </div>
      <div className="row">
        <Input
          type="email"
          label="Email"
          placeholder="Email"
        />
      </div>
      <div className="row">
        <Input
          label="Message"
          type="text"
          rows={4}
        />
      </div>
      <Input
        label="Submit"
        type="submit"
      />

      <style jsx>{`
        .row {
          margin-bottom: 30px;
        }
      `}</style>
    </form>
  );
}

export default ContactForm;
