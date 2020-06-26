import Input from '~/shared/components/Input';
import Select from '~/shared/components/Select';

function RequestNetworkForm() {
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
          type="text"
          label="Company/School/Institution name"
          placeholder="Company/School/Institution name"
        />
      </div>
      <div className="row">
        <Select
          label="Total Members"
          placeholder="Number of expected members"
          options={[
            {
              label: '0 - 100',
              value: '(0,100)',
            },
            {
              label: '100 - 500',
              value: '(100,500)',
            },
            {
              label: '500 - 2,000',
              value: '(500,2000)',
            },
            {
              label: '2,000 - 5,000',
              value: '(2000,5000)',
            },
            {
              label: '5,000 - 10,000',
              value: '(2000,10000)',
            },
            {
              label: '10,000+',
              value: '(10000,)'
            },
          ]}
        />
      </div>
      <div className="row">
        <Input
          label="Additional comments"
          type="text"
          rows={4}
        />
      </div>

      <Input
        label="Send"
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

export default RequestNetworkForm;
